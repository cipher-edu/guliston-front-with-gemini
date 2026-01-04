
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FlaskConical, Sun, Moon, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { useTranslation } from '../LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const location = useLocation();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    setIsDark(document.documentElement.classList.contains('dark'));

    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.check, path: '/protocol/check' },
  ];

  const languages = [
    { code: 'uz', label: 'Oʻzbekcha' },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 pt-6 px-4 md:px-8 ${scrolled ? 'translate-y-[-15px]' : ''}`}>
      <div className={`max-w-7xl mx-auto glass rounded-[2rem] transition-all duration-500 shadow-2xl border border-white/10 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex justify-between items-center px-6 md:px-10 h-16">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <FlaskConical className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg md:text-xl font-black font-serif tracking-tight dark:text-white leading-none">Guliston-MITSL</span>
              <span className="block text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-primary font-black mt-1">Innovation Lab</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[12px] font-bold uppercase tracking-widest transition-all relative py-2 ${
                  location.pathname === link.path || (link.path === '/protocol/check' && location.pathname.startsWith('/protocol/')) 
                  ? 'text-primary' : 'text-secondary/70 dark:text-gray-400 hover:text-primary'
                }`}
              >
                {link.name}
                {(location.pathname === link.path || (link.path === '/protocol/check' && location.pathname.startsWith('/protocol/'))) && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(0,166,118,0.5)]" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 dark:text-white text-[11px] font-black uppercase tracking-widest transition-all hover:bg-primary hover:text-white border border-transparent"
              >
                <Globe size={14} /> {language} <ChevronDown size={14} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-2 right-0 w-40 glass dark:bg-slate-900 rounded-2xl p-2 shadow-2xl border border-white/10 z-[60]"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code as any);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                          language === l.code 
                          ? 'bg-primary text-white' 
                          : 'text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 dark:text-white transition-all hover:bg-accent hover:text-white"
              title="Mavzuni o'zgartirish"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/add-shartnoma"
              className="bg-primary text-white px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-secondary transition-all flex items-center gap-2"
            >
              <Sparkles size={14} /> {t.nav.contract}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 rounded-xl bg-primary/10 text-primary">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden mt-4 glass dark:bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold flex items-center justify-between group ${
                    location.pathname === link.path ? 'text-primary' : 'dark:text-white'
                  }`}
                >
                  {link.name}
                  <ChevronDown className="-rotate-90 text-primary opacity-50" size={18} />
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                <div className="flex gap-2">
                  {['uz', 'ru', 'en'].map(l => (
                    <button 
                      key={l} 
                      onClick={() => {
                        setLanguage(l as any);
                        setIsOpen(false);
                      }} 
                      className={`flex-1 py-3 rounded-xl font-black uppercase text-[11px] transition-all ${
                        language === l ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 dark:text-gray-400'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={toggleTheme} className="flex-1 py-3 bg-gray-100 dark:bg-white/5 rounded-xl flex justify-center text-primary">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
              <Link to="/add-shartnoma" onClick={() => setIsOpen(false)} className="w-full bg-primary text-white py-4 rounded-xl text-center font-black uppercase tracking-widest text-xs shadow-xl">
                {t.nav.contract}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
