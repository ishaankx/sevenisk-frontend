// src/components/ParticlesBackground.tsx

'use client';

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // This is the lightweight engine
import type { Engine } from 'tsparticles-engine';
import { IOptions, RecursivePartial } from 'tsparticles-engine';

const ParticlesBackground: React.FC = () => {
  // This memoized function loads the 'tsparticles' engine
  const particlesInit = useCallback(async (engine: Engine) => {
    // loads the 'slim' engine, which has the necessary features
    await loadSlim(engine);
  }, []);

  // This is the config JSON for the particles
  const particlesOptions: RecursivePartial<IOptions> = {
    background: {
      color: {
        value: 'transparent', // Make the canvas background transparent
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push', // As requested
        },
        onHover: {
          enable: true,
          mode: 'grab', // As requested
        },
      },
      modes: {
        push: {
          quantity: 4, // Number of particles to push on click
        },
        grab: {
          distance: 150, // Grab distance
          links: {
            opacity: 1,
            color: '#00FFF0', // Your neon teal
          },
        },
      },
    },
    particles: {
      color: {
        value: '#00FFF0', // Your neon teal for the dots
      },
      links: {
        color: '#00FFF0', // Your neon teal for the lines
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2, // Adjust speed as needed
        direction: 'none',
        outModes: 'out',
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Number of particles
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 }, // Small, subtle dots
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};

export default ParticlesBackground;