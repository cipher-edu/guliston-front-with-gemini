
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowRight, FlaskConical, Activity, 
  Microscope, Beaker, Zap, ShieldCheck, Star, Quote, ChevronDown,
  Building2, HardHat, FileText, Search, MapPin, Phone, BadgeCheck,
  Plus, Minus, Globe, Target, Award, Users, Calendar, Clock, Newspaper,
  ZapOff, Sparkles, MoveRight, ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import Potential3D from '../components/Potential3D';
import Counter from '../components/Counter';
import { api } from '../services/api';
import { useTranslation } from '../LanguageContext';

const Home: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const { t, language } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setIsBlogLoading(true);
      try {
        const data = await api.get('blog');
        const results = data.results || (Array.isArray(data) ? data : []);
        setLatestPosts(results.slice(0, 3));
      } catch (err) {
        console.warn('Blog posts fetch error, using fallback');
        setLatestPosts([
          { 
            id: 1, 
            title: language === 'uz' ? "Beton mustahkamligi tahlili" : language === 'ru' ? "Анализ прочности бетона" : "Concrete Strength Analysis", 
            slug: "beton",
            hero_image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
            excerpt: t.blog_page.fallback_excerpt,
            published_at: new Date().toISOString()
          },
          { 
            id: 2, 
            title: language === 'uz' ? "Sement kimyoviy tarkibi" : language === 'ru' ? "Химический состав цемента" : "Cement Chemical Composition", 
            slug: "cement",
            hero_image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
            excerpt: t.blog_page.fallback_excerpt,
            published_at: new Date().toISOString()
          }
        ]);
      } finally {
        setIsBlogLoading(false);
      }
    };
    fetchLatestPosts();
  }, [language]);

  const partners = [
    { name: "Nest One", logo: "https://nestone.uz/logo.png", industry: "Residential" },
    { name: "Murad Buildings", logo: "https://muradbuildings.uz/logo.png", industry: "Real Estate" },
    { name: "Enter Engineering", logo: "https://enter-eng.uz/logo.png", industry: "Engineering" },
    { name: "KNAUF", logo: "https://knauf.uz/logo.png", industry: "Materials" },
    { name: "Orient Group", logo: "https://orientgroup.uz/logo.png", industry: "Investment" },
    { name: "Toshkent City", logo: "https://tashkentcitybc.uz/logo.png", industry: "Infrastructure" }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" className="relative">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div variants={containerVariants} className="text-center lg:text-left">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8 border border-primary/30 backdrop-blur-md">
                <Sparkles size={16} className="text-accent animate-pulse" /> {t.hero.badge}
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-serif font-black text-secondary dark:text-white leading-[1] mb-8">
                {t.hero.title_parts[0]} <br/>
                <span className="text-primary italic font-light drop-shadow-[0_0_20px_rgba(0,166,118,0.3)]">{t.hero.title_parts[1]} {t.hero.title_parts[2]}</span> <br/>
                {t.hero.title_parts[3]}
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-neutralDark/60 dark:text-gray-400 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t.hero.subtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link to="/add-shartnoma" className="bg-primary text-white px-10 py-6 rounded-2xl font-bold shadow-[0_20px_40px_rgba(0,166,118,0.3)] hover:shadow-primary/50 transition-all flex items-center justify-center gap-3 text-lg group overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.cta_primary} <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                </Link>
                <Link to="/about" className="glass text-secondary dark:text-white px-10 py-6 rounded-2xl font-bold hover:bg-white dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/20 text-lg">
                  {t.hero.cta_secondary}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 50 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              transition={{ duration: 1.2, ease: "easeOut" }} 
              className="relative h-[400px] md:h-[600px] w-full"
            >
              <Hero3D />
              <div className="absolute bottom-10 left-0 hidden md:block">
                <div className="glass p-6 rounded-3xl border-l-4 border-primary shadow-2xl animate-float">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    <span className="text-sm font-bold dark:text-white uppercase">{t.hero.live_status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT US TEASER */}
      <section className="py-32 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.home_sections.about_badge}</div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white mb-8">{t.home_sections.about_title}</h2>
              <p className="text-neutralDark/60 dark:text-gray-400 text-xl leading-relaxed mb-10 font-light italic">
                {t.home_sections.about_desc}
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><BadgeCheck size={24}/></div>
                  <span className="text-lg font-bold dark:text-white">{t.stats.certificates} (150+)</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent"><Globe size={24}/></div>
                  <span className="text-lg font-bold dark:text-white">{t.stats.global} (ISO 17025)</span>
                </div>
              </div>
              <Link to="/about" className="mt-12 inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                {t.hero.cta_secondary} <MoveRight />
              </Link>
            </motion.div>
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 rotate-2">
                <img src="https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&q=80&w=800" className="w-full h-[500px] object-cover" alt="About Lab" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-8 rounded-3xl border-l-4 border-accent shadow-2xl -rotate-2">
                <span className="text-4xl font-serif font-black text-accent block">10+</span>
                <span className="text-[10px] uppercase font-black dark:text-white tracking-widest">{t.about_page.exp_years}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-32 bg-neutralLight dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.home_sections.services_badge}</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white">{t.home_sections.services_title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'chemical', icon: <FlaskConical size={32}/>, title: language === 'uz' ? "Kimyoviy tahlil" : language === 'ru' ? "Химический анализ" : "Chemical Analysis" },
              { id: 'physical', icon: <Beaker size={32}/>, title: language === 'uz' ? "Fizik-mexanik sinov" : language === 'ru' ? "Физико-механические испытания" : "Mechanical Testing" },
              { id: 'cert', icon: <ShieldCheck size={32}/>, title: language === 'uz' ? "Sertifikatlash" : language === 'ru' ? "Сертификация" : "Certification" }
            ].map((s, i) => (
              <motion.div 
                key={s.id}
                whileHover={{ y: -10 }}
                className="glass p-12 rounded-[3rem] text-center border border-white/20 group hover:bg-primary transition-all duration-500"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-white/20 transition-colors">
                  <div className="text-primary group-hover:text-white">{s.icon}</div>
                </div>
                <h3 className="text-2xl font-bold dark:text-white group-hover:text-white mb-6">{s.title}</h3>
                <Link to="/services" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-white/80">
                  {t.common.details}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS LOGOS */}
      <section className="py-32 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.home_sections.partners_badge}</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary dark:text-white mb-20">{t.home_sections.partners_title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-60">
             {partners.map((p, i) => (
               <div key={i} className="group cursor-pointer">
                  <div className="grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                    <Building2 className="w-12 h-12 mx-auto text-secondary dark:text-gray-400 mb-3" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutralDark/40 dark:text-gray-500">{p.name}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section className="py-32 bg-neutralLight dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.home_sections.blog_badge}</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary dark:text-white">{t.home_sections.blog_title}</h2>
            </div>
            <Link to="/blog" className="bg-white dark:bg-white/5 dark:text-white px-8 py-4 rounded-2xl font-bold text-sm border border-primary/10 hover:bg-primary hover:text-white transition-all">
              {t.blog_page.view_all}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {latestPosts.map((post, i) => (
              <motion.article 
                key={post.id}
                whileHover={{ y: -10 }}
                className="glass rounded-[2.5rem] overflow-hidden border border-white/20 group h-full flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img src={post.hero_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-neutralDark/40 dark:text-gray-500 mb-4 uppercase">
                    <Calendar size={14} className="text-primary" /> {new Date(post.published_at).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold dark:text-white mb-4 line-clamp-2">{post.title}</h3>
                  <Link to={`/blog/${post.slug}`} className="mt-auto flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    {t.common.read_more} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-32 relative overflow-hidden bg-secondary dark:bg-slate-950">
        <div className="absolute inset-0 opacity-20">
          <Potential3D />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.stats.badge}</div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">{t.stats.title}</h2>
              <p className="text-white/60 text-xl leading-relaxed mb-12 font-light">{t.stats.desc}</p>
              
              <div className="grid grid-cols-2 gap-10">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-5xl font-serif font-bold text-primary mb-3"><Counter value={150} suffix="+" /></div>
                  <p className="text-white/40 text-[11px] font-black uppercase tracking-widest">{t.stats.certificates}</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-5xl font-serif font-bold text-accent mb-3"><Counter value={2500} suffix="+" /></div>
                  <p className="text-white/40 text-[11px] font-black uppercase tracking-widest">{t.stats.tests}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Globe size={32}/>, label: t.stats.global, color: 'primary' },
                { icon: <Award size={32}/>, label: t.stats.license, color: 'accent' },
                { icon: <Target size={32}/>, label: t.stats.precision, color: 'white' },
                { icon: <Users size={32}/>, label: t.stats.team, color: 'primary' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-10 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center transition-all hover:bg-white/5 hover:border-primary/40`}
                >
                  <div className={`text-${stat.color} mb-6`}>{stat.icon}</div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">{stat.label}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-40 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.process.badge}</motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white">{t.process.title}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 -translate-y-1/2 hidden lg:block -z-0"></div>
            {t.process.steps.map((step: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.1)] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  <div className="text-primary group-hover:text-white transition-colors">
                    {i === 0 ? <FileText size={36}/> : i === 1 ? <HardHat size={36}/> : i === 2 ? <Microscope size={36}/> : <Search size={36}/>}
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white dark:border-slate-800">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4 dark:text-white group-hover:text-primary transition-colors">{step.title}</h4>
                <p className="text-sm text-neutralDark/50 dark:text-gray-400 leading-relaxed font-light px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-primary opacity-5 dark:opacity-10 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-secondary dark:text-white mb-12 leading-[1.1]">
              {t.cta_final.title_parts[0]} <br/>
              <span className="text-primary italic">{t.cta_final.title_parts[1]}</span> {t.cta_final.title_parts[2]}
            </h2>
            <p className="text-xl md:text-2xl text-neutralDark/60 dark:text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              {t.cta_final.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/add-shartnoma" className="bg-primary text-white px-12 py-7 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-secondary hover:shadow-primary/40 transition-all flex items-center gap-4">
                {t.cta_final.btn_apply} <MoveRight size={32} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
