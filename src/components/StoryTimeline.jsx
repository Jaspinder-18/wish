import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Award, Smile, Coffee, MapPin, Hourglass, Compass, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const storyItems = [
  {
    text: "ਜਦੋਂ ਪਹਿਲੀ ਵਾਰ ਤੈਨੂੰ ਕਾਲਜ ਚ ਵੇਖਿਆ ❤️",
    subtext: "First Sight",
    icon: Compass,
    color: "from-pink-500 to-rose-500",
    glowColor: "rgba(244, 63, 94, 0.25)",
    image: "/college_first_sight.png"
  },
  {
    text: "ਤੂੰ ਆਪਣੀ ਸਿਸਟਰ ਨਾਲ ਆਈ ਸੀ...",
    subtext: "The Entrance",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    text: "ਤੇ ਕਿਸੇ ਨੇ ਕਿਹਾ — ‘ਸਾਡੀ ਕੁੜੀ ਨੂੰ ਵੇਖ ਰਿਹਾ?’ 😄",
    subtext: "The Confrontation",
    icon: Award,
    color: "from-rose-500 to-orange-500",
    glowColor: "rgba(244, 63, 94, 0.15)",
    isFunny: true,
  },
  {
    text: "ਹੰਮ ਵੇਖਣ ਨੂੰ ਬੜੀ ਫੁੱਲ ਲੱਗੇ ਆ 😄",
    subtext: "Funny Moment",
    icon: Smile,
    color: "from-yellow-500 to-pink-500",
    glowColor: "rgba(234, 179, 8, 0.2)",
    isFunny: true,
    highlight: true,
  },
  {
    text: "ਮੈਂ BCA ਕਰਦਾ ਸੀ...",
    subtext: "College Days",
    icon: Coffee,
    color: "from-blue-500 to-purple-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    text: "ਤੂੰ ਸਕੂਲ ਚ ਸੀ...",
    subtext: "School Days",
    icon: Hourglass,
    color: "from-cyan-500 to-rose-500",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    text: "ਹੌਲੀ ਹੌਲੀ ਕਰਸ਼ ਹੋ ਗਿਆ ❤️",
    subtext: "The Crush",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    glowColor: "rgba(244, 63, 94, 0.25)",
    pulse: true,
  },
  {
    text: "ਇੰਸਟਾ ਸਟੋਰੀਆਂ ਤੋਂ feelings ਸ਼ੁਰੂ ਹੋਈਆਂ...",
    subtext: "Instagram Spark",
    icon: Compass,
    color: "from-purple-600 to-rose-500",
    glowColor: "rgba(147, 51, 234, 0.15)",
  },
  {
    text: "ਤੇਰੀ ਸਿਸਟਰ ਰਾਹੀਂ ਗੱਲ ਹੋਈ...",
    subtext: "The Connection",
    icon: Calendar,
    color: "from-indigo-500 to-pink-500",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    text: "ਪਹਿਲੀ call ਅੱਜ ਵੀ ਯਾਦ ਆ ❤️",
    subtext: "The First Call",
    icon: Coffee,
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.2)",
    pulse: true,
  },
  {
    text: "Outlet ਵਾਲੀ first meeting...",
    subtext: "First Date",
    icon: MapPin,
    color: "from-pink-500 to-purple-500",
    glowColor: "rgba(244, 63, 94, 0.25)",
    image: "/outlet_first_date.png"
  },
  {
    text: "ਪੈਸੇ ਘੱਟ ਸੀ, ਪਰ ਤੇਰਾ ਸਾਥ ਪੂਰਾ ਸੀ ❤️",
    subtext: "True Love",
    icon: Heart,
    color: "from-rose-600 to-pink-500",
    glowColor: "rgba(225, 29, 72, 0.25)",
    pulse: true,
  },
  {
    text: "ਅੰਮ੍ਰਿਤਸਰ ਵਾਲੀ first kiss ❤️",
    subtext: "Magical Moment",
    icon: MapPin,
    color: "from-purple-500 to-rose-500",
    glowColor: "rgba(168, 85, 247, 0.25)",
    pulse: true,
    image: "/amritsar_first_kiss.png"
  },
  {
    text: "1.5 ਸਾਲ wait ਕੀਤਾ ਸਿਰਫ ਤੇਰੇ ਲਈ...",
    subtext: "The Wait",
    icon: Hourglass,
    color: "from-indigo-500 to-purple-600",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    text: "ਤੂੰ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਉਹ ਹਿੱਸਾ ਆ\nਜਿਸਨੂੰ ਰੱਬ ਨੇ ਮੇਰੇ ਲਈ ਲਿਖਿਆ ❤️",
    subtext: "Our Destiny",
    icon: Heart,
    color: "from-pink-500 via-rose-500 to-purple-600",
    glowColor: "rgba(244, 63, 94, 0.35)",
    pulse: true,
    isQuote: true,
  },
  {
    text: "ਹੁਣ ਸਾਡੇ relation ਨੂੰ 2 years ਹੋਣ ਵਾਲੇ ਨੇ ❤️",
    subtext: "Two Beautiful Years",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    glowColor: "rgba(244, 63, 94, 0.3)",
    pulse: true,
    isEnd: true,
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
    rotateY: direction > 0 ? 30 : -30,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 120, damping: 18 },
      opacity: { duration: 0.4 },
      rotateY: { duration: 0.4 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 250 : -250,
    opacity: 0,
    rotateY: direction < 0 ? 30 : -30,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  })
};

