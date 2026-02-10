import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section ref={sectionRef} className="bg-background px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">
        {/* Left column: Image placeholder */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <img
            src="/images/farm-aerial.png"
            alt="Aerial view of Sandai Farm nestled in the Kenyan highlands"
            className="aspect-[3/4] w-full rounded-lg object-cover"
          />
        </motion.div>

        {/* Right column: Text content */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              title="Sandai Farm"
              subtitle="Established 1997"
              align="left"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-body text-base leading-relaxed text-secondary/80"
          >
            Tucked into the lush highlands between Mount Kenya and the Aberdare
            ranges, Sandai Farm is a family retreat born from a deep love of
            the land. Since 1997, our doors have been open to travellers
            seeking more than a place to stay. Here, you will find a sanctuary
            where holistic living, warm Kenyan hospitality, and the rhythms of
            nature come together to restore the spirit.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 font-body text-base leading-relaxed text-secondary/80"
          >
            Every meal at Sandai Farm is a celebration of local ingredients
            harvested from our gardens and neighbouring farms. From
            freshly picked herbs to slow-roasted meats prepared over an
            open flame, the food here is crafted with care and served with
            heart. Our guests often say it is the best they have ever tasted
            in Kenya.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 font-body text-base leading-relaxed text-secondary/80"
          >
            Whether you are embarking on a Kenya safari through Solio Ranch,
            riding horseback alongside wildlife, or simply unwinding beside
            our fireplace with a cup of Kenyan coffee, Sandai Farm invites
            you to slow down, reconnect with nature, and rediscover what
            truly matters.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <Button href="/about" variant="outline" size="md">
              Discover Our Story
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
