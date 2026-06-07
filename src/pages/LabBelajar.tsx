import React, { useState } from 'react';
import { Play, Star, AlertCircle, CheckCircle, Volume2, VolumeX, Mic, Gift, MapPin, Truck, X, Camera, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TOTAL_LEVELS = 5;

// Mocks the browser's TTS API for cross-browser web app speech.
export default function LabBelajar() {
  const [activeLevel, setActiveLevel] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  // Level 1 States
  const [l1Name, setL1Name] = useState('');
  const [l1Material, setL1Material] = useState('');
  const [l1Price, setL1Price] = useState<number | null>(null);
  const [l1CustomPrice, setL1CustomPrice] = useState('');
  const [l1Image, setL1Image] = useState<string | null>(null);

  // Audio States
  const [isMuted, setIsMuted] = useState(false);
  const [lastSpeech, setLastSpeech] = useState('');

  // Level 3 States
  const [isRecording, setIsRecording] = useState(false);
  const [storyText, setStoryText] = useState('');
  const storyTarget = "Ini adalah karya tentang kehangatan rumah dan kenangan masa kecil yang saya rajut...";

  // Level 5 States
  const [l5Step, setL5Step] = useState(0);

  const playSfx = (type: 'success' | 'error') => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'success') {
        osc.type = 'sine';
        // Nada arpeggio ceria (C5 - E5 - G5 - C6)
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        // Bouncy envelope untuk setiap nada
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.12);
        gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.2);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.22);
        gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.3);
        gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.32);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(120, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  };

  const speakText = (text: string, force = false) => {
    setLastSpeech(text);
    if (isMuted && !force) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const replaySpeech = () => {
    if (lastSpeech) {
       speakText(lastSpeech, true);
    }
  };

  const startSimulation = () => {
    setActiveLevel(1);
    speakText('Informasi Produk. Mari lengkapi data karya Anda.');
  };

  const checkLevel1 = () => {
    const hasPrice = l1Price !== null || l1CustomPrice.trim() !== '';
    if (!l1Name || !l1Material || !hasPrice) {
      const msg = 'Harap lengkapi semua informasi produk sebelum melanjutkan.';
      setFeedbackMessage(msg);
      setShowFeedback('error');
      speakText(msg);
      playSfx('error');
    } else {
      const msg = 'Informasi produk berhasil disimpan.';
      setFeedbackMessage(msg);
      setShowFeedback('success');
      speakText(msg);
      playSfx('success');
    }
  };

  const handleLevel2 = (choice: string) => {
    if (choice === 'A' || choice === 'B') {
      const msg = 'Foto ini kurang pencahayaan atau terlalu jauh. Silakan pilih foto yang lebih jelas.';
      setFeedbackMessage(msg);
      setShowFeedback('error');
      speakText(msg);
      playSfx('error');
    } else {
      const msg = 'Pilihan yang tepat. Foto ini memperlihatkan detail produk dengan jelas.';
      setFeedbackMessage(msg);
      setShowFeedback('success');
      speakText(msg);
      playSfx('success');
    }
  };

  const handleRecordStory = () => {
    if (isRecording) return;
    setIsRecording(true);
    setStoryText('');
    speakText('Mulai merekam cerita...');
    
    let i = 0;
    const interval = setInterval(() => {
      setStoryText(storyTarget.slice(0, i + 1));
      i++;
      if (i >= storyTarget.length) {
        clearInterval(interval);
        setIsRecording(false);
        setTimeout(() => {
          const msg = 'Cerita produk berhasil direkam dan disimpan.';
          setFeedbackMessage(msg);
          setShowFeedback('success');
          speakText(msg);
          playSfx('success');
        }, 500);
      }
    }, 40);
  };

  const handleLevel4 = (isCorrect: boolean) => {
    if (!isCorrect) {
      const msg = 'Pendekatan ini kurang membangun hubungan baik dengan pelanggan. Silakan coba respons lain.';
      setFeedbackMessage(msg);
      setShowFeedback('error');
      speakText(msg);
      playSfx('error');
    } else {
      const msg = 'Respons yang tepat! Pelayanan yang ramah meningkatkan kepercayaan pembeli.';
      setFeedbackMessage(msg);
      setShowFeedback('success');
      speakText(msg);
      playSfx('success');
    }
  };

  const handleLevel5 = (step: number) => {
    if (step === l5Step + 1) {
      setL5Step(step);
      if (step === 3) {
        setTimeout(() => {
          const msg = 'Selamat! Produk Anda telah siap untuk masuk ke tahap kurasi.';
          setFeedbackMessage(msg);
          setShowFeedback('success');
          speakText(msg);
          playSfx('success');
        }, 300);
      }
    }
  };

  const nextLevel = () => {
    setShowFeedback(null);
    if (activeLevel < TOTAL_LEVELS) {
      const nextLvl = activeLevel + 1;
      setActiveLevel(nextLvl);
      
      let nextSpeech = '';
      if (nextLvl === 2) nextSpeech = 'Foto Produk. Pilih foto dengan pencahayaan dan fokus yang baik.';
      if (nextLvl === 3) nextSpeech = 'Storytelling Produk. Ceritakan latar belakang karya ini.';
      if (nextLvl === 4) nextSpeech = 'Respon Pelanggan. Balas pesan pelanggan dengan baik.';
      if (nextLvl === 5) nextSpeech = 'Proses Pengiriman. Selesaikan tahapan pengiriman pesanan.';
      speakText(nextSpeech);
    } else {
      setActiveLevel(0);
      setL1Name('');
      setL1Material('');
      setL1Price(null);
      setL1CustomPrice('');
      setL1Image(null);
      setStoryText('');
      setIsRecording(false);
      setL5Step(0);
    }
  };

  const renderLevelIndicator = () => (
    <div className="flex items-center justify-center gap-2 mt-1 mb-1 bg-brand-surface py-1.5 px-4 rounded-full mx-auto shadow-sm border border-brand-text/5 w-fit">
      {[1, 2, 3, 4, 5].map(lvl => (
        <div key={lvl} className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 shadow-inner ${activeLevel >= lvl ? 'bg-brand-secondary text-white shadow-brand-secondary/30' : 'bg-brand-bg text-brand-text/30'}`}>
          <Star size={10} fill={activeLevel >= lvl ? 'currentColor' : 'none'} />
        </div>
      ))}
    </div>
  );

  const renderLevel1 = () => (
    <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-4 p-5 bg-brand-surface rounded-[2rem] border border-brand-text/5 shadow-sm max-h-full overflow-y-auto hidden-scrollbar">
      <h3 className="font-serif font-bold text-lg text-brand-text mb-1">1. Informasi Produk</h3>
      <input 
        type="text" placeholder="Nama Karya" 
        value={l1Name} onChange={e => setL1Name(e.target.value)}
        className="w-full p-3.5 rounded-2xl bg-brand-bg border border-brand-text/10 outline-none focus:border-brand-primary placeholder:text-brand-text/30 text-brand-text font-semibold text-sm" 
      />
      <input 
        type="text" placeholder="Bahan Utama (misal: Rotan)" 
        value={l1Material} onChange={e => setL1Material(e.target.value)}
        className="w-full p-3.5 rounded-2xl bg-brand-bg border border-brand-text/10 outline-none focus:border-brand-primary placeholder:text-brand-text/30 text-brand-text font-semibold text-sm" 
      />
      
      <div className="flex flex-col gap-2 mt-1">
        <div className="text-sm font-bold text-brand-text tracking-wide">Foto Karya (Opsional):</div>
        <label className="w-full h-28 border-2 border-dashed border-brand-text/20 rounded-2xl flex flex-col items-center justify-center text-brand-text/50 cursor-pointer overflow-hidden relative bg-brand-surface hover:bg-brand-text/5 transition-colors">
          {l1Image ? (
            <img src={l1Image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <Camera size={28} className="mb-2 text-brand-primary" />
              <span className="text-xs font-semibold">Unggah Foto</span>
            </>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => setL1Image(e.target?.result as string);
                reader.readAsDataURL(file);
              }
            }} 
          />
        </label>
      </div>

      <div className="mt-2 text-sm font-bold text-brand-text tracking-wide flex justify-between">
        <span>Pilihan Harga:</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 relative z-10 w-full overflow-x-auto hidden-scrollbar pb-1">
          {[50000, 100000, 150000].map(price => (
            <button 
              key={price} 
              onClick={() => {
                setL1Price(price);
                setL1CustomPrice('');
              }}
              className={`flex-none w-24 py-2.5 rounded-2xl text-[0.75rem] font-bold border-2 transition-all active:scale-95 ${l1Price === price ? 'border-brand-primary bg-brand-primary text-white shadow-md' : 'border-brand-text/10 bg-brand-bg text-brand-text/60 hover:bg-brand-text/5'}`}
            >
              Rp {price/1000}k
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full h-px bg-brand-text/10"></div>
          <span className="text-[9px] font-bold text-brand-text/30 uppercase tracking-widest leading-none">atau</span>
          <div className="w-full h-px bg-brand-text/10"></div>
        </div>
        <div className="flex items-center bg-brand-bg border border-brand-text/10 rounded-2xl focus-within:border-brand-primary overflow-hidden transition-all shadow-inner">
          <span className="pl-4 pr-3 font-bold text-brand-text/40 text-sm">Rp</span>
          <input 
            type="number"
            placeholder="Atur harga kustom..."
            value={l1CustomPrice}
            onChange={(e) => {
              setL1Price(null);
              setL1CustomPrice(e.target.value);
            }}
            className="w-full py-3.5 pr-4 bg-transparent outline-none text-brand-text font-semibold text-sm placeholder:text-brand-text/30"
          />
        </div>
      </div>
      <button 
        onClick={checkLevel1}
        className="mt-4 w-full py-3.5 rounded-[2rem] bg-brand-primary text-[#F5F0E8] font-bold text-base hover:bg-opacity-90 active:scale-95 transition-all shadow-md"
      >
        Lanjut
      </button>
    </motion.div>
  );

  const renderLevel2 = () => (
    <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-4 p-4">
      <h3 className="font-serif font-bold text-lg text-brand-text mb-1">2. Foto Produk</h3>
      <div className="flex flex-col gap-4">
        <button onClick={() => handleLevel2('A')} className="relative h-28 rounded-3xl overflow-hidden bg-black flex items-center justify-center active:scale-[0.98] transition-transform shadow-sm">
           <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=50" className="w-full h-full object-cover opacity-30 brightness-50" alt="Gelap" />
           <span className="absolute text-white font-bold tracking-widest text-xs left-4 bottom-4 drop-shadow-md">A. PENGCAHAYAAN KURANG</span>
        </button>
        <button onClick={() => handleLevel2('B')} className="relative h-28 rounded-3xl overflow-hidden bg-white flex items-center justify-center active:scale-[0.98] transition-transform shadow-sm border border-brand-text/5">
           <img src="https://images.unsplash.com/photo-1590725140246-20acae38ac5a?w=400&q=50" className="w-full h-full object-cover scale-50 opacity-80 mix-blend-multiply" alt="Jauh" />
           <span className="absolute text-brand-text font-bold tracking-widest text-xs bg-white/70 px-3 py-1 rounded-lg left-4 bottom-4">B. JARAK TERLALU JAUH</span>
        </button>
        <button onClick={() => handleLevel2('C')} className="relative h-28 rounded-3xl overflow-hidden bg-black flex items-center justify-center active:scale-[0.98] transition-transform shadow-sm">
           <img src="https://images.unsplash.com/photo-1544413660-299165566b1d?w=400&q=80" className="w-full h-full object-cover" alt="Cerah" />
           <span className="absolute text-white font-bold tracking-widest text-xs drop-shadow-lg left-4 bottom-4">C. FOKUS & JELAS</span>
        </button>
      </div>
    </motion.div>
  );

  const renderLevel3 = () => (
    <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col items-center gap-5 h-full text-center mt-2 p-4">
      <h3 className="font-serif font-bold text-lg text-brand-text leading-tight mt-2">3. Storytelling<br/>Produk</h3>
      <p className="font-sans text-brand-text/70 text-xs font-semibold max-w-[80%] -mt-3">Ceritakan proses pembuatan atau inspirasi di balik karya ini?</p>
      
      <div className="w-full bg-brand-surface rounded-3xl p-5 border border-brand-text/5 min-h-[120px] shadow-sm flex flex-col items-center justify-center relative mt-2">
         {storyText ? (
           <p className="font-serif italic text-[0.95rem] text-brand-text/90 leading-relaxed font-semibold">"{storyText}"</p>
         ) : (
           <p className="font-sans text-brand-text/40 text-xs italic font-semibold">Teks hasil rekaman akan muncul di sini.</p>
         )}
         {isRecording && (
           <motion.div className="absolute inset-0 border-[3px] border-brand-secondary rounded-3xl opacity-50" 
             animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} />
         )}
      </div>

      <button 
        onClick={handleRecordStory}
        disabled={isRecording}
        className={`mt-4 relative w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 transition-all transform ${isRecording ? 'bg-brand-secondary scale-95 opacity-90' : 'bg-brand-secondary hover:shadow-[0_15px_30px_rgba(188,108,37,0.35)] active:scale-95'}`}
      >
        <Mic size={36} className="text-[#F5F0E8]" />
        <span className="text-[#F5F0E8] font-bold text-[10px] tracking-wider uppercase leading-tight">
          Mulai<br/>Rekam
        </span>
        
        {isRecording && (
          <span className="absolute -bottom-10 text-brand-secondary font-bold text-xs bg-brand-surface px-4 py-1.5 rounded-full border border-brand-text/10 shadow-sm animate-pulse whitespace-nowrap">Sedang merekam...</span>
        )}
      </button>
    </motion.div>
  );

  const renderLevel4 = () => (
    <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-5 p-4">
      <h3 className="font-serif font-bold text-lg text-brand-text mb-1">4. Respon Pelanggan</h3>
      
      <div className="bg-brand-surface rounded-3xl p-5 shadow-sm border border-brand-text/5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-text/10 flex items-center justify-center font-bold text-brand-text font-serif text-base">P</div>
          <div>
             <p className="font-bold text-xs text-brand-text tracking-wide uppercase mt-0.5">Pelanggan</p>
             <p className="text-[9px] text-brand-primary font-bold uppercase tracking-wider">Sedang Mengetik...</p>
          </div>
        </div>
        <div className="bg-[#F5F0E8] p-4 rounded-2xl rounded-tl-md text-brand-text text-sm font-medium leading-relaxed shadow-inner border border-brand-text/5">
          "Halo! Karyanya bagus sekali, tapi apakah warnanya bisa diganti ya kak?"
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
         <button onClick={() => handleLevel4(false)} className="p-3.5 bg-brand-surface border border-brand-text/10 rounded-2xl text-center active:scale-95 transition-all text-brand-text/60 font-bold hover:bg-brand-text/5 text-sm">
           Maaf, tidak bisa.
         </button>
         <button onClick={() => handleLevel4(true)} className="p-3.5 bg-brand-primary border-2 border-brand-primary text-[#F5F0E8] rounded-2xl text-center active:scale-[0.98] transition-all font-bold shadow-md hover:bg-opacity-95 text-sm">
           Tentu bisa, Anda ingin warna apa?
         </button>
      </div>
    </motion.div>
  );

  const renderLevel5 = () => (
    <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col items-center gap-5 p-4">
      <h3 className="font-serif font-bold text-lg text-brand-text text-center w-full">5. Proses Pengiriman</h3>
      
      <div className="w-36 h-36 relative flex items-center justify-center mt-2">
        <div className={`absolute inset-0 bg-brand-primary/5 rounded-full transition-all duration-1000 ${l5Step >= 1 ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}></div>
        
        <Gift size={80} className={`text-brand-primary transition-all duration-700 relative z-10 ${l5Step >= 1 ? 'scale-110 drop-shadow-2xl text-brand-secondary' : 'scale-100 opacity-60'}`} />
        
        <AnimatePresence>
          {l5Step >= 2 && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -right-2 top-4 bg-brand-bg p-2 rounded-xl shadow-lg border border-brand-text/5 transform rotate-12 z-20">
              <MapPin size={24} className="text-[#BC6C25]" />
            </motion.div>
          )}
          {l5Step >= 3 && (
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 1 }} className="absolute -left-2 bottom-4 bg-brand-surface p-2.5 rounded-full shadow-lg border border-brand-text/5 z-20">
              <Truck size={24} className="text-brand-text" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-3 w-full mt-4">
        <button 
          onClick={() => handleLevel5(1)}
          className={`p-4 rounded-2xl font-bold flex items-center justify-between transition-all ${l5Step >= 1 ? 'bg-brand-text/5 text-brand-text/40 pointer-events-none' : 'bg-brand-primary text-[#F5F0E8] active:scale-95 shadow-md'}`}
        >
          <span className="text-[0.95rem]">1. Pengemasan</span>
          {l5Step >= 1 && <CheckCircle size={20} />}
        </button>
        <button 
          onClick={() => { if (l5Step === 1) handleLevel5(2); }}
          className={`p-4 rounded-2xl font-bold flex items-center justify-between transition-all ${l5Step >= 2 ? 'bg-brand-text/5 text-brand-text/40 pointer-events-none' : l5Step === 1 ? 'bg-brand-primary text-[#F5F0E8] active:scale-95 shadow-md' : 'bg-brand-surface text-brand-text/30 border border-brand-text/5'}`}
        >
          <span className="text-[0.95rem]">2. Cetak Label</span>
          {l5Step >= 2 && <CheckCircle size={20} />}
        </button>
        <button 
          onClick={() => { if (l5Step === 2) handleLevel5(3); }}
          className={`p-4 rounded-2xl font-bold flex items-center justify-between transition-all ${l5Step >= 3 ? 'bg-brand-text/5 text-brand-text/40 pointer-events-none' : l5Step === 2 ? 'bg-brand-primary text-[#F5F0E8] active:scale-95 shadow-md' : 'bg-brand-surface text-brand-text/30 border border-brand-text/5'}`}
        >
          <span className="text-[0.95rem]">3. Serahkan ke Kurir</span>
          {l5Step >= 3 && <CheckCircle size={20} />}
        </button>
      </div>
    </motion.div>
  );

  const renderFeedbackModal = () => {
    if (!showFeedback) return null;

    const isL5Final = activeLevel === 5 && showFeedback === 'success';

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className={`w-full max-w-[20rem] rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden ${
            showFeedback === 'success' ? 'bg-[#606C38]' : 'bg-[#BC6C25]'
          }`}
        >
          {!isL5Final && (
            <button className="absolute top-5 right-5 p-2 text-white/50 hover:text-white" onClick={() => showFeedback === 'success' ? nextLevel() : setShowFeedback(null)}>
              <X size={20} />
            </button>
          )}

          {isL5Final && (
            <div className="absolute inset-0 pointer-events-none flex justify-around opacity-30 mt-4">
              <Star size={40} className="text-[#F5F0E8] animate-pulse" />
              <Star size={24} className="text-[#F5F0E8] animate-bounce mt-10" />
              <Star size={32} className="text-[#F5F0E8] animate-pulse mt-6" />
            </div>
          )}

          {showFeedback === 'success' ? (
            <div className="p-4 bg-white/20 rounded-full mt-4">
              {isL5Final ? <Star size={56} className="text-[#F5F0E8] fill-[#F5F0E8]" /> : <CheckCircle size={56} className="text-[#F5F0E8]" />}
            </div>
          ) : (
            <div className="p-4 bg-white/20 rounded-full mt-4">
              <AlertCircle size={56} className="text-[#F5F0E8]" />
            </div>
          )}
          
          <h3 className="font-serif font-bold text-xl text-[#F5F0E8] relative z-10">{showFeedback === 'success' ? (isL5Final ? 'Selamat!' : 'Hebat!') : 'Wah!'}</h3>
          <p className="font-sans text-[0.85rem] leading-relaxed opacity-100 text-[#F5F0E8] font-semibold relative z-10 max-w-[90%]">{feedbackMessage}</p>
          
          {isL5Final ? (
            <button 
              onClick={nextLevel}
              className="w-full py-3.5 mt-2 rounded-2xl bg-[#F5F0E8] text-brand-text font-bold text-sm shadow-lg active:scale-95 transition-all z-10"
            >
              Ajukan ke Tim Kurator
            </button>
          ) : (
            <button 
              onClick={showFeedback === 'success' ? nextLevel : () => setShowFeedback(null)}
              className="w-full py-3.5 mt-2 rounded-2xl bg-[#F5F0E8] text-brand-text font-bold text-sm hover:bg-opacity-90 active:scale-95 transition-all shadow-lg z-10"
            >
              {showFeedback === 'success' ? 'Lanjut' : 'Coba Lagi'}
            </button>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden relative pb-16">
      {(activeLevel > 0) && (
        <div className="px-6 pt-6 pb-2">
           <div className="flex items-center justify-between">
             <div>
               <h1 className="font-serif font-bold text-xl text-brand-text">Lab Belajar</h1>
               <p className="font-sans text-[10px] font-semibold text-brand-text/50 uppercase tracking-widest mt-0.5">Sesi Latihan</p>
             </div>
             <div className="flex items-center gap-2">
               <button 
                  onClick={replaySpeech}
                  className="p-2 rounded-full bg-brand-surface text-brand-primary hover:bg-brand-primary hover:text-white transition-colors shadow-sm active:scale-95 border border-brand-text/5"
                  title="Dengarkan Kembali"
                >
                  <RefreshCw size={16} />
               </button>
               <button 
                  onClick={toggleMute}
                  className={`p-2 rounded-full transition-colors shadow-sm active:scale-95 border border-brand-text/5 ${isMuted ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-brand-surface text-brand-primary hover:bg-brand-primary hover:text-white'}`}
                  title={isMuted ? "Bunyikan Suara" : "Bisukan Suara"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
               </button>
             </div>
           </div>
           {renderLevelIndicator()}
        </div>
      )}

      <div className="flex-1 overflow-y-auto hidden-scrollbar relative z-10">
        <AnimatePresence mode="wait">
          {activeLevel === 0 && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 min-h-full flex flex-col items-center justify-center p-6 gap-8 text-center"
            >
              <div className="w-32 h-32 rounded-full bg-brand-surface flex items-center justify-center shadow-inner border border-brand-text/5">
                 <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                   className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center text-[#F5F0E8] shadow-xl"
                 >
                   <Play size={40} fill="currentColor" className="ml-2" />
                 </motion.div>
              </div>
              
              <div className="flex flex-col gap-3">
                <h2 className="font-serif text-2xl font-bold text-brand-text leading-tight">Latihan<br/>Berjualan</h2>
                <p className="text-brand-text/60 font-sans text-xs font-semibold leading-relaxed px-4">
                  Selesaikan 5 modul interaktif ini untuk mempersiapkan produk Anda menuju etalase toko.
                </p>
              </div>

              <button 
                onClick={startSimulation}
                className="mt-2 w-full py-3.5 bg-brand-secondary text-[#F5F0E8] rounded-3xl font-bold tracking-wide shadow-[0_10px_20px_rgba(188,108,37,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-sm"
              >
                Mulai Simulasi Sekarang
              </button>
            </motion.div>
          )}

          {activeLevel === 1 && <motion.div key="l1" className="h-full pb-20">{renderLevel1()}</motion.div>}
          {activeLevel === 2 && <motion.div key="l2" className="h-full pb-20">{renderLevel2()}</motion.div>}
          {activeLevel === 3 && <motion.div key="l3" className="h-full pb-20">{renderLevel3()}</motion.div>}
          {activeLevel === 4 && <motion.div key="l4" className="h-full pb-20">{renderLevel4()}</motion.div>}
          {activeLevel === 5 && <motion.div key="l5" className="h-full pb-20">{renderLevel5()}</motion.div>}
        </AnimatePresence>
      </div>

      {renderFeedbackModal()}
    </div>
  );
}
