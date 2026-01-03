
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, Microscope, Award, Users, ShieldCheck, 
  FlaskConical, Cpu, Globe, Zap, CheckCircle2, 
  Linkedin, Mail, BadgeCheck, GraduationCap
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

const About: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Akmal Fayzullayev",
      role: "Laboratoriya Mudiri",
      specialty: "Kimyo fanlari nomzodi",
      image: "https://i.pravatar.cc/300?u=akmal",
      bio: "20 yillik tajribaga ega ekspert. Qurilish materiallari kimyoviy tarkibini o'rganish bo'yicha 30 dan ortiq ilmiy maqolalar muallifi."
    },
    {
      name: "Zuhra Karimova",
      role: "Bosh Muhandis",
      specialty: "Fizika-mexanika sinovlari",
      image: "https://i.pravatar.cc/300?u=zuhra",
      bio: "Beton va temir-beton konstruksiyalarning chidamliligini tahlil qilish bo'yicha yetakchi mutaxassis."
    },
    {
      name: "Jamshid Alimov",
      role: "Sifat Menejeri",
      specialty: "ISO/IEC 17025 Standartlari",
      image: "https://i.pravatar.cc/300?u=jamshid",
      bio: "Xalqaro akkreditatsiya va metrologik tekshiruvlar bo'yicha mas'ul shaxs."
    },
    {
      name: "Sardor Rahmonov",
      role: "Katta Ilmiy Xodim",
      specialty: "Innovatsion materiallar (R&D)",
      image: "https://i.pravatar.cc/300?u=sardor",
      bio: "Mahalliy xomashyodan foydalanib yuqori mustahkamlikka ega materiallar yaratish bo'yicha tadqiqotchi."
    }
  ];

  const expertises = [
    { icon: <FlaskConical />, title: "Molekulyar Tahlil", desc: "Materiallarning atom va molekula darajasidagi tarkibi." },
    { icon: <Cpu />, title: "Raqamli Sinov", desc: "AI yordamida yuklama va bosim natijalarini prognozlash." },
    { icon: <Globe />, title: "Xalqaro Tan olinish", desc: "ILAC MRA doirasida natijalarimiz dunyo bo'ylab amal qiladi." },
    { icon: <Zap />, title: "Ekspress Metodlar", desc: "24 soat ichida dastlabki tahlil natijalarini taqdim etish." }
  ];

  const stats = [
    { label: "Ilmiy Xodimlar", value: "25+" },
    { label: "Zamonaviy Uskunalar", value: "100+" },
    { label: "Yillik Loyihalar", value: "5000+" },
    { label: "Akkreditatsiya Doirasi", value: "450+" }
  ];

  return (
    <div className="pt-24 pb-20 dark:bg-[#0F172A] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
                <Microscope size={16} /> Markaziy Laboratoriya Haqida
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary dark:text-white mb-8 leading-tight">
                Biz <span className="text-primary italic">Sifatning</span> Ilmiy Kafolatimiz
              </h1>
              <p className="text-xl text-neutralDark/70 dark:text-gray-300 leading-relaxed mb-10 max-w-xl">
                «GULISTON-MITSL» – bu nafaqat laboratoriya, balki qurilish sohasidagi innovatsiyalar generatoridir. 2005-yildan buyon biz xavfsizlik va mustahkamlikni raqamlarda isbotlab kelmoqdamiz.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-12 border-t border-gray-100 dark:border-white/10 pt-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Target className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary dark:text-white">Missiyamiz</h4>
                    <p className="text-neutralDark/50 dark:text-gray-400 text-sm">O'zbekiston qurilish bozori uchun xalqaro darajadagi sifat standartlarini ta'minlash.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Eye className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary dark:text-white">Nigohimiz</h4>
                    <p className="text-neutralDark/50 dark:text-gray-400 text-sm">Raqamli texnologiyalar orqali laboratoriya tahlillari shaffofligini oshirish.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1000" className="w-full h-[600px] object-cover" alt="Lab Research" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"></div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 glass p-8 rounded-[2rem] shadow-2xl z-20 max-w-[280px] border-l-4 border-primary"
              >
                <div className="text-5xl font-serif font-bold text-primary mb-2">20 yillik</div>
                <p className="text-secondary dark:text-white font-bold leading-tight">Uzilishlarsiz ilmiy faoliyat va sohaviy ishonch poydevori.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numerical Stats */}
      <section className="py-20 bg-secondary dark:bg-[#0B1221] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-serif font-bold text-primary mb-3">{stat.value}</div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Expertise Grid */}
      <section className="py-32 bg-neutralLight dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Bizning Imkoniyatlarimiz</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white">Nega Aynan Bizning Tahlillar?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertises.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[2.5rem] border border-white/20 shadow-xl group hover:bg-white dark:hover:bg-white/5 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon as any, { size: 32 })}
                </div>
                <h4 className="text-2xl font-bold text-secondary dark:text-white mb-4">{item.title}</h4>
                <p className="text-neutralDark/60 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white dark:bg-[#0B1221]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-widest mb-4">
                <Users size={14} /> Bizning Jamoa
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white leading-tight">
                Sifatni Tasdiqlovchi <span className="text-primary italic">Zukkolar</span>
              </h3>
            </div>
            <p className="text-neutralDark/50 dark:text-gray-400 max-w-md md:text-right">
              Markazimizda o'z ishining ustalari, xalqaro tajribaga ega bo'lgan olimlar va muhandislar faoliyat olib boradilar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-[380px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                  <img src={member.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={member.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Linkedin size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Mail size={14} />
                      </button>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{member.role}</p>
                  </div>
                </div>
                
                <div className="px-2">
                  <p className="text-accent font-bold text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <GraduationCap size={14} /> {member.specialty}
                  </p>
                  <p className="text-neutralDark/60 dark:text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="py-32 bg-neutralLight dark:bg-[#0F172A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-12 md:p-20 rounded-[4rem] border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white mb-8">
                Xalqaro Standartlar va <span className="text-primary italic">Ishonch</span>
              </h3>
              <p className="text-lg text-neutralDark/60 dark:text-gray-400 mb-10 leading-relaxed">
                Bizning laboratoriyamiz O'zAK tomonidan xalqaro ISO/IEC 17025:2019 standarti talablariga muvofiq akkreditatsiyadan o'tgan. Bu bizning sinov natijalarimiz jahon bozorida tan olinishini anglatadi.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Metrologik kuzatuvchanlik kafolati",
                  "Sinovlar xolisligi va mustaqilligi",
                  "Mijoz ma'lumotlari maxfiyligi (NDA)",
                  "Zamonaviy tahliliy metodologiyalar"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-secondary dark:text-white font-bold">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-8">
              <div className="aspect-square glass-dark rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center border-none shadow-2xl">
                <Award className="text-accent w-16 h-16 mb-6" />
                <p className="text-white font-bold text-sm uppercase tracking-widest">ISO 17025 Akkreditatsiya</p>
              </div>
              <div className="aspect-square bg-primary rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                <ShieldCheck className="text-white w-16 h-16 mb-6" />
                <p className="text-white font-bold text-sm uppercase tracking-widest">100% Sifat Nazorati</p>
              </div>
              <div className="aspect-square glass-dark rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center border-none shadow-2xl">
                <BadgeCheck className="text-primary w-16 h-16 mb-6" />
                <p className="text-white font-bold text-sm uppercase tracking-widest">Davlat Reestri №0235</p>
              </div>
              <div className="aspect-square bg-accent rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                <FlaskConical className="text-white w-16 h-16 mb-6" />
                <p className="text-white font-bold text-sm uppercase tracking-widest">R&D Laboratoriyasi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-32 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-secondary dark:text-white mb-20 text-center italic">Rivojlanish Solnomasi</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 dark:bg-white/5 -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-24">
              {[
                { year: '2005', title: 'Poydevor', desc: 'Qurilish materiallarini sinash bo\'yicha ixtisoslashgan ilk markaziy laboratoriyaning ochilishi.' },
                { year: '2012', title: 'Sifat Cho\'qqisi', desc: 'Xalqaro ISO sertifikatini qo\'lga kiritish va xizmatlar ko\'lamini kengaytirish.' },
                { year: '2019', title: 'Texnologik Inqilob', desc: 'Germaniya va Yaponiyadan keltirilgan eng so\'nggi tahliliy uskunalar bilan laboratoriyani jihozlash.' },
                { year: '2025', title: 'Raqamli Kelajak', desc: 'AI asoslangan tahlil tizimi va masofaviy natijalar kuzatuvi xizmatini yo\'lga qo\'yish.' }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 flex justify-center">
                    <div className="text-6xl font-serif font-bold text-primary/20">{step.year}</div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-slate-800 shadow-xl hidden md:block z-10"></div>
                  <div className="md:w-1/2">
                    <div className="glass p-10 rounded-[2.5rem] border border-white/20 shadow-xl">
                      <h4 className="text-2xl font-bold text-secondary dark:text-white mb-4">{step.title}</h4>
                      <p className="text-neutralDark/60 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <motion.h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">
            Biz bilan bog'laning va sifatni his qiling
          </motion.h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Mutaxassislarimiz sizning loyihangiz uchun eng maqbul laboratoriya sinovlari dasturini ishlab chiqishga tayyor.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-secondary hover:text-white transition-all shadow-2xl">
              Jamoaga qo'shilish
            </button>
            <button className="border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Hamkorlik qilish
            </button>
          </div>
        </div>
        <Microscope className="absolute -bottom-20 -left-20 w-96 h-96 text-white/5 -rotate-12" />
      </section>
    </div>
  );
};

export default About;
