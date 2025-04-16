'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Question from '@/components/Question';
import Timer from '@/components/Timer';
import Feedback from '@/components/Feedback';
import defaultQuizQuestions, { QuizQuestion } from '@/data/quizQuestions';
import { getCustomQuizById, deserializeQuiz } from '@/utils/customQuizManager';

const TIMER_DURATION = 30;

export default function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(true);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [startTime] = useState(Date.now());
  const [quizTitle, setQuizTitle] = useState('Timed Quiz Challenge');
  const [quizCreator, setQuizCreator] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(defaultQuizQuestions);
  const [isCustomQuiz, setIsCustomQuiz] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Load quiz data (either default or custom)
  useEffect(() => {
    // Check if we're using a custom quiz from URL parameter
    const customQuizId = searchParams.get('custom');
    const customQuizMode = searchParams.get('mode');
    
    // If a direct custom quiz ID is provided
    if (customQuizId) {
      const customQuiz = getCustomQuizById(customQuizId);
      if (customQuiz) {
        setQuizQuestions(customQuiz.questions);
        setQuizTitle(customQuiz.title);
        setQuizCreator(customQuiz.createdBy);
        setIsCustomQuiz(true);
      }
    } 
    // If we're in custom mode (from serialized quiz data)
    else if (customQuizMode === 'custom') {
      const serializedQuiz = localStorage.getItem('currentQuiz');
      if (serializedQuiz) {
        const quizData = deserializeQuiz(serializedQuiz);
        if (quizData) {
          setQuizQuestions(quizData.questions);
          setQuizTitle(quizData.title);
          setQuizCreator(quizData.createdBy);
          setIsCustomQuiz(true);
        }
      }
    }
    
    // Get player name from local storage if available
    const storedPlayerName = localStorage.getItem('playerName');
    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }
  }, [searchParams]);

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
    const isCorrect = selectedOption === currentQuestion?.answer;

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

      // Use URL parameters to pass quiz results
      const params = new URLSearchParams({
        score: score.toString(),
        total: quizQuestions.length.toString(),
        time: totalTimeUsed.toString()
      });
      
      // For custom quizzes, add custom quiz parameters
      if (isCustomQuiz) {
        params.append('isCustom', 'true');
        if (quizTitle) params.append('title', quizTitle);
        if (quizCreator) params.append('creator', quizCreator);
        if (playerName) params.append('player', playerName);
      }

      router.push(`/result?${params.toString()}`);
    }
  }, [currentIndex, router, score, startTime, quizQuestions.length, isCustomQuiz, quizTitle, quizCreator, playerName]);

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

  if (!currentQuestion) {
    // Handle case where no questions are loaded yet or invalid quiz
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
        <div className="bg-card text-card-foreground rounded-xl shadow-md p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Loading Quiz...</h1>
          <p>If the quiz doesnt load, it may be invalid or no longer available.</p>
          <Link href="/" className="btn btn-primary mt-6">Return to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background and visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="w-full max-w-2xl quiz-container p-8 z-10 backdrop-blur-sm bg-card/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {isCustomQuiz && (
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-bold">{quizTitle}</h3>
              {quizCreator && <p className="text-sm text-foreground/70">by {quizCreator}</p>}
            </div>
            {playerName && (
              <div className="mt-2 sm:mt-0 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                Playing as: {playerName}
              </div>
            )}
          </div>
        )}
        
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

          <Feedback 
            isCorrect={feedback} 
            correctAnswer={feedback === false ? currentQuestion.answer : undefined}
          />
        </div>
      </motion.div>
    </main>
  );
}
