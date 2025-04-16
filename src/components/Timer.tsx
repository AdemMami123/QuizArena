'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  onTimeUp: () => void;
}

const Timer = ({ timeLeft, totalTime, onTimeUp }: TimerProps) => {
  const percentage = (timeLeft / totalTime) * 100;
  
  // Calculate color based on time left (success -> warning -> error)
  const getColor = () => {
    if (percentage > 66) return 'bg-gradient-to-r from-success to-success/70';
    if (percentage > 33) return 'bg-gradient-to-r from-warning to-warning/70';
    return 'bg-gradient-to-r from-error to-error/70';
  };
  
  // Calculate pulse animation intensity based on time left
  const getPulseAnimation = () => {
    if (timeLeft <= 5) return [1, 1.1, 1];
    if (timeLeft <= 10) return [1, 1.05, 1];
    return 1;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="relative w-full h-7 bg-secondary/50 backdrop-blur-sm rounded-full overflow-hidden mb-8 shadow-inner">
      <motion.div
        className={`h-full ${getColor()} backdrop-blur-sm`}
        initial={{ width: '100%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated tick marks for timer */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white/20"
            style={{ left: `${(i + 1) * 10}%` }}
            initial={{ height: '30%', top: '35%' }}
            animate={{ 
              height: ['30%', '60%', '30%'],
              top: ['35%', '20%', '35%'],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: 'mirror', 
              delay: i * 0.1 
            }}
          />
        ))}
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="flex items-center justify-center px-4 py-1 rounded-full bg-card/40 backdrop-blur-sm shadow-md text-sm font-medium"
          animate={{
            scale: getPulseAnimation(),
          }}
          transition={{
            duration: 0.5,
            repeat: timeLeft <= 10 ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={timeLeft}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                timeLeft <= 5 
                  ? 'text-error' 
                  : timeLeft <= 10 
                    ? 'text-warning' 
                    : 'text-success'
              } font-bold`}
            >
              {timeLeft}
            </motion.span>
          </AnimatePresence>
          <span className="ml-1 text-card-foreground">{timeLeft === 1 ? 'second' : 'seconds'} left</span>
        </motion.div>
      </div>
      
      {/* Warning flash animation when time is low */}
      {timeLeft <= 5 && (
        <motion.div 
          className="absolute inset-0 bg-error/30"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
      )}
    </div>
  );
};

export default Timer;