import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMapPin, FiMail, FiNavigation } from 'react-icons/fi';
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

const LocationMap = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section ref={sectionRef} className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Find Us"
          subtitle="Nestled between Mount Kenya and the Aberdare Ranges"
        />

        <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
          {/* Left: Map placeholder */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
              <span className="font-body text-sm uppercase tracking-widest text-accent">
                Map
              </span>
            </div>
          </motion.div>

          {/* Right: Address details */}
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
            <motion.h3
              variants={fadeUp}
              className="font-heading text-xl uppercase tracking-wider text-secondary"
            >
              Sandai Farm, Mweiga, Kenya
            </motion.h3>

            <motion.div
              variants={fadeUp}
              className="mt-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <FiMail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-body text-sm font-medium text-secondary">
                    Postal Address
                  </p>
                  <p className="font-body text-sm text-secondary/70">
                    P.O. Box 1518, Nyeri 10100, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-body text-sm font-medium text-secondary">
                    GPS Coordinates
                  </p>
                  <p className="font-body text-sm text-secondary/70">
                    0&deg; 17&prime; 41.96&Prime; S, 36&deg; 57&prime; 4.74&Prime; E
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiNavigation className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-body text-sm font-medium text-secondary">
                    Getting Here
                  </p>
                  <p className="font-body text-sm text-secondary/70">
                    Located in Mweiga, approximately 150 km north of Nairobi
                    along the Nyeri to Nanyuki road
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Button href="/directions" variant="outline" size="md">
                Get Directions
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
