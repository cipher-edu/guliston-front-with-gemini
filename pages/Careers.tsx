
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, GraduationCap, Heart, Globe } from 'lucide-react';
import { useTranslation } from '../LanguageContext';

const Careers: React.FC = () => {
  const { t, language } = useTranslation();

  const jobs = [
    {
      title: language === 'uz' ? 'Kimyoviy Tahlil Mutaxassisi' : language === 'ru' ? 'Специалист по химанализу' : 'Chemical Analysis Specialist',
      location: 'Karmana, Navoiy',
      type: language === 'uz' ? 'To‘liq stavka' : 'Full-time',
      experience: '3+ ' + (language === 'en' ? 'years' : 'yil')
    },
    {
      title: language === 'uz' ? 'Laboratoriya Muhandisi' : language === 'ru' ? 'Инженер лаборатории' : 'Lab Engineer',
      location: 'Karmana, Navoiy',
      type: language === 'uz' ? 'To‘liq stavka' : 'Full-time',
      experience: '2+ ' + (language === 'en' ? 'years' : 'yil')
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#0F172A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white mb-6">{t.careers_page.title}</h1>
          <p className="text-xl text-neutralDark/60 dark:text-gray-400 max-w-2xl mx-auto">{t.careers_page.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24 text-center">
          <div className="p-8 rounded-3xl bg-neutralLight dark:bg-white/5">
            <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">{t.careers_page.edu_title}</h3>
            <p className="text-neutralDark/60 dark:text-gray-400">{t.careers_page.edu_desc}</p>
          </div>
          <div className="p-8 rounded-3xl bg-neutralLight dark:bg-white/5">
            <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">{t.careers_page.social_title}</h3>
            <p className="text-neutralDark/60 dark:text-gray-400">{t.careers_page.social_desc}</p>
          </div>
          <div className="p-8 rounded-3xl bg-neutralLight dark:bg-white/5">
            <Globe className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">{t.careers_page.intl_title}</h3>
            <p className="text-neutralDark/60 dark:text-gray-400">{t.careers_page.intl_desc}</p>
          </div>
        </div>

        <h2 className="text-3xl font-serif font-bold text-secondary dark:text-white mb-12">{t.careers_page.open_jobs}</h2>
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex items-center gap-6 w-full">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors"><Briefcase className="text-primary group-hover:text-white" /></div>
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white">{job.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-neutralDark/50 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1"><GraduationCap size={14} /> {job.experience}</span>
                  </div>
                </div>
              </div>
              <button className="bg-secondary dark:bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-all flex items-center gap-2 group-hover:translate-x-2">
                {t.careers_page.apply_btn} <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
