'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Question from '@/components/Question';
import Timer from '@/components/Timer';
import Feedback from '@/components/Feedback';
import quizQuestions from '@/data/quizQuestions';
import soundManager from '@/utils/soundManager';

const TIMER_DURATION = 30; // 30 seconds per question

export default function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(true);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [startTime] = useState(Date.now());
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const currentQuestion = quizQuestions[currentIndex];
  
  // Handle timer expiry
  const handleTimeUp = useCallback(() => {
    if (timerActive) {
      setTimerActive(false);
      setFeedback(false);
      
      // Play timeout sound
      if (soundEnabled) {
        soundManager.play('timeout');
      }
      
      // Show feedback for 2 seconds before moving to next question
      setTimeout(() => {
        moveToNextQuestion();
      }, 2000);
    }
  }, [timerActive, soundEnabled]);
  
  // Handle answer selection
  const handleAnswerSelected = useCallback((selectedOption: string) => {
    setTimerActive(false);
    const isCorrect = selectedOption === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      // Play correct sound
      if (soundEnabled) {
        soundManager.play('correct');
      }
    } else {
      // Play incorrect sound
      if (soundEnabled) {
        soundManager.play('incorrect');
      }
    }
    
    setFeedback(isCorrect);
    
    // Show feedback for 2 seconds before moving to next question
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  }, [currentQuestion, soundEnabled]);
  
  // Move to next question or end quiz
  const moveToNextQuestion = useCallback(() => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setTimeLeft(TIMER_DURATION);
      setTimerActive(true);
      setFeedback(null);
    } else {
      // End of quiz
      const endTime = Date.now();
      const totalTimeUsed = Math.floor((endTime - startTime) / 1000);
      
      // Play complete sound
      if (soundEnabled) {
        soundManager.play('complete');
      }
      
      // Navigate to results page with score and time
      router.push(`/result?score=${score}&total=${quizQuestions.length}&time=${totalTimeUsed}`);
    }
  }, [currentIndex, router, score, startTime, soundEnabled]);
  
  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.toggleSound(newState);
  }, [soundEnabled]);
  
  // Timer countdown effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleTimeUp();
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timeLeft, timerActive, handleTimeUp]);
  
  // Calculate progress percentage
  const progressPercentage = ((currentIndex) / quizQuestions.length) * 100;
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gradient-1/5 via-background to-gradient-4/5"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gradient-2/10 to-transparent"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            y: [0, -10, 0] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-1/3 left-10 h-32 w-32 rounded-full bg-gradient-3/5 blur-xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 h-40 w-40 rounded-full bg-gradient-1/5 blur-xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div 
        className="w-full max-w-2xl quiz-container p-8 z-10 backdrop-blur-sm bg-card/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <motion.div 
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 rounded-lg bg-gradient-1/10 dark:bg-gradient-2/20">
                Question {currentIndex + 1}/{quizQuestions.length}
              </span>
            </motion.div>
            <div className="flex items-center gap-4">
              <motion.button 
                onClick={toggleSound} 
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
                aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {soundEnabled ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gradient-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M6 16l4-4m0 0l4-4m-4 4l-4-4m4 4l4 4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </motion.button>
              <motion.div 
                className="relative px-4 py-1 rounded-full shadow shimmer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                style={{
                  background: `linear-gradient(90deg, var(--gradient-1), var(--gradient-2))`
                }}
              >
                <span className="text-lg font-bold text-white">Score: {score}</span>
              </motion.div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1 bg-secondary/30 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gradient-1 to-gradient-2"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <Timer 
            timeLeft={timeLeft} 
            totalTime={TIMER_DURATION} 
            onTimeUp={handleTimeUp} 
          />
        </div>
        
        <AnimatePresence mode="wait">
          <Question 
            key={currentIndex}
            question={currentQuestion}
            onAnswerSelected={handleAnswerSelected}
            disabled={!timerActive}
          />
        </AnimatePresence>
        
        <AnimatePresence>
          {feedback !== null && (
            <Feedback 
              isCorrect={feedback} 
              correctAnswer={feedback ? undefined : currentQuestion.answer}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}