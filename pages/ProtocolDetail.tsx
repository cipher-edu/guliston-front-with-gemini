
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Printer, ChevronLeft, 
  FlaskConical, FileSearch, 
  ArrowRight, Loader2, Search,
  CheckCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function ProtocolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(!id || id === 'check');
  const [isLoading, setIsLoading] = useState(false);
  const [protocolData, setProtocolData] = useState<any>(null);
  const [errorType, setErrorType] = useState<'404' | 'general' | null>(null);

  useEffect(() => {
    if (id && id !== 'check') {
      fetchProtocol(id);
    } else {
      setIsSearching(true);
      setProtocolData(null);
    }
  }, [id]);

  const fetchProtocol = async (protocolId: string) => {
    setIsLoading(true);
    setErrorType(null);
    setProtocolData(null);

    try {
      const response = await api.get(`shartnomalar/?unique_id=${protocolId.trim()}`);
      const items = response.results || (Array.isArray(response) ? response : []);
      
      let found = items.find((item: any) => 
        String(item.unique_id).toLowerCase() === protocolId.trim().toLowerCase()
      );

      if (!found) {
        const fallback = await api.get(`shartnomalar/?search=${protocolId.trim()}`);
        const fallbackItems = fallback.results || (Array.isArray(fallback) ? fallback : []);
        found = fallbackItems[0];
      }

      if (found) {
        setProtocolData(found);
        setIsSearching(false);
      } else {
        setErrorType('404');
        setIsSearching(true);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setErrorType('general');
      setIsSearching(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    if (!protocolData) return;
    const originalTitle = document.title;
    document.title = `Протокол_№${protocolData.unique_id}`;
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 500);
  };

  const renderResultsRows = () => {
    const natijalar = Array.isArray(protocolData?.natijalar) ? protocolData.natijalar : [];
    if (natijalar.length === 0) {
      return (
        <tr className="h-10">
          <td className="border border-black text-center !text-black italic" colSpan={4}>Данные испытаний не найдены</td>
        </tr>
      );
    }

    return natijalar.map((res: any, idx: number) => (
      <tr key={idx} className="print:break-inside-avoid">
        <td className="border border-black p-1 text-center font-bold !text-black">{idx + 1}</td>
        <td className="border border-black p-1 pl-2 !text-black text-[11px] leading-tight text-left">
          {res.tekshiruv_name || '---'}
        </td>
        <td className="border border-black p-1 text-center !text-black text-[11px]">
          {res.nd_talab || 'не норм.'}
        </td>
        <td className="border border-black p-1 text-center font-bold !text-black text-[11px]">
          {res.fakt_qiymat || 'н.о.'}
        </td>
      </tr>
    ));
  };

  const renderInstrumentRows = () => {
    const asboblar = Array.isArray(protocolData?.ulchov_asbob) ? protocolData.ulchov_asbob : [];
    if (asboblar.length === 0) {
      return (
        <tr>
          <td className="border border-black p-1 italic text-center" colSpan={2}>Сведения об оборудовании не указаны</td>
        </tr>
      );
    }
    return asboblar.map((item: any, idx: number) => (
      <tr key={idx}>
        <td className="border border-black p-1 text-[10px] leading-tight">
          {item.name} {item.inventory_number ? `, №${item.inventory_number}` : ''}
        </td>
        <td className="border border-black p-1 text-center text-[10px] leading-tight">
          {item.certificate_info || '---'} {item.certificate_date ? `от ${item.certificate_date}г.` : ''}
        </td>
      </tr>
    ));
  };

  if (isSearching) {
    return (
      <div className="pt-32 md:pt-40 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] flex flex-col items-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 md:p-16 rounded-[2rem] md:rounded-[3.5rem] max-w-2xl w-full text-center border border-primary/20 shadow-2xl relative">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileSearch className="text-primary w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-secondary dark:text-white mb-4">Bayonnomani Tekshirish</h1>
          <p className="text-sm md:text-base text-neutralDark/60 dark:text-gray-400 mb-8">Haqiqiyligini tasdiqlash uchun ID raqamini kiriting.</p>
          
          {errorType === '404' && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 justify-center font-bold text-xs">
              Bayonnoma topilmadi. ID to'g'riligini tekshiring.
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); if(searchId) navigate(`/protocol/${searchId.trim()}`); }} className="space-y-4 md:space-y-6">
            <div className="relative">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
              <input 
                type="text" 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
                placeholder="Bayonnoma ID" 
                className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-primary/20 rounded-2xl md:rounded-3xl py-4 md:py-5 pl-12 md:pl-16 pr-6 md:pr-8 text-base focus:outline-none focus:border-primary transition-all" 
              />
            </div>
            <button disabled={isLoading} type="submit" className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold text-base md:text-lg shadow-xl hover:bg-secondary transition-all flex items-center justify-center gap-3 active:scale-95">
              {isLoading ? <Loader2 className="animate-spin" /> : <><ArrowRight /> Tekshirish</>}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (isLoading) return <div className="pt-40 min-h-screen flex justify-center bg-neutralLight dark:bg-[#0F172A]"><Loader2 className="animate-spin text-primary" size={50} /></div>;
  if (!protocolData) return null;

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] print:bg-white print:pt-0">
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm 10mm 10mm 15mm; }
          .print-hidden { display: none !important; }
          body { background: white !important; }
          .protocol-doc { width: 100% !important; border: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; }
        }
        .protocol-doc { 
          font-family: "Times New Roman", Times, serif; 
          color: black; 
          line-height: 1.3;
          width: 820px;
          margin: 0 auto;
          background: white;
          padding: 45px 55px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          position: relative;
        }
        .doc-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          padding: 10px 0;
        }
        @media (max-width: 860px) {
          .protocol-doc {
             transform: scale(calc(100vw / 900));
             transform-origin: top left;
             margin-bottom: 20px;
          }
          .doc-container {
             height: calc(1250px * (100vw / 900));
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 print:px-0">
        <div className="flex justify-between items-center mb-6 print-hidden">
           <button onClick={() => setIsSearching(true)} className="flex items-center gap-2 text-secondary dark:text-white font-bold text-sm">
             <ChevronLeft size={18}/> Qidiruv
           </button>
           <div className="flex gap-2">
             <button onClick={handlePrint} className="bg-primary text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg text-sm">
               <Printer size={16}/> Chop etish / PDF
             </button>
           </div>
        </div>

        <div className="doc-container">
          <div className="doc-scroll-wrapper">
            <div className="protocol-doc">
              {/* Approval Header */}
              <div className="relative mb-6 flex justify-between items-start">
                <div className="w-36 h-36 relative mt-[-15px] ml-[-10px]">
                  <div className="absolute inset-0 border-[2.5px] border-blue-900 rounded-full flex items-center justify-center text-center p-2 transform -rotate-12 opacity-80">
                    <div className="text-[6px] font-bold text-blue-900 leading-tight uppercase">
                      O'ZBEKISTON RESPUBLIKASI NAVOIY VILOYATI KARMANA TUMANI<br/>
                      <span className="text-[11px] my-0.5 inline-block font-black tracking-tight">"GULISTON"</span><br/>
                      MAS'ULIYATI CHEKLANGAN JAMIYATI
                    </div>
                  </div>
                </div>

                <div className="text-right text-[13px] font-bold !text-black leading-tight">
                  <p className="uppercase mb-0.5 tracking-tighter">«УТВЕРЖДАЮ»</p>
                  <p>Директор ООО «GULISTON»</p>
                  <div className="mt-1 flex flex-col items-end">
                    <div className="w-48 border-b border-black h-9 relative flex items-end justify-end">
                      <svg className="absolute -bottom-1 left-4 w-28 h-12 text-blue-900 opacity-60" viewBox="0 0 100 40">
                        <path d="M5 25 Q 25 5, 45 35 T 85 15" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                      <span className="pb-0.5 pr-1 font-bold text-[15px]">Раджабов Б.</span>
                    </div>
                    <p className="mt-1 font-bold text-[13px]">{protocolData.protocol_date || '---'} г.</p>
                  </div>
                </div>
              </div>

              {/* Protocol Title */}
              <div className="text-center mb-8 mt-2">
                <h1 className="text-[17px] font-bold uppercase !text-black">
                  ПРОТОКОЛ ИСПЫТАНИЯ № <span className="border-b-[1.5px] border-black px-5 italic uppercase font-black">{protocolData.unique_id}</span> от {protocolData.protocol_date} г.
                </h1>
              </div>

              {/* Info Table Replacement */}
              <div className="text-[13px] space-y-1 mb-8 !text-black leading-tight">
                <p><span className="font-bold">Наименование лаборатории:</span> ЦНИиИЛ при ООО «GULISTON».</p>
                <p><span className="font-bold">Адрес:</span> обл. Навои г. Karmana ул. А. Темур-43.</p>
                <p><span className="font-bold">Наименование заказчика:</span> <span className="font-bold uppercase tracking-tight">{protocolData.client_name || '---'}</span></p>
                <p><span className="font-bold">Наименование изготовителя (поставщика):</span> <span className="font-bold uppercase">{protocolData.ishlabchiqaruvchi || '---'}</span></p>
                <p><span className="font-bold">Цель, задачи и вид испытаний:</span> {protocolData.maqsad || '---'}</p>
                <p><span className="font-bold">Информация об отборе образцов:</span> {protocolData.malumot || '---'}</p>
                <p><span className="font-bold">Наименование продукции:</span> <span className="font-bold uppercase">{protocolData.client_product_name || '---'}</span></p>
                <p><span className="font-bold">НД на объекты испытания:</span> {protocolData.nd_obyekt || '-'}</p>
                <p><span className="font-bold">НД на методы испытания:</span> {protocolData.nd_metod || '---'}</p>
                <p><span className="font-bold">Условия проведения испытаний:</span> {protocolData.sinov_shartlari?.length > 0 ? protocolData.sinov_shartlari.map((s:any)=>s.tavsifi).join(', ') : '---'}</p>
                <p className="mt-2"><span className="font-bold">Дата получения образцов:</span> {protocolData.qabul_date} г.</p>
              </div>

              {/* Equipment List */}
              <div className="mb-6">
                <p className="text-[12px] font-bold mb-1.5">Перечень средств измерений и испытательных оборудования</p>
                <table className="w-full border-collapse border border-black text-[10.5px]">
                  <thead>
                    <tr className="font-bold bg-gray-50/50">
                      <th className="border border-black p-1 text-center">Наименование средств измерений и испытательных оборудования:</th>
                      <th className="border border-black p-1 text-center w-[320px]">Сертификаты поверки/калибровки или аттестации</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderInstrumentRows()}
                  </tbody>
                </table>
              </div>

              {/* Timeline Footer Info */}
              <div className="text-[13px] space-y-0.5 mb-8 !text-black">
                <p><span className="font-bold">Дополнительная информация:</span> {protocolData.qushimcha ? (protocolData.qushimcha.length > 60 ? protocolData.qushimcha.substring(0, 57) + '...' : protocolData.qushimcha) : '-'}</p>
                <p><span className="font-bold">Информация о субподрядных работах:</span> ---</p>
                <p><span className="font-bold">Дата проведения испытания:</span> {protocolData.sinov_sanasi || '---'} г.</p>
                <p><span className="font-bold">Дата подписания протокола:</span> {protocolData.protocol_date || '---'} г.</p>
              </div>

              {/* Results Title */}
              <div className="text-center mb-4">
                <h2 className="text-[15px] font-bold uppercase !text-black">Результаты проведения испытания</h2>
              </div>

              {/* Results Table */}
              <div className="mb-12">
                <table className="w-full border-collapse border border-black text-[12.5px] !text-black">
                  <thead>
                    <tr className="font-bold bg-gray-100/30">
                      <th className="border border-black p-1.5 w-12 text-center">№</th>
                      <th className="border border-black p-1.5 text-center">Вид испытания</th>
                      <th className="border border-black p-1.5 text-center w-[240px]">Значения требования по НД</th>
                      <th className="border border-black p-1.5 text-center w-[170px]">Фактическое Значения</th>
                    </tr>
                    <tr className="bg-gray-100/50 italic text-[10px]">
                      <th className="border border-black p-0.5 text-center">1</th>
                      <th className="border border-black p-0.5 text-center">2</th>
                      <th className="border border-black p-0.5 text-center">3</th>
                      <th className="border border-black p-0.5 text-center">4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderResultsRows()}
                  </tbody>
                </table>
                <p className="text-[11px] mt-1.5 italic font-medium">* н.о.- не обнаружено</p>
              </div>

              {/* Footer Signatures */}
              <div className="mt-20 mb-12 flex items-center justify-between">
                <div className="flex items-center gap-10 font-bold text-[14px] !text-black">
                  <span className="uppercase tracking-tight">Испытатель:</span>
                  <div className="flex items-center gap-4">
                    <div className="w-52 border-b border-black relative h-10 flex items-end justify-center">
                       <svg className="absolute -top-8 w-40 h-24 text-blue-900 opacity-60" viewBox="0 0 100 40">
                         <path d="M5 25 Q 25 5, 55 35 T 95 15" fill="none" stroke="currentColor" strokeWidth="2.2" />
                       </svg>
                       <span className="text-[9px] absolute -bottom-5 opacity-40 font-normal">(подпись)</span>
                    </div>
                    <span className="font-bold uppercase tracking-widest text-[14px] pt-4">
                      {protocolData.natijalar?.[0]?.tekshiruv_name || 'А. ТИМЕРБУЛАТОВ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code and Status (Screen Only) */}
              <div className="absolute bottom-12 right-12 flex flex-col items-center print:hidden opacity-40 hover:opacity-100 transition-opacity">
                 {protocolData.qr_code && <img src={protocolData.qr_code} alt="QR" className="w-20 h-20 mb-2" />}
                 <div className="text-[9px] font-black text-primary uppercase tracking-tighter flex items-center gap-1">
                   VERIFIED BY MITSL
                 </div>
              </div>

              {/* Document Meta Footer */}
              <div className="mt-24 flex justify-between items-end border-t border-black/10 pt-4 text-[11px] font-bold opacity-70 !text-black">
                <p>Протокол испытания <span className="italic uppercase">№{protocolData.unique_id}</span> от {protocolData.protocol_date}г. ЦНИиИЛ при ООО «GULISTON»</p>
                <p className="text-right tracking-tighter">Стр. 1 из 1</p>
              </div>

              {/* Watermark Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none z-0">
                <FlaskConical size={700} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-neutralDark/30 text-[10px] italic font-bold tracking-[0.3em] uppercase print-hidden">
          Сканировано с CamScanner
        </div>
      </div>
    </div>
  );
}
