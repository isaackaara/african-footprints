import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const AlternatingSection = ({
  title,
  subtitle,
  paragraphs,
  imageLabel = 'Image',
  imageSrc = '/images/farm-aerial.png',
  reversed = false,
  children,
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <div
      ref={sectionRef}
      className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20"
    >
      {/* Image */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        className={reversed ? 'md:order-2' : ''}
      >
        <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          <img
            src={imageSrc}
            alt={imageLabel}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className={reversed ? 'md:order-1' : ''}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading title={title} subtitle={subtitle} align="left" />
        </motion.div>

        {paragraphs.map((text, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            className={`font-body text-base leading-relaxed text-secondary/80 ${
              i > 0 ? 'mt-4' : ''
            }`}
          >
            {text}
          </motion.p>
        ))}

        {children && (
          <motion.div variants={fadeUp} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const About = () => {
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { amount: 0.2, once: true });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src="/images/farm-aerial.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-charcoal/60 to-secondary/70" />

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 text-center"
        >
          <motion.p
            variants={heroFadeUp}
            className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-white/60"
          >
            African Footprints &middot; Since 1997
          </motion.p>
          <motion.h1
            variants={heroFadeUp}
            className="font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl"
          >
            OUR STORY
          </motion.h1>
          <motion.p
            variants={heroFadeUp}
            className="mx-auto mt-4 max-w-xl font-body text-lg text-white/70"
          >
            A quarter century of Kenyan hospitality
          </motion.p>
        </motion.div>
      </section>

      {/* The Beginning */}
      <section className="bg-background px-6 py-24">
        <AlternatingSection
          title="The Beginning"
          subtitle="A family dream in the Kenyan highlands"
          imageLabel="Farm Origins"
          imageSrc="/images/farmhouse-exterior.png"
          paragraphs={[
            'In 1997, a bold family vision took root on a stretch of fertile highland between the snow-capped peaks of Mount Kenya and the misty ridges of the Aberdare ranges. Sandai Farm was born from a deep love of the East African landscape, a desire to create a place where travellers could experience Kenya not as tourists, but as welcomed guests in a genuine family home.',
            'What began as a working farm near Nyeri has grown into one of Kenya\u2019s most cherished accommodation destinations. Over the years, Sandai has welcomed wildlife enthusiasts, Kenya safari adventurers, and those simply seeking a peaceful retreat in the heart of the highlands. The farmhouse, cottages, and rondavels have been thoughtfully developed while preserving the soul of the original homestead.',
            'Today, Sandai Farm stands as a private conservancy where Rothschild giraffes roam the gardens, zebras graze at the boundary fence, and over 300 bird species fill the air with song. It is a place where the line between home and wilderness gently blurs, offering an experience unlike any other Nyeri accommodation.',
          ]}
        />
      </section>

      {/* Our Philosophy */}
      <section className="bg-cream px-6 py-24">
        <AlternatingSection
          title="Our Philosophy"
          subtitle="Holistic living in harmony with the land"
          imageLabel="Nature & Wellness"
          imageSrc="/images/mt-kenya-sunrise.png"
          reversed
          paragraphs={[
            'At Sandai Farm, we believe that true hospitality begins with a connection to the earth. Our philosophy is rooted in holistic living, where the rhythms of nature set the pace of each day. From the organic herbs in our kitchen garden to the solar energy that powers our homestead, sustainability is woven into everything we do.',
            'We invite our guests to slow down, breathe deeply, and reconnect with the natural world. Whether you are watching the sunrise paint Mount Kenya in gold, sharing a meal prepared from freshly harvested ingredients, or walking the farm trails alongside wildlife, every moment at Sandai is designed to restore balance and nourish the spirit.',
            'Our approach extends beyond the guest experience. We are committed to nurturing the ecosystem that surrounds us, supporting the local community that sustains us, and creating a model of responsible tourism that proves luxury and sustainability can walk hand in hand across the African landscape.',
          ]}
        />
      </section>

      {/* Meet the Team */}
      <section ref={teamRef} className="bg-background px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Meet the Team"
            subtitle="The heart and soul behind Sandai Farm"
          />

          <motion.div
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            className="mt-4 grid gap-10 md:grid-cols-3"
          >
            {/* Petra */}
            <motion.div variants={fadeUp} className="text-center">
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-muted">
                <img src="/images/farm-cuisine.png" alt="Petra" className="h-full w-full object-cover" />
              </div>
              <h3 className="font-heading text-2xl text-secondary">Petra</h3>
              <p className="mt-1 font-body text-sm italic text-primary">
                Founder & Host
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-secondary/70">
                Petra founded Sandai Farm with a vision of sharing the beauty of
                the Kenyan highlands with the world. Her warmth and dedication
                have made African Footprints a beloved destination for
                travellers from every corner of the globe.
              </p>
            </motion.div>

            {/* Tessa */}
            <motion.div variants={fadeUp} className="text-center">
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-muted">
                <img src="/images/veranda-sunset.png" alt="Tessa" className="h-full w-full object-cover" />
              </div>
              <h3 className="font-heading text-2xl text-secondary">Tessa</h3>
              <p className="mt-1 font-body text-sm italic text-primary">
                Manager & Host
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-secondary/70">
                Tessa brings fresh energy and creative vision to Sandai Farm,
                ensuring every guest experience is seamless and memorable. From
                Kenya safari coordination to the smallest details of
                hospitality, Tessa is the driving force behind the farm's
                continued excellence.
              </p>
            </motion.div>

            {/* Our Kenyan Family */}
            <motion.div variants={fadeUp} className="text-center">
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-muted">
                <img src="/images/family-horse-riding.png" alt="Our Kenyan Family" className="h-full w-full object-cover" />
              </div>
              <h3 className="font-heading text-2xl text-secondary">
                Our Kenyan Family
              </h3>
              <p className="mt-1 font-body text-sm italic text-primary">
                The Heart of Sandai
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-secondary/70">
                Our dedicated team of local staff members are not just
                colleagues; they are family. From our talented chefs who create
                unforgettable meals to our guides who know every trail and bird
                call, their passion and pride in Sandai Farm is what makes every
                visit truly special.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Projects */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <SectionHeading
              title="Our Community"
              subtitle="Giving back to the land and people that sustain us"
            />

            <p className="font-body text-base leading-relaxed text-secondary/80">
              Sandai Farm has always been deeply woven into the fabric of the
              local community near Nyeri. We support local schools, provide
              training and employment opportunities, and work alongside
              conservation initiatives to protect the wildlife and natural
              habitats of the Mount Kenya and Aberdare region. Our guests often
              tell us that witnessing this community spirit is one of the most
              moving aspects of their stay.
            </p>

            <p className="mt-4 font-body text-base leading-relaxed text-secondary/80">
              From educational programmes for young people to partnerships with
              local farmers and artisans, we believe that responsible tourism
              should leave a lasting, positive footprint. Every booking at
              African Footprints directly contributes to these community efforts,
              ensuring that your Kenya safari experience benefits not just you,
              but the people and places you visit.
            </p>

            <div className="mt-10">
              <Button href="/contact" variant="outline" size="md">
                Learn More About Our Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
