
import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Mail, Phone, MapPin, Instagram, Facebook, Send, Youtube, Clock, ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          
          {/* Column 1: Brand & Professional Identity */}
          <div className="lg:col-span-3 space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <FlaskConical className="text-white w-8 h-8" />
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif tracking-tight leading-none">Guliston-MITSL</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-primary font-black mt-2">Scientific Laboratory</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              O'zbekistondagi eng zamonaviy markaziy ilmiy-tadqiqot va sinov laboratoriyasi. Qurilish xavfsizligini ilmiy asosda kafolatlaymiz.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Send size={18} />, link: "https://t.me/GulistonMITSL" },
                { icon: <Facebook size={18} />, link: "#" },
                { icon: <Instagram size={18} />, link: "#" },
                { icon: <Youtube size={18} />, link: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 border border-white/10 group"
                >
                  <div className="group-hover:scale-110 transition-transform">{social.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Hierarchy */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              Kompaniya
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="text-white/50 hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-white/20 rounded-full group-hover:scale-150 group-hover:bg-primary transition-all"></div> Biz haqimizda</Link></li>
              <li><Link to="/services" className="text-white/50 hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-white/20 rounded-full group-hover:scale-150 group-hover:bg-primary transition-all"></div> Xizmatlar</Link></li>
              <li><Link to="/blog" className="text-white/50 hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-white/20 rounded-full group-hover:scale-150 group-hover:bg-primary transition-all"></div> Yangiliklar</Link></li>
              <li><Link to="/careers" className="text-white/50 hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-white/20 rounded-full group-hover:scale-150 group-hover:bg-primary transition-all"></div> Karyera</Link></li>
              <li><Link to="/add-shartnoma" className="text-white/50 hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-white/20 rounded-full group-hover:scale-150 group-hover:bg-primary transition-all"></div> Ariza yuborish</Link></li>
            </ul>
          </div>

          {/* Column 3: Operational Contacts */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-accent rounded-full"></div>
              Kontaktlar
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/20 transition-all shadow-lg">
                  <MapPin className="text-primary" size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1">Markaziy Ofis</p>
                  <p className="text-sm text-white/90 font-medium leading-relaxed group-hover:text-primary transition-colors">Navoiy vil., Karmana tumani,<br/>A. Temur ko'chasi 45-uy</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/20 transition-all shadow-lg">
                  <Phone className="text-primary" size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1">Yagona aloqa liniyasi</p>
                  <p className="text-lg text-white font-bold group-hover:text-primary transition-colors">+998 71 123 45 67</p>
                  <p className="text-xs text-white/40 mt-1">info@guliston-mitsl.uz</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/20 transition-all shadow-lg">
                  <Clock className="text-primary" size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1">Ish rejimi</p>
                  <p className="text-sm text-white/90 font-medium">Du - Sha: 09:00 - 18:00</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-2 font-bold"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Hozir ochiq</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Senior Map Integration */}
          <div className="lg:col-span-4 group">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-white/20 rounded-full"></div>
              Interaktiv Joylashuv
            </h4>
            <div className="relative h-80 w-full rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl group-hover:border-primary/30 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d855.5397411662528!2d65.37868315078254!3d40.10527688743476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c76261daf63d%3A0x64365eaea7a549c7!2sGuliston-MITS%20tahlil%20laboratoriyasi!5e1!3m2!1sru!2s!4v1767368521578!5m2!1sru!2s" 
                className="absolute inset-0 w-full h-full grayscale-[0.1] contrast-[1.1] hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-110"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              {/* Dynamic Info Overlay */}
              <div className="absolute top-6 left-6 right-6">
                <div className="bg-secondary/90 backdrop-blur-xl px-5 py-3 rounded-[1.5rem] border border-white/10 flex items-center justify-between shadow-2xl translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Guliston-MITSL Lab</span>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/FPnJeHHtatpKmZybA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-white transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Floating Action Button */}
              <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                <a 
                  href="https://maps.app.goo.gl/FPnJeHHtatpKmZybA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-primary transition-all group/btn"
                >
                  Yo'nalishni Google Maps orqali ko'rish 
                  <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-4">
               <div className="h-px flex-grow bg-white/5"></div>
               <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black italic">
                 Markaziy Tahlil Laboratoriyasi
               </p>
               <div className="h-px flex-grow bg-white/5"></div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Meta */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-sm text-white/40">
            <p>© 2025 <span className="text-white font-bold tracking-tight">Guliston-MITSL</span>. Barcha huquqlar qat'iy himoyalangan.</p>
            <div className="flex gap-8 font-medium">
              <a href="#" className="hover:text-primary transition-colors">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-primary transition-colors">Foydalanish shartlari</a>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-white/40 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck size={18} className="text-primary" />
              <span>Akkreditatsiya: O'ZAK.SL.0235</span>
            </div>
            <div className="h-6 w-px bg-white/10"></div>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-medium">Powered by <span className="text-primary font-black">CIPHER-EDU</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
