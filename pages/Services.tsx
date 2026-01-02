
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, Beaker, FileCheck, Search, Users, Settings, 
  ChevronRight, X, CheckCircle2, Cpu, ShieldCheck, 
  Microscope, Layers, ArrowRight, ClipboardList, Clock, 
  Zap, Info, BarChart3, Binary, ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const serviceList: ServiceDetail[] = [
    {
      id: 'chemical',
      title: 'Kimyoviy Tahlillar',
      desc: 'Materiallarning molekulyar darajadagi tarkibini va kimyoviy xossalarini aniqlash.',
      longDesc: 'Bizning kimyo laboratoriyamiz materiallarning elementar tarkibini aniqlashda eng zamonaviy atom-absorbsion va spektral tahlil usullaridan foydalanadi. Qurilish materiallarining nafaqat asosiy tarkibini, balki ularning uzoq muddatli korroziyaga bardoshliligini va zaharli moddalar miqdorini tahlil qilamiz.',
      icon: <FlaskConical className="w-10 h-10" />,
      color: 'text-primary',
      bg: 'bg-primary/10',
      duration: '1-3 ish kuni',
      accuracy: '99.98%',
      tests: [
        { name: "Oksidlar miqdorini aniqlash (CaO, MgO, SiO2)", standard: "GOST 5382" },
        { name: "Xloridlar va sulfatlarning massa ulushi", standard: "O'z DSt 9001" },
        { name: "Eruvchan tuzlar miqdori tahlili", standard: "ISO 17025" },
        { name: "Ph ko'rsatkichi va kislotalilik darajasi", standard: "ASTM E70" }
      ],
      equipment: ["XRD Rentgen difraktometri", "Spektrofotometr UV-Vis", "Yuqori haroratli mufel pechlari"],
      benefits: [
        "Materialning haqiqiy tarkibini aniqlash",
        "Atrof-muhitga zarari yo'qligini isbotlash",
        "Ishlab chiqarish nuqsonlarini erta aniqlash"
      ]
    },
    {
      id: 'physical',
      title: 'Fizik-Mexanik Sinovlar',
      desc: 'Materiallarning mustahkamligi, egiluvchanligi va fizik chidamliligini tekshirish.',
      longDesc: 'Qurilish konstruksiyalarining xavfsizligi ularning mexanik xossalariga bog\'liq. Biz materiallarni ekstremal sharoitlarda (yuqori bosim, sovuq, namlik) sinovdan o‘tkazamiz. Sinovlar to\'liq avtomatlashtirilgan stendlarda inson omilisiz bajariladi.',
      icon: <Beaker className="w-10 h-10" />,
      color: 'text-accent',
      bg: 'bg-accent/10',
      duration: '3-28 kun (standartga ko\'ra)',
      accuracy: 'Yuqori aniqlikdagi datchiklar',
      tests: [
        { name: "Siqilish va egilishga mustahkamlik", standard: "GOST 10180" },
        { name: "Sovuqqa chidamlilik (F-tsikllar)", standard: "GOST 10060" },
        { name: "Suv o'tkazuvchanlik (W-belgi)", standard: "GOST 12730" },
        { name: "Zichlik va shimuvchanlik", standard: "EN 12390" }
      ],
      equipment: ["2000kN Gidravlik press", "Muzlatish kameralari (-40°C)", "Vibrostol va qoliplash uskunalari"],
      benefits: [
        "Loyiha yuklamalariga bardoshlilik kafolati",
        "Ob'ektning uzoq muddatli xavfsizligi",
        "Xalqaro tan olingan bayonnomalar"
      ]
    },
    {
      id: 'certification',
      title: 'Sertifikatlash va Nazorat',
      desc: 'Mahsulotlarning milliy va xalqaro standartlarga muvofiqligini tasdiqlash.',
      longDesc: 'Bozorga chiqarilayotgan har qanday qurilish mahsuloti xavfsizlik standartlariga javob berishi shart. Biz akkreditatsiyadan o‘tgan laboratoriya sifatida rasmiy muvofiqlik sertifikatlarini taqdim etamiz va mahsulotingizga bozor ishonchini ta\'minlaymiz.',
      icon: <FileCheck className="w-10 h-10" />,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      duration: '5-10 ish kuni',
      accuracy: 'Yuridik kafolat',
      tests: [
        { name: "Texnik shartlarga muvofiqlik auditi", standard: "ISO/IEC 17065" },
        { name: "Ekspertiza xulosalarini tayyorlash", standard: "O'z DSt" },
        { name: "Sifat tizimini tekshirish", standard: "ISO 9001" },
        { name: "Yillik nazorat sinovlari", standard: "GOST R" }
      ],
      equipment: ["Elektron hujjat almashinuvi tizimi", "QR-kodli identifikatsiya stendlari"],
      benefits: [
        "Eksport imkoniyatlarini kengaytirish",
        "Davlat tenderlarida ustunlik",
        "Brend ishonchliligini oshirish"
      ]
    },
    {
      id: 'research',
      title: 'Ilmiy Tadqiqotlar (R&D)',
      desc: 'Innovatsion materiallar yaratish va ularning xususiyatlarini optimallashtirish.',
      longDesc: 'Biz faqat tayyor materiallarni tekshirmaymiz, balki yangi, tejamkor va bardoshli qurilish materiallari retsepturalarini ishlab chiqamiz. Ilmiy xodimlarimiz mahalliy xomashyodan foydalanish samaradorligini oshirish ustida ishlaydi.',
      icon: <Search className="w-10 h-10" />,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      duration: 'Individual (loyihaga qarab)',
      accuracy: 'Akademik daraja',
      tests: [
        { name: "Modifikatorlarning ta'sirini o'rganish", standard: "Internal Protocol" },
        { name: "Mikrotuzilmani mikroskopik tahlil qilish", standard: "SEM Analysis" },
        { name: "Termik barqarorlik tahlili", standard: "DSC/TGA" },
        { name: "Yangi kompozit materiallar sinovi", standard: "R&D Base" }
      ],
      equipment: ["Elektron mikroskop", "Diferensial termik analizator", "Analitik dasturlar"],
      benefits: [
        "Mahsulot tannarxini pasaytirish",
        "Eksklyuziv patentlar olish",
        "Texnologik ustunlikka ega bo'lish"
      ]
    },
    {
      id: 'training',
      title: 'Professional Malaka Oshirish',
      desc: 'Sohadagi muhandis va laboratoriya xodimlari uchun amaliy o‘quv kurslari.',
      longDesc: 'Zamonaviy uskunalar bilan ishlash uchun bilim kerak. Biz laboratoriya mudirlari va sifat nazorati bo‘yicha muhandislar uchun xalqaro metodologiyalar asosida mahorat darslarini tashkil qilamiz. O\'quv dasturi ISO 17025 talablariga to\'liq mos keladi.',
      icon: <Users className="w-10 h-10" />,
      color: 'text-red-500',
      bg: 'bg-red-100',
      duration: '1 haftadan 1 oygacha',
      accuracy: 'Sertifikatlangan ta\'lim',
      tests: [
        { name: "Laboratoriya menejmenti kursi", standard: "ISO 17025" },
        { name: "O'lchash noaniqligini hisoblash", standard: "GUM Guide" },
        { name: "Ichki audit o'tkazish", standard: "ISO 19011" },
        { name: "Metrologik nazorat", standard: "VIM3" }
      ],
      equipment: ["Simulyatsiya xonasi", "Uskunalar bilan bevosita ishlash bazasi"],
      benefits: [
        "Xodimlarning malakasini oshirish",
        "Xalqaro sertifikatlarga ega bo'lish",
        "Xatolar ehtimolini kamaytirish"
      ]
    },
    {
      id: 'consulting',
      title: 'Texnik Konsalting',
      desc: 'Loyiha bosqichida materiallar tanlash va sifat nazorati bo‘yicha maslahatlar.',
      longDesc: 'Qurilishni boshlashdan oldin to‘g‘ri material tanlash katta mablag‘ni tejaydi. Biz ob\'ektning joylashuvi va iqlimiy sharoitidan kelib chiqib, eng maqbul yechimlarni tavsiya qilamiz hamda joyiga borib nazoratni tashkil etamiz.',
      icon: <Settings className="w-10 h-10" />,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      duration: 'Doimiy hamkorlik',
      accuracy: 'Ekspert xulosasi',
      tests: [
        { name: "Materiallar tannarxini optimallashtirish", standard: "Value Engineering" },
        { name: "Loyiha hujjatlari ekspertizasi", standard: "KMK / ShNK" },
        { name: "Joyiga borib sifat nazorati", standard: "Field Inspection" },
        { name: "Raqobatbardoshlik tahlili", standard: "Market Research" }
      ],
      equipment: ["Mobil sinov uskunalari", "Professional tahliliy dasturlar"],
      benefits: [
        "Byudjetni 15-20% gacha tejash",
        "Texnik xatolarni oldini olish",
        "Sifat bo'yicha mustaqil nazorat"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutralLight dark:bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
            <ClipboardList size={16} /> MITSL Xizmatlar Katalogi
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary dark:text-white mb-8">
            Bizning <span className="text-primary italic">Imkoniyatlar</span>
          </h1>
          <p className="text-xl text-neutralDark/60 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Har bir tahlil ortida o‘nlab yillik ilmiy tajriba va eng zamonaviy uskunalarning aniq raqamlari turadi. Sifat – bizning asosiy mezonimiz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <motion.div
              key={service.id}
              layoutId={`card-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedService(service)}
              className="glass p-10 rounded-[2.5rem] group hover:bg-secondary dark:hover:bg-primary/20 transition-all duration-500 cursor-pointer border border-white/20 shadow-xl hover:shadow-primary/20 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
              
              <div className={`w-20 h-20 ${service.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 group-hover:bg-white`}>
                <div className={`${service.color} group-hover:text-primary transition-colors`}>
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 dark:text-white group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-neutralDark/60 dark:text-gray-400 leading-relaxed mb-8 group-hover:text-white/80 transition-colors">
                {service.desc}
              </p>
              
              <div className="flex items-center gap-2 font-bold text-primary group-hover:text-white transition-all">
                Tafsilotlar <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10"></div>

      {/* Detailed Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={`card-${selectedService.id}`}
              className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[92vh] rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Modal Left Side - Core Info & Stats */}
              <div className="w-full lg:w-2/5 bg-neutralLight dark:bg-slate-800 p-8 md:p-12 border-r border-gray-100 dark:border-white/5 flex flex-col overflow-y-auto">
                <div className="mb-10">
                  <div className={`w-20 h-20 ${selectedService.bg} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                    <div className={selectedService.color}>{selectedService.icon}</div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary dark:text-white mb-6 leading-tight">
                    {selectedService.title}
                  </h2>
                  <p className="text-lg text-neutralDark/70 dark:text-gray-400 leading-relaxed">
                    {selectedService.longDesc}
                  </p>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 shadow-sm">
                    <Clock className="text-primary" size={24} />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Sinov muddati</p>
                      <p className="font-bold text-secondary dark:text-white">{selectedService.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 shadow-sm">
                    <BarChart3 className="text-accent" size={24} />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Aniqilik darajasi</p>
                      <p className="font-bold text-secondary dark:text-white">{selectedService.accuracy}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
                  <h5 className="text-sm font-bold text-secondary dark:text-white mb-4 uppercase tracking-widest">Asosiy afzalliklari:</h5>
                  <ul className="space-y-3">
                    {selectedService.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-neutralDark/60 dark:text-gray-400">
                        <Zap size={14} className="text-primary shrink-0" /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Right Side - Detailed Technical Content */}
              <div className="w-full lg:w-3/5 p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900 relative">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-8 right-8 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
                >
                  <X size={28} className="text-secondary dark:text-white" />
                </button>

                <div className="space-y-12">
                  {/* Sinov turlari Table-style */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="flex items-center gap-2 text-xl font-bold text-secondary dark:text-white">
                        <Microscope className="text-primary" /> Texnik sinovlar ro'yxati
                      </h4>
                    </div>
                    <div className="grid gap-3">
                      {selectedService.tests.map((test, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={i} 
                          className="flex items-center justify-between p-5 rounded-2xl bg-neutralLight dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {i + 1}
                            </div>
                            <span className="text-secondary dark:text-gray-300 font-semibold">{test.name}</span>
                          </div>
                          <span className="text-[10px] font-bold bg-white dark:bg-slate-700 px-3 py-1 rounded-full text-neutralDark/40 dark:text-gray-500 border border-gray-100 dark:border-white/5">
                            {test.standard}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <div className="grid md:grid-cols-2 gap-10">
                    {/* Texnik bazamiz */}
                    <section className="space-y-6">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-secondary dark:text-white">
                        <Binary className="text-accent" /> Texnik baza
                      </h4>
                      <div className="space-y-3">
                        {selectedService.equipment.map((eq, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-neutralDark/60 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            {eq}
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Sertifikatlar va Akkreditatsiya */}
                    <section className="space-y-6">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-secondary dark:text-white">
                        <ShieldCheck className="text-blue-500" /> Sertifikatlash
                      </h4>
                      <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/20">
                        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed mb-4 italic">
                          Barcha sinov natijalari O'zbekiston Akkreditatsiya Markazi tomonidan tasdiqlangan maxsus bayonnomalar (Protokollar) shaklida taqdim etiladi.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-800 dark:text-blue-400 uppercase">
                          <ShieldAlert size={14} /> ISO 17025 muvofiqlik
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Informational Note */}
                  <div className="flex gap-4 p-6 rounded-3xl bg-neutralLight dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10">
                    <Info className="text-primary shrink-0" size={24} />
                    <p className="text-xs text-neutralDark/50 dark:text-gray-400 leading-relaxed">
                      <strong>Eslatma:</strong> Sinov muddatlari namunalar laboratoriyaga kelib tushgan va shartnoma rasmiylashtirilgan vaqtdan boshlab hisoblanadi. Namunalar soni va murakkabligiga qarab muddatlar mutaxassis bilan kelishilgan holda o'zgarishi mumkin.
                    </p>
                  </div>

                  {/* Action Section */}
                  <div className="pt-4">
                    <Link 
                      to="/add-shartnoma"
                      className="w-full bg-primary text-white py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-primary/40 flex items-center justify-center gap-4 transition-all active:scale-95 group"
                    >
                      <Settings className="group-hover:rotate-90 transition-transform duration-500" /> 
                      Hoziroq Ariza Berish
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
