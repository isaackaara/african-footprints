import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Safaris',
    path: '/safaris',
    children: [
      { label: 'On Sandai', path: '/safaris/on-sandai' },
      { label: 'Day Trips', path: '/safaris/day-trips' },
      { label: 'Multi-Day Safaris', path: '/safaris/multi-day' },
      { label: '10-Day Package', path: '/safaris/10-day-package' },
      { label: 'Tailor Made', path: '/safaris/tailor-made' },
    ],
  },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Events', path: '/events' },
  { label: 'Rates', path: '/rates' },
  { label: 'Contact', path: '/contact' },
];

const navLinkClasses = ({ isActive }) =>
  `text-sm uppercase tracking-widest font-semibold transition-colors duration-300 ${
    isActive ? 'text-primary' : 'hover:text-primary'
  }`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [safarisOpen, setSafarisOpen] = useState(false);
  const [mobileSafarisOpen, setMobileSafarisOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSafarisOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none">
            <span
              className={`font-heading text-3xl font-bold tracking-tight transition-colors duration-500 ${
                scrolled ? 'text-secondary' : 'text-white'
              }`}
            >
              AF
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors duration-500 ${
                scrolled ? 'text-accent' : 'text-white/80'
              }`}
            >
              African Footprints
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setSafarisOpen(true)}
                  onMouseLeave={() => setSafarisOpen(false)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `${navLinkClasses({ isActive })} flex items-center gap-1 ${
                        scrolled ? '' : 'text-white'
                      }`
                    }
                  >
                    {link.label}
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        safarisOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </NavLink>

                  <AnimatePresence>
                    {safarisOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-52 rounded-lg bg-cream/95 backdrop-blur-md shadow-lg ring-1 ring-muted/20 py-2"
                      >
                        {link.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 ${
                                isActive
                                  ? 'text-primary bg-primary/5'
                                  : 'text-secondary hover:text-primary hover:bg-primary/5'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `${navLinkClasses({ isActive })} ${
                      scrolled ? '' : 'text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Button href="/contact" variant="primary" size="sm">
                Make an Enquiry
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 cursor-pointer ${
                scrolled ? 'text-secondary' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiX className="w-7 h-7" />
              ) : (
                <HiMenuAlt3 className="w-7 h-7" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-secondary/98 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) =>
                link.children ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <button
                      onClick={() => setMobileSafarisOpen(!mobileSafarisOpen)}
                      className="flex items-center gap-2 text-white text-lg uppercase tracking-widest font-semibold cursor-pointer"
                    >
                      {link.label}
                      <FiChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileSafarisOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileSafarisOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden flex flex-col items-center mt-3 gap-3"
                        >
                          {link.children.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              onClick={closeMobile}
                              className={({ isActive }) =>
                                `text-sm uppercase tracking-widest font-medium transition-colors duration-200 ${
                                  isActive
                                    ? 'text-primary'
                                    : 'text-white/70 hover:text-primary'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        `text-lg uppercase tracking-widest font-semibold transition-colors duration-200 ${
                          isActive ? 'text-primary' : 'text-white hover:text-primary'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                )
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="mt-6"
              >
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  onClick={closeMobile}
                >
                  Make an Enquiry
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
