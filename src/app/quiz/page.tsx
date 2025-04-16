'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Question from '@/components/Question';
import Timer from '@/components/Timer';
import Feedback from '@/components/Feedback';
import quizQuestions from '@/data/quizQuestions';

const TIMER_DURATION = 30;

export default function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(true);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [startTime] = useState(Date.now());

  const currentQuestion = quizQuestions[currentIndex];

  const handleTimeUp = useCallback(() => {
    if (timerActive) {
      setTimerActive(false);
      setFeedback(false);

      setTimeout(() => {
        moveToNextQuestion();
      }, 2000);
    }
  }, [timerActive]);

  const handleAnswerSelected = useCallback((selectedOption: string) => {
    setTimerActive(false);
    const isCorrect = selectedOption === currentQuestion.answer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setFeedback(isCorrect);

    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  }, [currentQuestion]);

  const moveToNextQuestion = useCallback(() => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setTimeLeft(TIMER_DURATION);
      setTimerActive(true);
      setFeedback(null);
    } else {
      const endTime = Date.now();
      const totalTimeUsed = Math.floor((endTime - startTime) / 1000);

      router.push(`/result?score=${score}&total=${quizQuestions.length}&time=${totalTimeUsed}`);
    }
  }, [currentIndex, router, score, startTime]);

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

  const progressPercentage = (currentIndex / quizQuestions.length) * 100;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background and visuals */}
      {/* ... retain decorative elements and animations ... */}

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

          <AnimatePresence mode="wait">
            <Question 
              key={currentQuestion.question}
              question={currentQuestion} 
              onAnswerSelected={handleAnswerSelected} 
              disabled={!timerActive}
            />
          </AnimatePresence>

          <Feedback isCorrect={feedback} />
        </div>
      </motion.div>
    </main>
  );
}
