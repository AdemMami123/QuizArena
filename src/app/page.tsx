'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-1/10 via-gradient-2/5 to-background"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gradient-3/10 to-transparent"
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
            y: [0, -10, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gradient-4/10 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-24 w-24 rounded-full bg-gradient-1/10 blur-xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 h-32 w-32 rounded-full bg-gradient-3/10 blur-xl"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div 
        className="w-full max-w-lg quiz-container p-8 text-center z-10 backdrop-blur-sm bg-card/90 card-3d"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Timed Quiz Challenge
        </motion.h1>
        
        <motion.p 
          className="text-lg mb-8 text-card-foreground/90"
          variants={itemVariants}
        >
          Test your knowledge with our timed quiz challenges! 
          Play the default quiz, create your own custom quiz, or join one created by a friend.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          variants={itemVariants}
        >
          <Link 
            href="/quiz" 
            className="btn btn-glow py-3 px-4 text-lg shadow-md"
          >
            Start Default Quiz
          </Link>
          
          <Link 
            href="/create" 
            className="btn btn-primary py-3 px-4 text-lg shadow-md"
          >
            Create Custom Quiz
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link 
            href="/join" 
            className="btn btn-secondary py-3 px-8 text-lg shadow-md"
          >
            Join a Quiz
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
