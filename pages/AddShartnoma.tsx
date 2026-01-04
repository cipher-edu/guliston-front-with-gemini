
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Package, Shield, 
  Loader2, CheckCircle2, AlertCircle, 
  ClipboardCheck, RefreshCcw, ArrowLeft,
  Phone, Briefcase, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useTranslation } from '../LanguageContext';

const AddShartnoma: React.FC = () => {
  const { t, language } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    product_name: '',
    quantity: '',
    test_type: language === 'uz' ? 'Kimyoviy tahlil' : 'Chemical analysis',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('applications', formData);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(t.common.error_title + " " + (err.message || "Network error"));
    } finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] flex flex-col items-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-10 md:p-16 rounded-[3rem] text-center max-w-2xl border border-primary/20 shadow-2xl w-full">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle2 className="text-primary w-10 h-10" /></div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-secondary dark:text-white mb-6">{t.form_page.success_title}</h1>
          <p className="text-lg text-neutralDark/70 dark:text-gray-300 mb-10">{t.form_page.success_desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setSubmitted(false)} className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all">
              <RefreshCcw size={18} /> {t.form_page.btn_new}
            </button>
            <Link to="/" className="bg-secondary text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-primary transition-all">
              <ArrowLeft size={18} /> {t.common.back_to_home}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-neutralLight dark:bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-primary/20">
            <ClipboardCheck size={14} /> {t.form_page.badge}
          </div>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-secondary dark:text-white">{t.form_page.title}</h1>
          <p className="mt-4 text-neutralDark/50 dark:text-gray-400 max-w-lg mx-auto italic">{t.form_page.confidential}</p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 font-bold">
            <AlertCircle size={20} /> {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="glass p-8 md:p-14 rounded-[3rem] shadow-2xl space-y-10 border border-white/5 backdrop-blur-3xl w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-white/5 pb-2">
                <User size={18} className="text-primary"/> {t.form_page.section_client}
              </h3>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="client_name" value={formData.client_name} onChange={handleChange} type="text" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:border-primary focus:outline-none transition-all" placeholder={t.form_page.input_name} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:border-primary focus:outline-none transition-all" placeholder={t.form_page.input_phone} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-white/5 pb-2">
                <Package size={18} className="text-accent"/> {t.form_page.section_material}
              </h3>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="product_name" value={formData.product_name} onChange={handleChange} type="text" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:border-accent focus:outline-none transition-all" placeholder={t.form_page.input_product} />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="quantity" value={formData.quantity} onChange={handleChange} type="text" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:border-accent focus:outline-none transition-all" placeholder={t.form_page.input_qty} />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
             <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-white/5 pb-2">
                <FileText size={18} className="text-primary"/> {t.form_page.section_service}
             </h3>
             <select name="test_type" value={formData.test_type} onChange={handleChange} className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl px-5 py-4 focus:border-primary focus:outline-none appearance-none transition-all">
               <option value="Kimyoviy tahlil">{language === 'uz' ? 'Kimyoviy tahlil' : 'Chemical analysis'}</option>
               <option value="Fizik-mexanik sinov">{language === 'uz' ? 'Fizik-mexanik sinov' : 'Physical-mechanical testing'}</option>
               <option value="Sertifikatlash">{language === 'uz' ? 'Sertifikatlash' : 'Certification'}</option>
               <option value="R&D">{language === 'uz' ? 'Ilmiy tadqiqot (R&D)' : 'Research & Development'}</option>
             </select>
             <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl px-5 py-4 focus:border-primary focus:outline-none transition-all" placeholder={t.form_page.input_notes}></textarea>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-primary text-white py-6 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl shadow-2xl flex items-center justify-center gap-3 hover:bg-secondary hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />} 
            {loading ? t.common.sending : t.common.send}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShartnoma;
