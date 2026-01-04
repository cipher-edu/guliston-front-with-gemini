
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Printer, ChevronLeft, 
  FlaskConical, FileSearch, 
  ArrowRight, Loader2, Search,
  CheckCircle, Info, AlertTriangle,
  ShieldCheck, FileText, Share2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useTranslation } from '../LanguageContext';

export default function ProtocolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(!id || id === 'check');
  const [isLoading, setIsLoading] = useState(false);
  const [protocolData, setProtocolData] = useState<any>(null);
  const [errorType, setErrorType] = useState<'404' | 'general' | null>(null);

  useEffect(() => {
    if (id && id !== 'check') { fetchProtocol(id); }
    else { setIsSearching(true); setProtocolData(null); }
  }, [id]);

  const fetchProtocol = async (protocolId: string) => {
    setIsLoading(true); setErrorType(null); setProtocolData(null);
    try {
      const response = await api.get(`shartnomalar/?unique_id=${protocolId.trim()}`);
      const items = response.results || (Array.isArray(response) ? response : []);
      let found = items.find((item: any) => String(item.unique_id).toLowerCase() === protocolId.trim().toLowerCase());
      if (found) { setProtocolData(found); setIsSearching(false); }
      else { setErrorType('404'); setIsSearching(true); }
    } catch (err: any) { setErrorType('general'); setIsSearching(true); }
    finally { setIsLoading(false); }
  };

  const handlePrint = () => { if (protocolData) window.print(); };

  if (isSearching) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] flex flex-col items-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-16 rounded-[4rem] max-w-2xl w-full text-center border border-primary/20 shadow-2xl relative overflow-hidden">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><FileSearch className="text-primary w-12 h-12" /></div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary dark:text-white mb-4">{t.protocol_page.check_title}</h1>
          <p className="text-lg text-neutralDark/60 dark:text-gray-400 mb-10">{t.protocol_page.check_desc}</p>
          {errorType === '404' && (
            <div className="mb-8 p-5 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 justify-center font-bold text-sm border border-red-200">
              <AlertTriangle size={20} /> {t.protocol_page.error_404}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); if(searchId) navigate(`/protocol/${searchId.trim()}`); }} className="space-y-6">
            <div className="relative group">
              <ShieldCheck size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
              <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder={t.protocol_page.input_placeholder} className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-primary/10 rounded-[2rem] py-6 pl-16 pr-8 text-xl focus:border-primary focus:outline-none transition-all" />
            </div>
            <button disabled={isLoading} type="submit" className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-xl hover:bg-secondary transition-all flex items-center justify-center gap-4">
              {isLoading ? <Loader2 className="animate-spin" /> : <>{t.protocol_page.btn_start} <ArrowRight /></>}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (isLoading) return (
    <div className="pt-40 min-h-screen flex flex-col items-center justify-center bg-neutralLight dark:bg-[#0F172A]">
      <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
      <p className="text-secondary dark:text-white font-black uppercase text-xs">{t.protocol_page.analyzing}</p>
    </div>
  );

  return (
    <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-neutralLight dark:bg-[#0B1221] print:bg-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 print:px-0">
        <div className="flex justify-between items-center mb-10 print:hidden">
           <button onClick={() => setIsSearching(true)} className="flex items-center gap-3 bg-white dark:bg-white/5 px-6 py-3 rounded-2xl shadow-lg border border-primary/10 dark:text-white font-bold">
             <ChevronLeft size={20}/> {t.common.back_to_search}
           </button>
           <button onClick={handlePrint} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 shadow-2xl">
             <Printer size={22}/> PRINT / PDF
           </button>
        </div>
        
        <div className="bg-white p-20 shadow-2xl border border-gray-100 min-h-[1180px] text-black font-serif relative">
           <div className="text-center mb-16">
              <h1 className="text-2xl font-black uppercase tracking-tight">
                {t.protocol_page.doc_verified_status} № <span className="border-b-[3px] border-black px-10 italic uppercase font-black">{protocolData.unique_id}</span>
              </h1>
           </div>
           
           <div className="text-[15px] space-y-4 mb-14 text-black">
              <div className="flex items-start gap-4">
                <span className="font-bold min-w-[220px] uppercase text-xs">{t.protocol_page.doc_name_lab}</span> 
                <span className="font-bold italic">«GULISTON» MCHJ MKITS.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold min-w-[220px] uppercase text-xs">{t.protocol_page.doc_address}</span> 
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold min-w-[220px] uppercase text-xs">{t.protocol_page.doc_client}</span> 
                <span className="font-black uppercase">{protocolData.client_name || '---'}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold min-w-[220px] uppercase text-xs">{t.protocol_page.doc_product}</span> 
                <span className="font-black uppercase text-lg text-primary">{protocolData.client_product_name || '---'}</span>
              </div>
           </div>
           {/* Hujjatning qolgan qismi ham t.protocol_page kalitlaridan foydalanadi */}
           <div className="absolute bottom-20 right-20 flex flex-col items-center">
             <div className="bg-secondary text-white px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-3 shadow-xl">
               <CheckCircle size={18} /> {t.common.verified}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
