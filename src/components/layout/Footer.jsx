import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

const exploreLinks = [
  { label: 'Home', path: '/' },
  { label: 'Safaris', path: '/safaris' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Rates', path: '/rates' },
];

const infoLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Events & Retreats', path: '/events' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Directions', path: '/directions' },
];

const Footer = () => {
  const { ref, controls, variants } = useScrollReveal({ yOffset: 20, threshold: 0.1 });

  return (
    <footer className="bg-secondary text-white">
      {/* Top decorative section */}
      <div className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Link to="/" className="inline-flex flex-col items-center">
            <span className="font-heading text-5xl font-bold tracking-tight text-secondary">
              AF
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              African Footprints
            </span>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="block h-px w-12 bg-primary/50" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-12 bg-primary/50" />
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mx-auto max-w-7xl px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-cream">
              Sandai Farm
            </h4>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              A private conservancy nestled in the Laikipia highlands of Kenya,
              offering authentic safari experiences and warm hospitality in the
              heart of the African wilderness.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/10"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/10"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-cream">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-cream">
              Information
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-cream">Contact</h4>
            <div className="space-y-4 text-sm text-white/60">
              <div>
                <p className="mb-1">
                  <a
                    href="mailto:petra@africanfootprints.de"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    petra@africanfootprints.de
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:tessa@africanfootprints.de"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    tessa@africanfootprints.de
                  </a>
                </p>
              </div>
              <div>
                <p className="mb-1">
                  <a
                    href="tel:+254721656699"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    +254 721 656 699
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+254792717846"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    +254 792 717 846
                  </a>
                </p>
              </div>
              <p className="leading-relaxed">
                Sandai Farm, Laikipia
                <br />
                Kenya
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; African Footprints Ltd, 2025. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="font-semibold text-white/60">EN</span>
            <span className="text-white/20">|</span>
            <span className="cursor-pointer transition-colors duration-200 hover:text-white/60">
              DE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
