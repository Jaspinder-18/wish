import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const AUDIO_FALLBACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

export default function MusicPlayer({ autoStart = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Set up audio ref when component mounts
  useEffect(() => {
    // Check if local file exists, otherwise stream from stable fallback
    const audio = new Audio('/love_theme.mp3');
    audio.loop = true;
    audioRef.current = audio;

    // Handle source error (fallback to streaming if local file isn't present)
    audio.addEventListener('error', () => {
      audio.src = AUDIO_FALLBACK;
    });

    if (autoStart) {
      // Browser autoplay policies might block this until user interacts
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
    };
  }, [autoStart]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback blocked:", err));
    }
  };

  return (
    <div className="fixed top-6 right-6 z-40">
      <motion.button
        onClick={togglePlay}
        className="relative flex items-center justify-center p-3 rounded-full glass-card glass-card-hover border border-white/10 shadow-lg text-rose-300 hover:text-rose-100 focus:outline-none select-none active:scale-95"
        style={{
          boxShadow: isPlaying ? '0 0 15px rgba(244, 63, 94, 0.4)' : 'none',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing surrounding wave when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-rose-500/20 blur-md animate-ping pointer-events-none" />
        )}

        <div className="flex items-center space-x-2 relative z-10">
          {/* Beating/Spinning Icon */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="flex items-center justify-center"
          >
            <Music className="w-5 h-5 filter drop-shadow-[0_0_2px_rgba(244,63,94,0.5)]" />
          </motion.div>

          {/* Simple waveform visualizer bars */}
          <div className="flex items-end space-x-0.5 h-3 overflow-hidden px-1">
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                className="w-[2px] bg-rose-400 rounded-full"
                animate={
                  isPlaying
                    ? { height: [4, 12, 4] }
                    : { height: 4 }
                }
                transition={{
                  duration: 0.6 + bar * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Toggle Audio Icon */}
          {isPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
