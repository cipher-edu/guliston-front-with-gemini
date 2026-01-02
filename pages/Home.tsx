
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, FlaskConical, Sparkles, Activity, Globe, Rocket, Terminal,
  Code, Server, ClipboardList, Palette, BarChart, Headset,
  FileSearch, QrCode, ShieldCheck, Microscope, Beaker, Zap,
  Target, Eye, Award, Newspaper, Calendar, User, Briefcase,
  MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight,
  ShieldAlert, Database
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

  const roles = [
    { title: "Dasturchilar", icon: <Code />, color: "text-emerald-400", bg: "bg-emerald-500/10", detail: "Tizim me'morlari" },
    { title: "Tizim maʼmurlari", icon: <Server />, color: "text-blue-400", bg: "bg-blue-500/10", detail: "Xavfsiz infratuzilma" },
    { title: "Loyiha menejerlari", icon: <ClipboardList />, color: "text-amber-400", bg: "bg-amber-500/10", detail: "G'oyadan natijagacha" },
    { title: "Dizaynerlar", icon: <Palette />, color: "text-purple-400", bg: "bg-purple-500/10", detail: "UX/UI ustasi" },
    { title: "Biznes tahlilchilar", icon: <BarChart />, color: "text-cyan-400", bg: "bg-cyan-500/10", detail: "Ma'lumotlar tahlili" },
    { title: "Texnik qo‘llab-quvvatlash", icon: <Headset />, color: "text-rose-400", bg: "bg-rose-500/10", detail: "24/7 xizmat" }
  ];

  const mainServices = [
    { id: 'chem', title: "Kimyoviy Tahlillar", icon: <FlaskConical />, desc: "Molekulyar darajadagi aniqlik va tarkib tahlili.", color: "primary" },
    { id: 'phys', title: "Fizik Sinovlar", icon: <Microscope />, desc: "Materiallar mustahkamligi va chidamlilik testi.", color: "accent" },
    { id: 'cert', title: "Sertifikatlash", icon: <ShieldCheck />, desc: "Xalqaro ISO standartlari asosida sertifikatlashtirish.", color: "blue-500" },
    { id: 'res', title: "Ilmiy Tadqiqotlar", icon: <Beaker />, desc: "Yangi materiallar retsepturasi va R&D loyihalari.", color: "purple-500" }
  ];

  const blogTeasers = [
    { title: "Qurilishda AI texnologiyalari", date: "12.05.2025", category: "Texnologiya", img: "https://picsum.photos/400/250?v=1" },
    { title: "Sifat nazorati yangi bosqichda", date: "10.05.2025", category: "Yangiliklar", img: "https://picsum.photos/400/250?v=2" },
    { title: "ISO 17025 ning yangi talablari", date: "08.05.2025", category: "Standart", img: "https://picsum.photos/400/250?v=3" }
  ];

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
      <section className="relative min-h-screen pt-32 pb-20 flex items-center bg-white dark:bg-[#0F172A]">
        <div className="absolute inset-0 hero-glow -z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative z-20 text-center lg:text-left">
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
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }} className="relative h-[500px] md:h-[700px] w-full z-10">
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US TEASER (BIZ HAQIMIZDA) */}
      <section className="py-24 bg-neutralLight dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Bizning Missiyamiz</h4>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white mb-8">
                Innovatsiya va Ishonch <span className="text-primary italic">Uchrashgan</span> Joyda
              </h2>
              <p className="text-lg text-neutralDark/60 dark:text-gray-400 mb-10 leading-relaxed">
                20 yillik ilmiy tajriba va zamonaviy uskunalar yordamida biz qurilish sohasida yangi standartlarni o'rnatmoqdamiz. Bizning har bir tahlilimiz - bu xavfsizlik kafolati.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <Target size={24} />
                  </div>
                  <h4 className="font-bold dark:text-white">Aniq Maqsad</h4>
                  <p className="text-xs text-gray-500">Eng yuqori aniqlikdagi laboratoriya xizmatlari.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                    <Eye size={24} />
                  </div>
                  <h4 className="font-bold dark:text-white">Kelajak Nigohi</h4>
                  <p className="text-xs text-gray-500">Raqamli tahlil va AI integratsiyasi.</p>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                Batafsil ma'lumot <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative group">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800" alt="Lab Work" className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-8 -right-8 glass p-8 rounded-[2rem] shadow-2xl z-20 border-l-4 border-primary max-w-[240px]">
                <div className="text-4xl font-serif font-bold text-primary mb-1">20+</div>
                <p className="text-xs font-bold text-secondary dark:text-white uppercase tracking-widest">Yillik tajriba</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. POTENTIAL SECTION (SALOHIYAT) */}
      <section className="py-32 bg-[#020617] relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
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
                  Yuqori malakali mutaxassislarimiz zamonaviy texnologiyalar va ilg'or dasturlash tillari yordamida murakkab hamda qiziqarli ekotizimlarni barpo etishadi.
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roles.map((role, i) => (
                    <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-start gap-4 transition-all group overflow-hidden">
                      <div className={`${role.bg} ${role.color} p-4 rounded-2xl shrink-0 group-hover:rotate-12 transition-transform duration-500`}>
                        {React.cloneElement(role.icon as React.ReactElement<any>, { size: 24 })}
                      </div>
                      <div className="relative z-10">
                        <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{role.title}</h4>
                        <p className="text-[10px] text-gray-500 font-medium group-hover:text-gray-300 transition-colors uppercase tracking-wider">{role.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 relative h-[600px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 z-0">
                <Potential3D />
              </div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="absolute top-10 right-0 glass-dark p-8 rounded-[3rem] border border-white/10 z-20 shadow-2xl backdrop-blur-3xl min-w-[280px]">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"><Rocket className="text-primary" size={24} /></div>
                    <div>
                      <div className="text-2xl font-serif font-bold text-white"><Counter value={27} /></div>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Yillik Tajriba</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center"><Globe className="text-accent" size={24} /></div>
                    <div>
                      <div className="text-2xl font-serif font-bold text-white"><Counter value={10000000} suffix="+" /></div>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Global Foydalanuvchi</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (XIZMATLAR) */}
      <section className="py-32 bg-white dark:bg-[#0F172A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Bizning Imkoniyatlar</h4>
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-secondary dark:text-white mb-8 italic">
              Professional <span className="text-primary">Laboratoriya</span> Xizmatlari
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainServices.map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 group hover:bg-secondary dark:hover:bg-primary/20 transition-all duration-500 cursor-pointer text-center"
              >
                <div className={`w-20 h-20 bg-${service.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-white transition-all`}>
                  <div className={`text-${service.color} group-hover:scale-125 transition-transform`}>
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 40 })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white group-hover:text-white">{service.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/80 leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-white">
                  Batafsil <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL CHECK (VERIFIKATSIYA) */}
      <section className="py-20 bg-neutralLight dark:bg-[#111827] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="glass p-12 md:p-16 rounded-[4rem] border border-primary/20 shadow-2xl flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
              <div className="lg:w-1/2 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest"><FileSearch size={14} /> Verifikatsiya</div>
                 <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white leading-tight">Bayonnomani <span className="text-primary">Onlayn</span> Tekshirish</h2>
                 <p className="text-lg text-neutralDark/60 dark:text-gray-400">Sizga berilgan bayonnomaning haqiqiyligini uning ID raqami orqali bir zumda tasdiqlang.</p>
              </div>
              <div className="lg:w-1/2 w-full">
                 <form onSubmit={handleProtocolCheck} className="relative">
                    <input type="text" value={protocolId} onChange={(e) => setProtocolId(e.target.value)} placeholder="ID (masalan: 03-24)" className="w-full bg-white dark:bg-white/5 border-2 border-primary/10 rounded-3xl py-6 px-8 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all dark:text-white" />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-secondary transition-all shadow-lg active:scale-95"><ArrowRight size={24} /></button>
                 </form>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 6. BLOG / NEWS SECTION (YANGILIKLAR) */}
      <section className="py-32 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Blog & Media</h4>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white italic">So'nggi <span className="text-primary">Yangiliklar</span></h2>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs">Hamma Maqolalar <ArrowRight size={16} /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogTeasers.map((post, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glass rounded-[2.5rem] overflow-hidden group shadow-lg">
                <div className="h-56 overflow-hidden relative">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{post.category}</div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold mb-4"><Calendar size={14} className="text-primary" /> {post.date}</div>
                  <h3 className="text-xl font-bold mb-6 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                  <button className="text-primary font-bold text-xs flex items-center gap-2">O'qish <ArrowRight size={14} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CAREERS BANNER (KARYERA) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 italic">Ilmiy <span className="text-primary">Karyera</span> Qurmoqchimisiz?</h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl">O'zbekistondagi eng ilg'or laboratoriya jamoasiga qo'shiling va kelajakni biz bilan birga quring.</p>
              <Link to="/careers" className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-white hover:text-primary transition-all flex items-center gap-3 inline-flex">Hozir Topshirish <Briefcase size={20} /></Link>
            </div>
            <div className="relative z-10 hidden lg:block">
              <div className="w-64 h-64 bg-white/10 rounded-[3rem] rotate-12 flex items-center justify-center border border-white/20"><Award size={100} className="text-primary" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT & MAP (KONTAKT) */}
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
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:bg-primary transition-all shadow-xl"><Mail className="text-primary group-hover:text-white" size={28} /></div>
                  <div><p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Email</p><p className="text-lg font-bold dark:text-white">info@guliston-mitsl.uz</p></div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d855.5397411662528!2d65.37868315078254!3d40.10527688743476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c76261daf63d%3A0x64365eaea7a549c7!2sGuliston-MITS%20tahlil%20laboratoriyasi!5e1!3m2!1sru!2s!4v1767368521578!5m2!1sru!2s" className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-125" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 relative bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-primary rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-[0_40px_100px_rgba(0,166,118,0.3)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
                 <h2 className="text-4xl md:text-7xl font-serif font-bold mb-10 leading-tight">Loyihangiz sifatiga <span className="text-secondary italic">ishonch</span> hosil qiling</h2>
                 <Link to="/add-shartnoma" className="bg-white text-primary px-12 py-6 rounded-full font-bold text-xl hover:bg-secondary hover:text-white transition-all shadow-2xl flex items-center gap-4 group mx-auto inline-flex">Online Ariza Berish <ArrowRight className="group-hover:translate-x-2 transition-transform" /></Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
