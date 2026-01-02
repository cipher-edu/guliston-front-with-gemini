import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: 'Qurilish materiallarida ekologik tahlillarning ahamiyati',
      date: '15.04.2025',
      category: 'Texnologiya',
      desc: 'Zamonaviy qurilishda ekologik tozalik nafaqat talab, balki inson salomatligi uchun hayotiy zaruratdir...',
      image: 'https://picsum.photos/600/400?nature=1'
    },
    {
      title: 'Sement sifatini tekshirishning yangi usullari',
      date: '10.04.2025',
      category: 'Tadqiqot',
      desc: 'Laboratoriyamiz mutaxassislari sement tarkibidagi faol qo‘shimchalarni aniqlashning yangi ekspress usulini joriy etishdi...',
      image: 'https://picsum.photos/600/400?science=2'
    },
    {
      title: 'ISO standartlari 2025: Nimalar o‘zgardi?',
      date: '05.04.2025',
      category: 'Yangiliklar',
      desc: 'Xalqaro standartlashtirish tashkiloti tomonidan e’lon qilingan yangi talablar qurilish sohasiga qanday ta’sir qiladi?',
      image: 'https://picsum.photos/600/400?business=3'
    },
    {
      title: 'Beton mustahkamligini oshirish bo‘yicha trening',
      date: '01.04.2025',
      category: 'Ta’lim',
      desc: 'Bizning markazimizda yirik qurilish kompanuyalari muhandislari uchun navbatdagi amaliy seminar bo‘lib o‘tdi...',
      image: 'https://picsum.photos/600/400?education=4'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-neutralLight dark:bg-[#0F172A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Newspaper size={16} /> Markaz Yangiliklari
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-white mb-6">Blog va Maqolalar</h1>
          <p className="text-xl text-neutralDark/60 dark:text-gray-400 max-w-2xl mx-auto">
            Sohadagi so‘nggi yangiliklar, ilmiy kashfiyotlar va foydali tavsiyalar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/20"
            >
              <div className="relative overflow-hidden h-72">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-secondary/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-secondary dark:text-white">
                  {post.category}
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-6 text-sm text-neutralDark/40 dark:text-gray-400 font-medium mb-6">
                  <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-2"><User size={14} /> MITSL News</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutralDark/60 dark:text-gray-400 mb-8 leading-relaxed line-clamp-2">
                  {post.desc}
                </p>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  Batafsil o‘qish <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;