'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLeaderboard, clearLeaderboard, LeaderboardEntry } from '@/utils/leaderboardManager';

interface LeaderboardProps {
  onClose: () => void;
}

const Leaderboard = ({ onClose }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Load leaderboard entries
    setEntries(getLeaderboard());
  }, []);

  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  // Handle clearing the leaderboard
  const handleClearLeaderboard = () => {
    if (confirm('Are you sure you want to clear the leaderboard?')) {
      clearLeaderboard();
      setEntries([]);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card text-card-foreground rounded-xl shadow-md p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Leaderboard</h2>
          <button
            onClick={onClose}
            className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors p-2 rounded-full hover:bg-secondary"
            aria-label="Close leaderboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {entries.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/50 border-b border-[var(--border)]">
                  <tr>
                    <th className="px-4 py-3 text-secondary-foreground">#</th>
                    <th className="px-4 py-3 text-secondary-foreground">Name</th>
                    <th className="px-4 py-3 text-secondary-foreground">Score</th>
                    <th className="px-4 py-3 text-secondary-foreground">Time</th>
                    <th className="px-4 py-3 text-secondary-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {entries.map((entry, index) => (
                      <motion.tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="border-b border-[var(--border)] px-4 py-3">
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-warning/20 text-warning rounded-full">1</span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-accent/20 text-accent rounded-full">2</span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/20 text-primary rounded-full">3</span>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="border-b border-[var(--border)] px-4 py-3 font-medium">{entry.name}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3">
                          <span className={
                            Math.round((entry.score / entry.total) * 100) >= 80 ? 'text-success' : 
                            Math.round((entry.score / entry.total) * 100) >= 60 ? 'text-primary' :
                            Math.round((entry.score / entry.total) * 100) >= 40 ? 'text-warning' : 'text-error'
                          }>
                            {entry.score}/{entry.total} ({Math.round((entry.score / entry.total) * 100)}%)
                          </span>
                        </td>
                        <td className="border-b border-[var(--border)] px-4 py-3">{formatTime(entry.time)}</td>
                        <td className="border-b border-[var(--border)] px-4 py-3 text-secondary-foreground/80">{formatDate(entry.date)}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-right">
              <motion.button
                onClick={handleClearLeaderboard}
                className="text-error hover:text-error/80 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Leaderboard
              </motion.button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-secondary-foreground/60">
            No entries yet. Complete a quiz to get on the leaderboard!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;