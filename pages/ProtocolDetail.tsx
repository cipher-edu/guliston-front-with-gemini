
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, ChevronLeft, Loader2, Copy, Check, 
  ShieldCheck, Fingerprint, AlertTriangle, FileSearch,
  ChevronDown, Database, Beaker, ClipboardList, Info, Eye, Layout, Settings
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useTranslation } from '../LanguageContext';

// --- Helper for safe rendering of API values (fixes React Error #31) ---
const safeRender = (val: any): React.ReactNode => {
  if (val === null || val === undefined) return '-';
  if (Array.isArray(val)) {
    if (val.length === 0) return '-';
    return val.map((item, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && ', '}
        {safeRender(item)}
      </React.Fragment>
    ));
  }
  if (typeof val === 'object') {
    return val.tavsifi || val.name || val.title || val.label || JSON.stringify(val);
  }
  return String(val);
};

// --- Components ---

const LabelValue = ({ label, value, isBold = false }: { label: string, value: any, isBold?: boolean }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline py-4 border-b border-gray-100 dark:border-white/5 last:border-0 transition-colors">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutralDark/40 dark:text-gray-500 sm:w-1/3 shrink-0 mb-1 sm:mb-0">
        {label}
      </span>
      <span className={`text-sm dark:text-gray-200 flex-1 ${isBold ? 'font-bold text-secondary dark:text-primary' : 'font-medium text-neutralDark/80'}`}>
        {safeRender(value)}
      </span>
    </div>
  );
};

