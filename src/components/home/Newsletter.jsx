import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Newsletter = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Decorative only; no backend connected yet
    setEmail('');
  };

  return (
    <section ref={sectionRef} className="bg-primary px-6 py-20">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-heading text-3xl text-white md:text-4xl"
        >
          Stay Connected
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-white/80"
        >
          Sign up for our newsletter and be the first to hear about seasonal
          offers, safari stories, and farm updates from Sandai Farm.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            className="w-full max-w-sm rounded bg-white/20 px-5 py-3 font-body text-sm text-white placeholder-white/60 outline-none ring-1 ring-white/30 transition-all duration-300 focus:bg-white/25 focus:ring-white/60 sm:w-auto sm:flex-1"
          />
          <button
            type="submit"
            className="cursor-pointer rounded bg-secondary px-7 py-3 font-body text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-charcoal"
          >
            Subscribe
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
