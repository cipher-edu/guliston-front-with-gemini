
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Package, Shield, 
  Loader2, CheckCircle2, AlertCircle, 
  ClipboardCheck, Info, RefreshCcw, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const AddShartnoma: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallbackMode, setUseFallbackMode] = useState(false);
  
  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    product_name: '',
    quantity: '',
    test_type: 'Kimyoviy tahlil',
    notes: ''
  });

  const TELEGRAM_BOT_TOKEN = '8054574891:AAFjRhIDw4nFxZ7m0g7PqV6rqkGASaIx00Q';
  const TELEGRAM_RECIPIENTS = ['1062838548', '5342507970']; 

  const sendToTelegram = async (data: any, isBackup = false) => {
    const statusHeader = isBackup 
      ? '🚨 <b>ZAXIRA TIZIMI: API/CORS Bloklandi</b>' 
      : '🚀 <b>Yangi Ariza: Guliston-MITSL</b>';

    const message = `${statusHeader}
━━━━━━━━━━━━━━━━━━
<b>👤 Mijoz:</b> ${data.client_name}
<b>📞 Tel:</b> ${data.phone}
<b>📦 Mahsulot:</b> ${data.product_name}
<b>⚖️ Miqdori:</b> ${data.quantity}
<b>🔬 Sinov turi:</b> ${data.test_type}
<b>📝 Izoh:</b> ${data.notes || 'Yo\'q'}
━━━━━━━━━━━━━━━━━━
📅 Sana: ${new Date().toLocaleString('uz-UZ')}`;

    try {
      const sendPromises = TELEGRAM_RECIPIENTS.map(chatId => 
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            chat_id: chatId, 
            text: message, 
            parse_mode: 'HTML' 
          })
        })
      );
      await Promise.all(sendPromises);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      client_name: String(formData.client_name).trim(),
      phone: String(formData.phone).trim(),
      product_name: String(formData.product_name).trim(),
      quantity: String(formData.quantity).trim(),
      test_type: String(formData.test_type),
      notes: String(formData.notes).trim()
    };

    try {
      await api.post('applications', payload);
      await sendToTelegram(payload, false);
      setSubmitted(true);
    } catch (err: any) {
      const tgSuccess = await sendToTelegram(payload, true);
      if (tgSuccess) {
        setUseFallbackMode(true);
        setSubmitted(true);
      } else {
        setError("Ulanish imkonsiz. Internetni tekshiring yoki bizga qo'ng'iroq qiling: +998 71 123 45 67");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] flex flex-col items-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-center max-w-2xl border border-primary/20 shadow-2xl backdrop-blur-3xl w-full"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <CheckCircle2 className="text-primary w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h1 className="text-2xl md:text-5xl font-serif font-bold text-secondary dark:text-white mb-4 md:mb-6">Xabar yuborildi!</h1>
          <p className="text-sm md:text-lg text-neutralDark/70 dark:text-gray-300 mb-8 md:mb-10 px-4">
             {useFallbackMode 
                ? "Serverda cheklovlar aniqlandi, xabaringiz zaxira kanali orqali qabul qilindi."
                : "Arizangiz tizimga qabul qilindi. Tez orada mutaxassislarimiz bog'lanishadi."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => { setSubmitted(false); setUseFallbackMode(false); }}
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base shadow-xl flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} /> Yangi ariza
            </button>
            <Link to="/" className="bg-secondary text-white px-8 py-4 rounded-full font-bold text-base shadow-xl flex items-center justify-center gap-2">
              <ArrowLeft size={18} /> Bosh sahifa
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-neutralLight dark:bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-primary/20">
            <ClipboardCheck size={14} /> Online Ariza Tizimi
          </div>
          <h1 className="text-3xl md:text-7xl font-serif font-bold text-secondary dark:text-white">
            Sinov uchun <span className="text-primary italic">Ariza</span>
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="glass p-6 md:p-16 rounded-[2rem] md:rounded-[4rem] shadow-2xl space-y-8 md:space-y-12 border border-white/60 dark:border-white/5 backdrop-blur-3xl w-full">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400 text-xs md:text-sm">
              <AlertCircle className="shrink-0 w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-4 md:space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-secondary dark:text-white flex items-center gap-3"><User size={18} className="text-primary"/> Buyurtmachi</h3>
              <div className="space-y-4">
                <input required name="client_name" value={formData.client_name} onChange={handleChange} type="text" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-sm md:text-base focus:border-primary focus:outline-none transition-all" placeholder="F.I.SH yoki Kompaniya" />
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-sm md:text-base focus:border-primary focus:outline-none transition-all" placeholder="+998 XX XXX XX XX" />
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-secondary dark:text-white flex items-center gap-3"><Package size={18} className="text-accent"/> Material</h3>
              <div className="space-y-4">
                <input required name="product_name" value={formData.product_name} onChange={handleChange} type="text" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-sm md:text-base focus:border-accent focus:outline-none transition-all" placeholder="Beton, Armatura..." />
                <input required name="quantity" value={formData.quantity} onChange={handleChange} type="text" className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-sm md:text-base focus:border-accent focus:outline-none transition-all" placeholder="Miqdori" />
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-8">
            <h3 className="text-lg md:text-xl font-bold text-secondary dark:text-white flex items-center gap-3"><Shield size={18} className="text-blue-500"/> Xizmat turi</h3>
            <select name="test_type" value={formData.test_type} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-sm md:text-base focus:border-primary focus:outline-none transition-all cursor-pointer">
              <option>Kimyoviy tahlil</option>
              <option>Fizik-mexanik sinov</option>
              <option>Sertifikatlash</option>
              <option>Expertiza</option>
            </select>
          </div>

          <div className="space-y-4">
             <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl md:rounded-[2.5rem] px-6 py-5 h-28 md:h-36 focus:border-primary focus:outline-none transition-all resize-none text-sm md:text-base" placeholder="Izohlar..."></textarea>
             <div className="flex gap-2 p-4 rounded-xl bg-blue-500/5 text-[10px] text-blue-500 font-bold italic">
               <Info size={16} className="shrink-0" />
               <span>Ma'lumotlar maxfiy kanallar orqali uzatiladi.</span>
             </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-primary text-white py-5 md:py-8 rounded-2xl md:rounded-[3rem] font-bold text-lg md:text-2xl shadow-2xl flex items-center justify-center gap-3 hover:bg-secondary transition-all active:scale-95 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : <Send size={24} />} 
            {loading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShartnoma;
