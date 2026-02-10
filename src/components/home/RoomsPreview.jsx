import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const rooms = [
  {
    id: 1,
    name: 'Room 1\u20134',
    capacity: 'Sleeps 2',
    description: 'Cozy ensuite rooms with garden views and Mount Kenya sunrises.',
    image: '/images/room-interior.png',
    link: '/rooms#ensuite',
  },
  {
    id: 2,
    name: 'Chui Cottage',
    capacity: 'Sleeps 4',
    description:
      'A charming family cottage tucked among indigenous trees, perfect for a private Kenya retreat.',
    image: '/images/veranda-sunset.png',
    link: '/rooms#chui',
  },
  {
    id: 3,
    name: 'Punda Milia House',
    capacity: 'Sleeps 6',
    description:
      'Our largest home, ideal for groups seeking space, comfort, and sweeping highland views.',
    image: '/images/farm-aerial.png',
    link: '/rooms#punda-milia',
  },
  {
    id: 4,
    name: 'Rondavels',
    capacity: 'Sleeps 2',
    description:
      'Charming round huts inspired by traditional African design, offering rustic elegance and tranquillity.',
    image: '/images/rondavel-exterior.png',
    link: '/rooms#rondavels',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const RoomsPreview = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });

  return (
    <section ref={sectionRef} className="bg-background-warm px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Rest, Recharge, Reconnect"
          subtitle="Handcrafted cottages with views of Mount Kenya"
        />

        {/* Mobile: horizontal scroll. Desktop: 2x2 grid */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0 lg:gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0"
            >
              <Link to={room.link} className="group block">
                {/* Image placeholder */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Room info */}
                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-xl text-secondary">
                      {room.name}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-3 py-0.5 font-body text-xs font-medium text-primary">
                      {room.capacity}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-secondary/70">
                    {room.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button href="/rooms" variant="primary" size="lg">
            View All Rooms
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomsPreview;
