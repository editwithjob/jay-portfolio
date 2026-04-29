import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Play, Maximize2, Minimize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    id: 1,
    label: 'UGC Videos',
    title: 'Pearla Menopause Toothpaste',
    video: '/videos/reels/ugc12.mp4',
    description:
      'This 95% AI-generated video ad replicates a highly targeted, authentic user testimonial for menopausal oral care, almost completely eliminating the need for physical shoots and actors. Deployed as the primary creative for a Meta Ads direct-response campaign, it was a massive success, generating over 220 unit sales and achieving an outstanding 5.6x Return on Ad Spend (ROAS). By leveraging compelling AI visuals and an empathetic hook to address a specific niche pain point, this campaign powerfully demonstrates how AI-driven content can scale and deliver highly profitable e-commerce results.',
    orientation: 'portrait',
  },
  {
    id: 2,
    label: 'UGC Videos',
    title: 'Syncify Sketchtab Duo Pro',
    video: '/videos/reels/ugc11.mp4',
    description:
      'This AI-driven video ad combined authentic UGC-style storytelling with dynamic product demonstrations to position the brand as a bridge between traditional and digital art. Deployed as a direct-response Meta campaign, it generated 164+ unit sales in October 2025 alone and delivered a highly profitable 5.2x ROAS.',
    orientation: 'portrait',
  },
  {
    id: 3,
    label: 'UGC Videos',
    title: 'Syncify Sketchtab Duo Pro 2 (FULL AI) ',
    video: '/videos/reels/ugcai11.mp4',
    description:
      'This 100% AI-generated video ad replicates an authentic user testimonial without the need for actors or a physical production crew. Deployed as the sole creative for a Meta Ads direct-response campaign, it successfully generated over 50 unit sales and achieved a highly profitable 4.2x Return on Ad Spend (ROAS), proving that fully AI-produced content can drive immediate and tangible e-commerce revenue.',
    orientation: 'portrait',
  },
  {
    id: 4,
    label: 'UGC Videos',
    title: 'Pearla Menopause Toothpaste',
    video: '/videos/reels/ugc12.mp4',
    description:
      'This 80% AI-generated video ad replicates a highly targeted, authentic user testimonial for menopausal oral care, significantly reducing the need for physical shoots and actors. Deployed as the primary creative for a Meta Ads direct-response campaign, it successfully generated over 63 unit sales and achieved a highly profitable 4.8x Return on Ad Spend (ROAS). By addressing a specific niche pain point through compelling AI-assisted visuals and an empathetic hook, this campaign proves how AI-driven content can deliver immediate e-commerce results.',
    orientation: 'portrait',
  },
  {
    id: 5,
    label: 'UGC Videos',
    title: 'Save Auto Max',
    video: '/videos/reels/ugc110.mp4',
    description:
      'This AI-driven video ad became a long-term winning creative, running successfully on Meta Ads from December 2024 to December 2025. It consistently scaled performance, helped generate six-figure monthly revenue, and delivered an exceptional 6.4x ROAS—ultimately leading the client to upgrade my retainer from $1,000 to $7,500 per month.',
    orientation: 'portrait',
  },
];

const POSES = {
  center: {
    x: 0,
    y: 88,
    scale: 1,
    opacity: 1,
    rotate: 0,
    blur: 0,
    z: 60,
    labelOpacity: 1,
  },
  prev: {
    x: -380,
    y: -210,
    scale: 0.72,
    opacity: 0.22,
    rotate: -8,
    blur: 2,
    z: 35,
    labelOpacity: 0.16,
  },
  next: {
    x: 380,
    y: 230,
    scale: 0.72,
    opacity: 0.22,
    rotate: 8,
    blur: 2,
    z: 35,
    labelOpacity: 0.16,
  },
  farPrev: {
    x: -700,
    y: -390,
    scale: 0.48,
    opacity: 0.06,
    rotate: -12,
    blur: 4,
    z: 20,
    labelOpacity: 0.04,
  },
  farNext: {
    x: 700,
    y: 410,
    scale: 0.48,
    opacity: 0.06,
    rotate: 12,
    blur: 4,
    z: 20,
    labelOpacity: 0.04,
  },
  hiddenPrev: {
    x: -980,
    y: -560,
    scale: 0.28,
    opacity: 0,
    rotate: -15,
    blur: 6,
    z: 10,
    labelOpacity: 0,
  },
  hiddenNext: {
    x: 980,
    y: 580,
    scale: 0.28,
    opacity: 0,
    rotate: 15,
    blur: 6,
    z: 10,
    labelOpacity: 0,
  },
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function blend(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    scale: lerp(a.scale, b.scale, t),
    opacity: lerp(a.opacity, b.opacity, t),
    rotate: lerp(a.rotate, b.rotate, t),
    blur: lerp(a.blur, b.blur, t),
    z: lerp(a.z, b.z, t),
    labelOpacity: lerp(a.labelOpacity, b.labelOpacity, t),
  };
}

