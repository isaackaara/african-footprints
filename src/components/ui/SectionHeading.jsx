import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  light = false,
}) => {
  const { ref, controls, variants } = useScrollReveal({ yOffset: 30 });

  const alignmentClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const titleColor = light ? 'text-cream' : 'text-secondary';
  const subtitleColor = light ? 'text-muted-light' : 'text-accent';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`flex flex-col ${alignmentClasses} mb-12`}
    >
      <h2
        className={`font-heading text-4xl md:text-5xl tracking-wide uppercase ${titleColor}`}
      >
        {title}
      </h2>

      {/* Decorative gold divider */}
      <div className="mt-5 flex items-center gap-3">
        <span className="block h-px w-8 bg-primary" />
        <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="block h-px w-8 bg-primary" />
      </div>

      {subtitle && (
        <p className={`font-body italic mt-4 text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
