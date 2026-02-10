import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { testimonials, testimonialsMeta } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="What Our Guests Say"
          subtitle={`Rated ${testimonialsMeta.overallRating}/5 on ${testimonialsMeta.platform} \u00B7 ${testimonialsMeta.ranking}`}
        />

        {/* Testimonial display */}
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center text-center"
            >
              {/* Star rating */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < testimonial.rating
                        ? 'h-5 w-5 text-primary'
                        : 'h-5 w-5 text-muted'
                    }
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-2xl italic leading-relaxed text-secondary md:text-3xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Reviewer info */}
              <div className="mt-8">
                <p className="font-body text-base font-semibold text-secondary">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-body text-sm text-accent">
                  {testimonial.location}
                </p>
                <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-medium text-primary">
                  {testimonial.source}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                index === current ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* TripAdvisor badge */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-muted bg-white px-5 py-2">
            <FaStar className="h-4 w-4 text-primary" />
            <span className="font-body text-sm font-medium text-secondary">
              {testimonialsMeta.overallRating} &middot; {testimonialsMeta.totalReviews} Reviews on{' '}
              {testimonialsMeta.platform}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
