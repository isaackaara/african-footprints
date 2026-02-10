import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const MotionLink = motion.create(Link);

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-safari.png"
          alt="Safari vehicle driving through Kenyan savanna with elephants and Mount Kenya"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/60" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mb-6 font-body text-sm uppercase tracking-[0.3em] text-white/70"
        >
          Sandai Farm &middot; Est 1997
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="font-heading text-5xl leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Your Home Away
          <br />
          From Home
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/80 md:text-xl"
        >
          A family retreat nestled between Mount Kenya and the Aberdare ranges
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MotionLink
            to="/safaris"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block cursor-pointer rounded bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-primary-dark"
          >
            Explore Safaris
          </MotionLink>

          <MotionLink
            to="/rooms"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block cursor-pointer rounded border-2 border-white px-9 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-secondary"
          >
            View Rooms
          </MotionLink>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <FiChevronDown className="h-7 w-7 text-white/60" />
      </motion.div>
    </section>
  );
};

export default Hero;
