import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import LoadingScreen from './components/LoadingScreen';
import StoryTimeline from './components/StoryTimeline';
import { triggerConfettiBurst, triggerHeartyRain } from './components/ConfettiEffect';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardState, setCardState] = useState('intro'); // 'intro', 'story', 'final'
  const [foreverTogether, setForeverTogether] = useState(false);
  const [startTypewriter, setStartTypewriter] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [musicStarted, setMusicStarted] = useState(false);

  const fullTypeText = "ਤੇਰੇ ਨਾਲ ਬਿਤਾਇਆ ਹਰ ਪਲ ਮੇਰੇ ਲਈ ਰੱਬ ਦੀ ਰਹਿਮਤ ਆ ❤️";

  // Typewriter effect in Final Message stage
  useEffect(() => {
    if (cardState !== 'final') return;
    
    // Slight delay before typing begins for smooth card transition
    const delayTimer = setTimeout(() => {
      setStartTypewriter(true);
    }, 600);

    return () => clearTimeout(delayTimer);
  }, [cardState]);

  useEffect(() => {
    if (!startTypewriter) return;

    let currentText = "";
    let index = 0;
    setTypedText("");

    const interval = setInterval(() => {
      if (index < fullTypeText.length) {
        currentText += fullTypeText.charAt(index);
        setTypedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [startTypewriter]);

  const handleOpenStory = () => {
    setMusicStarted(true);
    setCardState('story');
  };

  const handleForeverClick = () => {
    setForeverTogether(true);
    triggerConfettiBurst();
    triggerHeartyRain();
  };

  // Card Flip Transition Variants
  const cardFlipVariants = {
    initial: { 
      opacity: 0, 
      rotateY: -60, 
      scale: 0.9,
    },
    animate: { 
      opacity: 1, 
      rotateY: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      rotateY: 60, 
      scale: 0.9,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* 1. Loading Screen Entry */}
      <LoadingScreen onFinished={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="fixed inset-0 w-full h-full text-slate-100 selection:bg-pink-500/30 overflow-hidden font-sans flex items-center justify-center bg-slate-950">
          
          {/* 2. Dreamy background effects spanning the screen */}
          <BackgroundEffects />

          {/* Custom Fireworks background overlay specifically for final message state */}
          <AnimatePresence>
            {cardState === 'final' && (
              <motion.div 
                className="absolute inset-0 pointer-events-none z-0 stars-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* 1st Firework */}
                <div className="absolute top-[15%] left-[10%] w-32 h-32 text-pink-500/30 animate-pulse" style={{ animationDuration: '4s' }}>
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="2" />
                    <circle cx="30" cy="30" r="1.5" /><circle cx="70" cy="70" r="1.5" />
                    <circle cx="30" cy="70" r="1" /><circle cx="70" cy="30" r="1" />
                    <circle cx="50" cy="20" r="1.5" /><circle cx="50" cy="80" r="1.5" />
                  </svg>
                </div>
                {/* 2nd Firework */}
                <div className="absolute top-[20%] right-[10%] w-36 h-36 text-purple-500/30 animate-pulse" style={{ animationDuration: '6s' }}>
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="2.5" />
                    <circle cx="25" cy="25" r="1.5" /><circle cx="75" cy="75" r="1.5" />
                    <circle cx="25" cy="75" r="1.2" /><circle cx="75" cy="25" r="1.2" />
                    <circle cx="50" cy="15" r="1.8" /><circle cx="50" cy="85" r="1.8" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Background Music Toggle Controller */}
          <MusicPlayer autoStart={musicStarted} />

          {/* 4. Unified Interactive Central 3D Card Container */}
          <div className="relative z-10 w-[95%] max-w-3xl px-4 flex items-center justify-center" style={{ perspective: '1500px' }}>
            <AnimatePresence mode="wait">
              
              {/* STAGE 1: INTRO CARD */}
              {cardState === 'intro' && (
                <motion.div
                  key="intro"
                  variants={cardFlipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full rounded-3xl glass-card border border-white/10 shadow-2xl p-8 md:p-12 text-center flex flex-col items-center relative overflow-hidden"
                  style={{
                    boxShadow: '0 20px 60px -15px rgba(244, 63, 94, 0.25), 0 0 2px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-pink-500/[0.03] blur-xl -z-10 animate-pulse-slow" />
                  
                  {/* Floating heart beat logo */}
                  <motion.div
                    className="text-pink-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-16 h-16 fill-current animate-heartbeat" />
                  </motion.div>

                  {/* Calligraphy greeting */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 bg-gradient-to-r from-pink-300 via-rose-100 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.25)] font-serif">
                    Happy Birthday Meri Jaan ❤️
                  </h1>

                  {/* Gurmukhi text */}
                  <div className="space-y-3 mb-10">
                    <p className="text-pink-300 text-lg md:text-2xl font-semibold tracking-widest text-glow-pink font-mono">
                      04/04/2009
                    </p>
                    <p className="text-xl md:text-3xl font-medium text-purple-200 text-glow-purple leading-relaxed">
                      ਅੱਜ ਦਾ ਦਿਨ ਮੇਰੇ ਲਈ ਸਭ ਤੋਂ ਸਪੈਸ਼ਲ ਆ ❤️
                    </p>
                  </div>

                  {/* Central open story action button */}
                  <motion.button
                    onClick={handleOpenStory}
                    className="relative px-10 py-4.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold tracking-wider text-white shadow-[0_0_25px_rgba(244,63,94,0.5)] border border-pink-400/25 active:scale-95 transition-transform"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 35px rgba(244, 63, 94, 0.8)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Open Our Story ❤️
                  </motion.button>
                </motion.div>
              )}

              {/* STAGE 2: MEMORIES CARD DECK */}
              {cardState === 'story' && (
                <motion.div
                  key="story"
                  variants={cardFlipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex flex-col items-center"
                >
                  <div className="text-center mb-6 relative z-10">
                    <span className="px-3 py-1 text-[10px] tracking-widest uppercase rounded-full bg-pink-500/10 text-pink-400 font-semibold border border-pink-500/25 inline-block">
                      Our Memories
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent font-serif mt-2">
                      Saddi Kahani ❤️
                    </h2>
                  </div>

                  {/* Hand off slideshow navigation to completion trigger */}
                  <StoryTimeline onComplete={() => setCardState('final')} />
                </motion.div>
              )}

              {/* STAGE 3: FINAL CELEBRATION CARD */}
              {cardState === 'final' && (
                <motion.div
                  key="final"
                  variants={cardFlipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full rounded-3xl glass-card border border-white/10 shadow-2xl p-8 md:p-12 text-center flex flex-col items-center relative overflow-hidden"
                  style={{
                    boxShadow: '0 20px 60px -15px rgba(168, 85, 247, 0.25), 0 0 2px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Decorative stars inside card */}
                  <div className="absolute top-6 left-6 text-pink-500/20"><Star className="w-6 h-6 fill-current animate-pulse" /></div>
                  <div className="absolute bottom-6 right-6 text-purple-500/20"><Heart className="w-6 h-6 fill-current" /></div>

                  {/* Letter Typewriter */}
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-lg md:text-2xl font-semibold text-rose-200 text-glow-pink font-serif leading-relaxed">
                      {typedText}
                      <span className="animate-ping ml-1 font-bold text-pink-400">|</span>
                    </p>
                  </div>

                  {/* Letter Subtitle */}
                  {startTypewriter && typedText.length >= fullTypeText.length && (
                    <motion.p
                      className="text-xl md:text-3xl text-purple-200 font-bold mb-8 text-glow-purple leading-relaxed"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      "ਸ਼ਾਇਦ ਤੂੰ ਮੇਰੇ ਚੰਗੇ ਕਰਮਾਂ ਦਾ result ਆ ❤️"
                    </motion.p>
                  )}

                  {/* Breathtaking happy birthday cinematic text */}
                  {startTypewriter && typedText.length >= fullTypeText.length && (
                    <motion.h2
                      className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest mb-10 bg-gradient-to-r from-pink-400 via-rose-200 to-purple-400 bg-clip-text text-transparent font-serif"
                      style={{
                        filter: 'drop-shadow(0 0 15px rgba(244,63,94,0.45))'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      HAPPY BIRTHDAY MY LOVE ❤️
                    </motion.h2>
                  )}

                  {/* Final big celebratory button */}
                  <motion.button
                    onClick={handleForeverClick}
                    className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold tracking-widest shadow-[0_0_25px_rgba(244,63,94,0.5)] border border-pink-400/20 active:scale-95 transition-transform flex items-center space-x-2 select-none"
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: '0 0 40px rgba(244, 63, 94, 0.8)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>Forever Together ❤️</span>
                    <Heart className="w-5 h-5 text-rose-200 fill-current animate-pulse" />
                  </motion.button>

                  {/* Reveal the Day My Happiness Was Born */}
                  <AnimatePresence>
                    {foreverTogether && (
                      <motion.div
                        className="mt-10 space-y-3 pt-6 border-t border-white/10 w-full"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <motion.p
                          className="text-pink-300 text-xl md:text-3xl font-extrabold tracking-widest text-glow-pink font-mono"
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          04/04/2009
                        </motion.p>
                        <p className="text-lg md:text-2xl font-bold tracking-wide text-rose-100 text-glow-pink font-serif">
                          "The Day My Happiness Was Born ❤️"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Premium card brand footer overlay */}
          <footer className="absolute bottom-4 left-0 right-0 text-center text-[10px] tracking-widest uppercase text-slate-600/70 select-none pointer-events-none">
            Made with love, forever and always ❤️
          </footer>
        </div>
      )}
    </>
  );
}
