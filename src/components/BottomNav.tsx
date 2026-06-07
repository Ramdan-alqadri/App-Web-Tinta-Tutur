import React from 'react';
import { Home, Store, FlaskConical, Info } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'produk', icon: Store, label: 'Produk' },
    { id: 'lab', icon: FlaskConical, label: 'Lab' },
    { id: 'tentang', icon: Info, label: 'Tentang Kami' },
  ];

  return (
    <div className="absolute bottom-6 left-6 right-6 h-16 bg-brand-nav backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-around px-2 border border-white/20 z-40 dark:border-black/20">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all"
          >
            <div className={`transition-all duration-300 ${isActive ? 'text-brand-primary transform -translate-y-1' : 'text-brand-dark-brown/40 hover:text-brand-dark-brown/60'}`}>
              <tab.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-sans font-semibold transition-all duration-300 ${isActive ? 'text-brand-primary opacity-100' : 'text-brand-dark-brown/40 opacity-0 -translate-y-2'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  );
}
