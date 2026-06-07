import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-brand-bg rounded-t-[2.5rem] shadow-[0_-10px_40px_rgb(0,0,0,0.2)] z-50 flex flex-col"
          >
            <div className="flex justify-center p-4 cursor-pointer" onClick={onClose}>
               <div className="w-12 h-1.5 bg-brand-text/10 rounded-full"></div>
            </div>
            <div className="flex-1 overflow-y-auto hidden-scrollbar px-8 pb-12">
               {children}
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-text/5 text-brand-text hover:bg-brand-text/10 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