export default function StoryTimeline({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentIndex < storyItems.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const activeItem = storyItems[currentIndex];
  const Icon = activeItem.icon;

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8 select-none flex flex-col items-center">
      
      {/* 1. Header Progress Tracker */}
      <div className="w-full flex items-center justify-between mb-8 px-4 max-w-lg">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold">
          Memory {currentIndex + 1} of {storyItems.length}
        </span>
        
        {/* Pulsing hearts progress nodes */}
        <div className="flex space-x-1 items-center">
          {storyItems.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? 'w-6 bg-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' 
                  : i < currentIndex 
                  ? 'w-1.5 bg-pink-500/50' 
                  : 'w-1.5 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Interactive Card Deck */}
      <div className="relative w-full min-h-[460px] md:min-h-[400px] flex items-center justify-center overflow-visible" style={{ perspective: '1200px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`w-full max-w-2xl rounded-3xl glass-card border p-6 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl ${
              activeItem.isQuote 
                ? 'border-pink-500/40 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-purple-500/5' 
                : activeItem.highlight 
                ? 'border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 via-pink-500/5 to-purple-500/5' 
                : 'border-white/10'
            }`}
            style={{
              boxShadow: `0 15px 50px -10px ${activeItem.glowColor || 'rgba(255,255,255,0.03)'}, 0 0 2px 0 rgba(255,255,255,0.08)`
            }}
          >
            {/* Elegant top color band */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${activeItem.color}`} />

            {/* Glowing background highlights for quotes */}
            {activeItem.isQuote && (
              <div className="absolute inset-0 bg-pink-500/[0.02] blur-xl -z-10 animate-pulse" />
            )}

            {/* Top Row: Icon Badge & Category */}
            <div className="flex items-center justify-between mb-6 w-full">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold font-mono">
                  ✨ {activeItem.subtext}
                </span>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-slate-950/60 border border-white/10 flex items-center justify-center text-rose-400"
                animate={activeItem.pulse ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Middle Row: Split Content or Text Card */}
            <div className="flex-1 flex flex-col justify-center my-4 w-full">
              {activeItem.image ? (
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-6 md:space-y-0">
                  {/* Left side text */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold leading-relaxed text-slate-100 font-serif">
                      {activeItem.text}
                    </h3>
                  </div>
                  {/* Right side interactive image */}
                  <div className="w-full md:w-[240px] shrink-0">
                    <motion.div
                      className="overflow-hidden rounded-2xl border border-white/15 shadow-xl relative group aspect-video md:aspect-square"
                      whileHover={{ scale: 1.03 }}
                    >
                      <img
                        src={activeItem.image}
                        alt={activeItem.subtext}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                        <span className="text-[9px] uppercase tracking-widest text-pink-200 font-bold flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-pink-500 fill-current animate-pulse" />
                          <span>Loving memory</span>
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ) : activeItem.isQuote ? (
                /* Beautiful calligraphic central quote */
                <div className="text-center py-6">
                  <blockquote className="text-2xl md:text-3xl font-bold leading-relaxed text-rose-100 text-glow-pink font-serif whitespace-pre-line">
                    "{activeItem.text}"
                  </blockquote>
                </div>
              ) : (
                /* Text only milestone */
                <div className="py-2">
                  <h3 className={`text-xl md:text-2xl font-semibold leading-relaxed font-serif ${
                    activeItem.isFunny ? 'text-yellow-100/90' : 'text-slate-100'
                  }`}>
                    {activeItem.text}
                  </h3>
                </div>
              )}
            </div>

            {/* Bottom Row Accent */}
            <div className="mt-6 flex justify-end w-full">
              {activeItem.isFunny && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center space-x-1">
                  <Smile className="w-3.5 h-3.5" />
                  <span>Funny story!</span>
                </span>
              )}
              {activeItem.isEnd && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30 flex items-center space-x-1 animate-pulse">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Two Years</span>
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Navigation Controls */}
      <div className="flex items-center space-x-4 mt-10">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all select-none ${
            currentIndex === 0 
              ? 'border-slate-800 text-slate-600 cursor-not-allowed opacity-40' 
              : 'border-white/10 text-slate-300 hover:text-slate-100 hover:bg-white/5 active:scale-95'
          }`}
          whileHover={currentIndex > 0 ? { scale: 1.05 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="flex items-center space-x-1.5 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95 transition-all select-none border border-pink-400/15"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 25px rgba(244, 63, 94, 0.6)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{currentIndex === storyItems.length - 1 ? 'Open Final Message ❤️' : 'Next Memory ❤️'}</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
