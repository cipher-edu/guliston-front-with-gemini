
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Microscope, FlaskConical, Users, Newspaper, Briefcase, Sun, Moon, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check initial theme
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Bosh sahifa', path: '/', icon: Microscope },
    { name: 'Biz haqimizda', path: '/about', icon: Users },
    { name: 'Xizmatlar', path: '/services', icon: FlaskConical },
    { name: 'Blog', path: '/blog', icon: Newspaper },
    { name: 'Tekshirish', path: '/protocol/check', icon: ShieldCheck },
    { name: 'Karyera', path: '/careers', icon: Briefcase },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'glass py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <FlaskConical className="text-white w-6 h-6" />
            </div>
            <div>
              <span className={`block text-xl font-bold tracking-tight ${scrolled ? 'text-secondary dark:text-white' : 'text-secondary dark:text-white'}`}>
                Guliston-MITSL
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-primary font-bold">
                Scientific Lab
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path || (link.path === '/protocol/check' && location.pathname.startsWith('/protocol/')) ? 'text-primary' : 'text-secondary dark:text-gray-300'
                }`}
              >
                {link.name}
                {(location.pathname === link.path || (link.path === '/protocol/check' && location.pathname.startsWith('/protocol/'))) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-secondary dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/add-shartnoma"
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              Shartnoma Yaratish
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary dark:text-gray-300"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary dark:text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass dark:bg-slate-900 text-secondary dark:text-white shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  <link.icon size={20} className="text-primary" />
                  <span className="text-lg font-medium">{link.name}</span>
                </Link>
              ))}
              <Link
                to="/add-shartnoma"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-primary text-white py-4 rounded-xl font-bold shadow-lg mt-4"
              >
                Shartnoma Yaratish
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
