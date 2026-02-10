import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const baseClasses =
  'inline-block rounded font-semibold uppercase tracking-widest text-sm transition-colors duration-300 cursor-pointer';

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  dark: 'bg-secondary text-white hover:bg-charcoal',
};

const sizeClasses = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
};

const MotionLink = motion.create(Link);

const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}) => {
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <MotionLink to={href} className={classes} {...motionProps} {...props}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
};

export default Button;
