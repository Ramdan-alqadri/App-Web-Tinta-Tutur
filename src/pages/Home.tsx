import React, { useState } from 'react';
import { ShoppingCart, Search, Heart, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import { products } from '../data';
import BottomSheet from '../components/BottomSheet';
import { motion } from 'motion/react';
import { Product } from '../types';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col w-full h-full pb-28 overflow-y-auto hidden-scrollbar bg-brand-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-brand-bg/95 backdrop-blur-md z-20">
        <Logo />
        <div className="flex items-center gap-4">
          <button className="text-brand-text/50 hover:text-brand-text transition-colors">
            <Search size={22} />
          </button>
          <button className="relative text-brand-text hover:text-brand-primary transition-colors">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-secondary rounded-full border border-brand-bg"></span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-2">
        
        {/* Section 1: Produk Terlaris */}
        <div className="flex flex-col">
          <div className="px-6 flex justify-between items-end mb-4 border-b border-brand-text/10 pb-2 border-dashed">
            <div>
              <p className="font-sans text-[8px] font-bold tracking-widest uppercase text-brand-text/50 mb-1">Produk Terlaris Minggu Ini</p>
              <h2 className="font-serif font-bold text-2xl text-brand-text leading-none">Jelajahi Karya Mereka</h2>
            </div>
            <button className="font-sans text-[10px] text-brand-text/50 hover:text-brand-primary underline transition-colors whitespace-nowrap mb-0.5">
              Lihat Semua Produk
            </button>
          </div>

          <div className="px-6 flex gap-4 overflow-x-auto hidden-scrollbar pb-6 snap-x pt-2">
            {products.map((product) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={product.id} className="bg-brand-bg rounded-xl w-[220px] flex-shrink-0 snap-start flex flex-col cursor-pointer border border-brand-text/10 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  
                  {/* STORY INCLUDED Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-brand-text/50 backdrop-blur-md px-2 py-0.5 rounded-sm">
                    <span className="font-sans text-[9px] font-bold tracking-wider text-white uppercase">Story Included</span>
                  </div>
                  
                  {/* Heart Icon */}
                  <button className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-text hover:text-brand-secondary hover:bg-white transition-colors shadow-sm">
                    <Heart size={14} />
                  </button>
                </div>
                
                <div className="flex flex-col p-3.5 pt-4">
                  <p className="font-sans text-[9px] text-brand-text/50 uppercase tracking-widest font-bold mb-1.5">{product.category}</p>
                  <h3 className="font-serif font-bold text-brand-text text-[15px] leading-snug line-clamp-1">{product.title}</h3>
                  <p className="font-sans text-[11px] text-brand-text/60 mt-1">oleh {product.creator}</p>
                  
                  <div className="flex items-end justify-between mt-5">
                     <p className="font-sans font-bold text-brand-text text-sm">
                       Rp {(product.price).toLocaleString('id-ID')}
                     </p>
                     <button 
                       onClick={() => setSelectedProduct(product)}
                       className="px-3 py-1 rounded-full border border-brand-text/20 text-[9px] font-bold text-brand-secondary/80 uppercase tracking-wider hover:border-brand-secondary hover:text-brand-secondary transition-colors"
                     >
                       Story
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Featured Story */}
        <div className="px-6 flex flex-col gap-5">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&q=80" alt="Featured Story" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-sm">
              <span className="font-sans text-[9px] font-bold tracking-wider text-brand-text uppercase">Featured Story</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <p className="font-sans text-[9px] font-bold tracking-widest uppercase text-brand-text/50 mb-2">Kisah Teman Tunagrahita</p>
            <h2 className="font-serif font-bold text-[1.7rem] leading-tight text-brand-text">Lebih dari Sekadar Produk, Ini Adalah Tutur Hati.</h2>
            
            <p className="font-sans text-xs text-brand-text/70 mt-4 leading-relaxed font-medium">
              Di sudut kecil daerah Gowa, Sari aria duduk setiap pagi sebelum matahari penuh. Jari-jarinya yang terampil merajut benang pewarna alami menjadi Anyaman yang bukan sekadar untuk menjadi tas, melainkan doa, identitas, dan warisan yang ia titipkan kepada generasi berikutnya.
            </p>
            
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-text/10">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Sari" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-brand-text text-sm">Sari</span>
                <span className="font-sans text-[10px] text-brand-text/60">Keahlian: Menganyam</span>
              </div>
            </div>
            
            <button className="mt-6 w-fit bg-brand-secondary text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-brand-secondary/90 active:scale-95 transition-all flex items-center gap-2">
              Baca Cerita <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Section 3: Katalog Karya */}
        <div className="px-6 flex flex-col mb-10">
          <div className="flex justify-between items-end mb-4 border-b border-brand-text/10 pb-2 border-dashed">
            <div>
              <p className="font-sans text-[8px] font-bold tracking-widest uppercase text-brand-text/50 mb-1">Pilih Berdasarkan Kategori</p>
              <h2 className="font-serif font-bold text-2xl text-brand-text leading-none">Katalog karya</h2>
            </div>
            <button className="font-sans text-[10px] text-brand-text/50 hover:text-brand-primary underline transition-colors whitespace-nowrap mb-0.5">
              Lihat Semua Kategori
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { id: 'fashion', name: 'Fashion', count: 142, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80' },
              { id: 'kerajinan', name: 'Kerajinan', count: 98, img: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=400&q=80' },
              { id: 'seni', name: 'Seni', count: 67, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
              { id: 'aksesori', name: 'Aksesori', count: 215, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80' }
            ].map(cat => (
              <div key={cat.id} className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex flex-col">
                  <span className="font-serif font-bold text-white text-[17px]">{cat.name}</span>
                  <span className="font-sans text-[10px] text-white/70">{cat.count} produk</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomSheet isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div className="flex flex-col gap-6 pt-2">
            <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto shadow-md mb-2 border-4 border-brand-bg">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="font-serif font-bold text-2xl text-brand-text mb-1">{selectedProduct.title}</h2>
              <p className="font-sans text-xs font-semibold text-brand-secondary tracking-widest uppercase mb-1">
                {selectedProduct.category} • oleh {selectedProduct.creator}
              </p>
            </div>
            
            <div className="bg-brand-surface p-6 rounded-2xl relative border border-brand-text/5 shadow-inner">
              <div className="absolute -top-3 left-6 text-brand-secondary bg-brand-surface px-2 rounded-full border border-brand-text/5">
                <Heart size={16} fill="currentColor" />
              </div>
              <p className="font-sans text-brand-text leading-relaxed text-[0.95rem] font-medium text-center">
                "{selectedProduct.story}"
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="py-4 px-6 rounded-2xl border border-brand-text/10 bg-brand-surface text-brand-text active:scale-95 transition-all text-sm font-bold flex items-center justify-center hover:bg-brand-text/5">
                <Heart size={20} />
              </button>
              <button className="flex-1 py-4 rounded-2xl bg-brand-primary text-white font-bold text-[15px] shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2">
                Beli - Rp {(selectedProduct.price).toLocaleString('id-ID')}
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
