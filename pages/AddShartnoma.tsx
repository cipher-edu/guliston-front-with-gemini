
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilePlus, Send, User, Package, Shield, Info, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const AddShartnoma: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    productName: '',
    quantity: '',
    testType: 'Kimyoviy tahlil',
    standard: '',
    notes: ''
  });

  // Telegram sozlamalari
  const TELEGRAM_BOT_TOKEN = '8054574891:AAFjRhIDw4nFxZ7m0g7PqV6rqkGASaIx00Q';
  // Bir nechta qabul qiluvchilar (Chat ID'lar)
  const TELEGRAM_RECIPIENTS = ['1062838548', '5342507970']; 

  const sendToTelegram = async (data: typeof formData) => {
    const message = `
<b>🚀 Yangi Ariza: Guliston-MITSL</b>
━━━━━━━━━━━━━━━━━━
<b>👤 Mijoz:</b> ${data.clientName}
<b>📞 Tel:</b> ${data.phone}

<b>📦 Mahsulot:</b> ${data.productName}
<b>⚖️ Miqdori:</b> ${data.quantity}

<b>🔬 Sinov turi:</b> ${data.testType}
<b>📜 Standart:</b> ${data.standard || "Ko'rsatilmadi"}

<b>📝 Izoh:</b> ${data.notes || 'Yo\'q'}
━━━━━━━━━━━━━━━━━━
📅 Sana: ${new Date().toLocaleString('uz-UZ')}
    `;

    try {
      // Har bir ID uchun xabar yuborish
      const sendPromises = TELEGRAM_RECIPIENTS.map(chatId => 
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
          })
        }).then(res => res.json())
      );

      const results = await Promise.all(sendPromises);
      
      // Kamida bitta xabar muvaffaqiyatli ketganini tekshirish
      const anySuccess = results.some(res => res.ok);
      const allFailed = results.every(res => !res.ok);

      if (allFailed) {
        const firstError = results[0]?.description || 'Telegram API bilan bog‘lanishda xatolik';
        if (firstError.includes('chat not found')) {
          throw new Error("Bot hali ishga tushirilmagan. Iltimos, Telegramda botni toping va barcha mas'ullar 'Start' tugmasini bosganini tekshiring.");
        }
        throw new Error(firstError);
      }

      return true;
    } catch (error: any) {
      console.error('Telegram Connection Error:', error);
      setError(error.message);
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const success = await sendToTelegram(formData);
    
    setLoading(false);
    if (success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] flex flex-col items-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-10 md:p-16 rounded-[3rem] text-center max-w-xl border border-primary/20 shadow-2xl"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-primary w-12 h-12" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-secondary dark:text-white mb-6">Muvaffaqiyatli!</h1>
          <p className="text-xl text-neutralDark/60 dark:text-gray-400 mb-10 leading-relaxed">
            Sizning arizangiz qabul qilindi va barcha mas'ul mutaxassislarga Telegram orqali yuborildi. 
            Tez orada siz bilan bog‘lanamiz.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                clientName: '', phone: '', productName: '', quantity: '', 
                testType: 'Kimyoviy tahlil', standard: '', notes: ''
              });
            }}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            Yangi ariza yaratish
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
            <Send size={16} /> Raqamli Buyurtma
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary dark:text-white mb-6 leading-tight">
            Laboratoriya Sinovi uchun <span className="text-primary italic">Ariza</span>
          </h1>
          <p className="text-lg text-neutralDark/60 dark:text-gray-400">
            Shaklni to‘ldiring va arizangizni darhol MITSL mutaxassislariga yo‘llang.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-12 border border-white/20">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-2xl flex items-start gap-4 text-red-600 dark:text-red-400"
            >
              <AlertCircle className="shrink-0 mt-1" />
              <div>
                <p className="font-bold mb-1">Xatolik yuz berdi:</p>
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-secondary dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">
                <User className="text-primary" size={24} /> Buyurtmachi
              </h3>
              <div>
                <label className="block text-xs font-bold text-neutralDark/40 dark:text-gray-500 mb-2 uppercase tracking-widest">To'liq nomi / Tashkilot</label>
                <input 
                  required 
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" 
                  placeholder="Masalan: Nazarbek Qurilish MCHJ" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutralDark/40 dark:text-gray-500 mb-2 uppercase tracking-widest">Bog'lanish uchun tel.</label>
                <input 
                  required 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" 
                  placeholder="+998 90 123 45 67" 
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-secondary dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">
                <Package className="text-accent" size={24} /> Mahsulot
              </h3>
              <div>
                <label className="block text-xs font-bold text-neutralDark/40 dark:text-gray-500 mb-2 uppercase tracking-widest">Material nomi</label>
                <input 
                  required 
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" 
                  placeholder="Masalan: Beton M300" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutralDark/40 dark:text-gray-500 mb-2 uppercase tracking-widest">Hajmi yoki Miqdori</label>
                <input 
                  required 
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" 
                  placeholder="15 m3 / 20 dona" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="flex items-center gap-2 text-xl font-bold text-secondary dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">
              <Shield className="text-blue-500" size={24} /> Sinov Tafsilotlari
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-neutralDark/40 dark:text-gray-500 mb-2 uppercase tracking-widest">Tahlil yo'nalishi</label>
                <select 
                  name="testType"
                  value={formData.testType}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm cursor-pointer"
                >
                  <option>Kimyoviy tahlil</option>
                  <option>Fizik-mexanik sinov</option>
                  <option>Kompleks laboratoriya tahlili</option>
                  <option>Sertifikatlash uchun sinov</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutralDark/40 dark:text-gray-500 mb-2 uppercase tracking-widest">ND (GOST / ISO)</label>
                <input 
                  name="standard"
                  value={formData.standard}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" 
                  placeholder="Masalan: GOST 10180" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-secondary dark:text-white">
              <Info className="text-primary" size={24} /> Qo‘shimcha Izoh
            </h3>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full bg-white dark:bg-white/5 dark:text-white border border-gray-100 dark:border-white/10 rounded-3xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all h-32 shadow-inner" 
              placeholder="Namunalar holati yoki maxsus talablaringiz..."
            ></textarea>
          </div>

          <div className="pt-6">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-primary text-white py-6 rounded-[2rem] font-bold text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> Yuborilmoqda...
                </>
              ) : (
                <>
                  <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Arizani Tasdiqlash
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-neutralDark/30 dark:text-gray-500 mt-6 uppercase tracking-widest font-bold">
              Xabarnoma tizimi: {TELEGRAM_RECIPIENTS.length} ta mas'ul xabardor qilinadi
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShartnoma;
