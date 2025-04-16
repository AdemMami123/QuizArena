'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Leaderboard from '@/components/Leaderboard';
import { saveToLeaderboard } from '@/utils/leaderboardManager';

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  useEffect(() => {
    const scoreParam = searchParams.get('score');
    const totalParam = searchParams.get('total');
    const timeParam = searchParams.get('time');

    if (scoreParam && totalParam && timeParam) {
      const scoreValue = parseInt(scoreParam);
      const totalValue = parseInt(totalParam);
      const timeValue = parseInt(timeParam);

      setScore(scoreValue);
      setTotal(totalValue);
      setTime(timeValue);
      setScorePercentage(Math.round((scoreValue / totalValue) * 100));
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

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

        {!isScoreSaved && (
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
                className="input"
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

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/quiz" className="btn btn-primary py-3 px-6 rounded-lg text-lg w-full sm:w-auto">
              Try Again
            </Link>
          </motion.div>

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
      </motion.div>

      <AnimatePresence>
        {showLeaderboard && (
          <Leaderboard onClose={() => setShowLeaderboard(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
