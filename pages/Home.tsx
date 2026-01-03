
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowRight, FlaskConical, Activity, 
  Microscope, Beaker, Zap, ShieldCheck, Star, Quote, ChevronDown,
  Building2, HardHat, FileText, Search, MapPin, Phone, BadgeCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import Potential3D from '../components/Potential3D';
import Counter from '../components/Counter';

const Home: React.FC = () => {
  const [protocolId, setProtocolId] = useState("");
  const navigate = useNavigate();

  const handleProtocolCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (protocolId.trim()) {
      navigate(`/protocol/${protocolId.trim()}`);
    }
  };

  const steps = [
    { title: "Ariza berish", desc: "Onlayn yoki ofisimizda sinov uchun ariza qoldiring.", icon: <FileText /> },
    { title: "Namuna olish", desc: "Mutaxassislarimiz ob'ektdan namuna olishadi yoki siz yetkazasiz.", icon: <HardHat /> },
    { title: "Laboratoriya sinovi", desc: "Eng zamonaviy uskunalar yordamida chuqur tahlil o'tkaziladi.", icon: <Microscope /> },
    { title: "Natija (Protokol)", desc: "QR-kodli rasmiy bayonnoma va expert xulosasini oling.", icon: <Search /> }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="overflow-hidden dark:bg-[#0F172A] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-[#0F172A] pt-24 md:pt-16">
        <div className="absolute inset-0 hero-glow -z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center py-10 md:py-20">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative z-20 text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 border border-primary/20">
                <FlaskConical size={14} className="animate-pulse" /> O'zbekistondagi №1 Markaziy Laboratoriya
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-secondary dark:text-white leading-tight md:leading-[1.05] mb-6 md:mb-8">
                Sifatni <span className="text-primary italic">Molekula</span> Darajasida Tasdiqlaymiz
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-xl text-neutralDark/60 dark:text-gray-400 mb-8 md:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                «GULISTON-MITSL» – Qurilish materiallarining fizik-kimyoviy tahlillari bo'yicha milliy expertiza markazi. Innovatsiya va aniqlik uyg'unligi.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/add-shartnoma" className="bg-primary text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold shadow-2xl hover:shadow-primary/50 transition-all flex items-center justify-center gap-3 text-base md:text-lg">
                  Sinovga ariza berish <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="glass text-secondary dark:text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold hover:bg-white dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 text-base md:text-lg">
                  Biz haqimizda
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.5, ease: "easeOut" }} 
              className="relative h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px] w-full z-10 order-1 lg:order-2"
            >
              <Hero3D />
              <div className="absolute inset-0 pointer-events-none hidden sm:block">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 right-0 glass px-4 py-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl shadow-2xl border-l-4 border-primary z-20 backdrop-blur-xl"
                >
                  <p className="text-[8px] md:text-[10px] font-black uppercase text-primary mb-1">Status</p>
                  <p className="text-[10px] md:text-sm font-bold dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span> Laboratoriya Faol
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ISH JARAYONI */}
      <section className="py-20 md:py-32 bg-neutralLight/50 dark:bg-[#0B1221]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Hamkorlik jarayoni</motion.div>
            <h3 className="text-3xl md:text-6xl font-serif font-bold text-secondary dark:text-white">Sifat nazorati <span className="text-primary italic">bosqichlari</span></h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center p-8 md:p-10 glass rounded-[2.5rem] md:rounded-[3rem] border border-white/40 dark:border-white/5 shadow-xl transition-all group active:scale-95"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-xl group-hover:rotate-6 transition-transform">
                  {React.cloneElement(step.icon as any, { size: 28 })}
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 dark:text-white">{step.title}</h4>
                <p className="text-xs md:text-sm text-neutralDark/60 dark:text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 bg-secondary text-white rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs border-2 border-white dark:border-[#0F172A] shadow-lg">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROTOCOL CHECK & CTA */}
      <section className="py-20 md:py-40 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-primary/20 shadow-2xl flex flex-col justify-center">
                 <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                    <Search size={28} className="text-primary" />
                 </div>
                 <h2 className="text-2xl md:text-4xl font-serif font-bold text-secondary dark:text-white mb-4 md:mb-6">Bayonnomani <span className="text-primary italic">tekshiring</span></h2>
                 <p className="text-sm md:text-lg text-neutralDark/60 dark:text-gray-400 mb-8 md:mb-10 leading-relaxed">Laboratoriya xulosasi haqiqiyligini tekshirish uchun tizimdan qidiring.</p>
                 <form onSubmit={handleProtocolCheck} className="relative">
                    <input 
                      type="text" 
                      value={protocolId} 
                      onChange={(e) => setProtocolId(e.target.value)} 
                      placeholder="ID: 03-24" 
                      className="w-full bg-neutralLight dark:bg-white/5 border-2 border-primary/10 rounded-2xl md:rounded-[2rem] py-5 md:py-8 px-6 md:px-10 text-lg md:text-xl focus:outline-none focus:border-primary transition-all dark:text-white" 
                    />
                    <button type="submit" className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 bg-primary text-white rounded-xl md:rounded-[1.5rem] flex items-center justify-center hover:bg-secondary transition-all shadow-xl active:scale-90">
                       <ArrowRight size={24} />
                    </button>
                 </form>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-primary p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden">
                 <h2 className="text-2xl md:text-6xl font-serif font-bold mb-8 md:mb-10 leading-tight">Loyihangiz sifatiga <br/><span className="text-secondary italic">ishonch</span> hosil qiling</h2>
                 <Link to="/add-shartnoma" className="bg-white text-primary px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-base md:text-xl hover:bg-secondary hover:text-white transition-all shadow-2xl flex items-center gap-3 md:gap-4 self-start">
                    Onlayn Ariza Berish <ArrowRight size={20} />
                 </Link>
              </motion.div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
