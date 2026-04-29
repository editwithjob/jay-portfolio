import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const showcaseItems = [
  {
    label: 'UGC Ads',
    title: 'Paid Social Creative',
    description: 'Scroll-stopping edits built for direct response and stronger conversion.',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Short Form Systems',
    title: 'Retention-Focused Editing',
    description: 'Fast, strategic cuts designed for hooks, pacing, and repeatable output.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Narrative Video',
    title: 'Story-Led Visuals',
    description: 'Cinematic editing crafted to create emotion, clarity, and brand depth.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const yBg = useTransform(scrollY, [0, 1200], [0, 220]);
  const scaleBg = useTransform(scrollY, [0, 1200], [1, 1.12]);
  const opacityText = useTransform(scrollY, [0, 320], [1, 0]);
  const yContent = useTransform(scrollY, [0, 500], [0, 70]);

  const yCardRight = useTransform(scrollY, [0, 1200], [0, -70]);
  const yGhost = useTransform(scrollY, [0, 1200], [0, 180]);
  const glowY = useTransform(scrollY, [0, 1200], [0, 140]);

  const activeItem = showcaseItems[activeIndex];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2070"
          alt="Cinematic background"
          className="h-full w-full object-cover grayscale opacity-20 brightness-[0.28]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_34%,rgba(255,255,255,0.08),transparent_26%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/20 to-[#050505]/85" />
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-24 top-[14%] z-[1] h-80 w-80 rounded-full bg-orange-600/12 blur-[130px]"
      />
      <div className="pointer-events-none absolute right-[-6rem] top-[8%] z-[1] h-80 w-80 rounded-full bg-white/[0.03] blur-[150px]" />

      {/* Ghost word */}
      <motion.div
        style={{ y: yGhost }}
        className="pointer-events-none absolute inset-x-0 bottom-[-7%] z-[1] hidden overflow-hidden md:block"
      >
        <h2 className="select-none text-center text-[18vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
          CREATIVE
        </h2>
      </motion.div>



      {/* Main content */}
      <motion.div
        style={{ opacity: opacityText, y: yContent }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pt-28 pb-24 md:px-10 lg:px-16"
      >
        <div className="w-full">
          <div className="max-w-[980px]">
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-[10px] uppercase tracking-[0.45em] text-orange-500"
            >
              Video Editor • Creative Strategists • Graphic Designing
            </motion.p>

            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading leading-[0.9] tracking-[-0.085em] text-white
                        text-[11vw] sm:text-[12vw] md:text-[9.5vw] lg:text-[7vw]"
            >
              <span className="block">FROM CONCEPT</span>
              <span className="block text-orange-500">TO CONVERSION</span>
            </motion.h1>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-white/42 md:text-xs">
                Building creative that wins
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom center scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.9 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      >
        <span className="mb-3 text-[10px] uppercase tracking-[0.45em] text-white/35">
          Scroll
        </span>

        <div className="relative h-16 w-px overflow-hidden bg-white/10">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 top-0 h-8 w-px bg-orange-500"
          />
        </div>
      </motion.div>
    </section>
  );
}