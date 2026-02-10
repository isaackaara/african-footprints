import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiCoffee } from 'react-icons/fi';
import { rooms } from '../data/rooms';
import Button from '../components/ui/Button';

const roomImages = {
  'room-1': '/images/farmhouse-bedroom.png',
  'room-2': '/images/veranda-sunset.png',
  'room-3': '/images/room-interior.png',
  'room-4': '/images/farmhouse-exterior.png',
  'chui-cottage': '/images/cottage-exterior.png',
  'makena-cottage': '/images/farm-aerial.png',
  'rondavel-tembo': '/images/rondavel-exterior.png',
  'rondavel-twiga': '/images/rondavel-exterior.png',
  'punda-milia-house': '/images/punda-milia-exterior.png',
};

const heroVariants = {
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

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const RoomSection = ({ room, index }) => {
  const isEven = index % 2 === 1;
  const imageVariants = isEven ? slideFromRight : slideFromLeft;
  const contentVariants = isEven ? slideFromLeft : slideFromRight;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col ${
            isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } gap-10 lg:gap-16 items-center`}
        >
          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden relative group">
              <img
                src={roomImages[room.id] || '/images/room-interior.png'}
                alt={room.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Self-catering badge */}
              {room.selfCatering && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                  <FiCoffee className="w-3.5 h-3.5" />
                  Self Catering
                </div>
              )}

              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-all duration-500" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-secondary">
              {room.name}
            </h2>

            {/* Gold divider */}
            <div className="mt-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-primary" />
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="block h-px w-8 bg-primary" />
            </div>

            {room.tagline && (
              <p className="mt-3 text-accent italic text-lg">{room.tagline}</p>
            )}

            <p className="mt-5 text-secondary/75 leading-relaxed">
              {room.description}
            </p>

            {/* Capacity */}
            <div className="mt-6 flex items-center gap-3 text-secondary/80">
              <FiUsers className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium">
                Sleeps {room.capacity} guests &middot; {room.beds}
              </span>
            </div>

            {/* Amenities */}
            <div className="mt-5 flex flex-wrap gap-2">
              {room.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-background-warm text-secondary/80 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  <FiCheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                  {amenity}
                </span>
              ))}
            </div>

            {/* Self-catering badge on content side */}
            {room.selfCatering && (
              <div className="mt-5 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-semibold">
                <FiCoffee className="w-4 h-4" />
                Self Catering Available
              </div>
            )}

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/rates" variant="primary" size="md">
                Check Rates
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Make an Enquiry
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Rooms = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <img src="/images/room-interior.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-charcoal/70" />

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-white/60"
          >
            African Footprints
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-white tracking-wide"
          >
            ROOMS & COTTAGES
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-5 flex items-center gap-3">
            <span className="block h-px w-10 bg-primary" />
            <span className="block h-2 w-2 rounded-full bg-primary" />
            <span className="block h-px w-10 bg-primary" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-body text-lg text-white/80 italic"
          >
            Handcrafted spaces where comfort meets the African wilderness
          </motion.p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-secondary/75 text-lg leading-relaxed">
            Sandai Farm offers a diverse collection of accommodation nestled
            between the peaks of Mount Kenya and the forested slopes of the
            Aberdare Range. From the warmth of the original farmhouse rooms with
            full-board hospitality to spacious self-catering cottages perfect for
            families, every space has been thoughtfully designed to balance
            highland comfort with the authentic character of a working Kenyan
            farm. Whether you are here for a Kenya safari adventure, horseback
            riding, or simply the peace of the highlands, you will find a room
            that feels like home.
          </p>
        </motion.div>
      </section>

      {/* Room Sections */}
      <div className="divide-y divide-muted/20">
        {rooms.map((room, index) => (
          <RoomSection key={room.id} room={room} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="bg-secondary py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto text-center px-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            Not Sure Which Room Is Right for You?
          </h2>

          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block h-px w-8 bg-primary" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-8 bg-primary" />
          </div>

          <p className="text-muted-light text-lg leading-relaxed mb-4">
            Whether you need a romantic retreat for two, a family cottage with
            space to spread out, or the grandest house on the farm for a group
            celebration, we are happy to help you choose the perfect fit.
          </p>

          <p className="text-muted italic mb-8">
            Drop us a line and we will match you with the ideal accommodation
            for your Mount Kenya escape.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href="/rates" variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-secondary">
              View All Rates
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Rooms;
