import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ArrowUpRight, Maximize2, Minimize2 } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Client One',
    role: 'Brand / Paid Social',
    title: 'Strong Creative Judgment',
    quote:
      'Jay consistently delivers edits that feel sharp, intentional, and built to hold attention. The work always comes back polished and premium.',
    video: '/videos/testimonials/testimonial1.mov',
    orientation: 'portrait',
  },
  {
    id: 2,
    name: 'Coby Persin',
    role: 'Content / Growth',
    title: 'Reliable and Premium',
    quote:
      'What stood out most was not just the editing quality, but the creative judgment behind it. The pacing, structure, and visual choices felt much stronger.',
    video: '/videos/testimonials/testimonial2.mp4',
    orientation: 'portrait',
  },
];

const imageTestimonials = [
  {
    id: 1,
    name: 'Kay',
    role: 'Motivational Content Creator',
    image: '/tesitimonial/kay.png',
    avatar: '/tesitimonial/avatars/kay.jpg',
  },
  {
    id: 2,
    name: 'Shi',
    role: 'Inspirational Content Creator',
    image: '/tesitimonial/shi.png',
    avatar: '/tesitimonial/avatars/shi.jpg',
  },
  {
    id: 3,
    name: 'Joseph McClendon III',
    role: 'Speaker & Coach',
    image: '/tesitimonial/joseph.png',
    avatar: '/tesitimonial/avatars/joseph.jpg',
  },
  {
    id: 4,
    name: 'Pedro Estrella',
    role: 'Solar & Lifestyle Content',
    image: '/tesitimonial/pedro.png',
    avatar: '/tesitimonial/avatars/pedro.jpg',
  },
  {
    id: 5,
    name: 'Erick Sanchez',
    role: 'TikTok & YouTube Creator',
    image: '/tesitimonial/erick.png',
    avatar: '/tesitimonial/avatars/erick.jpg',
  },
  {
    id: 6,
    name: 'Max Louise',
    role: 'Influencer',
    image: '/tesitimonial/max.png',
    avatar: '/tesitimonial/avatars/max.jpg',
  },
  {
    id: 7,
    name: 'Kohl',
    role: 'Hydro Vitality',
    image: '/tesitimonial/kohl.png',
    avatar: '/tesitimonial/avatars/kohl.jpg',
  },
  {
    id: 8,
    name: 'David',
    role: 'GPG Real Estate & Media',
    image: '/tesitimonial/david.png',
    avatar: '/tesitimonial/avatars/david.jpg',
  },
];

