import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to generate a random number within range
const randomRange = (min, max) => Math.random() * (max - min) + min;

export default function BackgroundEffects() {
  const [hearts, setHearts] = useState([]);
  const [stars, setStars] = useState([]);

  // Generate background stars once on mount
  useEffect(() => {
    const starCount = 60;
    const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: randomRange(0, 100),
      y: randomRange(0, 100),
      size: randomRange(1, 3.5),
      delay: randomRange(0, 5),
      duration: randomRange(2, 6),
    }));
    setStars(generatedStars);
  }, []);

  // Periodically generate rising hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => {
        // Keep active hearts list small for high performance
        const activeHearts = prevHearts.filter((h) => h.expiry > Date.now());
        const newHeart = {
          id: Math.random().toString(),
          x: randomRange(5, 95), // avoid edge clipping
          size: randomRange(12, 32),
          duration: randomRange(6, 12),
          delay: randomRange(0, 0.5),
          rotate: randomRange(-30, 30),
          drift: randomRange(-40, 40),
          color: Math.random() > 0.4 ? 'text-pink-400' : 'text-purple-400',
          expiry: Date.now() + 13000, // active duration buffer
        };
        return [...activeHearts, newHeart];
      });
    }, 850);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none">
      {/* Dark romantic gradient background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Radiant glow spots */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-pink-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-rose-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: star.size > 2 ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Rising Floating Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className={`absolute bottom-[-50px] ${heart.color} drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]`}
            style={{
              left: `${heart.x}%`,
              width: heart.size,
              height: heart.size,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              y: 0,
              x: 0,
              rotate: heart.rotate
            }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0], 
              scale: [0.5, 1, 1, 0.7],
              y: -window.innerHeight - 100,
              x: heart.drift,
              rotate: heart.rotate + randomRange(-20, 20),
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration, 
              ease: "linear",
              delay: heart.delay
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-full h-full opacity-60"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
