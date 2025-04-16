'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/data/quizQuestions';

interface QuestionProps {
  question: QuizQuestion;
  onAnswerSelected: (selectedOption: string) => void;
  disabled: boolean;
}

const Question = ({ question, onAnswerSelected, disabled }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleOptionClick = (option: string) => {
    if (disabled) return;
    setSelectedOption(option);
    onAnswerSelected(option);
  };
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div 
        className="relative mb-8 p-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {question.category && (
          <motion.span 
            className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-3/20 text-gradient-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {question.category}
          </motion.span>
        )}
        <h2 className="text-2xl font-bold">
          <span className="block text-foreground dark:text-foreground py-2 px-4 rounded-lg bg-gradient-1/10 dark:bg-gradient-2/20">
            {question.question}
          </span>
        </h2>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`answer-option ${selectedOption === option ? 'selected' : ''}`}
            variants={item}
            disabled={disabled}
            whileHover={disabled ? {} : { 
              scale: 1.02, 
              boxShadow: "0 0 8px rgba(99, 102, 241, 0.3)",
            }}
            whileTap={disabled ? {} : { scale: 0.98 }}
          >
            <span className="flex items-center">
              <span className="flex items-center justify-center text-sm font-bold mr-3 h-6 w-6 rounded-full bg-gradient-1/20 text-gradient-1">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Question;