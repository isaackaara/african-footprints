import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const NotFound = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-heading text-9xl font-bold text-primary/20 md:text-[12rem]"
        >
          404
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          className="-mt-6 font-heading text-3xl text-secondary md:-mt-10 md:text-4xl"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-secondary/70"
        >
          The trail seems to have gone cold. Let us guide you back.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8">
          <Button href="/" variant="primary" size="lg">
            Return Home
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NotFound;
