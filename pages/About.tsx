
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, Microscope, Award, Users, ShieldCheck, 
  FlaskConical, Cpu, Globe, Zap, CheckCircle2, 
  Linkedin, Mail, BadgeCheck, GraduationCap, Briefcase
} from 'lucide-react';
import { useTranslation } from '../LanguageContext';

const About: React.FC = () => {
  const { t, language } = useTranslation();

  const teamMembers = [
    {
      name: "Radjabov Boburmirzo Komilovich",
      role: language === 'uz' ? "Direktor va asoschi" : language === 'ru' ? "Директор и основатель" : "Director & Founder",
      specialty: "Guliston-MITSL",
      image: "https://i.pravatar.cc/300?u=buburmirzo",
      bio: language === 'uz' ? "10 yildan ortiq qurilish materiallari tahlili sohasida tajribaga ega." : language === 'ru' ? "Более 10 лет опыта в сфере анализа строительных материалов." : "Over 10 years of experience in construction materials analysis."
    },
    {
      name: "Zarina Usmonova",
      role: language === 'uz' ? "Mutaxassis" : language === 'ru' ? "Специалист" : "Specialist",
      specialty: language === 'uz' ? "Kimyoviy tahlil mutaxassisi" : "Chemical analysis specialist",
      image: "https://i.pravatar.cc/300?u=zarina",
      bio: language === 'uz' ? "Molekulyar darajada o'rganish bo'yicha professional." : "Professional in molecular-level analysis."
    },
    {
      name: "Jamshid To‘rayev",
      role: language === 'uz' ? "Muhandis" : language === 'ru' ? "Инженер" : "Engineer",
      specialty: language === 'uz' ? "Fizik-mexanik tahlil muhandisi" : "Physical-mechanical analysis engineer",
      image: "https://i.pravatar.cc/300?u=jamshid2",
      bio: language === 'uz' ? "Materiallar mustahkamligi bo'yicha mutaxassis." : "Expert in material strength testing."
    }
  ];

  const expertises = [
    { icon: <FlaskConical />, title: language === 'uz' ? "Molekulyar Tahlil" : language === 'ru' ? "Молекулярный анализ" : "Molecular Analysis", desc: language === 'uz' ? "Sement va metallarning atom tarkibi." : "Atomic composition of cement and metals." },
    { icon: <Briefcase />, title: language === 'uz' ? "Sertifikatlash" : language === 'ru' ? "Сертификация" : "Certification", desc: language === 'uz' ? "Xalqaro muvofiqlik sertifikatlari." : "International certificates of conformity." },
    { icon: <Globe />, title: language === 'uz' ? "Xalqaro Tan olinish" : language === 'ru' ? "Мировое признание" : "Global Recognition", desc: language === 'uz' ? "Natijalar xalqaro talablarga mos keladi." : "Results fully comply with international requirements." },
    { icon: <Zap />, title: language === 'uz' ? "Ekspress Metodlar" : language === 'ru' ? "Экспресс-методы" : "Express Methods", desc: language === 'uz' ? "Tahlillarni tezkor bajarish." : "High-speed analysis execution." }
  ];

  return (
    <div className="pt-24 pb-20 dark:bg-[#0F172A] min-h-screen overflow-hidden">
      <section className="relative py-20 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
                <Microscope size={16} /> {t.about_page.badge}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary dark:text-white mb-8 leading-tight">
                {t.about_page.title_main}
              </h1>
              <p className="text-xl text-neutralDark/70 dark:text-gray-300 leading-relaxed mb-10 max-w-xl">
                {t.about_page.desc_main}
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-12 border-t border-gray-100 dark:border-white/10 pt-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><Target className="text-primary" /></div>
                  <div>
                    <h4 className="font-bold text-secondary dark:text-white">{t.about_page.expertise_title}</h4>
                    <p className="text-neutralDark/50 dark:text-gray-400 text-sm">{t.about_page.expertise_desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0"><Award className="text-accent" /></div>
                  <div>
                    <h4 className="font-bold text-secondary dark:text-white">{t.about_page.accreditation_title}</h4>
                    <p className="text-neutralDark/50 dark:text-gray-400 text-sm">{t.about_page.accreditation_desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1000" className="w-full h-[600px] object-cover" alt="Lab Research" />
              </div>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-10 -left-10 glass p-8 rounded-[2rem] shadow-2xl z-20 max-w-[280px] border-l-4 border-primary">
                <div className="text-5xl font-serif font-bold text-primary mb-2">{t.about_page.exp_years}</div>
                <p className="text-secondary dark:text-white font-bold leading-tight">{t.about_page.exp_desc}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary dark:bg-[#0B1221] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[ { label: t.stats.certificates, value: "150+" }, { label: "Projects", value: "20+" }, { label: "Partners", value: "10+" }, { label: t.about_page.exp_years, value: "10+" } ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-serif font-bold text-primary mb-3">{stat.value}</div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white dark:bg-[#0B1221]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-widest mb-4">
                <Users size={14} /> {t.about_page.team_badge}
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white leading-tight">
                {t.about_page.team_title}
              </h3>
            </div>
            <p className="text-neutralDark/50 dark:text-gray-400 max-w-md md:text-right">{t.about_page.team_desc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative h-[420px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                  <img src={member.image} className="w-full h-full object-cover transition-all grayscale group-hover:grayscale-0" alt={member.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-accent font-bold text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2"><GraduationCap size={14} /> {member.specialty}</p>
                  <p className="text-neutralDark/60 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary relative overflow-hidden text-white text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">{t.about_page.cta_title}</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">{t.about_page.cta_desc}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-secondary hover:text-white transition-all">{t.about_page.cta_btn_join}</button>
            <button className="border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">{t.about_page.cta_btn_collab}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
