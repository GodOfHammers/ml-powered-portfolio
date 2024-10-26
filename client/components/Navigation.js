import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiUser, FiBriefcase, FiBook, FiCode, FiAward, FiMail, FiGamepad } from 'react-icons/fi';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'About', path: '/about', icon: <FiUser /> },
    { name: 'Portfolio', path: '/portfolio', icon: <FiBriefcase /> },
    { name: 'Research', path: '/research', icon: <FiBook /> },
    { name: 'Skills', path: '/skills', icon: <FiCode /> },
    { name: 'Experience', path: '/experience', icon: <FiAward /> },
    { name: 'Blog', path: '/blog', icon: <FiBook /> },
    { name: 'Play Game', path: '/evolve-or-die', icon: <FiGamepad />, highlight: true },
    { name: 'Contact', path: '/contact', icon: <FiMail /> },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const NavLink = ({ item }) => (
    <Link href={item.path}>
      <a 
        className={`flex items-center gap-2 transition-colors ${
          router.pathname === item.path 
            ? 'text-teal-400' 
            : 'text-gray-300 hover:text-teal-300'
        } ${
          item.highlight 
            ? 'bg-teal-500 text-black px-4 py-2 rounded-full hover:bg-teal-400'
            : ''
        }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </a>
    </Link>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors">
              SP
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          <button 
            className="md:hidden text-gray-300 hover:text-teal-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm py-4">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;