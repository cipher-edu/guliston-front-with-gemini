
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, Beaker, ShieldCheck, Cpu, 
  GraduationCap, Layers, ChevronRight, X, 
  CheckCircle2, Microscope, ArrowRight, 
  ClipboardList, Clock, Zap, BarChart3, 
  Binary, ShieldAlert, BookOpen, Target,
  Settings, Info, MoveRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../LanguageContext';

interface ServiceDetail {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  tests: { name: string; standard: string }[];
  equipment: string[];
  benefits: string[];
  duration: string;
  accuracy: string;
}

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const { t, language } = useTranslation();

  const serviceList: ServiceDetail[] = [
    {
      id: 'chemical',
      title: language === 'uz' ? 'Kimyoviy Tahlillar' : language === 'ru' ? 'Химический анализ' : 'Chemical Analysis',
      desc: language === 'uz' ? 'Materiallarning molekulyar darajadagi tarkibini va kimyoviy xossalarini aniqlash.' : 'Studying materials at the atomic level and their chemical properties.',
      longDesc: language === 'uz' ? 'Bizning kimyo laboratoriyamiz materiallarning elementar tarkibini aniqlashda eng zamonaviy tahlil usullaridan foydaniladi. Bu qurilishda ishlatiladigan sement, gips va boshqa bog\'lovchi moddalarning sifatini 100% kafolatlashga imkon beradi.' : 'Our chemical lab uses state-of-the-art analysis methods to identify elemental compositions, ensuring 100% quality guarantee for binders.',
      icon: <FlaskConical className="w-10 h-10" />,
      color: 'text-primary',
      bg: 'bg-primary/10',
      duration: '1-3 ' + (language === 'uz' ? 'ish kuni' : 'days'),
      accuracy: '99.99%',
      tests: [
        { name: language === 'uz' ? "Oksidlar miqdorini aniqlash" : "Oxide content", standard: "GOST 5382" },
        { name: language === 'uz' ? "Mineralogik tarkib" : "Mineralogical content", standard: "X-Ray Diffraction" }
      ],
      equipment: ["XRD Diffractometer", "Spectrophotometer"],
      benefits: language === 'uz' ? ["Haqiqiy tarkib", "Xalqaro standartlar"] : ["True composition", "Intl standards"]
    },
    {
      id: 'physical',
      title: language === 'uz' ? 'Fizik-Mexanik Sinovlar' : language === 'ru' ? 'Физико-механические испытания' : 'Physico-Mechanical Testing',
      desc: language === 'uz' ? 'Materiallarning mustahkamligi, egiluvchanligi va fizik chidamliligini tekshirish.' : 'Checking strength, elasticity, and physical durability of materials.',
      longDesc: language === 'uz' ? 'Konstruksiyalarning xavfsizligi ularning mexanik xossalariga bog\'liq. Biz beton va armatura materiallarini ekstremal yuklamalar ostida sinovdan o\'tkazamiz.' : 'Safety depends on mechanical properties. We test concrete and rebar under extreme loads.',
      icon: <Beaker className="w-10 h-10" />,
      color: 'text-accent',
      bg: 'bg-accent/10',
      duration: '3-28 ' + (language === 'uz' ? 'kun' : 'days'),
      accuracy: 'High Precision',
      tests: [ 
        { name: language === 'uz' ? "Siqilishga mustahkamlik" : "Compression strength", standard: "GOST 10180" }
      ],
      equipment: ["2000kN Hydraulic Press"],
      benefits: language === 'uz' ? ["Xavfsizlik kafolati", "Yuridik kuch"] : ["Safety guarantee", "Legal force"]
    },
    {
      id: 'cert',
      title: language === 'uz' ? 'Sertifikatlash va Nazorat' : language === 'ru' ? 'Сертификация и Контроль' : 'Certification',
      desc: language === 'uz' ? 'Mahsulotlarning milliy va xalqaro standartlarga muvofiqligini tasdiqlash.' : 'Confirming product compliance with standards.',
      longDesc: language === 'uz' ? 'Mahsulotingiz bozorga chiqishi uchun barcha zaruriy sertifikatlar va muvofiqlik hujjatlarini rasmiylashtiramiz.' : 'We process all certificates needed for market compliance.',
      icon: <ShieldCheck className="w-10 h-10" />,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      duration: '5-10 days',
      accuracy: 'Legal Compliance',
      tests: [{ name: "Standard Compliance", standard: "ISO/IEC 17025" }],
      equipment: ["Compliance Database"],
      benefits: ["Market Access", "Brand Trust"]
    },
    {
      id: 'rd',
      title: 'R&D',
      desc: language === 'uz' ? 'Innovatsion materiallar yaratish va ularni optimallashtirish.' : 'Creating innovative materials.',
      longDesc: 'Scientific research for better materials.',
      icon: <Binary className="w-10 h-10" />,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      duration: 'Varies',
      accuracy: 'Innovation',
      tests: [{ name: "Material Modification", standard: "Lab R&D" }],
      equipment: ["Scanning Electron Microscope"],
      benefits: ["Future Ready", "Cost Efficient"]
    },
    {
      id: 'training',
      title: language === 'uz' ? 'O\'quv Kurslari' : 'Training',
      desc: language === 'uz' ? 'Muhandis va xodimlar uchun amaliy darslar.' : 'Practical training for engineers.',
      longDesc: 'Training programs for laboratory staff.',
      icon: <GraduationCap className="w-10 h-10" />,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      duration: '1-4 weeks',
      accuracy: 'Professional',
      tests: [{ name: "Practical Lab Work", standard: "Certified" }],
      equipment: ["Training Lab"],
      benefits: ["Skill Upgrade", "Certificate"]
    },
    {
      id: 'consult',
      title: 'Consulting',
      desc: language === 'uz' ? 'Material tanlash va sifat nazorati bo‘yicha maslahatlar.' : 'Advice on quality control.',
      longDesc: 'Expert technical consulting.',
      icon: <Layers className="w-10 h-10" />,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      duration: 'On-demand',
      accuracy: 'Expertise',
      tests: [{ name: "Project Audit", standard: "Technical Review" }],
      equipment: ["Expert Database"],
      benefits: ["Risk Reduction", "Optimal Selection"]
    }
  ];

  return (
    <div className="pt-32 pb-40 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-primary/20">
            <ClipboardList size={16} /> {t.services_page.badge}
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-black text-secondary dark:text-white mb-8">
            {t.services_page.title}
          </h1>
          <p className="text-xl text-neutralDark/60 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            {t.services_page.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <motion.div 
              key={service.id} 
              layoutId={`card-${service.id}`}
              onClick={() => setSelectedService(service)} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-12 rounded-[3rem] group hover:bg-secondary dark:hover:bg-primary/20 transition-all duration-500 cursor-pointer border border-white/20 shadow-xl relative overflow-hidden"
            >
              <div className={`w-20 h-20 ${service.bg} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                <div className={service.color}>{service.icon}</div>
              </div>
              <h3 className="text-2xl font-black mb-4 dark:text-white group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-neutralDark/60 dark:text-gray-400 mb-10 group-hover:text-white/70 line-clamp-3 leading-relaxed font-light">{service.desc}</p>
              
              <div className="flex items-center gap-3 font-black text-primary group-hover:text-white text-[10px] uppercase tracking-widest">
                {t.common.details} <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)} className="absolute inset-0 bg-secondary/95 backdrop-blur-2xl" />
            <motion.div 
              layoutId={`card-${selectedService.id}`} 
              className="bg-white dark:bg-slate-900 w-full md:max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="w-full lg:w-2/5 bg-gray-50 dark:bg-slate-800 p-12 lg:p-16 border-r dark:border-white/5 overflow-y-auto">
                <div className={`w-20 h-20 ${selectedService.bg} rounded-3xl flex items-center justify-center mb-10`}>
                   <div className={selectedService.color}>{selectedService.icon}</div>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-secondary dark:text-white mb-8">{selectedService.title}</h2>
                <p className="text-xl text-neutralDark/70 dark:text-gray-300 mb-12 leading-relaxed font-light">{selectedService.longDesc}</p>
                
                <div className="space-y-4 mb-12">
                   <div className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-white/5 shadow-sm">
                      <Clock className="text-primary" size={28} />
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.services_page.modal_duration}</p>
                        <p className="font-bold dark:text-white">{selectedService.duration}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-white/5 shadow-sm">
                      <Target className="text-accent" size={28} />
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.services_page.modal_accuracy}</p>
                        <p className="font-bold dark:text-white">{selectedService.accuracy}</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex-grow p-12 lg:p-16 bg-white dark:bg-slate-900 relative overflow-y-auto">
                <button onClick={() => setSelectedService(null)} className="absolute top-10 right-10 p-4 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20 text-secondary dark:text-white"><X size={32} /></button>
                
                <h4 className="flex items-center gap-3 text-2xl font-black text-secondary dark:text-white mb-10"><Microscope className="text-primary" size={28} /> {t.services_page.modal_tests}</h4>
                <div className="grid gap-4 mb-16">
                  {selectedService.tests.map((test, i) => (
                    <div key={i} className="flex justify-between items-center p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all">
                      <span className="font-bold text-secondary dark:text-gray-300">{test.name}</span>
                      <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">{test.standard}</span>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 mb-12">
                   <p className="text-sm text-primary font-bold flex items-center gap-4">
                     <Info size={24} /> {t.services_page.modal_intl}
                   </p>
                </div>

                <Link to="/add-shartnoma" onClick={() => setSelectedService(null)} className="w-full bg-primary text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-secondary transition-all flex items-center justify-center gap-5 group">
                  {t.common.apply_now} <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
