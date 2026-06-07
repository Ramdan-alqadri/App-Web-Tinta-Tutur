import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Produk from './pages/Produk';
import LabBelajar from './pages/LabBelajar';
import Tentang from './pages/Tentang';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <div className="mobile-frame relative bg-brand-bg">
        <AnimatePresence mode="wait" initial={false}>
          {showSplash ? (
            <motion.div 
              key="splash" 
              className="absolute inset-0 z-50 flex items-center justify-center bg-brand-bg flex-col gap-6"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex items-center gap-4 select-none"
              >
                <svg width="48" height="64" viewBox="0 0 24 32" className="fill-brand-secondary drop-shadow-md">
                  <path d="M12 0C12 0 1 12 1 19.5C1 25.5 5.5 30 12 30C18.5 30 23 25.5 23 19.5C23 12 12 0 12 0Z"/>
                </svg>
                <div className="flex flex-col justify-center translate-y-2">
                  <span className="font-serif font-bold text-5xl leading-[0.8] text-brand-primary">tinta</span>
                  <span className="font-sans font-medium text-[0.85rem] tracking-[0.45em] text-brand-primary mt-2 ml-1">TUTUR</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
              >
                 <div className="w-6 h-6 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                 <p className="font-sans text-[10px] font-bold text-brand-text/40 tracking-widest uppercase">Memuat Karya</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="main-app" 
              className="absolute inset-0 flex flex-col h-full w-full bg-brand-bg"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative flex-1 w-full h-full overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {activeTab === 'home' && (
                    <motion.div key="home" className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <Home />
                    </motion.div>
                  )}
                  {activeTab === 'produk' && (
                    <motion.div key="produk" className="absolute inset-0"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <Produk />
                    </motion.div>
                  )}
                  {activeTab === 'lab' && (
                    <motion.div key="lab" className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <LabBelajar />
                    </motion.div>
                  )}
                  {activeTab === 'tentang' && (
                    <motion.div key="tentang" className="absolute inset-0"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Tentang />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
