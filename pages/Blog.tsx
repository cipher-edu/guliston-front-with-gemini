
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Newspaper, 
  Loader2, 
  ChevronRight,
  AlertCircle,
  Clock,
  Tag,
  Search,
  X,
  Filter,
  FileQuestion
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  hero_image: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const data = await api.get('blog');
        const results = data.results || (Array.isArray(data) ? data : []);
        
        if (results && results.length > 0) {
          setPosts(results.filter((p: BlogPost) => p.is_published));
          setIsFallback(false);
        } else {
          throw new Error('Hozircha maqolalar mavjud emas');
        }
      } catch (err: any) {
        console.warn('API fetch failed, using fallback data:', err.message);
        setIsFallback(true);
        setPosts([
          { 
            id: 0,
            title: 'Qurilish materiallarida innovatsion tahlillar', 
            slug: 'innovatsion-tahlillar',
            excerpt: 'Zamonaviy laboratoriya sinovlari va ularning qurilish sifatiga ta’siri haqida batafsil.',
            content: 'Bu yerda batafsil ilmiy tahlillar va natijalar joylashadi.',
            hero_image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800',
            is_published: true,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    const query = searchTerm.toLowerCase().trim();
    return posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const dateMatch = formatDate(post.published_at || post.created_at).toLowerCase().includes(query);
      return titleMatch || excerptMatch || dateMatch;
    });
  }, [searchTerm, posts]);

  return (
    <div className="pt-32 pb-24 bg-neutralLight dark:bg-[#0F172A] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20">
            <Newspaper size={16} /> Markaz yangiliklari
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary dark:text-white mb-8">
            Ilmiy <span className="text-primary italic">Blog</span>
          </h1>
          <p className="text-xl text-neutralDark/50 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Laboratoriyamizdagi eng so'nggi tadqiqotlar va sohadagi muhim yangiliklardan boxabar bo'ling.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass p-4 rounded-[2.5rem] border border-primary/20 shadow-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Mavzu, mazmun yoki sana bo'yicha qidirish..." 
                className="w-full bg-neutralLight dark:bg-white/5 dark:text-white border-2 border-transparent focus:border-primary/30 rounded-[2rem] py-5 pl-16 pr-14 text-lg focus:outline-none transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/10 rounded-full text-primary transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <button className="hidden md:flex items-center gap-3 px-8 py-5 bg-secondary dark:bg-primary text-white rounded-[2rem] font-bold hover:opacity-90 transition-all shrink-0">
              <Filter size={20} /> Saralash
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between px-6 gap-4">
            <div className="text-xs font-bold text-neutralDark/40 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Tag size={14} className="text-primary" />
              Natijalar: <span className="text-secondary dark:text-white">{filteredPosts.length} ta maqola</span>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-secondary dark:text-white font-bold tracking-widest uppercase text-xs">Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {filteredPosts.length > 0 ? (
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredPosts.map((post, idx) => (
                  <motion.article 
                    key={post.id || post.slug} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex flex-col bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden shadow-xl border border-white/20 hover:border-primary/30 transition-all duration-500 h-full"
                  >
                    <Link to={`/blog/${post.slug}`} className="block h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.hero_image || `https://picsum.photos/800/600?sig=${post.id}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={post.title} 
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                            <Tag size={12} /> Yangilik
                          </span>
                        </div>
                      </div>
                      <div className="p-10 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-neutralDark/40 dark:text-gray-500 mb-6 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-primary" />
                            {formatDate(post.published_at || post.created_at)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-accent" />
                            3 daqiqa
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[4rem]">
                          {post.title}
                        </h3>
                        <p className="text-neutralDark/60 dark:text-gray-400 mb-8 text-sm flex-grow line-clamp-3 leading-relaxed">
                          {post.excerpt || "Batafsil ma'lumot olish uchun maqolani to'liq o'qing."}
                        </p>
                        <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                          <span className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] group-hover:gap-4 transition-all">
                            To'liq o'qish <ChevronRight size={18} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-32 flex flex-col items-center justify-center text-center"
              >
                <FileQuestion className="text-primary/40 mb-8" size={64} />
                <h3 className="text-2xl font-serif font-bold text-secondary dark:text-white mb-4">Afsuski, hech narsa topilmadi</h3>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-secondary transition-all"
                >
                  Barcha maqolalarni ko'rish
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
