
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, FlaskConical, Sun, Moon, Globe, 
  ChevronDown, Sparkles, LayoutGrid, Zap, 
  Beaker, ShieldCheck, Microscope, Binary 
} from 'lucide-react';
import { useTranslation } from '../LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  
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
    { name: t.nav.services, path: '/services', hasDropdown: true },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.check, path: '/protocol/check' },
  ];

  const servicesPreview = [
    { icon: <FlaskConical size={18}/>, title: language === 'uz' ? 'Kimyo' : 'Chemistry', path: '/services' },
    { icon: <ShieldCheck size={18}/>, title: language === 'uz' ? 'Sertifikat' : 'Cert', path: '/services' },
    { icon: <Beaker size={18}/>, title: language === 'uz' ? 'Fizika' : 'Physics', path: '/services' },
    { icon: <Binary size={18}/>, title: language === 'uz' ? 'IT-Lab' : 'IT-Lab', path: '/services' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 pt-6 px-4 md:px-10 ${scrolled ? 'translate-y-[-10px]' : ''}`}>
      <div className={`max-w-[1440px] mx-auto glass rounded-[2.5rem] transition-all duration-700 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border border-white/20 dark:border-white/5 ${scrolled ? 'py-2 px-6' : 'py-4 px-10'}`}>
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-[15deg] transition-all duration-500 relative overflow-hidden">
              <FlaskConical className="text-white w-6 h-6 md:w-7 md:h-7 relative z-10" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
            <div className="hidden sm:block">
              <span className="block text-xl md:text-2xl font-black font-serif tracking-tighter dark:text-white leading-none">Guliston-MITSL</span>
              <span className="block text-[9px] uppercase font-black tracking-[0.4em] text-primary mt-1.5 opacity-80">Scientific Innovation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.path}
                className="relative py-2"
                onMouseEnter={() => link.hasDropdown && setHoveredMenu('services')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  to={link.path}
                  className={`text-[13px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 ${
                    location.pathname === link.path || (link.path === '/protocol/check' && location.pathname.startsWith('/protocol/')) 
                    ? 'text-primary' : 'text-secondary/80 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredMenu === 'services' ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown / Mega Menu */}
                <AnimatePresence>
                  {link.hasDropdown && hoveredMenu === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] glass dark:bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-white/20 z-[100]"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {servicesPreview.map((item, i) => (
                          <Link 
                            key={i} 
                            to={item.path} 
                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/10 transition-all group/item"
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all">
                              {item.icon}
                            </div>
                            <span className="text-sm font-bold dark:text-gray-200">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                        <Link to="/services" className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
                          {t.common.details} <Sparkles size={12}/>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {(location.pathname === link.path || (link.path === '/protocol/check' && location.pathname.startsWith('/protocol/'))) && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-full shadow-[0_0_12px_rgba(0,166,118,0.6)]" />
                )}
              </div>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:block relative" ref={langMenuRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-100/50 dark:bg-white/5 dark:text-white text-[11px] font-black uppercase tracking-widest transition-all hover:bg-white dark:hover:bg-white/10 border border-transparent shadow-sm"
              >
                <Globe size={15} className="text-primary" /> 
                <span className="opacity-70">{language}</span> 
                <ChevronDown size={14} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-3 right-0 w-44 glass dark:bg-slate-900 rounded-[1.5rem] p-2 shadow-2xl border border-white/20 z-[60]"
                  >
                    {[
                      { code: 'uz', label: 'Oʻzbekcha' },
                      { code: 'ru', label: 'Русский' },
                      { code: 'en', label: 'English' }
                    ].map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code as any);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                          language === l.code 
                          ? 'bg-primary text-white shadow-lg shadow-primary/30' 
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
              className="p-4 rounded-2xl bg-gray-100/50 dark:bg-white/5 dark:text-white transition-all hover:bg-accent hover:text-white shadow-sm border border-transparent"
              title="Theme Toggle"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/add-shartnoma"
              className="hidden md:flex bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_-5px_rgba(0,166,118,0.4)] hover:bg-secondary hover:translate-y-[-2px] transition-all items-center gap-3 active:scale-95"
            >
              <Zap size={16} fill="currentColor" /> {t.nav.contract}
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-4 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] lg:hidden bg-white dark:bg-[#020617] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <FlaskConical size={20} />
                </div>
                <span className="text-xl font-black font-serif dark:text-white">Guliston-MITSL</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-4 rounded-2xl bg-gray-100 dark:bg-white/5 dark:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8 overflow-y-auto pb-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-3xl font-black flex items-center justify-between group uppercase tracking-tighter ${
                      location.pathname === link.path ? 'text-primary' : 'text-secondary dark:text-white'
                    }`}
                  >
                    {link.name}
                    <div className="w-12 h-12 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                      <ChevronDown className="-rotate-90" size={20} />
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-3">
                  {['uz', 'ru', 'en'].map(l => (
                    <button 
                      key={l} 
                      onClick={() => {
                        setLanguage(l as any);
                        setIsOpen(false);
                      }} 
                      className={`py-4 rounded-2xl font-black uppercase text-xs transition-all ${
                        language === l ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 dark:text-gray-400'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                
                <Link 
                  to="/add-shartnoma" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full bg-primary text-white py-6 rounded-[2rem] text-center font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
                >
                  <Zap size={18} /> {t.nav.contract}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
