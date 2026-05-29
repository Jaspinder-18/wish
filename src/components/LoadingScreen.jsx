import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "🌸 Preparing something special...",
  "❤️ ਗੱਲ ਸ਼ੁਰੂ ਹੋਈ 04/04/2009 ਤੋਂ...",
  "✨ ਮਿੱਠੀਆਂ ਯਾਦਾਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਨੇ...",
  "💖 The day my happiness was born...",
];

export default function LoadingScreen({ onFinished }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Cycle messages
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 900);
    return () => clearInterval(timer);
  }, []);

  // Simulate progress loading bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinished, 600); // Wait for exit animation
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Radial dreamy ambient background glow */}
          <div className="absolute w-[80vw] h-[80vw] max-w-[600px] rounded-full bg-pink-500/10 blur-[150px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
            {/* Beating Heart Icon */}
            <motion.div
              className="mb-8 text-pink-500 cursor-default"
              animate={{
                scale: [1, 1.25, 1, 1.25, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-20 h-20 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>

            {/* Glowing Text Card */}
            <div className="h-16 flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  className="text-lg md:text-xl font-medium tracking-wide text-rose-200/90 text-glow-pink"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {messages[msgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Premium Progress Bar */}
            <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="mt-2 text-xs tracking-widest text-slate-500 font-mono">
              {Math.min(progress, 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
