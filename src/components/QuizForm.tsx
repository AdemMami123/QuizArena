'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { CustomQuiz, saveCustomQuiz } from '@/utils/customQuizManager';
import { QuizQuestion } from '@/data/quizQuestions';

interface QuizFormProps {
  onQuizCreated: (quizId: string) => void;
}

const QuizForm = ({ onQuizCreated }: QuizFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [questions, setQuestions] = useState<Partial<QuizQuestion>[]>([
    { id: 0, question: '', options: ['', '', '', ''], answer: '' },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  // Add a new question to the list
  const addQuestion = () => {
    setQuestions(prevQuestions => [
      ...prevQuestions,
      { 
        id: prevQuestions.length, 
        question: '', 
        options: ['', '', '', ''], 
        answer: '' 
      }
    ]);
  };

  // Remove a question from the list
  const removeQuestion = (index: number) => {
    if (questions.length <= 1) {
      setErrors(['You need at least one question.']);
      return;
    }
    
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      // Update IDs to maintain sequential order
      return updatedQuestions.map((q, i) => ({ ...q, id: i }));
    });
  };

  // Update a question's text
  const updateQuestionText = (index: number, text: string) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], question: text };
      return updatedQuestions;
    });
  };

  // Update an option for a question
  const updateOption = (questionIndex: number, optionIndex: number, text: string) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const updatedOptions = [...(updatedQuestions[questionIndex].options || [])];
      updatedOptions[optionIndex] = text;
      updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options: updatedOptions };
      return updatedQuestions;
    });
  };

  // Set the correct answer for a question
  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const option = updatedQuestions[questionIndex].options?.[optionIndex] || '';
      updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], answer: option };
      return updatedQuestions;
    });
  };

  // Validate the current step
  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];
    
    if (currentStep === 0) {
      if (!title.trim()) newErrors.push('Quiz title is required.');
      if (!author.trim()) newErrors.push('Creator name is required.');
    } else {
      const currentQuestion = questions[currentStep - 1];
      
      if (!currentQuestion.question?.trim()) {
        newErrors.push('Question text is required.');
      }
      
      const emptyOptions = currentQuestion.options?.filter(opt => !opt.trim()).length || 0;
      if (emptyOptions > 0) {
        newErrors.push('All options must have text.');
      }
      
      if (!currentQuestion.answer?.trim()) {
        newErrors.push('Please select a correct answer.');
      }
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Go to the next step
  const nextStep = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < questions.length) {
      setCurrentStep(prevStep => prevStep + 1);
      setErrors([]);
    } else {
      // Submit the quiz
      handleSubmit();
    }
  };

  // Go to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      setErrors([]);
    }
  };

  // Submit the quiz
  const handleSubmit = () => {
    // Final validation of all questions
    let valid = true;
    const incompleteQuestions = questions.filter(q => 
      !q.question?.trim() || 
      !q.answer?.trim() ||
      q.options?.some(o => !o.trim())
    );
    
    if (incompleteQuestions.length > 0) {
      setErrors(['Some questions are incomplete. Please check all questions and try again.']);
      valid = false;
    }
    
    if (!valid) return;
    
    // Create the quiz object
    const quiz: CustomQuiz = {
      id: uuidv4(),
      title: title.trim(),
      createdBy: author.trim(),
      createdAt: new Date().toISOString(),
      questions: questions as QuizQuestion[]
    };
    
    // Save the quiz
    saveCustomQuiz(quiz);
    
    // Call the onQuizCreated callback
    onQuizCreated(quiz.id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        className="bg-card text-card-foreground rounded-xl shadow-md p-8 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-secondary-foreground/70">
              {currentStep === 0 ? 'Quiz Info' : `Question ${currentStep}/${questions.length}`}
            </span>
            <span className="text-sm font-medium">
              {Math.round((currentStep / (questions.length + 1)) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-secondary/40 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (questions.length + 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Error Messages */}
        <AnimatePresence>
          {errors.length > 0 && (
            <motion.div
              className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ul className="list-disc pl-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Info (Step 0) */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="quiz-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary">Quiz Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter a title for your quiz"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="author"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your name as the quiz creator"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Question Form (Steps 1+) */}
          {currentStep > 0 && currentStep <= questions.length && (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="question-form"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Question {currentStep}</h2>
                <button
                  onClick={() => removeQuestion(currentStep - 1)}
                  className="text-error hover:text-error/80 text-sm font-medium flex items-center"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor={`question-${currentStep}`} className="block text-sm font-medium mb-2">
                    Question Text
                  </label>
                  <input
                    type="text"
                    id={`question-${currentStep}`}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your question"
                    value={questions[currentStep - 1]?.question || ''}
                    onChange={e => updateQuestionText(currentStep - 1, e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Options (select one as the correct answer)
                  </label>
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map(optionIndex => {
                      const isCorrectAnswer = questions[currentStep - 1]?.answer === 
                                            questions[currentStep - 1]?.options?.[optionIndex];
                      
                      return (
                        <div key={optionIndex} className="flex items-center space-x-3">
                          <div className="flex-grow">
                            <div className="relative flex items-center">
                              <input
                                type="text"
                                className={`w-full px-4 py-3 pl-10 rounded-lg ${
                                  isCorrectAnswer 
                                    ? 'bg-success/10 border-success/30' 
                                    : 'bg-secondary/50 border-input'
                                } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                value={questions[currentStep - 1]?.options?.[optionIndex] || ''}
                                onChange={e => updateOption(currentStep - 1, optionIndex, e.target.value)}
                              />
                              <div className="absolute left-3 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-1/20 text-gradient-1 text-xs">
                                {String.fromCharCode(65 + optionIndex)}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCorrectAnswer(currentStep - 1, optionIndex)}
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              isCorrectAnswer
                                ? 'bg-success text-white'
                                : 'bg-secondary hover:bg-secondary-hover'
                            }`}
                          >
                            {isCorrectAnswer ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {currentStep === questions.length && (
                  <motion.button
                    type="button"
                    onClick={addQuestion}
                    className="mt-6 w-full flex items-center justify-center py-3 px-4 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Another Question
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            type="button"
            onClick={prevStep}
            className={`flex items-center justify-center py-2 px-4 rounded-lg ${
              currentStep === 0
                ? 'opacity-50 bg-secondary cursor-not-allowed'
                : 'bg-secondary hover:bg-secondary-hover'
            }`}
            whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
            whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
            disabled={currentStep === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </motion.button>
          
          <motion.button
            type="button"
            onClick={nextStep}
            className="flex items-center justify-center py-2 px-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep < questions.length ? 'Next' : 'Create Quiz'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizForm;