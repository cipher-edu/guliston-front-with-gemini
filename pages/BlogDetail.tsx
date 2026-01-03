
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronLeft, 
  Clock, 
  Tag, 
  Loader2, 
  AlertCircle,
  Share2,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.get(`blog/${slug}`);
        setPost(data);
      } catch (err: any) {
        console.error('Fetch post error:', err);
        setError('Maqola topilmadi yoki tarmoq xatosi.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutralLight dark:bg-[#0F172A] pt-20">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-secondary dark:text-white font-bold tracking-widest uppercase text-xs">Maqola yuklanmoqda...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutralLight dark:bg-[#0F172A] px-4">
        <div className="glass p-12 rounded-[3rem] text-center max-w-lg border border-red-500/20 shadow-2xl">
          <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">Kechirasiz!</h2>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-secondary transition-all">
            <ChevronLeft size={20} /> Blogga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-24">
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img 
          src={post.hero_image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                <Tag size={12} /> Yangilik
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                <Calendar size={12} /> {formatDate(post.published_at)}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
        <button 
          onClick={() => navigate('/blog')}
          className="absolute top-32 left-8 md:left-12 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-primary transition-all z-20"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-xl md:text-2xl font-serif text-secondary dark:text-gray-300 italic mb-12 border-l-4 border-primary pl-8 leading-relaxed">
          {post.excerpt}
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="text-neutralDark/80 dark:text-gray-300 leading-[1.8] text-lg space-y-8 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
        <div className="mt-20 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-bold text-neutralDark/40 hover:text-primary transition-colors">
              <Share2 size={18} /> Ulashish
            </button>
          </div>
          <Link 
            to="/blog" 
            className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2"
          >
            Barcha maqolalar <ChevronLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