const AccordionSection = ({ title, icon: Icon, children, defaultOpen = false }: { title: any, icon: any, children?: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <motion.div 
      whileHover={{ scale: 1.002, boxShadow: "0 20px 40px -10px rgb(0 0 0 / 0.15)" }}
      className="glass rounded-[2.5rem] overflow-hidden mb-8 border border-white/20 dark:border-white/5 shadow-xl transition-all"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-7 md:p-10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
      >
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tight font-serif">{title}</h3>
        </div>
        <div className={`p-2 rounded-full bg-gray-100 dark:bg-white/5 transition-all ${isOpen ? 'rotate-180 bg-primary/20 text-primary' : 'text-neutralDark/30 dark:text-gray-500'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-10 pb-10 border-t border-gray-100 dark:border-white/5 pt-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ProtocolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(!id || id === 'check');
  const [isLoading, setIsLoading] = useState(false);
  const [protocolData, setProtocolData] = useState<any>(null);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'document'>('interactive');

  const fetchProtocol = useCallback(async (protocolId: string) => {
    if (!protocolId) return;
    setIsLoading(true);
    setIsScanning(true);
    setErrorInfo(null);

    try {
      const cleanId = protocolId.trim().toLowerCase();
      const response = await api.get(`shartnomalar/?unique_id=${cleanId}`);
      
      let data = null;
      if (response?.results && Array.isArray(response.results)) {
        data = response.results.find((item: any) => String(item.unique_id).toLowerCase() === cleanId);
      } else if (response?.unique_id) {
        data = response;
      }

      await new Promise(r => setTimeout(r, 800));

      if (data) {
        setProtocolData(data);
        setIsSearching(false);
      } else {
        setErrorInfo(t.protocol_page.error_404);
        setIsSearching(true);
      }
    } catch (err: any) {
      setErrorInfo(err.message === '404' ? t.protocol_page.error_404 : t.common.error_title);
      setIsSearching(true);
    } finally {
      setIsLoading(false);
      setIsScanning(false);
    }
  }, [t]);

  useEffect(() => {
    if (id && id !== 'check') fetchProtocol(id);
    else setIsSearching(true);
  }, [id, fetchProtocol]);

  if (isSearching) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#020617] flex flex-col items-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="glass p-10 md:p-20 rounded-[3rem] max-w-2xl w-full border border-primary/20 shadow-2xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FileSearch size={160} className="text-primary" />
          </div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-primary/20 shadow-inner">
              <ShieldCheck className="text-primary w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-secondary dark:text-white mb-6 tracking-tight">
              {t.protocol_page.check_title}
            </h1>
            <p className="text-lg text-neutralDark/60 dark:text-gray-400 mb-12 font-light italic">
              {t.protocol_page.check_desc}
            </p>
            
            {errorInfo && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-5 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-2xl text-sm font-bold flex items-center justify-center gap-3">
                <AlertTriangle size={20} /> {errorInfo}
              </motion.div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); if(searchId.trim()) navigate(`/protocol/${searchId.trim().toLowerCase()}`); }} className="space-y-6">
              <div className="relative group">
                <input 
                  type="text" 
                  value={searchId} 
                  onChange={(e) => setSearchId(e.target.value)} 
                  placeholder={t.protocol_page.input_placeholder} 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-primary/10 rounded-3xl py-6 px-10 text-2xl focus:border-primary focus:outline-none transition-all text-center font-bold tracking-[0.2em] uppercase placeholder:opacity-30 placeholder:tracking-normal placeholder:font-normal shadow-sm group-hover:border-primary/30" 
                />
              </div>
              <button 
                disabled={isLoading} 
                type="submit" 
                className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xl hover:bg-secondary hover:translate-y-[-2px] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : t.protocol_page.btn_start}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const DocumentView = () => (
    <div className="relative">
      {/* On-screen paper wrapper for dark mode */}
      <div className="bg-white dark:bg-slate-50 p-12 md:p-16 print:p-8 shadow-2xl print:shadow-none min-h-[1450px] relative text-black leading-[1.3] font-serif border border-gray-200 dark:border-white/10 print:border-none max-w-[900px] mx-auto overflow-hidden transition-colors">
        
        {/* Document Header Title */}
        <div className="text-center mb-14 border-b-[2px] border-black pb-2">
          <h1 className="text-[22px] font-bold uppercase tracking-tight font-serif">
            ПРОТОКОЛ ИСПЫТАНИЯ № <span className="italic px-1 font-serif underline underline-offset-4">{protocolData?.unique_id?.toUpperCase()}</span> OT {protocolData?.protocol_date} Г.
          </h1>
        </div>

        {/* Main Info Block */}
        <div className="space-y-[8px] mb-14 text-[14px]">
          {[
            ["Наименование лаборатории:", "ЦНИиИЛ при ООО «GULISTON»."],
            ["Адрес:", "обл. Навои г. Кармана ул. А. Темур-43."],
            ["Наименование заказчика:", safeRender(protocolData?.client_name), true],
            ["Наименование изготовителя:", safeRender(protocolData?.ishlabchiqaruvchi)],
            ["Цель, задачи и вид испытаний:", safeRender(protocolData?.maqsad)],
            ["Информация об отборе образцов:", safeRender(protocolData?.malumot)],
            ["Наименование продукции:", safeRender(protocolData?.client_product_name), true],
            ["НД на объекты испытания:", safeRender(protocolData?.nd_obyekt)],
            ["НД на методы испытания:", safeRender(protocolData?.nd_metod)],
            ["Условия проведения испытаний:", safeRender(protocolData?.sinov_shartlari)],
            ["Дата получения образцов:", `${safeRender(protocolData?.qabul_date)} г.`]
          ].map(([l, v, b]: any, idx) => (
            <div key={idx} className="flex items-start">
              <span className="font-bold min-w-[340px] shrink-0 text-black">{l}</span>
              <span className={`flex-1 border-b border-dotted border-black/30 pb-[1px] ${b ? 'font-bold' : ''}`}>{v}</span>
            </div>
          ))}
        </div>

        {/* Equipment Table */}
        <div className="mb-14">
          <table className="w-full border-collapse border-[1.5px] border-black text-[13px]">
            <thead>
              <tr className="bg-gray-100/50">
                <th className="border-[1.5px] border-black p-3 font-bold w-1/2 text-left px-5 uppercase text-[11px]">Наименование средств измерений</th>
                <th className="border-[1.5px] border-black p-3 font-bold text-left px-5 uppercase text-[11px]">Сертификаты поверки</th>
              </tr>
            </thead>
            <tbody>
              {protocolData?.ulchov_asbob && protocolData.ulchov_asbob.length > 0 ? (
                protocolData.ulchov_asbob.map((item: any, i: number) => (
                  <tr key={i}>
                    <td className="border-[1.5px] border-black p-3 px-5">{safeRender(item.name)} {item.inventory_number ? `, №${item.inventory_number}` : ''}</td>
                    <td className="border-[1.5px] border-black p-3 px-5 italic">{safeRender(item.certificate_info)} от {safeRender(item.certificate_date)}г.</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border-[1.5px] border-black p-4 text-center text-gray-400 italic" colSpan={2}>Сведения об оборудовании не указаны</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Results Title */}
        <div className="text-center mb-8">
          <h2 className="text-[16px] font-bold uppercase tracking-widest border-b-[1.5px] border-black inline-block px-4 pb-1">РЕЗУЛЬТАТЫ ПРОВЕДЕНИЯ ИСПЫТАНИЯ</h2>
        </div>

        {/* Results Table */}
        <div className="mb-24">
          <table className="w-full border-collapse border-[1.5px] border-black text-[14px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-[1.5px] border-black p-3 font-bold w-14 text-center">№</th>
                <th className="border-[1.5px] border-black p-3 font-bold text-center">Вид испытания</th>
                <th className="border-[1.5px] border-black p-3 font-bold text-center">Значения требования по НД</th>
                <th className="border-[1.5px] border-black p-3 font-bold text-center">Фактическое Значение</th>
              </tr>
            </thead>
            <tbody>
              {protocolData?.natijalar && protocolData.natijalar.length > 0 ? (
                protocolData.natijalar.map((res: any, i: number) => (
                  <tr key={i}>
                    <td className="border-[1.5px] border-black p-4 text-center font-bold">{i + 1}</td>
                    <td className="border-[1.5px] border-black p-4 px-6 font-medium">{safeRender(res.tekshiruv_name)}</td>
                    <td className="border-[1.5px] border-black p-4 text-center">{safeRender(res.nd_talab)}</td>
                    <td className="border-[1.5px] border-black p-4 text-center font-bold text-[15px]">{safeRender(res.fakt_qiymat)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border-[1.5px] border-black p-12 text-center text-gray-400 italic" colSpan={4}>Результаты испытаний отсутствуют</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Document Footer */}
        <div className="flex justify-between items-end mt-auto pb-10 px-4">
          <div className="flex items-center gap-5 text-[18px] font-bold">
            <span className="text-black/60 uppercase text-[12px] tracking-widest font-sans">Испытатель:</span>
            <div className="relative">
              <div className="w-56 border-b-[2px] border-black h-[1px] mb-1"></div>
              {/* Optional Signature Mockup Overlay */}
              <div className="absolute -top-6 left-8 opacity-20 grayscale pointer-events-none select-none italic font-serif text-sm">Timerbulatov</div>
            </div>
            <span className="ml-4 font-serif">А. Тимербулатов</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="p-1.5 border-[2px] border-black bg-white shadow-sm">
              {protocolData?.qr_code ? (
                <img src={protocolData.qr_code} alt="QR Verification" className="w-28 h-28" />
              ) : (
                <div className="w-28 h-28 bg-gray-50 flex items-center justify-center text-[10px] text-gray-300">QR CODE</div>
              )}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">SCAN TO VERIFY</p>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-6 left-16 right-16 flex justify-between items-center text-[10px] text-gray-400 font-sans tracking-wide border-t border-gray-100 pt-3">
          <span className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-gray-300" />
            DIGITAL PROTOCOL GULISTON-MITSL v2.5
          </span>
          <span className="font-bold">Страница 1 из 1</span>
        </div>
      </div>
    </div>
  );

  const InteractiveView = () => (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Quick Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[3rem] p-10 md:p-14 border border-primary/20 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <ShieldCheck size={200} className="text-primary" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
                {t.protocol_page.doc_verified_status}
              </span>
              <div className="h-6 w-[1.5px] bg-gray-200 dark:bg-white/10"></div>
              <span className="text-neutralDark/40 dark:text-gray-500 font-bold text-xs uppercase tracking-widest">
                ID: {protocolData?.unique_id?.toUpperCase()}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-black text-secondary dark:text-white mb-4 leading-tight">
              {safeRender(protocolData?.client_product_name)}
            </h2>
            
            <div className="flex items-center gap-3 text-lg text-neutralDark/60 dark:text-gray-400 font-medium">
              <span className="text-neutralDark/30 dark:text-gray-600 uppercase text-[10px] font-black tracking-widest">{t.protocol_page.label_client}</span>
              <span className="text-secondary dark:text-primary font-black italic">{safeRender(protocolData?.client_name)}</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end shrink-0">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="bg-white dark:bg-white/10 p-3 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 mb-4 group/qr"
             >
               {protocolData?.qr_code ? (
                 <img src={protocolData.qr_code} alt="Verification QR" className="w-28 h-28 dark:invert dark:opacity-90" />
               ) : (
                 <div className="w-28 h-28 bg-gray-50 flex items-center justify-center text-[10px] text-gray-300">QR</div>
               )}
             </motion.div>
             <div className="text-center md:text-right">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">{t.protocol_page.label_accept_date}</p>
               <p className="text-xl font-black text-secondary dark:text-white font-serif">{protocolData?.protocol_date}</p>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Main Details Accordion */}
      <AccordionSection title={t.protocol_page.label_lab} icon={Database} defaultOpen={true}>
        <div className="grid md:grid-cols-1 gap-x-12">
          <LabelValue label={t.protocol_page.label_product} value={protocolData?.client_product_name} isBold />
          <LabelValue label={t.protocol_page.label_manufacturer} value={protocolData?.ishlabchiqaruvchi} />
          <LabelValue label={t.protocol_page.label_purpose} value={protocolData?.maqsad} />
          <LabelValue label={t.protocol_page.label_sampling} value={protocolData?.malumot} />
          <LabelValue label={t.protocol_page.label_nd_obj} value={protocolData?.nd_obyekt} />
          <LabelValue label={t.protocol_page.label_nd_method} value={protocolData?.nd_metod} />
          <LabelValue label={t.protocol_page.label_conditions} value={protocolData?.sinov_shartlari} />
          <LabelValue label={t.protocol_page.label_accept_date} value={protocolData?.qabul_date} />
        </div>
      </AccordionSection>

      {/* Test Results Accordion */}
      <AccordionSection title={t.protocol_page.label_results_title} icon={Beaker}>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="py-6 font-black uppercase text-[10px] tracking-[0.2em] text-neutralDark/30 dark:text-gray-500 w-16">№</th>
                <th className="py-6 font-black uppercase text-[10px] tracking-[0.2em] text-neutralDark/30 dark:text-gray-500">{t.protocol_page.label_product}</th>
                <th className="py-6 font-black uppercase text-[10px] tracking-[0.2em] text-neutralDark/30 dark:text-gray-500">{t.protocol_page.label_nd_obj}</th>
                <th className="py-6 font-black uppercase text-[10px] tracking-[0.2em] text-neutralDark/30 dark:text-gray-500 text-right">{t.common.verified}</th>
              </tr>
            </thead>
            <tbody>
              {protocolData?.natijalar?.map((res: any, i: number) => (
                <tr key={i} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all">
                  <td className="py-6 font-black text-neutralDark/30 font-serif text-lg">{i+1}</td>
                  <td className="py-6 font-bold text-secondary dark:text-gray-200 text-lg">{safeRender(res.tekshiruv_name)}</td>
                  <td className="py-6 text-neutralDark/60 dark:text-gray-400 font-medium">{safeRender(res.nd_talab)}</td>
                  <td className="py-6 text-right">
                    <span className="bg-primary/10 text-primary px-5 py-2 rounded-2xl font-black text-xs border border-primary/20 shadow-sm inline-block">
                      {safeRender(res.fakt_qiymat)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionSection>

      {/* Equipment Accordion */}
      <AccordionSection title={t.protocol_page.label_equipment_title} icon={ClipboardList}>
        <div className="grid md:grid-cols-2 gap-6">
          {protocolData?.ulchov_asbob?.map((item: any, i: number) => (
            <div key={i} className="p-7 rounded-3xl bg-gray-50/50 dark:bg-white/5 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-white/10 transition-all flex flex-col justify-between gap-6 group/item shadow-sm">
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform shadow-sm">
                    {/* Fixed: Settings icon is now properly imported */}
                    <Settings size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary dark:text-gray-200 text-lg leading-tight mb-2">{safeRender(item.name)}</p>
                    <p className="text-[10px] font-black uppercase text-neutralDark/40 dark:text-gray-600 tracking-widest">Inv №: {item.inventory_number || 'N/A'}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-[11px] font-bold text-neutralDark/50 dark:text-gray-400 bg-white/50 dark:bg-black/20 px-5 py-3 rounded-2xl border border-gray-100 dark:border-white/5 mt-auto">
                 <Info size={16} className="text-accent" />
                 <span className="line-clamp-1">{safeRender(item.certificate_info)} ({safeRender(item.certificate_date)})</span>
               </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Metadata Card */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-xl">
          <h4 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-neutralDark/40 dark:text-gray-500 mb-10 border-b border-gray-100 dark:border-white/10 pb-4">
             <Fingerprint size={20} className="text-primary"/> {t.protocol_page.doc_footer}
          </h4>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-black text-xs uppercase tracking-widest text-neutralDark/40 dark:text-gray-500">{t.protocol_page.label_approver}</span>
              <span className="font-black text-xl text-secondary dark:text-primary font-serif">Раджабов Б.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-black text-xs uppercase tracking-widest text-neutralDark/40 dark:text-gray-500">{t.protocol_page.label_expert}</span>
              <span className="font-bold text-lg text-neutralDark/80 dark:text-gray-300">Тимербулатов А.</span>
            </div>
          </div>
        </div>
        
        <div className="glass p-10 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-xl flex items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/20 shadow-inner">
              <Check size={32} />
            </div>
            <p className="text-[11px] font-black uppercase text-primary tracking-[0.4em] mb-4">{t.protocol_page.doc_verified_status}</p>
            <div className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-3 rounded-full font-black text-sm shadow-xl shadow-green-500/20">
              <ShieldCheck size={20} /> {t.common.verified}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 md:pt-36 pb-32 min-h-screen bg-neutralLight dark:bg-[#020617] print:bg-white print:pt-0 transition-colors">
      <div className="max-w-6xl mx-auto px-4 print:px-0">
        
        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center mb-14 gap-6 print:hidden">
           <div className="flex flex-wrap items-center gap-4">
             <button 
                onClick={() => navigate('/protocol/check')} 
                className="flex items-center gap-3 bg-white dark:bg-white/5 px-8 py-4 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 font-black text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-secondary dark:text-gray-300 active:scale-95"
             >
               <ChevronLeft size={18}/> {t.common.back_to_search}
             </button>
             
             <div className="h-10 w-[2px] bg-gray-200 dark:bg-white/10 hidden md:block"></div>
             
             <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg">
               <button 
                 onClick={() => setViewMode('interactive')}
                 className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${viewMode === 'interactive' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-neutralDark/40 dark:text-gray-500 hover:text-primary'}`}
               >
                 <Layout size={16} /> {t.protocol_page.doc_dashboard}
               </button>
               <button 
                 onClick={() => setViewMode('document')}
                 className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${viewMode === 'document' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-neutralDark/40 dark:text-gray-500 hover:text-primary'}`}
               >
                 <Eye size={16} /> {t.protocol_page.doc_official}
               </button>
             </div>
           </div>

           <div className="flex items-center gap-4 ml-auto">
             <button 
                onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
                className="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 transition-all hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-3 text-sm font-black text-secondary dark:text-gray-300 active:scale-95"
                title={t.common.copy}
             >
               {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20}/>}
               <span className="hidden sm:inline uppercase text-[10px] tracking-widest">{copied ? t.common.copied : t.common.copy}</span>
             </button>
             
             <button 
               onClick={() => {
                 setViewMode('document');
                 setTimeout(() => window.print(), 200);
               }} 
               className="bg-secondary dark:bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center gap-4 shadow-2xl hover:opacity-90 transition-all active:scale-95 shadow-primary/20"
             >
               <Printer size={22}/> {t.common.print}
             </button>
           </div>
        </div>
        
        {/* View Switcher Container */}
        <div className="relative min-h-[60vh]">
          <AnimatePresence mode="wait">
            {isScanning && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60] bg-neutralLight/90 dark:bg-[#020617]/90 flex flex-col items-center justify-center backdrop-blur-md rounded-[4rem]">
                <div className="relative">
                  <Loader2 size={80} className="text-primary animate-spin mb-8" />
                  <div className="absolute inset-0 flex items-center justify-center text-primary/40 font-black text-[10px]">AI</div>
                </div>
                <p className="text-primary font-black uppercase tracking-[0.4em] text-xs animate-pulse">{t.protocol_page.analyzing}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          >
            {viewMode === 'interactive' && !window.matchMedia('print').matches ? <InteractiveView /> : <DocumentView />}
          </motion.div>
        </div>

        {/* Global Print View Overrides */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            .print\\:hidden { display: none !important; }
            body { background: white !important; padding: 0 !important; }
            #root { margin: 0 !important; }
            .bg-neutralLight, .dark { background: white !important; }
            @page { margin: 1.5cm; }
          }
          .custom-scrollbar::-webkit-scrollbar { height: 8px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 166, 118, 0.2); border-radius: 10px; }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
        `}} />
      </div>
    </div>
  );
}
