import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const safaris = [
  {
    id: 1,
    title: 'Solio Ranch',
    description:
      'Explore one of Kenya\'s most renowned rhino conservancies, home to both black and white rhinos roaming freely across breathtaking highland plains.',
    image: '/images/solio-rhino.png',
    link: '/safaris#solio',
  },
  {
    id: 2,
    title: 'Horseback Safaris',
    description:
      'Ride alongside giraffes, zebras, and antelope on a horseback safari through the stunning landscapes surrounding Mount Kenya and the Aberdare foothills.',
    image: '/images/horseback-safari.png',
    link: '/safaris#horseback',
  },
  {
    id: 3,
    title: 'Samburu Reserve',
    description:
      'Venture north to discover unique wildlife found nowhere else in Kenya, from reticulated giraffes to Grevy\'s zebras in this rugged, beautiful reserve.',
    image: '/images/samburu-landscape.png',
    link: '/safaris#samburu',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const SafarisPreview = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });

  return (
    <section ref={sectionRef} className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Unforgettable Safari Experiences"
          subtitle="Explore Kenya's finest wildlife and landscapes"
        />

        {/* Safari cards grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {safaris.map((safari, index) => (
            <motion.div
              key={safari.id}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="group"
            >
              <Link to={safari.link} className="block">
                {/* Image placeholder */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={safari.image}
                    alt={safari.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card content */}
                <div className="mt-5">
                  <h3 className="font-heading text-xl text-secondary">
                    {safari.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-secondary/70">
                    {safari.description}
                  </p>
                  <span className="mt-3 inline-block font-body text-sm font-semibold uppercase tracking-wider text-primary transition-colors duration-300 group-hover:text-primary-dark">
                    Learn More
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button href="/safaris" variant="primary" size="lg">
            Explore All Safaris
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SafarisPreview;
