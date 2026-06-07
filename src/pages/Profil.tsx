import React from 'react';
import { User, Settings, Info, LogOut, Award, Heart } from 'lucide-react';

export default function Profil() {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto hidden-scrollbar px-6 pt-10 pb-28 gap-8">
      <h1 className="font-serif font-bold text-3xl text-brand-text">Profil Kreator</h1>
      
      <div className="flex flex-col items-center gap-5 mt-4">
        <div className="w-28 h-28 rounded-full bg-brand-primary border-8 border-brand-surface overflow-hidden shadow-lg flex items-center justify-center relative">
           <User size={56} className="text-[#F5F0E8]" />
           <div className="absolute bottom-0 right-0 p-1.5 bg-brand-secondary text-[#F5F0E8] rounded-full">
             <Award size={16} />
           </div>
        </div>
        <div className="text-center">
          <h2 className="font-serif font-bold text-2xl text-brand-text">Wati Pengrajin</h2>
          <p className="font-sans font-semibold tracking-wide text-brand-text/60 mt-1 text-sm uppercase">Seniman Rotan</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 pb-2">
        <div className="text-center">
          <p className="font-serif font-bold text-2xl text-brand-text">12</p>
          <p className="font-sans text-xs text-brand-text/60 font-semibold uppercase">Karya</p>
        </div>
        <div className="w-px h-8 bg-brand-text/10"></div>
        <div className="text-center">
          <p className="font-serif font-bold text-2xl text-brand-text">4.9</p>
          <div className="flex items-center justify-center gap-1 font-sans text-xs text-brand-text/60 font-semibold uppercase">
             <StarIcon className="text-brand-secondary" /> Rating
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { text: 'Favorit Pelanggan', icon: Heart },
          { text: 'Pengaturan Akun', icon: Settings },
          { text: 'Pusat Bantuan', icon: Info },
          { text: 'Keluar', icon: LogOut, danger: true },
        ].map((item, i) => (
          <button key={i} className={`flex items-center gap-5 bg-brand-surface p-4 rounded-[2rem] hover:bg-black/5 active:scale-[0.98] transition-all border border-brand-text/5 shadow-sm ${item.danger ? 'text-red-500' : 'text-brand-text'}`}>
            <div className={`p-3 rounded-[1.5rem] ${item.danger ? 'bg-red-500/10' : 'bg-brand-bg shadow-inner'}`}>
              <item.icon size={22} className={item.danger ? 'text-red-500' : 'text-brand-primary'} />
            </div>
            <span className="font-sans font-semibold text-[1.05rem]">{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
}
