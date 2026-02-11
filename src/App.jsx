import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import {
  Heart,
  Play,
  Pause,
  MessageCircleHeart,
  Camera,
  Stars,
} from "lucide-react";
import confetti from "canvas-confetti";

// =======================
// CONFIG AUDIO
// =======================
const AUDIO_START = 19; // 00:19
const AUDIO_END = 92;   // 01:32

// =======================
// CONFIG LYRICS (NON SYNC)
// =======================
const LYRIC_INTERVAL_MS = 5000; // <-- cambia qui (es. 4000 / 6000)

const lyrics = [
  "Sei tu che tieni tutto in equilibrio, ❤️",
  "Rendi ogni momento un po’ più dolce.",
  "Sorridi anche quando senti il peso...",
  "Quanto sei speciale. Quanto sei amore. ✨",
  "Sei la forza che ci tiene insieme,",
  "Per Aurora, per Ilenia, per me...",
  "Sei il cuore che batte per tre. 💓",
  "Sei mamma, sei donna, sei casa.",
  "L'amore che non ha paura di niente.",
  "Sei il mio tutto, il mio punto fermo.",
  "La bellezza che riempie ogni giorno. 🌸",
  "Sei tutto. Sempre. ❤️",
];

const memories = [
  { text: "La nostra scelta ⚓", img: "images/ricordo1.jpg" },
  { text: "La complicità con Ilenia 🧩", img: "images/ricordo2.jpg" },
  { text: "Lo sbadiglio di Aurora ☀️", img: "images/ricordo3.jpg" },
  { text: "Le sfide vinte insieme 💪", img: "images/ricordo4.jpg" },
  { text: "La risata che riempie la casa 🏠", img: "images/ricordo5.jpg" },
  { text: "Noi due, una squadra ❤️", img: "images/ricordo6.jpg" },
];

// -----------------------
// MEMORY CARD
// -----------------------
const MemoryCard = ({ memory }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <motion.div
      onClick={() => setIsOpened(!isOpened)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -15 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-amber-200 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
      <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl h-[450px] flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="c"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center space-y-4"
            >
              <div className="p-6 bg-rose-50 rounded-full text-rose-300">
                <Stars size={40} className="animate-pulse" />
              </div>
              <p className="font-serif italic text-rose-400 tracking-widest">
                Svela il momento
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="o"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col"
            >
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="h-4/5 rounded-2xl overflow-hidden"
              >
                <img
                  src={memory.img}
                  alt="memory"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <p className="h-1/5 flex items-center justify-center text-lg font-serif italic text-slate-700">
                {memory.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// -----------------------
// SFONDO MAGICO
// -----------------------
const MagicBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,242,242,1),rgba(255,255,255,1))]" />
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
        animate={{
          y: "-10vh",
          opacity: [0, 0.5, 0],
          x: Math.random() * 100 + "vw",
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
        className="absolute"
      >
        {i % 2 === 0 ? (
          <Heart
            fill="#fda4af"
            size={Math.random() * 15 + 5}
            className="opacity-30"
          />
        ) : (
          <div className="w-1 h-1 bg-amber-300 rounded-full blur-[1px]" />
        )}
      </motion.div>
    ))}
  </div>
);

