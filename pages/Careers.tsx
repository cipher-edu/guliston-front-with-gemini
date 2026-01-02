import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, GraduationCap, Heart, Globe } from 'lucide-react';

const Careers: React.FC = () => {
  const jobs = [
    {
      title: 'Kimyoviy Tahlil Mutaxassisi',
      location: 'Karmana, Navoiy',
      type: 'To‘liq stavka',
      experience: '3+ yil',
      salary: 'Kelishilgan holda'
    },
    {
      title: 'Laboratoriya Muhandisi',
      location: 'Karmana, Navoiy',
      type: 'To‘liq stavka',
      experience: '2+ yil',
      salary: 'Kelishilgan holda'
    },
    {
      title: 'Sifat Nazorati Menejeri',
      location: 'Karmana, Navoiy',
      type: 'To‘liq stavka',
      experience: '5+ yil',
      salary: 'Kelishilgan holda'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#0F172A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white mb-6">Jamoamizga Qo‘shiling</h1>
          <p className="text-xl text-neutralDark/60 dark:text-gray-400 max-w-2xl mx-auto">
            Ilm-fan va sifatga sodiq professional mutaxassislar uchun zamonaviy ish muhiti va o‘sish imkoniyatlari.
          </p>
        </motion.div>

        {/* Culture Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-neutralLight dark:bg-white/5 text-center">
            <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">Doimiy Ta’lim</h3>
            <p className="text-neutralDark/60 dark:text-gray-400">Xodimlarimiz uchun doimiy treninglar va xalqaro malaka oshirish kurslari.</p>
          </div>
          <div className="p-8 rounded-3xl bg-neutralLight dark:bg-white/5 text-center">
            <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">Ijtimoiy Himoya</h3>
            <p className="text-neutralDark/60 dark:text-gray-400">Tibbiy sug‘urta, bonuslar va xodimlar salomatligi uchun barcha sharoitlar.</p>
          </div>
          <div className="p-8 rounded-3xl bg-neutralLight dark:bg-white/5 text-center">
            <Globe className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">Xalqaro Muhit</h3>
            <p className="text-neutralDark/60 dark:text-gray-400">Dunyo standartlari asosida ishlash va global loyihalarda ishtirok etish.</p>
          </div>
        </div>

        {/* Job Listings */}
        <h2 className="text-3xl font-serif font-bold text-secondary dark:text-white mb-12">Ochiq ish o‘rinlari</h2>
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6 w-full">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Briefcase className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-neutralDark/50 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1"><GraduationCap size={14} /> {job.experience}</span>
                  </div>
                </div>
              </div>
              <button className="whitespace-nowrap bg-secondary dark:bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-all flex items-center gap-2 group-hover:translate-x-2">
                Ariza topshirish <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;