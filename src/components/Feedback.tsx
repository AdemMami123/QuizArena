'use client';

import { motion } from 'framer-motion';

interface FeedbackProps {
  isCorrect: boolean | null;
  correctAnswer?: string;
}

const Feedback = ({ isCorrect, correctAnswer }: FeedbackProps) => {
  if (isCorrect === null) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`p-8 rounded-xl shadow-lg text-white text-center max-w-md w-full relative overflow-hidden`}
        style={{
          background: isCorrect 
            ? 'linear-gradient(135deg, var(--success) 0%, #34d399 100%)' 
            : 'linear-gradient(135deg, var(--error) 0%, #f87171 100%)'
        }}
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {/* Background decorative elements */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 bg-white"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-20 bg-white"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Animated icon */}
        <motion.div 
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {isCorrect ? (
            <div className="rounded-full bg-white/30 p-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </svg>
            </div>
          ) : (
            <div className="rounded-full bg-white/30 p-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </svg>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="text-3xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isCorrect ? "Correct!" : "Incorrect!"}
        </motion.div>
        
        {!isCorrect && correctAnswer && (
          <motion.div 
            className="text-xl mt-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            The correct answer is: <span className="font-bold">{correctAnswer}</span>
          </motion.div>
        )}
        
        {/* Animated particles for celebration effect */}
        {isCorrect && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 + i * 0.05,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Feedback;