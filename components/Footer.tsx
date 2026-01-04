
import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Mail, Phone, MapPin, Instagram, Facebook, Send, Youtube, Clock, ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useTranslation } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          
          <div className="lg:col-span-3 space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <FlaskConical className="text-white w-8 h-8" />
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif tracking-tight leading-none">Guliston-MITSL</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-primary font-black mt-2">Scientific Lab</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              {t.footer.desc}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 border border-white/10 group">
                <Send size={18} />
              </a>
              <a href="#" className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 border border-white/10 group">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 border border-white/10 group">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              {t.footer.company}
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="text-white/50 hover:text-primary transition-all flex items-center gap-2">{t.nav.about}</Link></li>
              <li><Link to="/services" className="text-white/50 hover:text-primary transition-all flex items-center gap-2">{t.nav.services}</Link></li>
              <li><Link to="/blog" className="text-white/50 hover:text-primary transition-all flex items-center gap-2">{t.nav.blog}</Link></li>
              <li><Link to="/careers" className="text-white/50 hover:text-primary transition-all flex items-center gap-2">{t.nav.careers}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-accent rounded-full"></div>
              {t.footer.contacts}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary" size={22} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1">{t.footer.office}</p>
                  <p className="text-sm text-white/90 font-medium leading-relaxed">{t.footer.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-primary" size={22} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1">{t.footer.phone_label}</p>
                  <p className="text-lg text-white font-bold">+998 71 123 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-primary" size={22} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1">{t.footer.work_hours}</p>
                  <p className="text-sm text-white/90 font-medium">{t.footer.mon_sat}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-2 font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> {t.footer.open_now}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 group">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-white/20 rounded-full"></div>
              {t.footer.location_title}
            </h4>
            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden border-4 border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d855.5397411662528!2d65.37868315078254!3d40.10527688743476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c76261daf63d%3A0x64365eaea7a549c7!2sGuliston-MITS%20tahlil%20laboratoriyasi!5e1!3m2!1sru!2s!4v1767368521578!5m2!1sru!2s" 
                className="absolute inset-0 w-full h-full grayscale-[0.1]"
                style={{ border: 0 }} 
                loading="lazy" 
              ></iframe>
            </div>
            <a 
              href="https://maps.app.goo.gl/FPnJeHHtatpKmZybA" 
              target="_blank" 
              className="mt-4 w-full bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-3 hover:bg-white hover:text-primary transition-all"
            >
              {t.footer.google_maps} <ArrowUpRight size={20} />
            </a>
          </div>

        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/40">
          <p>© 2025 <span className="text-white font-bold tracking-tight">Guliston-MITSL</span>. {t.footer.rights}</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-white/40 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck size={18} className="text-primary" />
              <span>Akkreditatsiya: O'ZAK.SL.0235</span>
            </div>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-medium">Powered by <span className="text-primary font-black">CIPHER-EDU</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
