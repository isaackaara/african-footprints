import { useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.2,
    once = true,
    yOffset = 40,
    duration = 0.7,
    delay = 0,
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return { ref, controls, variants };
};

export default useScrollReveal;
