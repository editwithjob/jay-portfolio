import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const graphics = [
  {
    id: 1,
    title: 'PACKING VISUAL SYSTEM',
    image: '/images/graphics/graphics1.png',
    desc: '"This single paid social creative generated over 1,450 highly qualified leads at a remarkably efficient $0.82 CPL, helping reduce the brand’s overall customer acquisition cost by 34% over a 60-day campaign."',
  },
  {
    id: 2,
    title: 'SCROLL-STOPPING HOOK',
    image: '/images/graphics/graphics2.png',
    desc: '"This asset generated more than 22,000 qualified leads at an efficient $1.15 CPL, helping scale the brand’s top-of-funnel acquisition while maintaining strong downstream conversion quality."',
  },
  {
    id: 3,
    title: 'PERFORMANCE SALES CREATIVE',
    image: '/images/graphics/graphics3.png',
    desc: '"This high-trust, benefit-led creative generated over 18,358 qualified patient leads at a competitive $12.40 CPL, significantly outperforming typical pharmaceutical acquisition benchmarks and contributing to over $12M in gross revenue for the RxPros brand."',
  },
  {
    id: 4,
    title: 'BEAUTY PRODUCT CAMPAIGN',
    image: '/images/graphics/graphics4.png',
    desc: '"Deployed across Facebook and Instagram, this direct-response graphic generated over 1,200 qualified leads at a $3.50 CPL and delivered a profitable 2.8x ROAS within a 30-day campaign window."',
  },
  {
    id: 5,
    title: 'CONVERSION STATIC SYSTEM',
    image: '/images/graphics/graphics5.png',
    desc: '"Used as a core paid social conversion asset, this variation generated over 1,800 qualified quote requests at a $4.50 CPL while driving a profitable 3.1x ROAS."',
  },
  {
    id: 6,
    title: 'PREMIUM PRODUCT STATIC',
    image: '/images/graphics/graphics6.png',
    desc: '"As a primary conversion asset in a direct-response campaign, this benefit-driven design generated over 850 direct purchases at a highly efficient $14.20 CPA and delivered a profitable 3.4x ROAS."',
  },
];

function GraphicCard({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b] p-5 text-left backdrop-blur-xl transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_0_60px_rgba(249,115,22,0.08)] md:p-6"
    >
      <div className="absolute inset-0 bg-[#0b0b0b]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_45%)] opacity-70 blur-[40px]" />

      <div className="pointer-events-none absolute inset-0 bg-white/[0.015]" />

      <div className="pointer-events-none absolute inset-0 rounded-[30px] opacity-0 transition duration-500 group-hover:opacity-100 bg-[linear-gradient(120deg,rgba(249,115,22,0.16),transparent_40%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.07),transparent_60%)]" />

      <div className="relative z-10">
        <div className="mb-5 overflow-hidden rounded-[24px] border border-white/10 bg-black">
          <div className="aspect-square w-full p-6 md:p-7">
            <div className="h-full w-full overflow-hidden rounded-[20px] bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>

        <p className="mb-3 text-[10px] uppercase tracking-[0.38em] text-orange-500/80">
          Graphic Design
        </p>

        <h3 className="font-heading text-[1.9rem] uppercase leading-[0.92] tracking-[-0.05em] text-white">
          {item.title}
        </h3>

        <p className="mt-3 text-[14px] leading-7 text-white/55">
          {item.desc}
        </p>
      </div>
    </motion.button>
  );
}

export default function GraphicsShowcase() {
  const [selectedGraphic, setSelectedGraphic] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedGraphic(null);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedGraphic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedGraphic]);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[8%] h-[380px] w-[380px] rounded-full bg-orange-600/6 blur-[130px]" />
        <div className="absolute right-[-8%] bottom-[-10%] h-[360px] w-[360px] rounded-full bg-white/[0.02] blur-[140px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-10 hidden overflow-hidden md:block">
        <h2 className="select-none text-center text-[13vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
          GRAPHICS
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-[1fr_0.9fr] md:items-end"
        >
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-orange-500">
              Visual Design
            </p>

            <h2 className="font-heading text-5xl uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              SELECTED <span className="italic text-orange-600">GRAPHICS.</span>
            </h2>
          </div>

          <div className="md:justify-self-end md:text-right">
            <p className="max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              Graphic-based creative built for offers, ads, campaigns, and
              stronger visual presence across premium brand communication.
            </p>
            <div className="mt-8 h-[1px] w-14 bg-orange-600/50 md:ml-auto" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {graphics.map((item, index) => (
            <GraphicCard
              key={item.id}
              item={item}
              index={index}
              onOpen={setSelectedGraphic}
            />
          ))}
        </div>
      </div>
<AnimatePresence>
  {selectedGraphic && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/94 backdrop-blur-xl"
    >
      <div className="flex h-full w-full items-center justify-center p-3 sm:p-4 md:p-6">
        <button
          onClick={() => setSelectedGraphic(null)}
          className="fixed right-3 top-3 z-[140] rounded-full border border-white/10 bg-white/10 p-2.5 transition-all hover:bg-orange-600 sm:right-5 sm:top-5 md:right-6 md:top-6"
        >
          <X className="text-white" size={18} />
        </button>

        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1240px] xl:max-w-[1320px]"
        >
          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.6)] md:rounded-[28px]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_0.45fr]">
              {/* Image side */}
              <div className="bg-black">
                <div className="flex items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7">
                  <div className="w-full max-w-[760px] overflow-hidden rounded-[18px] border border-white/10 bg-black sm:rounded-[20px] md:rounded-[24px]">
                    <div className="relative aspect-[4/5] max-h-[78vh] w-full bg-black">
                      <img
                        src={selectedGraphic.image}
                        alt={selectedGraphic.title}
                        className="absolute inset-0 h-full w-full object-contain bg-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex items-center border-t border-white/10 p-5 sm:p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-9 xl:p-10">
                <div className="max-w-[320px] xl:max-w-[360px]">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.38em] text-orange-500">
                    Graphic Design
                  </p>

                  <h2 className="font-heading text-3xl uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-4xl md:text-[52px]">
                    {selectedGraphic.title}
                  </h2>

                  <p className="mt-6 text-sm leading-7 text-white/62 md:text-base md:leading-8">
                    {selectedGraphic.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


<div className="mt-16 flex justify-center">
  <a
    href="https://drive.google.com/drive/folders/1eRvvR1GAyF6xQM1Y5cd80wF3eB4tZMso"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/12 bg-white/[0.035] px-8 py-4 text-[11px] uppercase tracking-[0.38em] text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-[2px] hover:border-orange-500/40 hover:bg-orange-500/[0.08] hover:text-white hover:shadow-[0_0_0_1px_rgba(255,140,0,0.15),0_18px_60px_rgba(255,120,0,0.08)]"
  >
    {/* Glow */}
    <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    {/* Shine sweep */}
    <span className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/10 blur-xl transition-all duration-700 group-hover:left-[120%]" />

    <span className="relative z-10">View All My Works</span>

    <span className="relative z-10 text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
      →
    </span>
  </a>
</div>
    </section>
  );
}