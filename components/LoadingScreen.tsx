
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../LanguageContext';

const LoadingScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-4 border-primary border-t-accent rounded-full mb-4"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="text-white font-medium tracking-widest uppercase"
      >
        {t.common.loading}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
