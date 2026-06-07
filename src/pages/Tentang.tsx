import React from 'react';
import { Sparkles, Leaf, Target, ShieldCheck, HeartHandshake, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export default function Tentang() {
  return (
    <div className="flex flex-col w-full h-full pb-28 overflow-y-auto hidden-scrollbar bg-brand-bg relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-brand-bg/95 backdrop-blur-md z-30 border-b border-brand-text/5">
        <div>
          <h1 className="font-serif font-bold text-2xl text-brand-text">Tentang Kami</h1>
          <p className="font-sans text-[10px] text-brand-text/50 font-bold tracking-widest uppercase">Mengenal Lebih Dekat</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&q=80" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 z-10 pt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-[10px] font-bold text-brand-secondary tracking-widest uppercase mb-3">Siapa Kami</p>
            <h1 className="font-serif font-bold text-4xl text-white leading-tight mb-4">
              Mengangkat Karya,<br/>Merangkul Cerita
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-surface rounded-[2rem] p-6 shadow-xl border border-brand-text/5 flex flex-col gap-4"
        >
          <p className="font-sans text-[0.95rem] text-brand-text/90 font-medium leading-relaxed">
            <strong className="text-brand-text font-bold">Tinta Tutur</strong> adalah platform social commerce berbasis storytelling digital yang dirancang untuk membantu kurasi, branding, dan penjualan produk karya penyandang tunagrahita. Kami percaya bahwa setiap karya memiliki cerita yang layak didengar dan dihargai.
          </p>
          <p className="font-sans text-[0.85rem] text-brand-text/70 font-medium leading-relaxed">
            Platform ini bukan sekadar media transaksi — kami membangun kedekatan emosional antara produk dan konsumen melalui pendekatan storytelling, mengangkat nilai cerita, proses kreatif, dan latar belakang pembuatnya sebagai nilai tambah.
          </p>
          
          <div className="mt-2 bg-[#F5F0E8] p-5 rounded-2xl border border-brand-text/5 relative">
            <Sparkles className="absolute top-4 left-4 text-brand-secondary opacity-50" size={24} />
            <p className="font-serif italic text-brand-text font-semibold text-center mt-6 text-[0.95rem] px-2 leading-relaxed">
              "Setiap karya bukan hanya produk — melainkan cerita tentang ketekunan, kreativitas, dan semangat yang tak terkalahkan."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Visi & Misi */}
      <div className="px-6 mt-12 flex flex-col items-center">
        <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-brand-text/40 mb-2">Arah Langkah Kami</p>
        <h2 className="font-serif font-bold text-3xl text-brand-text mb-8">Visi & Misi</h2>

        <div className="flex flex-col gap-6 w-full">
          {/* Visi */}
          <div className="bg-brand-surface p-6 rounded-[2rem] border border-brand-text/5 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-700">
              <Leaf size={24} />
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-text mb-3">Visi Kami</h3>
            <p className="font-sans text-[0.85rem] text-brand-text/70 font-medium leading-relaxed">
              Menjadi platform ekonomi kreatif inklusif terdepan yang memberdayakan penyandang tunagrahita melalui kurasi produk berbasis storytelling, sehingga tercipta ekosistem yang adil, bermartabat, dan berkelanjutan bagi seluruh pemangku kepentingan.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-brand-surface p-6 rounded-[2rem] border border-brand-text/5 shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
              <Target size={24} />
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-text mb-3">Misi Kami</h3>
            <p className="font-sans text-[0.85rem] text-brand-text/70 font-medium mb-4">Langkah-langkah konkret untuk mewujudkan visi kami:</p>
            <ul className="flex flex-col gap-3">
              {[
                "Memperluas akses pasar bagi produk karya penyandang tunagrahita",
                "Mendorong kemandirian ekonomi melalui pendekatan digital",
                "Meningkatkan daya tarik produk melalui narasi cerita autentik",
                "Membangun ekosistem ekonomi kreatif yang inklusif dan berkelanjutan"
              ].map((misi, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                  </div>
                  <span className="font-sans text-[0.85rem] text-brand-text/80 font-medium leading-relaxed">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12 bg-brand-text/5 py-10 px-6 flex flex-wrap justify-between gap-y-8">
        {[
          { label: "Pengrajin Tunagrahita Terberdayakan", value: "150+" },
          { label: "Produk Karya Terkurasi", value: "500+" },
          { label: "Provinsi Terjangkau", value: "12" },
          { label: "Pembeli yang Peduli", value: "3.200+" }
        ].map((stat, i) => (
          <div key={i} className="w-[45%] flex flex-col items-center text-center">
            <span className="font-serif font-bold text-3xl text-brand-text mb-1">{stat.value}</span>
            <span className="font-sans text-[9px] font-bold text-brand-text/60 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Nilai Yang Kami Junjung */}
      <div className="px-6 mt-12 flex flex-col items-center">
        <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-brand-text/40 mb-2">Nilai Yang Kami Junjung</p>
        <h2 className="font-serif font-bold text-3xl text-brand-text mb-3 text-center">Mengapa Tinta Tutur?</h2>
        <p className="font-sans text-xs text-brand-text/60 font-semibold text-center mb-8 max-w-[90%]">
          Setiap aspek platform kami dirancang untuk membawa dampak positif bagi pengrajin, pembeli, dan masyarakat.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <img src="https://img.icons8.com/color/48/open-book.png" alt="book" className="w-8" />, title: "Storytelling Autentik", desc: "Setiap produk disertai narasi cerita unik dari pembuatnya — bukan sekadar deskripsi, melainkan jendela ke dunia kreativitas mereka." },
            { icon: <img src="https://img.icons8.com/color/48/handshake.png" alt="empower" className="w-8" />, title: "Pemberdayaan Inklusif", desc: "Kami membantu penyandang tunagrahita mendapatkan penghasilan yang adil dan layak melalui karya-karya tangan mereka sendiri." },
            { icon: <ShieldCheck size={32} className="text-green-600" />, title: "Kurasi Berkualitas", desc: "Setiap produk melewati proses kurasi ketat untuk memastikan kualitas, keaslian, dan keunikan yang layak diapresiasi." },
            { icon: <Leaf size={32} className="text-brand-primary" />, title: "Ekosistem Berkelanjutan", desc: "Kami membangun siklus bisnis yang berkelanjutan — dari pelatihan, produksi, hingga distribusi yang mendukung kemandirian." },
            { icon: <HeartHandshake size={32} className="text-brand-secondary" />, title: "Kedekatan Emosional", desc: "Belanja bukan sekadar transaksi — pembeli merasakan ikatan personal dengan pengrajin melalui cerita di balik produk." },
            { icon: <Rocket size={32} className="text-indigo-500" />, title: "Teknologi untuk Semua", desc: "Memanfaatkan teknologi digital untuk memperluas akses pasar dan memberikan kesempatan yang setara bagi semua pengrajin." },
          ].map((item, i) => (
            <div key={i} className="bg-brand-surface rounded-[1.5rem] p-5 border border-brand-text/5 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-brand-bg rounded-full flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <h4 className="font-serif font-bold text-sm text-brand-text">{item.title}</h4>
              <p className="font-sans text-[9px] text-brand-text/60 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
