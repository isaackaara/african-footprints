import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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

const categories = [
  { id: 'all', label: 'All' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'farm-life', label: 'Farm Life' },
  { id: 'safaris', label: 'Safaris' },
  { id: 'landscapes', label: 'Landscapes' },
];

const heights = ['h-64', 'h-80', 'h-96'];

const galleryItems = [
  { id: 1, category: 'wildlife', alt: 'Rothschild giraffe browsing acacia trees on Sandai Farm with Mount Kenya in the background', height: 'h-96', image: '/images/giraffes-sunset.png' },
  { id: 2, category: 'rooms', alt: 'Cosy farmhouse bedroom with log fireplace and views of the Aberdare foothills', height: 'h-64', image: '/images/farmhouse-bedroom.png' },
  { id: 3, category: 'safaris', alt: 'Horseback riding safari alongside zebras across the Sandai Farm highlands', height: 'h-80', image: '/images/horseback-safari.png' },
  { id: 4, category: 'landscapes', alt: 'Sunrise over Mount Kenya viewed from the hilltop of Sandai Farm', height: 'h-96', image: '/images/mt-kenya-sunrise.png' },
  { id: 5, category: 'farm-life', alt: 'Farm dogs relaxing on the veranda at Sandai Farm', height: 'h-64', image: '/images/veranda-sunset.png' },
  { id: 6, category: 'wildlife', alt: 'Burchell zebra herd grazing on the open grasslands of Sandai Farm', height: 'h-80', image: '/images/zebra-portrait.png' },
  { id: 7, category: 'rooms', alt: 'Chui Cottage veranda with morning tea overlooking the garden', height: 'h-80', image: '/images/cottage-exterior.png' },
  { id: 8, category: 'landscapes', alt: 'Dramatic cloud formations over the Aberdare Range at golden hour', height: 'h-64', image: '/images/aberdare-waterfall.png' },
  { id: 9, category: 'safaris', alt: 'Black rhino sighting at Solio Ranch Conservancy near Sandai Farm', height: 'h-96', image: '/images/solio-rhino.png' },
  { id: 10, category: 'farm-life', alt: 'Archery session on the lawns of Sandai Farm with children and adults', height: 'h-80', image: '/images/family-horse-riding.png' },
  { id: 11, category: 'wildlife', alt: 'Hartlaub turaco perched in the canopy of the indigenous forest', height: 'h-64', image: '/images/elephant-portrait.png' },
  { id: 12, category: 'landscapes', alt: 'Misty morning across the rolling highlands between Mount Kenya and the Aberdare', height: 'h-96', image: '/images/samburu-landscape.png' },
];

const GalleryImage = ({ item, onClick }) => {
  return (
    <motion.div
      layout
      layoutId={`gallery-${item.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onClick(item)}
      className={`relative ${item.height} bg-muted rounded-xl overflow-hidden cursor-pointer group mb-4 break-inside-avoid`}
    >
      <img
        src={item.image}
        alt={item.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/50 transition-all duration-300 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <FiEye className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Alt text label on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs leading-relaxed">{item.alt}</p>
      </div>
    </motion.div>
  );
};

const Lightbox = ({ item, items, onClose, onPrev, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-secondary/95 backdrop-blur-md" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <FiX className="w-8 h-8" />
        </button>

        {/* Image area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            layoutId={`gallery-${item.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="aspect-[16/10] bg-muted rounded-xl overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <p className="text-white/80 text-sm text-center mt-4 italic">
          {item.alt}
        </p>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const handlePrev = useCallback(() => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem.id
    );
    const prevIndex =
      currentIndex <= 0 ? filteredItems.length - 1 : currentIndex - 1;
    setSelectedItem(filteredItems[prevIndex]);
  }, [selectedItem, filteredItems]);

  const handleNext = useCallback(() => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem.id
    );
    const nextIndex =
      currentIndex >= filteredItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedItem(filteredItems[nextIndex]);
  }, [selectedItem, filteredItems]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <img src="/images/zebra-portrait.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            GALLERY
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
            Moments captured across Sandai Farm and beyond
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-muted/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeFilter === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent border border-muted text-secondary/70 hover:border-primary hover:text-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-secondary/60 text-sm mb-8"
        >
          {filteredItems.length} {filteredItems.length === 1 ? 'photo' : 'photos'}
          {activeFilter !== 'all' && ` in ${categories.find((c) => c.id === activeFilter)?.label}`}
        </motion.p>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {filteredItems.map((item) => (
              <GalleryImage
                key={item.id}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-secondary/50 text-lg">
              No photos found in this category yet.
            </p>
          </motion.div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-background-warm py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto text-center px-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
            Experience Sandai for Yourself
          </h2>

          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block h-px w-8 bg-primary" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-8 bg-primary" />
          </div>

          <p className="text-secondary/70 text-lg leading-relaxed mb-8">
            These moments are waiting for you. From wildlife encounters on the
            farm to breathtaking Kenya safari adventures, every day at Sandai
            Farm brings a new story worth capturing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-primary-dark"
            >
              Plan Your Visit
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            items={filteredItems}
            onClose={() => setSelectedItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
