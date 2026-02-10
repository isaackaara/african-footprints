import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';

const CardContent = ({ image, title, subtitle, children, className = '' }) => {
  const { ref, controls, variants } = useScrollReveal({ yOffset: 30 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {image && (
        <div className="overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title || ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        {title && (
          <h3 className="font-heading text-xl text-secondary mb-1">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-accent text-sm italic mb-3">{subtitle}</p>
        )}
        {children && <div className="text-secondary/80 text-sm leading-relaxed">{children}</div>}
      </div>
    </motion.div>
  );
};

const Card = ({ href, ...props }) => {
  if (href) {
    return (
      <Link to={href} className="block">
        <CardContent {...props} />
      </Link>
    );
  }

  return <CardContent {...props} />;
};

export default Card;