// -----------------------
// LETTERA TYPEWRITER
// -----------------------
const TypewriterLetter = ({ start, onDone }) => {
  const fullText = `Amore mio,

ci sono cose che fai ogni giorno e che sembrano piccole…
ma sono proprio quelle che tengono in piedi tutto.

Grazie per la forza, per la pazienza, per l’amore che non chiede nulla.
Per Aurora, per Ilenia… per me.

Siamo casa perché ci sei tu.

Ti amo.`;

  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!start) return;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(id);
        onDone?.();
      }
    }, 20);
    return () => clearInterval(id);
  }, [start]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-white/45 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_50px_100px_rgba(251,113,133,0.14)] border border-white">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400/30 via-amber-200/20 to-white/20 blur-2xl rounded-[3rem] opacity-70" />
        <p className="relative font-serif italic text-slate-700 text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
          {shown}
          <span className="inline-block w-2 h-6 bg-rose-400/80 ml-1 align-middle animate-pulse rounded-sm" />
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const audioRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentLyric, setCurrentLyric] = useState(0);

  const [showLetter, setShowLetter] = useState(false);
  const [letterDone, setLetterDone] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // ==========================
  // LYRICS TIMER (NON SYNC)
  // ==========================
  useEffect(() => {
    if (!hasStarted) return;

    setCurrentLyric(0);

    const id = setInterval(() => {
      setCurrentLyric((prev) => (prev + 1) % lyrics.length);
    }, LYRIC_INTERVAL_MS);

    return () => clearInterval(id);
  }, [hasStarted]);

  // ==========================
  // STOP AUDIO a 01:32
  // ==========================
  useEffect(() => {
    if (!hasStarted) return;

    const a = audioRef.current;
    if (!a) return;

    const onTime = () => {
      if (a.currentTime >= AUDIO_END) {
        a.pause();
        setIsPlaying(false);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onPause);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onPause);
    };
  }, [hasStarted]);

  const startExperience = () => {
    setHasStarted(true);

    setTimeout(() => {
      const a = audioRef.current;
      if (!a) return;

      a.currentTime = AUDIO_START;
      a.play().catch(() => {});
    }, 500);
  };

  const triggerFinal = () => {
    const end = Date.now() + 4 * 1000;
    const colors = ["#fb7185", "#fcd34d", "#ffffff"];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Un piccolo regalo ❤️",
      text: "Se vuoi, condividi questo momento.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiato negli appunti ❤️");
      }
    } catch {
      // annullato: ok
    }
  };

  if (!hasStarted) {
    return (
      <div className="h-screen bg-rose-50 flex items-center justify-center relative overflow-hidden">
        <MagicBackground />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center bg-white/40 backdrop-blur-2xl p-16 rounded-[5rem] shadow-[0_50px_100px_rgba(251,113,133,0.15)] border border-white"
        >
          <div className="relative inline-block mb-10">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-rose-300 blur-3xl rounded-full"
            />
            <Heart size={80} className="relative text-rose-500" fill="currentColor" />
          </div>

          <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">
            Per Te, Tutto.
          </h2>
          <p className="text-xl text-slate-500 mb-12 italic font-light tracking-wide">
            Un viaggio attraverso il cuore della nostra famiglia.
          </p>

          <button
            onClick={startExperience}
            className="px-16 py-6 bg-slate-900 text-white rounded-full font-bold text-xl hover:bg-rose-600 transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95"
          >
            Apri il Regalo ❤️
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] text-slate-800 font-sans selection:bg-rose-100 relative">
      <MagicBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-rose-500 shadow-[0_0_20px_#fb7185]"
        style={{ scaleX }}
      />

      <audio ref={audioRef} src="audio/canzone-aurora.mp3" />

      {/* 1. HERO - LYRICS CINEMATIC (NON SYNC) */}
      <motion.section
        style={{ opacity: opacityHero }}
        className="h-screen flex flex-col items-center justify-center p-6 text-center sticky top-0"
      >
        <div className="relative">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 font-black tracking-[0.8em] uppercase text-[10px] mb-12 block"
          >
            San Valentino 2026
          </motion.span>

          <div className="h-64 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentLyric}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-7xl font-serif font-medium text-slate-900 leading-tight italic"
              >
                "{lyrics[currentLyric]}"
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* 2. LE RAGAZZE - ART GALLERY STYLE */}
      <section className="py-60 relative z-10 container mx-auto px-6">
        <div className="flex flex-col space-y-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-rose-50 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src="images/aurora.jpg"
                alt="Aurora"
                className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h3 className="text-6xl font-serif font-bold text-slate-900">
                Aurora
              </h3>
              <div className="w-20 h-1 bg-rose-400 mx-auto md:mx-0" />
              <p className="text-2xl text-slate-400 italic font-light leading-relaxed">
                Pura luce che illumina ogni nostro passo.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row-reverse items-center gap-12"
          >
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-amber-50 rounded-[3rem] rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src="images/figlia-grande.jpg"
                alt="Ilenia"
                className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-right">
              <h3 className="text-6xl font-serif font-bold text-slate-900">
                Ilenia
              </h3>
              <div className="w-20 h-1 bg-amber-400 mx-auto md:ml-auto md:mr-0" />
              <p className="text-2xl text-slate-400 italic font-light leading-relaxed">
                Il nostro orgoglio, la nostra forza costante.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BAULETTO DEI RICORDI */}
      <section className="py-40 relative z-10 bg-slate-900 text-white rounded-[5rem] mx-4 shadow-[0_-50px_100px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32 space-y-4">
            <Camera className="mx-auto text-rose-400 mb-6" size={48} />
            <h2 className="text-5xl md:text-7xl font-serif font-bold">
              Frammenti di Noi
            </h2>
            <p className="text-slate-500 tracking-[0.3em] uppercase text-xs">
              Tocca per far rivivere il momento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {memories.map((m, i) => (
              <MemoryCard key={i} memory={m} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINALE */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onViewportEnter={() => setShowLetter(true)}
          className="max-w-4xl space-y-12"
        >
          <TypewriterLetter start={showLetter} onDone={() => setLetterDone(true)} />

          <MessageCircleHeart size={120} className="mx-auto text-rose-500 animate-bounce" />

          <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-tight">
            Sei il Pilastro<br />di Tutto.
          </h2>

          <p className="text-2xl text-slate-500 italic leading-relaxed max-w-2xl mx-auto">
            "Grazie ancora per l'amore infinito, per la pazienza e per essere il cuore pulsante di questa splendida famiglia."
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={triggerFinal}
              className="group relative px-24 py-8 bg-rose-500 text-white rounded-full font-black text-3xl shadow-[0_30px_60px_rgba(244,63,94,0.4)] hover:bg-rose-600 transition-all active:scale-95"
            >
              TI AMO ❤️
            </button>

            {letterDone && (
              <button
                onClick={handleShare}
                className="px-10 py-4 bg-white/60 backdrop-blur-xl text-slate-700 rounded-full text-lg font-semibold border border-white shadow-lg hover:bg-white transition-all active:scale-95"
              >
                Se vuoi, condividi questo momento 💌
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* MUSIC CONTROLLER */}
      <div className="fixed bottom-12 right-12 z-50">
        <button
          onClick={() => {
            const a = audioRef.current;
            if (!a) return;

            if (a.paused) {
              if (a.currentTime >= AUDIO_END || a.currentTime < AUDIO_START) {
                a.currentTime = AUDIO_START;
              }
              a.play().catch(() => {});
            } else {
              a.pause();
            }
          }}
          className="w-20 h-20 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl group hover:scale-110 transition-all"
        >
          {isPlaying ? (
            <Pause className="text-rose-500" />
          ) : (
            <Play className="text-rose-400 translate-x-1" />
          )}
          <div className="absolute inset-0 rounded-full border border-rose-500/50 scale-125 animate-ping opacity-20" />
        </button>
      </div>
    </div>
  );
}
