'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Leaderboard from '@/components/Leaderboard';
import { saveToLeaderboard } from '@/utils/leaderboardManager';

// Component that safely accesses search params with proper suspense handling
function SearchParamsProvider({ children }: { children: (searchParams: URLSearchParams) => React.ReactNode }) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}

// Fallback component while the searchParams are loading
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-pulse">Loading results...</div>
    </div>
  );
}

export default function Result() {
  const router = useRouter();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchParamsProvider>
        {(searchParams) => <ResultContent searchParams={searchParams} router={router} />}
      </SearchParamsProvider>
    </Suspense>
  );
}

interface ResultContentProps {
  searchParams: URLSearchParams;
  router: ReturnType<typeof useRouter>;
}

function ResultContent({ searchParams, router }: ResultContentProps) {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const [isCustomQuiz, setIsCustomQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizCreator, setQuizCreator] = useState('');
  
  // Get stored player name (for custom quizzes)
  const storedPlayerName = typeof window !== 'undefined' ? localStorage.getItem('playerName') : null;

  useEffect(() => {
    const scoreParam = searchParams.get('score');
    const totalParam = searchParams.get('total');
    const timeParam = searchParams.get('time');
    const isCustomParam = searchParams.get('isCustom');
    const titleParam = searchParams.get('title');
    const creatorParam = searchParams.get('creator');
    const playerParam = searchParams.get('player');

    if (scoreParam && totalParam && timeParam) {
      const scoreValue = parseInt(scoreParam);
      const totalValue = parseInt(totalParam);
      const timeValue = parseInt(timeParam);

      setScore(scoreValue);
      setTotal(totalValue);
      setTime(timeValue);
      setScorePercentage(Math.round((scoreValue / totalValue) * 100));
      
      // Handle custom quiz parameters
      if (isCustomParam === 'true') {
        setIsCustomQuiz(true);
        if (titleParam) setQuizTitle(titleParam);
        if (creatorParam) setQuizCreator(creatorParam);
        if (playerParam) setPlayerName(playerParam);
        else if (storedPlayerName) setPlayerName(storedPlayerName);
      }
    } else {
      router.push('/');
    }

    // Clean up temporary quiz data
    return () => {
      localStorage.removeItem('currentQuiz');
      localStorage.removeItem('currentQuizId');
      localStorage.removeItem('playerName');
    };
  }, [searchParams, router, storedPlayerName]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getMessage = () => {
    if (scorePercentage >= 80) return 'Excellent job!';
    if (scorePercentage >= 60) return 'Good work!';
    if (scorePercentage >= 40) return 'Not bad!';
    return 'Keep practicing!';
  };

  const getColor = () => {
    if (scorePercentage >= 80) return 'text-success';
    if (scorePercentage >= 60) return 'text-primary';
    if (scorePercentage >= 40) return 'text-warning';
    return 'text-error';
  };

  const handleSaveScore = () => {
    if (playerName.trim() === '') {
      alert('Please enter your name to save your score');
      return;
    }

    saveToLeaderboard({
      name: playerName,
      score,
      total,
      time
    });

    setIsScoreSaved(true);
    setShowLeaderboard(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="w-full max-w-lg quiz-container p-8 text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-primary mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Quiz Results
        </motion.h1>

        {isCustomQuiz && (
          <motion.div
            className="mb-6 py-4 px-4 bg-secondary/30 rounded-lg text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold">{quizTitle || 'Custom Quiz'}</h2>
            {quizCreator && <p className="text-sm text-secondary-foreground/70">Created by: {quizCreator}</p>}
            {playerName && <p className="text-sm text-secondary-foreground/70">Player: {playerName}</p>}
          </motion.div>
        )}

        <motion.div
          className="mb-8 py-6 px-4 bg-secondary/50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`text-4xl font-bold mb-2 ${getColor()}`}>
            {scorePercentage}%
          </h2>
          <p className="text-xl text-card-foreground mb-4">
            {getMessage()}
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="text-secondary-foreground/70">Score:</div>
            <div className="font-medium text-card-foreground">{score} / {total}</div>
            <div className="text-secondary-foreground/70">Time Taken:</div>
            <div className="font-medium text-card-foreground">{formatTime(time)}</div>
            <div className="text-secondary-foreground/70">Avg. Time per Question:</div>
            <div className="font-medium text-card-foreground">{formatTime(Math.round(time / total))}</div>
          </div>
        </motion.div>

        {!isScoreSaved && !isCustomQuiz && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="mb-4">
              <label htmlFor="playerName" className="block text-card-foreground text-sm font-bold mb-2 text-left">
                Enter your name to save your score:
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="input w-full px-4 py-3 rounded-lg bg-secondary/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your name"
                maxLength={20}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveScore}
              className="btn btn-accent py-2 px-4 w-full"
            >
              Save Score to Leaderboard
            </motion.button>
          </motion.div>
        )}

        {isCustomQuiz && playerName && !isScoreSaved && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveScore}
              className="btn btn-accent py-2 px-4 w-full"
            >
              Save Score to Global Leaderboard
            </motion.button>
            <p className="text-xs text-secondary-foreground/70 mt-2">
              Your score will be saved to the global leaderboard, not just for this custom quiz.
            </p>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          {isCustomQuiz ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/join" className="btn btn-primary py-3 px-6 rounded-lg text-lg w-full sm:w-auto">
                  Join Another Quiz
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/create" className="btn btn-accent py-3 px-6 rounded-lg text-lg w-full sm:w-auto">
                  Create a Quiz
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/quiz" className="btn btn-primary py-3 px-6 rounded-lg text-lg w-full sm:w-auto">
                Try Again
              </Link>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button 
              onClick={() => setShowLeaderboard(true)}
              className="btn btn-accent py-3 px-6 rounded-lg text-lg w-full sm:w-auto"
            >
              View Leaderboard
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="btn btn-secondary py-3 px-6 rounded-lg text-lg w-full sm:w-auto">
              Home
            </Link>
          </motion.div>
        </div>
        
        {/* Trophy for winner effect */}
        {scorePercentage >= 80 && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-warning" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5V3H15V5H17C18.1046 5 19 5.89543 19 7V8C19 10.1521 17.4341 11.9520 15.3431 12.7100C14.5264 14.5961 12.8404 16 10.5 16C8.15959 16 6.47361 14.5961 5.65685 12.7100C3.56589 11.9520 2 10.1521 2 8V7C2 5.89543 2.89543 5 4 5H5ZM15 5H5V7H4C3.44772 7 3 7.44772 3 8C3 9.63261 4.18099 11 5.8 11H6.2L6.4 11.4C6.9539 12.6975 8.1373 14 10.5 14C12.8627 14 14.0461 12.6975 14.6 11.4L14.8 11H15.2C16.819 11 18 9.63261 18 8C18 7.44772 17.5523 7 17 7H16H15V5Z" clipRule="evenodd" />
                <path d="M8 14H13V17H14V18H7V17H8V14Z" />
              </svg>
              
              {/* Animated sparkles around trophy */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-warning rounded-full"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showLeaderboard && (
          <Leaderboard onClose={() => setShowLeaderboard(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
