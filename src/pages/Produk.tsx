import React, { useState } from 'react';
import { ShoppingCart, Search, Heart, Filter } from 'lucide-react';
import Logo from '../components/Logo';
import { products } from '../data';
import BottomSheet from '../components/BottomSheet';
import { motion } from 'motion/react';
import { Product } from '../types';

export default function Produk() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'kerajinan', label: 'Kerajinan' },
    { id: 'seni', label: 'Seni' },
    { id: 'aksesori', label: 'Aksesori' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col w-full h-full pb-28 overflow-y-auto hidden-scrollbar bg-brand-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-brand-bg/95 backdrop-blur-md z-20 border-b border-brand-text/5">
        <div>
          <h1 className="font-serif font-bold text-2xl text-brand-text">Katalog</h1>
          <p className="font-sans text-[10px] text-brand-text/50 font-bold tracking-widest uppercase">Eksplorasi Karya</p>
        </div>
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

      <div className="flex flex-col gap-6 mt-4 px-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto hidden-scrollbar pb-2">
          <button className="flex-shrink-0 flex items-center justify-center p-3 rounded-2xl border border-brand-text/10 bg-brand-surface text-brand-text/60">
            <Filter size={18} />
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-5 py-3 rounded-2xl font-bold text-xs transition-all tracking-wide ${
                activeCategory === cat.id 
                  ? 'bg-brand-primary text-white shadow-md' 
                  : 'bg-brand-surface border border-brand-text/10 text-brand-text/60 hover:bg-brand-text/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={product.id} 
              className="bg-brand-bg rounded-xl flex flex-col cursor-pointer border border-brand-text/10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                
                {/* STORY INCLUDED Badge */}
                <div className="absolute top-2 left-2 bg-brand-text/50 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
                  <span className="font-sans text-[8px] font-bold tracking-wider text-white uppercase">Story</span>
                </div>
                
                {/* Heart Icon */}
                <button 
                  className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-text hover:text-brand-secondary hover:bg-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart size={12} />
                </button>
              </div>
              
              <div className="flex flex-col p-3">
                <p className="font-sans text-[8px] text-brand-text/50 uppercase tracking-widest font-bold mb-1">{product.category}</p>
                <h3 className="font-serif font-bold text-brand-text text-[13px] leading-snug line-clamp-1">{product.title}</h3>
                <p className="font-sans text-[10px] text-brand-text/60 mt-0.5">oleh {product.creator}</p>
                
                <p className="font-sans font-bold text-brand-text text-xs mt-3">
                  Rp {(product.price).toLocaleString('id-ID')}
                </p>
              </div>
            </motion.div>
          ))}
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
