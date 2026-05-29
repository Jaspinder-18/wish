import confetti from 'canvas-confetti';

export const triggerConfettiBurst = () => {
  // Center blast
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#fda4af', '#f43f5e', '#ec4899', '#c084fc', '#e879f9', '#ffffff'],
    scalar: 1.2
  });

  // Twinkly side sprays
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, animate a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

export const triggerHeartyRain = () => {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#fda4af', '#f43f5e']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#fda4af', '#f43f5e']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};
