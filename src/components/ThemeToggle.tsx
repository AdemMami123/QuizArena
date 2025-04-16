'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  const sunRaysVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const rayVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };
  
  const moonSpotVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const spotVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: [0, 0.8, 0.4] }
  };
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg 
                ${theme === 'dark' 
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                  : 'bg-gradient-to-br from-indigo-700 to-violet-900'}`}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: theme === 'dark'
          ? '0 0 20px rgba(251, 191, 36, 0.6)'
          : '0 0 20px rgba(139, 92, 246, 0.6)'
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // Enhanced Sun icon with animated rays
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sunRaysVariants}
          className="relative"
        >
          <motion.div
            className="w-6 h-6 bg-white rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-3 bg-white origin-bottom"
              style={{
                top: '-8px',
                left: '11px',
                transform: `rotate(${i * 45}deg) translateY(-8px)`
              }}
              variants={rayVariant}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3,
                delay: i * 0.1
              }}
              animate={{
                height: ['12px', '14px', '12px']
              }}
            />
          ))}
        </motion.div>
      ) : (
        // Enhanced Moon icon with animated spots
        <motion.div className="relative w-6 h-6">
          <motion.div
            className="w-6 h-6 bg-white rounded-full overflow-hidden"
            initial={{ scale: 0.8 }}
            animate={{
              scale: [0.8, 0.83, 0.8],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <motion.div 
              className="w-5 h-5 bg-indigo-700 rounded-full absolute"
              style={{ top: '-35%', right: '-25%' }}
              animate={{
                x: [0, 1, 0],
                y: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          
          {/* Moon surface details */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            variants={moonSpotVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
              style={{ top: '30%', left: '25%' }}
              variants={spotVariant}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ top: '55%', left: '60%' }}
              variants={spotVariant}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-white/20 rounded-full blur-[1px]"
              style={{ top: '20%', left: '50%' }}
              variants={spotVariant}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.button>
  );
}