function Avatar({ src, name }) {
  const [hasError, setHasError] = useState(false);
  const initial = name?.charAt(0) || '?';

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-orange-500/10">
      {!hasError ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold uppercase text-orange-500">
          {initial}
        </span>
      )}
    </div>
  );
}

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isFrameFullscreen, setIsFrameFullscreen] = useState(false);

  const fullscreenFrameRef = useRef(null);
  const videoRef = useRef(null);

  const movingTestimonials = [...imageTestimonials, ...imageTestimonials];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        setSelectedTestimonial(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedTestimonial ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTestimonial]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFrameFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  return (
    <section className="relative overflow-hidden bg-[#070707] py-24 text-white md:py-32">
      <style>
        {`
          @keyframes testimonialMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @keyframes testimonialFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-14px);
            }
          }

          .testimonial-marquee {
            animation: testimonialMarquee 42s linear infinite;
          }

          .testimonial-floating-card {
            animation: testimonialFloat 5.5s ease-in-out infinite;
          }

          .testimonial-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[10%] h-[320px] w-[320px] rounded-full bg-orange-600/6 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[320px] w-[320px] rounded-full bg-white/[0.02] blur-[140px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-8 hidden overflow-hidden md:block">
        <h2 className="select-none text-center text-[14vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
          VOICES
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-[1fr_0.9fr] md:items-end"
        >
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-orange-500">
              Trust
            </p>

            <h2 className="font-heading text-5xl uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              CLIENT <span className="italic text-orange-600">VOICES.</span>
            </h2>
          </div>

          <div className="md:justify-self-end md:text-right">
            <p className="max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              A short look at how clients describe the creative standard, polish,
              and reliability I bring into every project.
            </p>
            <div className="mt-8 h-[1px] w-14 bg-orange-600/50 md:ml-auto" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedTestimonial(item)}
              className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.025] transition-all duration-500 hover:border-orange-500/20 hover:bg-white/[0.04]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]">
                <div className="relative bg-black">
                  <div className="mx-auto w-full max-w-[320px] p-4 sm:max-w-[360px] md:max-w-[380px] lg:max-w-none lg:p-5">
                    <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black">
                      <div className="aspect-[9/16] w-full bg-black">
                        <video
                          src={`${item.video}#t=0.1`}
                          className="h-full w-full object-cover grayscale opacity-75 transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-orange-500/40 group-hover:bg-orange-500/10">
                          <Play
                            size={16}
                            className="ml-0.5 text-white"
                            fill="currentColor"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.34em] text-white/70">
                          Watch Testimonial
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.38em] text-orange-500">
                      {item.role}
                    </p>

                    <h3 className="font-heading text-3xl uppercase leading-[0.94] tracking-[-0.05em] text-white md:text-4xl">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-base leading-8 text-white/62">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-white">
                        {item.name}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-white/38">
                        {item.role}
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/25 opacity-0 transition-all duration-500 group-hover:opacity-100 md:flex">
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-orange-500">
                Written Proof
              </p>

              <h3 className="font-heading text-3xl uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-5xl">
                REAL CLIENT FEEDBACK.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/45 md:text-right">
              Real messages from clients across content, ads, branding, and
              social media growth.
            </p>
          </div>

          <div className="relative overflow-hidden py-6">

            <div className="testimonial-marquee flex w-max gap-6 pr-6">
              {movingTestimonials.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="testimonial-floating-card w-[280px] shrink-0 sm:w-[320px] lg:w-[360px]"
                  style={{
                    animationDelay: `${(index % imageTestimonials.length) * 0.35}s`,
                  }}
                >
                  <div className="group overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.025] p-4 transition-all duration-500 hover:border-orange-500/20 hover:bg-white/[0.04]">
                    <div className="relative aspect-square overflow-hidden rounded-[24px] border border-white/8 bg-[#101010]">
                      <img
                        src={item.image}
                        alt={`${item.name} testimonial`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>

                    <div className="mt-5 flex items-center gap-3 px-1 pb-1">
                      <Avatar src={item.avatar} name={item.name} />

<div className="min-w-0">
  <div className="flex min-w-0 items-center gap-2">
    <p className="truncate text-sm uppercase tracking-[0.2em] text-white">
      {item.name}
    </p>

    {/* VERIFIED BADGE */}
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 text-white"
        fill="currentColor"
      >
        <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
      </svg>
    </div>
  </div>

  {/* ROLE (FIXED) */}
  <p className="mt-1 truncate text-[10px] uppercase tracking-[0.24em] text-white/38">
    {item.role}
  </p>
</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl"
          >
            <div className="flex h-full w-full items-start justify-center overflow-y-auto p-2 sm:p-4 md:items-center md:p-6">
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="fixed right-3 top-3 z-[140] rounded-full border border-white/10 bg-white/10 p-2.5 transition-all hover:bg-orange-600 sm:right-5 sm:top-5 md:right-6 md:top-6"
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
                  <div className="bg-black">
                    <div className="flex h-full items-center justify-center p-2 sm:p-4 md:p-5 lg:p-6">
                      <div
                        ref={fullscreenFrameRef}
                        className={`relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-black sm:rounded-[18px] md:rounded-[24px] ${
                          selectedTestimonial.orientation === 'landscape'
                            ? 'max-w-[920px]'
                            : 'max-w-[320px] sm:max-w-[360px] md:max-w-[420px]'
                        } ${isFrameFullscreen ? '!max-w-none rounded-none border-0' : ''}`}
                      >
                        <div
                          className={`relative w-full bg-black ${
                            selectedTestimonial.orientation === 'landscape'
                              ? 'aspect-video'
                              : 'aspect-[9/16]'
                          } ${isFrameFullscreen ? '!aspect-auto h-screen w-screen' : ''}`}
                        >
                          <video
                            ref={videoRef}
                            src={selectedTestimonial.video}
                            className="absolute inset-0 h-full w-full object-contain bg-black"
                            autoPlay
                            loop
                            controls
                            playsInline
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

                  <div className="flex flex-col justify-between border-t border-white/10 p-4 sm:p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-orange-500">
                        {selectedTestimonial.role}
                      </p>

                      <h2 className="font-heading text-2xl uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-3xl md:text-5xl xl:text-6xl">
                        {selectedTestimonial.title}
                      </h2>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/62 sm:mt-5 md:mt-6 md:text-base md:leading-8">
                        “{selectedTestimonial.quote}”
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-5 sm:mt-8 sm:gap-x-5 sm:gap-y-6 sm:pt-6 md:mt-10 md:gap-6 md:pt-8">
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Client
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedTestimonial.name}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Role
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedTestimonial.role}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Format
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedTestimonial.orientation === 'landscape'
                            ? '16:9 Landscape'
                            : '9:16 Portrait'}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Focus
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          Trust, proof, credibility
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