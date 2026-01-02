
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Printer, ChevronLeft, ShieldCheck, 
  QrCode, FlaskConical, Info, Search, FileSearch, 
  ArrowRight, Loader2, CheckCircle2, Microscope, Settings
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ProtocolDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(!id || id === 'check' || id === 'demo');
  const [isLoading, setIsLoading] = useState(false);

  // Haqiqiy demo ID lari rasmdagidek
  const DEMO_IDS = ['03-24', '04-24'];

  useEffect(() => {
    if (id && id !== 'check' && id !== 'demo') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }, [id]);

  // Demo ma'lumotlar - Foydalanuvchi taqdim etgan haqiqiy rasm (03-24 va 04-24) asosida
  const getProtocolData = (protocolId: string) => {
    const is04 = protocolId === '04-24';
    return {
      unique_id: protocolId,
      protocol_date: '18.01.2024',
      expiry_date: '18.01.2025',
      approved_by: 'Раджабов Б.',
      lab_name: 'ЦНИиИЛ при ООО «GULISTON»',
      lab_address: 'обл. Навои г. Кармана ул. А. Темур-43',
      client: 'ООО “ZOLOTOY VEK BUXARA”',
      manufacturer: 'ООО “ZOLOTOY VEK BUXARA”',
      purpose: 'химический анализ пробы',
      sampling_info: `Проба отобрана и предоставлена представителем предприятия ООО “ZOLOTOY VEK BUXARA” №${is04 ? '149' : '148'}`,
      product: '-',
      nd_object: '-',
      nd_method: 'ГОСТ 8269.1-2019',
      test_conditions: 'Температура воздуха в помещении 19°C, относительная влажность 56%',
      received_date: '16.01.2024г.',
      test_date: '16.01.2024г.',
      sign_date: '18.01.2024г.',
      tester: 'А. Тимербулатов',
      equipment: [
        { name: 'Весы электронные JA5000C, №2062206126', cert: 'UZ-50-2023 от 22.08.2023г.' },
        { name: 'Весы электронные FA220 4N №1012303306', cert: 'UZ-49-2023 от 22.08.2023г.' },
        { name: 'Сито №008 КCB № 01', cert: '869260-2023 от 24.08.2023г.' },
        { name: 'Печь муфельная MS-1200', cert: '1039511-2023 от 25.08.2023г.' },
        { name: 'Шкаф сушильный типа WS-31, №83028', cert: '1039524-2023от 25.08.2023г.' }
      ],
      results: [
        { id: 1, type: 'Массовая доля сульфатной и сульфидной серы, %', unit: 'не норм.', fact: is04 ? '1,8556' : '1,2210' },
        { id: 2, type: 'Определение общего содержания хлоридов и легкорастворимых хлоридов,%', unit: 'не норм.', fact: 'н.о.' },
        { id: 3, type: 'Наличия органических примесей', unit: 'не норм.', fact: 'н.о.' },
      ]
    };
  };

  const currentId = id && id !== 'check' && id !== 'demo' ? id : DEMO_IDS[0];
  const protocolData = getProtocolData(currentId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSearching(false);
      navigate(`/protocol/${searchId.replace(/\//g, '-')}`);
    }, 1000);
  };

  if (isSearching) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A] flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 md:p-16 rounded-[3.5rem] max-w-2xl w-full text-center border border-primary/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileSearch className="text-primary w-10 h-10" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-secondary dark:text-white mb-4">Bayonnomani Tekshirish</h1>
            <p className="text-neutralDark/60 dark:text-gray-400 mb-10 leading-relaxed">
              Taqdim etilgan sinov bayonnomasi haqiqiyligini tekshirish uchun uning ID raqamini kiriting.
            </p>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
                <input 
                  type="text" 
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="ID raqamini kiriting (masalan: 03-24)" 
                  className="w-full bg-white dark:bg-white/5 dark:text-white border-2 border-primary/20 focus:border-primary rounded-3xl py-5 pl-16 pr-8 text-lg focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="text-sm text-neutralDark/40 dark:text-gray-500">
                Demo uchun ID: {DEMO_IDS.map((d, i) => (
                  <button key={d} type="button" onClick={() => setSearchId(d)} className="text-primary font-bold hover:underline mx-1">{d}</button>
                ))}
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-lg shadow-xl hover:bg-secondary transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? <><Loader2 className="animate-spin" /> Tekshirilmoqda...</> : <>Natijani Ko'rish <ArrowRight /></>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutralLight dark:bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8 print:hidden">
           <button 
             onClick={() => navigate('/protocol/check')}
             className="flex items-center gap-3 text-secondary dark:text-white font-bold hover:text-primary transition-all group"
           >
             <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <ChevronLeft size={20} />
             </div>
             Qidiruvga qaytish
           </button>
           
           <div className="flex gap-4">
              <button onClick={() => window.print()} className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg text-sm">
                <Printer size={18} /> Chop etish
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-primary/30 transition-all text-sm">
                <Download size={18} /> PDF Yuklash
              </button>
           </div>
        </div>

        {/* Real Document Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 md:p-16 rounded shadow-2xl relative overflow-hidden print:p-0 print:shadow-none print:rounded-none"
          style={{ minHeight: '1120px', fontFamily: '"Times New Roman", Times, serif' }}
        >
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none z-0">
             <FlaskConical size={500} />
          </div>

          <div className="relative z-10 text-black leading-tight text-sm">
            
            {/* Approved Header */}
            <div className="flex justify-between mb-8 items-start">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 relative">
                   {/* Circle Seal Graphic */}
                   <div className="absolute inset-0 border-2 border-blue-900/30 rounded-full flex flex-col items-center justify-center text-[7px] text-blue-900/40 text-center font-bold">
                      <p>KARMANA TUMANI</p>
                      <p className="text-xs my-0.5">GULISTON</p>
                      <p>LABORATORIYASI</p>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <FlaskConical size={40} className="text-primary" />
                   </div>
                </div>
              </div>
              <div className="text-right text-[12px] font-bold">
                <p>«УТВЕРЖДАЮ»</p>
                <p>Директор ООО «GULISTON»</p>
                <div className="mt-4 flex flex-col items-end">
                  <div className="w-32 border-b border-black text-center mb-1">
                    {protocolData.approved_by}
                  </div>
                  <p>{protocolData.protocol_date} г</p>
                </div>
              </div>
            </div>

            {/* QR Code and Document ID Verification Bar */}
            <div className="flex justify-center mb-8">
               <div className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm text-center">
                  <QrCode size={90} className="text-black mx-auto mb-1" />
                  <p className="text-[9px] font-bold text-gray-400">ID: {protocolData.unique_id}</p>
               </div>
            </div>

            {/* Protocol Number Title */}
            <h1 className="text-center font-bold text-base md:text-lg mb-8 uppercase">
              ПРОТОКОЛ ИСПЫТАНИЯ № {protocolData.unique_id} от {protocolData.protocol_date} г
            </h1>

            {/* Document Details Table-like DL */}
            <div className="space-y-2 mb-10 text-[12px] md:text-[13px]">
              <div className="grid grid-cols-[200px_1fr] gap-x-4 gap-y-1">
                <p className="font-bold">Наименование лаборатории:</p> <p>{protocolData.lab_name}</p>
                <p className="font-bold">Адрес:</p> <p>{protocolData.lab_address}</p>
                <p className="font-bold">Наименование заказчика:</p> <p>{protocolData.client}</p>
                <p className="font-bold">Наименование изготовителя (поставщика):</p> <p>{protocolData.manufacturer}</p>
                <p className="font-bold">Цель, задачи и вид испытаний:</p> <p>{protocolData.purpose}</p>
                <p className="font-bold">Информация об отборе образцов:</p> <p className="leading-tight">{protocolData.sampling_info}</p>
                <p className="font-bold">Наименование продукции:</p> <p>{protocolData.product}</p>
                <p className="font-bold">НД на объекты испытания:</p> <p>{protocolData.nd_object}</p>
                <p className="font-bold">НД на методы испытания:</p> <p>{protocolData.nd_method}</p>
                <p className="font-bold">Условия проведения испытаний:</p> <p>{protocolData.test_conditions}</p>
                <p className="font-bold">Дата получения образцов:</p> <p>{protocolData.received_date}</p>
              </div>
            </div>

            {/* Equipment Table */}
            <div className="mb-8">
               <p className="font-bold mb-3 text-[13px]">Перечень средств измерении и испытательных оборудовании:</p>
               <table className="w-full border-collapse border border-black text-[11px] md:text-[12px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-black p-2 text-left font-bold">Наименование средств измерений и испытательных оборудований</th>
                      <th className="border border-black p-2 text-left font-bold">Сертификаты поверки/калибровки или аттестации</th>
                    </tr>
                  </thead>
                  <tbody>
                    {protocolData.equipment.map((eq, i) => (
                      <tr key={i}>
                        <td className="border border-black p-2">{eq.name}</td>
                        <td className="border border-black p-2">{eq.cert}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>

            {/* Additional Info Block */}
            <div className="space-y-1 mb-8 text-[12px] md:text-[13px]">
              <p><span className="font-bold">Дополнительная информация:</span> -</p>
              <p><span className="font-bold">Информация о субподрядных работах:</span> -</p>
              <p><span className="font-bold">Дата проведения испытания:</span> {protocolData.test_date}</p>
              <p><span className="font-bold">Дата подписания протокола:</span> {protocolData.sign_date}</p>
            </div>

            {/* Results Header */}
            <h3 className="text-center font-bold mb-4 text-[13px] md:text-[14px]">Результаты проведения испытания</h3>

            {/* Results Table */}
            <div className="mb-10">
               <table className="w-full border-collapse border border-black text-[11px] md:text-[12px]">
                  <thead>
                    <tr className="bg-gray-50 font-bold">
                      <th className="border border-black p-2 w-10 text-center">№</th>
                      <th className="border border-black p-2 text-center">Вид испытания</th>
                      <th className="border border-black p-2 text-center">Значения требования по НД</th>
                      <th className="border border-black p-2 text-center">Фактическое Значения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center font-bold bg-gray-100 text-[10px]">
                      <td className="border border-black p-1">1</td>
                      <td className="border border-black p-1">2</td>
                      <td className="border border-black p-1">3</td>
                      <td className="border border-black p-1">4</td>
                    </tr>
                    {protocolData.results.map((res, i) => (
                      <tr key={i}>
                        <td className="border border-black p-2 text-center">{i + 1}</td>
                        <td className="border border-black p-2">{res.type}</td>
                        <td className="border border-black p-2 text-center">{res.unit}</td>
                        <td className="border border-black p-2 text-center font-bold">{res.fact}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               <p className="text-[10px] mt-2 italic font-bold">* н.о. - не обнаружено</p>
            </div>

            {/* Signature Area */}
            <div className="mt-16 border-t border-black pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
               <div className="flex items-end gap-2 text-[13px]">
                  <span className="font-bold">Испытатель:</span>
                  <div className="w-32 border-b border-black flex items-end justify-center pb-0.5">
                     <span className="text-[9px] text-gray-400 italic">Подпись: Al_</span>
                  </div>
                  <span className="font-bold">{protocolData.tester}</span>
               </div>
               <div className="text-[10px] text-right font-bold opacity-40">
                  <p>Протокол испытания № {protocolData.unique_id} от {protocolData.protocol_date}г. ЦНИиИЛ при ООО «GULISTON»</p>
               </div>
            </div>

            {/* Page Footer */}
            <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest border-t border-gray-100 pt-4">
               <span>Guliston MITSL Central Lab</span>
               <span>Стр. 1 из 1</span>
            </div>
            
            <p className="mt-6 text-center text-[9px] text-gray-200">Сканировано с CamScanner</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media print {
          @page { margin: 1cm; size: A4 portrait; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .min-h-screen { min-height: 0 !important; padding: 0 !important; }
          .bg-neutralLight { background: white !important; }
          .print\\:hidden { display: none !important; }
          .shadow-2xl { box-shadow: none !important; }
          .rounded { border-radius: 0 !important; }
          .p-12, .p-16 { padding: 30px !important; }
          .glass { background: white !important; border: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ProtocolDetail;
