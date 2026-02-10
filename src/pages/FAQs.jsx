import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const faqData = [
  {
    question: 'How do I get to Sandai Farm?',
    answer:
      'Sandai Farm is located in Mweiga, near Nyeri, approximately three hours by road from Nairobi. The drive takes you through the stunning Kenyan highlands, passing through towns such as Thika, Karatina, and Nyeri before arriving at our gate. We can provide detailed directions once you book, and airport transfers from Nairobi or the Nanyuki airstrip can also be arranged.',
  },
  {
    question: 'What is included in full board?',
    answer:
      'Full board at Sandai Farm includes three freshly prepared meals each day: breakfast, a three-course lunch, and a three-course dinner, all crafted with farm-fresh ingredients and local Kenyan produce. Tea, coffee, and refreshments are available throughout the day. Full board is included with Rooms 1 to 4 in the farmhouse.',
  },
  {
    question: 'Is Sandai Farm family friendly?',
    answer:
      'Absolutely. Sandai Farm is a wonderful destination for families with children of all ages. Kids love exploring the farm, meeting the horses and dogs, and spotting giraffes and zebras from the garden. We offer horseback riding, nature walks, and plenty of open space for little adventurers. The cottages and Punda Milia House are especially popular with families seeking extra room.',
  },
  {
    question: 'What safari options are available?',
    answer:
      'We offer a range of Kenya safari experiences to suit every interest. On the farm itself, you can enjoy game drives, horseback safaris, and guided nature walks. Day trips to Solio Ranch, Mount Kenya National Park, Aberdare National Park, and the Ol Pejeta Conservancy are easily arranged. For a more immersive adventure, we also coordinate multi-day safari itineraries across Kenya.',
  },
  {
    question: 'Do you have WiFi?',
    answer:
      'We offer complimentary WiFi for our guests, though connectivity is limited compared to urban settings. We consider this part of the charm of staying at Sandai Farm: a chance to unplug, enjoy the natural surroundings, and reconnect with the people around you. For essential communications, the WiFi is perfectly adequate.',
  },
  {
    question: 'What should I pack?',
    answer:
      'The Kenyan highlands enjoy a temperate climate, but temperatures can vary significantly between day and night. We recommend packing layers, including a warm fleece or jacket for cooler evenings. Comfortable walking shoes, a sun hat, sunscreen, insect repellent, binoculars for wildlife spotting, and a camera are essential. If you plan to ride horses, long trousers and closed-toe shoes are advised.',
  },
  {
    question: 'Are the rooms self catering?',
    answer:
      'Sandai Farm offers both full board and self-catering options. Rooms 1 to 4 in the farmhouse are full board, meaning all meals are included. The cottages (Chui and Makena), rondavels (Tembo and Twiga), and Punda Milia House are self-catering with fully equipped kitchens. Full board can also be arranged for self-catering accommodations on request.',
  },
  {
    question: 'Can I arrange airport transfers?',
    answer:
      'Yes, we are happy to arrange airport transfers from Jomo Kenyatta International Airport in Nairobi, Wilson Airport, or the Nanyuki airstrip. Please let us know your travel details when making your booking, and we will organise comfortable, reliable transport to bring you directly to Sandai Farm.',
  },
  {
    question: 'What is the best time to visit?',
    answer:
      'Sandai Farm is a year-round destination with its own unique appeal in every season. The dry seasons from June to October and January to March are ideal for game drives and safari excursions, with clear skies and excellent wildlife viewing. The green season brings lush landscapes, fewer visitors, and spectacular birdwatching opportunities. The highland climate keeps temperatures pleasant throughout the year.',
  },
  {
    question: 'Do you cater for dietary requirements?',
    answer:
      'Yes, our kitchen is happy to accommodate dietary requirements including vegetarian, vegan, gluten-free, and other specific needs. Simply let us know when you book so that our chefs can prepare accordingly. Many of our ingredients are sourced directly from the farm and local producers, making it easy to craft fresh, tailored meals.',
  },
  {
    question: 'Can I go horseback riding at Sandai Farm?',
    answer:
      'Horseback riding is one of the signature experiences at Sandai Farm. Our gentle, well-trained horses are suitable for riders of all levels, from complete beginners to experienced equestrians. Rides across the farm offer a unique perspective on the wildlife and landscapes of the Mount Kenya and Aberdare region, and longer rides can be arranged for more adventurous guests.',
  },
  {
    question: 'Is Sandai Farm suitable for events or retreats?',
    answer:
      'Sandai Farm is an exceptional venue for small events, workshops, yoga retreats, and private gatherings. The tranquil highland setting, comfortable accommodation, and home-cooked cuisine create the perfect backdrop for meaningful get-togethers. Contact us to discuss your requirements and we will tailor an experience that suits your group perfectly.',
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ delay: index * 0.05 }}
      className="border-b border-muted"
    >
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between py-6 text-left transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <h3 className="pr-4 font-heading text-lg text-secondary md:text-xl">
          {question}
        </h3>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-muted text-accent transition-all duration-300 hover:border-primary hover:text-primary">
          {isOpen ? (
            <FiMinus className="h-4 w-4" />
          ) : (
            <FiPlus className="h-4 w-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-sm leading-relaxed text-secondary/75 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src="/images/samburu-landscape.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            Sandai Farm &middot; Nyeri, Kenya
          </motion.p>
          <motion.h1
            variants={heroFadeUp}
            className="font-heading text-4xl tracking-wide text-white md:text-5xl lg:text-6xl"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h1>
          <motion.p
            variants={heroFadeUp}
            className="mx-auto mt-4 max-w-xl font-body text-lg text-white/70"
          >
            Everything you need to know before visiting Sandai Farm
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-background px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title="Your Questions Answered"
            subtitle="From travel logistics to what to pack for your Kenya safari"
          />

          <div className="mt-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl text-secondary md:text-4xl">
            Still Have Questions?
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-secondary/70">
            Our team is always happy to help. Whether you need advice on
            planning your Mount Kenya retreat, details about Nyeri accommodation
            options, or anything else about your stay at African Footprints,
            do not hesitate to reach out.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default FAQs;
