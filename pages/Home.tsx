
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, FlaskConical, Activity, Globe, Rocket, Terminal,
  Code, Server, ClipboardList, Palette, BarChart, Headset,
  FileSearch, QrCode, ShieldCheck, Microscope, Beaker, Zap,
  Target, Eye, Award, Newspaper, Calendar, User, Briefcase,
  MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight,
  ShieldAlert, Database, BadgeCheck, Star, Quote, ChevronDown,
  Building2, HardHat, FileText, CheckCircle2, Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import Potential3D from '../components/Potential3D';
import Counter from '../components/Counter';

const Home: React.FC = () => {
  const [protocolId, setProtocolId] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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
    { title: "Natija (Protokol)", desc: "QR-kodli rasmiy bayonnoma va ekspert xulosasini oling.", icon: <FileSearch /> }
  ];

  const faqs = [
    { q: "Sinov natijalari qancha vaqtda tayyor bo'ladi?", a: "Material turiga qarab 1 kundan 28 kungacha (betonning 28 kunlik mustahkamligi uchun). Kimyoviy tahlillar odatda 3 ish kunida tayyor bo'ladi." },
    { q: "Bayonnoma haqiqiyligini qanday tekshirish mumkin?", a: "Har bir bayonnomada QR-kod mavjud. Uni skanerlash yoki saytimizning 'Tekshirish' bo'limiga ID raqamini kiritish orqali haqiqiyligini tekshirishingiz mumkin." },
    { q: "Laboratoriya akkreditatsiyadan o'tganmi?", a: "Ha, bizning laboratoriyamiz O'zAK (O'zbekiston Akkreditatsiya Markazi) tomonidan ISO/IEC 17025 xalqaro standarti asosida akkreditatsiyadan o'tgan." },
    { q: "Respublika bo'ylab xizmat ko'rsatasizmi?", a: "Ha, bizning mobil laboratoriyalarimiz va mutaxassislarimiz O'zbekistonning barcha hududlarida ob'ektlarga borib xizmat ko'rsatish imkoniyatiga ega." }
  ];

  const testimonials = [
    { name: "Asrorbek Qodirov", role: "Bosh muhandis, 'Golden Road' MCHJ", text: "Guliston-MITSL bilan 3 yildan beri ishlaymiz. Natijalarning aniqligi va tezkorligi bizga ob'ektlarimiz xavfsizligini ta'minlashda katta yordam bermoqda." },
    { name: "Malika Ahmedova", role: "Sifat nazorati rahbari", text: "Uskunalarining zamonaviyligi bo'yicha bu laboratoriya O'zbekistonda yetakchi. Har bir tahlil ilmiy asoslangan va tushunarli." }
  ];

  const partners = ["Binokor", "Murad Buildings", "Enter Engineering", "Nest One", "Discover Invest", "Agromir"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="overflow-hidden dark:bg-[#0F172A] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-[#0F172A] pt-20">
        <div className="absolute inset-0 hero-glow -z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="relative z-20 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-8 border border-primary/20">
                <FlaskConical size={16} /> O'zbekistondagi №1 Markaziy Laboratoriya
              </div>
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-secondary dark:text-white leading-[1.1] mb-8">
                Sifatni <span className="text-primary italic">Molekula</span> Darajasida Tasdiqlaymiz
              </h1>
              <p className="text-xl text-neutralDark/70 dark:text-gray-300 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                «GULISTON-MITSL» – Qurilish materiallarining fizik-kimyoviy tahlillari bo'yicha milliy expertiza markazi.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <Link to="/add-shartnoma" className="bg-primary text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center gap-3 text-lg">
                  Sinovga ariza berish <ArrowRight size={24} />
                </Link>
                <Link to="/about" className="glass text-secondary dark:text-white px-10 py-5 rounded-full font-bold hover:bg-white dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 text-lg">
                  Biz haqimizda
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} 
              className="relative h-[450px] md:h-[650px] w-full z-10"
            >
              <Hero3D />
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 right-0 glass px-6 py-4 rounded-3xl shadow-xl border-l-4 border-primary z-20"
                >
                  <p className="text-[10px] font-black uppercase text-primary mb-1">Status</p>
                  <p className="text-sm font-bold dark:text-white">Laboratoriya Faol</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ISH JARAYONI (PROCESS STEPS) */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Muvaffaqiyatli hamkorlik</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white">Qanday <span className="text-primary italic">ishlaymiz?</span></h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-white/5 -translate-y-1/2 hidden md:block"></div>
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center p-8 glass rounded-[2.5rem] border border-white/20 shadow-xl"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 28 })}
                </div>
                <h4 className="text-xl font-bold mb-3 dark:text-white">{step.title}</h4>
                <p className="text-sm text-neutralDark/60 dark:text-gray-400">{step.desc}</p>
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-secondary dark:bg-primary/20 text-white dark:text-primary rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-[#0F172A]">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POTENTIAL SECTION */}
      <section className="py-32 bg-[#020617] relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest mb-6 border border-primary/30">
                  <Activity size={14} className="animate-bounce" /> Kelajak Texnologiyalari Markazi
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-[1.1]">
                  Biz mijozga <span className="text-primary italic">ergashmaymiz</span>, hamkorlik qilamiz.
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-400 leading-relaxed mb-12 max-w-xl">
                  Bizning kuchimiz - tajriba va innovatsiyada. Har bir tahlil natijasi ortida milliy va xalqaro standartlarga bo'lgan qat'iy rioya turadi.
                </motion.p>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <div className="text-4xl font-serif font-bold text-primary mb-2"><Counter value={100} suffix="%" /></div>
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">Aniqlik darajasi</p>
                  </div>
                  <div>
                    <div className="text-4xl font-serif font-bold text-accent mb-2"><Counter value={450} suffix="+" /></div>
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">Sinov usullari</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 relative h-[600px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 z-0">
                <Potential3D />
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="absolute bottom-10 right-0 glass-dark p-8 rounded-[3rem] border border-white/10 z-20 shadow-2xl backdrop-blur-3xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                     <BadgeCheck className="text-primary" size={32} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Milliy Akkreditatsiya</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">O'ZAK.SL.0235</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HAMKORLAR (PARTNERS) */}
      <section className="py-20 bg-neutralLight dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <h4 className="text-xl font-serif font-bold text-secondary dark:text-white shrink-0 italic">Sifatimizga <span className="text-primary">ishonuvchi</span> yirik hamkorlarimiz:</h4>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
              {partners.map((p, i) => (
                <span key={i} className="text-2xl font-black uppercase tracking-tighter text-secondary dark:text-white hover:text-primary cursor-default transition-colors">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (MIJOZLAR FIKRI) */}
      <section className="py-32 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white mb-8 italic">Mijozlarimiz biz haqimizda nima <span className="text-primary">deydi?</span></h2>
              <p className="text-lg text-neutralDark/60 dark:text-gray-400 mb-10 max-w-lg">Har bir loyiha biz uchun mas'uliyat. Mijozlarimizning ishonchi - eng oliy mukofotimiz.</p>
              <Link to="/about" className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-all">
                Barcha fikrlar <ArrowRight size={20} />
              </Link>
            </div>
            <div className="space-y-8">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="glass p-10 rounded-[3rem] border border-white/20 shadow-xl relative"
                >
                  <Quote className="absolute top-8 right-8 text-primary/10 w-20 h-20" />
                  <div className="flex gap-1 text-accent mb-6">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg italic text-secondary dark:text-white/90 mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">{t.name[0]}</div>
                    <div>
                      <h4 className="font-bold dark:text-white">{t.name}</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (KO'P SO'RALADIGAN SAVOLLAR) */}
      <section className="py-32 bg-neutralLight dark:bg-[#111827]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Ma'lumot markazi</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white">Sizda <span className="text-primary italic">savol</span> bormi?</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className={`glass rounded-3xl border border-white/10 overflow-hidden transition-all ${activeFaq === i ? 'ring-2 ring-primary/30' : ''}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex items-center justify-between group"
                >
                  <span className="text-xl font-bold dark:text-white group-hover:text-primary transition-colors">{faq.q}</span>
                  <div className={`p-2 rounded-full bg-primary/10 text-primary transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <p className="text-lg text-neutralDark/60 dark:text-gray-400 leading-relaxed pt-4 border-t border-gray-100 dark:border-white/5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROTOCOL CHECK & CTA COMBINED */}
      <section className="py-32 relative bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="glass p-12 rounded-[4rem] border border-primary/20 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                 <div className="relative z-10">
                    <h2 className="text-3xl font-serif font-bold text-secondary dark:text-white mb-6">Bayonnomani <span className="text-primary italic">tekshiring</span></h2>
                    <p className="text-neutralDark/60 dark:text-gray-400 mb-8 leading-relaxed">Laboratoriya xulosasi haqiqiyligini tekshirish uchun bayonnoma raqamini kiriting.</p>
                    <form onSubmit={handleProtocolCheck} className="relative">
                       <input 
                         type="text" 
                         value={protocolId} 
                         onChange={(e) => setProtocolId(e.target.value)} 
                         placeholder="ID: 03-24" 
                         className="w-full bg-white dark:bg-white/5 border-2 border-primary/10 rounded-3xl py-6 px-8 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all dark:text-white" 
                       />
                       <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-secondary transition-all shadow-lg active:scale-95">
                          <Search size={24} />
                       </button>
                    </form>
                 </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-primary p-12 rounded-[4rem] text-white flex flex-col justify-center shadow-2xl shadow-primary/30 relative overflow-hidden">
                 <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                 <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 italic">Loyihangiz sifatiga <span className="text-secondary">ishonch</span> hosil qiling</h2>
                    <Link to="/add-shartnoma" className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-secondary hover:text-white transition-all shadow-2xl flex items-center gap-4 group inline-flex">
                       Onlayn Ariza <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 8. KONTAKT QISMI */}
      <section className="py-32 bg-neutralLight dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white italic">Biz bilan <span className="text-primary">Bog'laning</span></h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:bg-primary transition-all shadow-xl"><MapPin className="text-primary group-hover:text-white" size={28} /></div>
                  <div><p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Manzil</p><p className="text-lg font-bold dark:text-white">Navoiy vil., Karmana tumani, A. Temur-45</p></div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:bg-primary transition-all shadow-xl"><Phone className="text-primary group-hover:text-white" size={28} /></div>
                  <div><p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Telefon</p><p className="text-lg font-bold dark:text-white">+998 71 123 45 67</p></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="glass p-6 rounded-3xl border border-primary/20 flex-grow text-center">
                   <p className="text-3xl font-serif font-bold text-primary">24/7</p>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Onlayn qo'llab-quvvatlash</p>
                </div>
                <div className="glass p-6 rounded-3xl border border-accent/20 flex-grow text-center">
                   <p className="text-3xl font-serif font-bold text-accent">ISO</p>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Xalqaro Sertifikat</p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d855.5397411662528!2d65.37868315078254!3d40.10527688743476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c76261daf63d%3A0x64365eaea7a549c7!2sGuliston-MITS%20tahlil%20laboratoriyasi!5e1!3m2!1sru!2s!4v1767368521578!5m2!1sru!2s" className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-125" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
