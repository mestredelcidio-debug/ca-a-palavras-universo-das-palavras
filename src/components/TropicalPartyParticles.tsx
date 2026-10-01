import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export interface TropicalParticle {
  id: string;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  rotation: number;
  scale: number;
}

interface TropicalPartyParticlesProps {
  activeWord: string | null;
  particles: TropicalParticle[];
}

export const TropicalPartyParticles: React.FC<TropicalPartyParticlesProps> = ({
  activeWord,
  particles
}) => {
  useEffect(() => {
    if (activeWord) {
      // Trigger canvas-confetti with Cosmic Galaxy palette (starlight gold, nebula cyan, cosmic violet, electric magenta, diamond white)
      const cosmicColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#eab308', '#38bdf8', '#c084fc', '#ffffff', '#fbbf24'];

      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.55 },
        colors: cosmicColors,
        shapes: ['circle', 'square'],
        ticks: 200,
        gravity: 1.0,
        scalar: 1.15
      });

      // Side stellar bursts for cosmic galaxy feel
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.65 },
          colors: cosmicColors
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.65 },
          colors: cosmicColors
        });
      }, 120);
    }
  }, [activeWord]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Floating Tropical Emojis Particles Bursting Outward */}
      <AnimatePresence>
        {particles.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * p.distance;
          const targetY = Math.sin(rad) * p.distance - 40; // float slightly upward

          return (
            <motion.div
              key={p.id}
              initial={{
                x: p.x,
                y: p.y,
                scale: 0.2,
                opacity: 1,
                rotate: 0
              }}
              animate={{
                x: p.x + targetX,
                y: p.y + targetY,
                scale: p.scale,
                opacity: [1, 1, 0.9, 0],
                rotate: p.rotation
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute text-2xl sm:text-3xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
              style={{ left: 0, top: 0 }}
            >
              {p.emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
