'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { deserializeQuiz, getCustomQuizById, CustomQuiz } from '@/utils/customQuizManager';

export default function JoinQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quizCode, setQuizCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [quiz, setQuiz] = useState<CustomQuiz | null>(null);
  
  // Check for quiz data in URL on load
  useEffect(() => {
    const serializedQuiz = searchParams.get('q');
    if (serializedQuiz) {
      try {
        const quizData = deserializeQuiz(serializedQuiz);
        if (quizData) {
          setQuiz(quizData);
        } else {
          setError('Invalid quiz data. Please check the URL and try again.');
        }
      } catch {
        setError('Failed to load quiz. The data might be corrupted.');
      }
    }
  }, [searchParams]);

  // Handle lookup of quiz by code
  const handleLookupQuiz = () => {
    if (!quizCode.trim()) {
      setError('Please enter a quiz code');
      return;
    }

    const foundQuiz = getCustomQuizById(quizCode.trim());
    if (foundQuiz) {
      setQuiz(foundQuiz);
      setError('');
    } else {
      setError('Quiz not found. Please check the code and try again.');
    }
  };

  // Handle form submission
  const handleJoinQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (quiz) {
      // For direct URL access with a serialized quiz
      if (searchParams.get('q')) {
        const serializedQuiz = searchParams.get('q') || '';
        localStorage.setItem('currentQuiz', serializedQuiz);
        localStorage.setItem('playerName', playerName.trim());
        router.push('/quiz?mode=custom');
      } 
      // For quiz found by code from local storage
      else {
        localStorage.setItem('currentQuizId', quiz.id);
        localStorage.setItem('playerName', playerName.trim());
        router.push(`/quiz?custom=${quiz.id}`);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <Link 
          href="/" 
          className="inline-flex items-center mb-8 text-primary hover:text-primary-hover transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        
        <motion.h1
          className="text-3xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join a Quiz
        </motion.h1>
        
        <motion.div
          className="bg-card rounded-xl shadow-md p-8 text-card-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleJoinQuiz}>
            <AnimatePresence mode="wait">
              {!quiz ? (
                <motion.div
                  key="quiz-lookup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <label htmlFor="quizCode" className="block text-sm font-medium mb-2">
                      Enter Quiz Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="quizCode"
                        className="flex-grow px-4 py-3 rounded-l-lg bg-secondary/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Quiz code"
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleLookupQuiz}
                        className="bg-primary text-primary-foreground py-2 px-4 rounded-r-lg hover:bg-primary-hover transition-colors"
                      >
                        Find
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-secondary-foreground/70">
                      Enter the code provided by the quiz creator, or scan the QR code link
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Link 
                      href="/quiz" 
                      className="btn btn-secondary py-2 px-4 text-center"
                    >
                      Try the Default Quiz Instead
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="join-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
                    <h2 className="text-lg font-bold">{quiz.title}</h2>
                    <p className="text-sm text-secondary-foreground/80">Created by: {quiz.createdBy}</p>
                    <p className="text-sm text-secondary-foreground/80">Questions: {quiz.questions.length}</p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="playerName" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="playerName"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setQuiz(null);
                        setError('');
                      }}
                      className="btn btn-secondary py-2 px-4"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary py-2 px-6"
                    >
                      Start Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </main>
  );
}