function getPose(relative) {
  if (relative <= -3) return POSES.hiddenPrev;
  if (relative > -3 && relative <= -2) return blend(POSES.hiddenPrev, POSES.farPrev, relative + 3);
  if (relative > -2 && relative <= -1) return blend(POSES.farPrev, POSES.prev, relative + 2);
  if (relative > -1 && relative <= 0) return blend(POSES.prev, POSES.center, relative + 1);
  if (relative > 0 && relative <= 1) return blend(POSES.center, POSES.next, relative);
  if (relative > 1 && relative <= 2) return blend(POSES.next, POSES.farNext, relative - 1);
  if (relative > 2 && relative <= 3) return blend(POSES.farNext, POSES.hiddenNext, relative - 2);
  return POSES.hiddenNext;
}

function MobileReelCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative h-[22rem] w-full overflow-hidden rounded-[24px] border border-white/10 bg-black text-left"
    >
      <video
        src={`${item.video}#t=0.1`}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover grayscale opacity-75 transition-all duration-700 group-active:scale-[1.02] group-active:grayscale-0 group-active:opacity-100"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
            {item.label}
          </p>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md">
            <Play size={14} className="ml-0.5 text-white" fill="currentColor" />
          </div>
        </div>

        <h3 className="font-heading text-xl uppercase leading-[0.95] tracking-[-0.05em] text-white">
          {item.title}
        </h3>
      </div>
    </button>
  );
}

