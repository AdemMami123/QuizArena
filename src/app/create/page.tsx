'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import QuizForm from '@/components/QuizForm';
import { QRCodeSVG } from 'qrcode.react';
import { getCustomQuizById, serializeQuiz } from '@/utils/customQuizManager';

export default function CreateQuiz() {
  const [createdQuizId, setCreatedQuizId] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [qrCodeDownloaded, setQrCodeDownloaded] = useState(false);

  // Handle quiz creation success
  const handleQuizCreated = (quizId: string) => {
    setCreatedQuizId(quizId);
    
    // Create share URL with the quiz data
    const quiz = getCustomQuizById(quizId);
    if (quiz) {
      const serializedQuiz = serializeQuiz(quiz);
      const shareUrl = `${window.location.origin}/join?q=${serializedQuiz}`;
      setShareUrl(shareUrl);
    }
  };

  // Copy the share URL to clipboard
  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Copy the quiz code to clipboard
  const handleCopyQuizCode = async () => {
    try {
      await navigator.clipboard.writeText(createdQuizId || '');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download QR code as PNG
  const handleDownloadQR = () => {
    const canvas = document.getElementById('quiz-qr-code')?.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `quiz-${createdQuizId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setQrCodeDownloaded(true);
      setTimeout(() => setQrCodeDownloaded(false), 2000);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-4xl z-10">
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
          Create Your Custom Quiz
        </motion.h1>
        
        <motion.p
          className="text-lg text-foreground/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Create a custom quiz with your own questions that you can share with friends!
        </motion.p>
        
        <AnimatePresence mode="wait">
          {!createdQuizId ? (
            <QuizForm onQuizCreated={handleQuizCreated} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl shadow-md p-8 text-card-foreground"
            >
              {/* Fixed spring animation - using separate animations for scale and rotate */}
              <motion.div 
                className="flex items-center justify-center mb-8"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {/* Use a separate motion animation for the rotating effect */}
                <motion.div
                  className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: 0
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
              
              <h2 className="text-2xl font-bold text-center mb-6">Your Quiz Is Ready!</h2>
              
              <div className="mb-8">
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Your Quiz Code:</p>
                  <div className="flex">
                    <div className="flex-grow bg-secondary/50 text-foreground py-3 px-4 rounded-l-lg font-mono text-center">
                      {createdQuizId}
                    </div>
                    <button
                      onClick={handleCopyQuizCode}
                      className="bg-primary text-primary-foreground py-3 px-4 rounded-r-lg hover:bg-primary-hover transition-colors"
                    >
                      {copySuccess ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Share Link:</p>
                  <div className="flex">
                    <div className="flex-grow bg-secondary/50 text-foreground py-3 px-4 rounded-l-lg truncate">
                      {shareUrl}
                    </div>
                    <button
                      onClick={handleCopyShareLink}
                      className="bg-primary text-primary-foreground py-3 px-4 rounded-r-lg hover:bg-primary-hover transition-colors"
                    >
                      {copySuccess ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Share via QR Code:</p>
                    <button
                      onClick={() => setShowQRCode(!showQRCode)}
                      className="text-primary hover:text-primary-hover text-sm font-medium"
                    >
                      {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showQRCode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-lg flex flex-col items-center overflow-hidden"
                      >
                        <div id="quiz-qr-code" className="mb-4">
                          <QRCodeSVG value={shareUrl} size={200} bgColor="#FFFFFF" fgColor="#111827" level="H" />
                        </div>
                        <button
                          onClick={handleDownloadQR}
                          className="text-sm font-medium text-primary hover:text-primary-hover flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {qrCodeDownloaded ? 'Downloaded!' : 'Download QR Code'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href={`/quiz?custom=${createdQuizId}`} 
                  className="btn btn-primary py-2 px-4 text-center"
                >
                  Try Your Quiz
                </Link>
                <Link 
                  href="/create" 
                  className="btn btn-secondary py-2 px-4 text-center"
                >
                  Create Another Quiz
                </Link>
                <Link 
                  href="/" 
                  className="btn btn-accent py-2 px-4 text-center"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}