export default function Showreel() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const progressFillRef = useRef(null);

  const cardRefs = useRef([]);
  const labelRefs = useRef([]);

  const [activeReel, setActiveReel] = useState(null);
  const [isFrameFullscreen, setIsFrameFullscreen] = useState(false);

  const fullscreenFrameRef = useRef(null);
  const modalVideoRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        setActiveReel(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (activeReel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeReel]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFrameFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleCustomFullscreen = async () => {
    const frame = fullscreenFrameRef.current;
    if (!frame) return;

    try {
      if (!document.fullscreenElement) {
        await frame.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        gsap.set(cardRefs.current, {
          force3D: true,
          transformOrigin: 'center center',
        });

        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const pose = getPose(index);

          gsap.set(card, {
            x: pose.x,
            y: pose.y,
            scale: pose.scale,
            opacity: pose.opacity,
            rotate: pose.rotate,
            zIndex: pose.z,
            filter: `blur(${pose.blur}px)`,
            force3D: true,
          });
        });

        labelRefs.current.forEach((label, index) => {
          if (!label) return;

          const pose = getPose(index);

          gsap.set(label, {
            opacity: pose.labelOpacity,
          });
        });

        gsap.set(progressFillRef.current, {
          scaleX: 0,
          transformOrigin: 'left center',
          force3D: true,
        });

        let lastProgress = -1;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 5}`,
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const roundedProgress = Math.round(self.progress * 1000) / 1000;

            if (roundedProgress === lastProgress) return;
            lastProgress = roundedProgress;

            const chapter = roundedProgress * (reels.length - 1);

            cardRefs.current.forEach((card, index) => {
              if (!card) return;

              const pose = getPose(index - chapter);

              gsap.set(card, {
                x: pose.x,
                y: pose.y,
                scale: pose.scale,
                opacity: pose.opacity,
                rotate: pose.rotate,
                zIndex: Math.round(pose.z),
                filter: `blur(${pose.blur}px)`,
                force3D: true,
              });
            });

            labelRefs.current.forEach((label, index) => {
              if (!label) return;

              const pose = getPose(index - chapter);

              gsap.set(label, {
                opacity: pose.labelOpacity,
              });
            });

            gsap.set(progressFillRef.current, {
              scaleX: roundedProgress,
              force3D: true,
            });
          },
        });

        return () => {
          trigger.kill();
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050505]">
      {/* Desktop: true pinned GSAP scene */}
      <div className="hidden md:block">
        <div ref={stageRef} className="relative h-screen overflow-hidden">
          <div className="pointer-events-none absolute left-[-10rem] top-12 h-96 w-96 rounded-full bg-orange-600/8 blur-[150px]" />
          <div className="pointer-events-none absolute bottom-10 right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-white/[0.02] blur-[180px]" />

          <div className="pointer-events-none absolute inset-x-0 top-12 overflow-hidden">
            <h2 className="select-none text-center text-[15vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
              MOTION
            </h2>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-10 z-20 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <h2 className="font-heading text-6xl uppercase leading-[0.86] tracking-[-0.06em] text-white lg:text-7xl xl:text-8xl">
              TOP PERFORMING <span className="italic text-orange-500">ADS.</span>
            </h2>
          </div>

          <div className="absolute inset-0">
            {reels.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveReel(item)}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="group absolute left-1/2 top-1/2 h-[24rem] w-[13.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-black text-left shadow-[0_28px_120px_rgba(0,0,0,0.62)] lg:h-[32rem] lg:w-[18rem] xl:h-[35rem] xl:w-[19.5rem]"
                style={{
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                <video
                  src={`${item.video}#t=0.1`}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/24 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:via-orange-500/70 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col justify-between p-4 lg:p-5">
                  <div
                    ref={(el) => {
                      labelRefs.current[index] = el;
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                      {item.label}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-heading text-lg uppercase leading-[0.95] tracking-[-0.05em] text-white lg:text-xl xl:text-2xl">
                      {item.title}
                    </h3>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 backdrop-blur-md">
                      <Play size={14} className="ml-0.5 text-white" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-10 left-1/2 z-30 w-28 -translate-x-1/2">
            <div className="h-[3px] w-full rounded-full bg-white/10">
              <div
                ref={progressFillRef}
                className="h-[3px] rounded-full bg-orange-500"
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: 'left center',
                  willChange: 'transform',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="relative px-4 py-20 sm:px-6 md:hidden">
        <div className="pointer-events-none absolute left-[-8rem] top-8 h-72 w-72 rounded-full bg-orange-600/8 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-[-8rem] h-72 w-72 rounded-full bg-white/[0.02] blur-[140px]" />

        <div className="relative mx-auto max-w-xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-orange-500">
              Featured Motion
            </p>

          <h2 className="font-heading text-5xl uppercase leading-[0.86] tracking-[-0.06em] text-white">
            TOP PERFORMING <span className="italic text-orange-500">ADS.</span>
          </h2>

            <p className="mt-5 text-[11px] uppercase tracking-[0.34em] text-white/42">
              Selected edits that move with intent
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reels.map((item) => (
              <MobileReelCard key={item.id} item={item} onOpen={setActiveReel} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-xl"
          >
            <div className="flex h-full w-full items-start justify-center overflow-y-auto p-2 sm:p-4 md:items-center md:p-6">
              <button
                onClick={() => setActiveReel(null)}
                className="fixed right-3 top-3 z-[240] rounded-full border border-white/10 bg-white/10 p-2.5 transition-all hover:bg-orange-600 sm:right-5 sm:top-5 md:right-6 md:top-6"
              >
                <X className="text-white" size={18} />
              </button>

              <motion.div
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="my-12 w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.6)] sm:my-16 sm:rounded-[24px] md:rounded-[32px]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]">
                  {/* Video */}
                  <div className="bg-black">
                    <div className="flex h-full items-center justify-center p-2 sm:p-4 md:p-5 lg:p-6">
                      <div
                        ref={fullscreenFrameRef}
                        className={`relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-black sm:rounded-[18px] md:rounded-[24px] ${
                          activeReel.orientation === 'landscape'
                            ? 'max-w-[920px]'
                            : 'max-w-[320px] sm:max-w-[360px] md:max-w-[420px]'
                        } ${isFrameFullscreen ? '!max-w-none rounded-none border-0' : ''}`}
                      >
                        <div
                          className={`relative w-full bg-black ${
                            activeReel.orientation === 'landscape'
                              ? 'aspect-video'
                              : 'aspect-[9/16]'
                          } ${isFrameFullscreen ? '!aspect-auto h-screen w-screen' : ''}`}
                        >
                          <video
                            ref={modalVideoRef}
                            src={activeReel.video}
                            className="absolute inset-0 h-full w-full object-contain bg-black"
                            autoPlay
                            loop
                            controls
                            playsInline
                            preload="metadata"
                            controlsList="nofullscreen nodownload noremoteplayback"
                            disablePictureInPicture
                          />

                          <button
                            type="button"
                            onClick={toggleCustomFullscreen}
                            className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-orange-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
                          >
                            {isFrameFullscreen ? (
                              <Minimize2 size={15} />
                            ) : (
                              <Maximize2 size={15} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-between border-t border-white/10 p-4 sm:p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-orange-500">
                        {activeReel.label}
                      </p>

                      <h2 className="font-heading text-2xl uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-3xl md:text-5xl xl:text-6xl">
                        {activeReel.title}
                      </h2>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/62 sm:mt-5 md:mt-6 md:text-base md:leading-8">
                        {activeReel.description}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-5 sm:mt-8 sm:gap-x-5 sm:gap-y-6 sm:pt-6 md:mt-10 md:gap-6 md:pt-8">
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Category
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {activeReel.label}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Format
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {activeReel.orientation === 'landscape'
                            ? '16:9 Landscape'
                            : '9:16 Portrait'}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Playback
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          Full Preview
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Focus
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          Motion, pacing, visual impact
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
    </section>
  );
}