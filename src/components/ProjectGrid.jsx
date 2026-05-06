import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
} from 'lucide-react';

const projects = [
  {
    id: 1,
    cat: 'UGC Videos',
    title: 'Syncify Sketchtab Duo Pro',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652920/ugc11_domzqq.mp4',
    sourceType: 'cloudinary',
    desc: 'This AI-driven video ad combined authentic UGC-style storytelling with dynamic product demonstrations to position the brand as a bridge between traditional and digital art. Deployed as a direct-response Meta campaign, it generated 164+ unit sales in October 2025 alone and delivered a highly profitable 5.2x ROAS.',
    size: 'hero',
    orientation: 'portrait',
  },
  {
    id: 2,
    cat: 'UGC Videos',
    title: 'Save Auto Max',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652920/ugc110_tlxzti.mp4',
    sourceType: 'cloudinary',
    desc: 'This AI-driven video ad became a long-term winning creative, running successfully on Meta Ads from December 2024 to December 2025. It consistently scaled performance, helped generate six-figure monthly revenue, and delivered an exceptional 6.4x ROAS—ultimately leading the client to upgrade my retainer from $1,000 to $7,500 per month.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 3,
    cat: 'UGC Graphics',
    title: 'ciúb campaign - Winner Variation',
    mediaType: 'image',
    src: '/images/graphics/graphics1.png',
    desc: 'Deployed as a primary conversion asset in a direct-response paid social campaign, this straightforward, benefit-driven design generated 850+ direct purchases at an efficient $14.20 CPA while delivering a profitable 3.4x ROAS.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 4,
    cat: 'UGC Graphics',
    title: 'Pet Insurance - Winner Variations',
    mediaType: 'image',
    src: '/images/graphics/graphics2.png',
    desc: 'Deployed across paid social channels, this single image became a top-performing creative, generating 1,450+ highly qualified leads at an exceptionally low $0.82 CPL while reducing the brand’s overall CAC by 34% over a 60-day campaign.',
    size: 'large',
    orientation: 'portrait',
  },
  {
    id: 5,
    cat: 'UGC Graphics',
    title: 'RxPros monthly package ads',
    mediaType: 'image',
    src: '/images/graphics/graphics3.png',
    desc: 'This single asset generated 22,000+ qualified leads at an efficient $1.15 CPL, significantly scaling the brand’s top-of-funnel acquisition while maintaining a strong lead-to-policy conversion rate.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 6,
    cat: 'UGC Graphics',
    title: 'Whitening Product Campaign',
    mediaType: 'image',
    src: '/images/graphics/graphics4.png',
    desc: 'This high-trust, benefit-driven layout proved highly effective at capturing high-intent prospects, generating 18,358+ qualified patient leads at a competitive $12.40 CPL—significantly outperforming industry benchmarks for pharmaceutical customer acquisition. The campaign ultimately contributed to RxPros generating $12M+ in gross revenue.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 7,
    cat: 'UGC Graphics',
    title: 'Pet Insurance - Creative Variations',
    mediaType: 'image',
    src: '/images/graphics/graphics5.png',
    desc: 'Deployed across Facebook and Instagram, this single graphic proved highly effective at driving direct response, generating 1,200+ qualified leads at an efficient $3.50 CPL while delivering a profitable 2.8x ROAS over a 30-day campaign.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 8,
    cat: 'UGC Graphics',
    title: 'ciúb - Winner Variation',
    mediaType: 'image',
    src: '/images/graphics/graphics6.png',
    desc: 'Deployed as a core asset in a direct-response paid social campaign, this variation successfully captured high-intent users, generating 1,800+ qualified quote requests at an efficient $4.50 CPL while driving a profitable 3.1x ROAS.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 9,
    cat: 'Short Forms',
    title: 'Short Form Systems',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652926/sf1_tz7ngp.mp4',
    sourceType: 'cloudinary',
    desc: 'This project achieved massive cross-platform virality across Instagram and TikTok. Driven purely by a wild, highly engaging storytelling hook and explosive audience engagement, the video generated over 10 million views and directly gained the creator an additional 100,000 followers.',
    size: 'large',
    orientation: 'portrait',
  },
  {
    id: 10,
    cat: 'Short Forms',
    title: 'Retention Edits',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652916/sf2_wiag99.mp4',
    sourceType: 'cloudinary',
    desc: 'This project achieved massive cross-platform virality across Instagram, TikTok, and Facebook through strong retention and organic engagement.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 11,
    cat: 'Short Forms',
    title: 'Fast-Paced Reels',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652918/sf3_giazyg.mp4',
    sourceType: 'cloudinary',
    desc: 'Energetic short-form edits made for modern content, quick attention capture, and stronger replay value.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 12,
    cat: 'Long Forms',
    title: 'Narrative Long Form',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652936/lf2_xjrzr8.mp4',
    sourceType: 'cloudinary',
    desc: 'Long-form edits built to keep flow, clarity, and engagement strong across extended runtime.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    id: 13,
    cat: 'Long Forms',
    title: 'YouTube Storytelling',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652922/lf1_mehu9c.mp4',
    sourceType: 'cloudinary',
    desc: 'Long-form content shaped for stronger storytelling, cleaner pacing, and deeper viewer retention.',
    size: 'wide',
    orientation: 'portrait',
  },
  {
    id: 16,
    cat: 'UGC Videos',
    title: 'Syncify Sketchtab Duo Pro 2 (FULL AI)',
    mediaType: 'video',
    src: 'https://res.cloudinary.com/dsel6dsjn/video/upload/q_auto,f_auto/v1777652921/ugcai11_qycpby.mp4',
    sourceType: 'cloudinary',
    desc: 'This 100% AI-generated video ad replicates an authentic user testimonial without the need for actors or a physical production crew. Deployed as the sole creative for a Meta Ads direct-response campaign, it successfully generated over 50 unit sales and achieved a highly profitable 4.2x Return on Ad Spend (ROAS), proving that fully AI-produced content can drive immediate and tangible e-commerce revenue.',
    size: 'small',
    orientation: 'portrait',
  },
];

const filters = [
  'All',
  'UGC Videos',
  'UGC Graphics',
  'Short Forms',
  'Long Forms',
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 18,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProjectGrid() {
  const [filter, setFilter] = useState('UGC Videos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFrameFullscreen, setIsFrameFullscreen] = useState(false);

  const fullscreenFrameRef = useRef(null);
  const videoRef = useRef(null);

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.cat === filter);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

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
    if (!frame || selectedProject?.mediaType !== 'video') return;

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

  const getSpanClass = (size) => {
    switch (size) {
      case 'hero':
        return 'md:col-span-2 md:row-span-2';
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      default:
        return 'md:col-span-1';
    }
  };

  const getTitleClass = (size) => {
    switch (size) {
      case 'hero':
        return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
      case 'large':
        return 'text-2xl sm:text-3xl md:text-4xl';
      case 'wide':
        return 'text-xl sm:text-2xl md:text-3xl';
      default:
        return 'text-xl sm:text-2xl md:text-3xl';
    }
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#050505] px-4 py-24 sm:px-6 md:px-10 md:py-36 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-orange-600/8 blur-[160px]" />
        <div className="absolute right-[-12rem] bottom-16 h-[28rem] w-[28rem] rounded-full bg-white/[0.02] blur-[180px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-10 hidden overflow-hidden md:block">
        <h2 className="select-none text-center text-[14vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
          WORK
        </h2>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-10 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-orange-500">
              Curated portfolio selection
            </p>

            <h2 className="font-heading text-4xl uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-5xl md:text-7xl lg:text-8xl">
              SELECTED <span className="italic text-orange-500">WORK.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/56 md:text-base md:leading-8">
              A premium selection of edits across UGC videos, UGC graphics,
              short-form content, long-form storytelling, and real estate
              visuals designed to hold attention and elevate perception.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center justify-end gap-2 md:max-w-[70rem]">
            {filters.map((cat) => {
              const active = filter === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative overflow-hidden rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition-all duration-500 sm:px-5 sm:py-2.5 ${
                    active
                      ? 'border-orange-500 bg-orange-500 text-black shadow-[0_0_24px_rgba(249,115,22,0.22)]'
                      : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 md:auto-rows-[220px] md:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setSelectedProject(project)}
                className={`group relative cursor-pointer overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.025] backdrop-blur-sm md:rounded-[32px] ${getSpanClass(
                  project.size
                )}`}
              >
                <div className="absolute inset-0">
                  {project.mediaType === 'video' ? (
                    <video
                      src={`${project.src}#t=0.1`}
                      className="h-full w-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:scale-[1.045] group-hover:grayscale-0 group-hover:opacity-100"
                      preload="metadata"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={project.src}
                      alt={project.title}
                      className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-[1.045] group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/5 transition-all duration-500 group-hover:from-black/82 group-hover:via-black/16 group-hover:to-transparent" />
                </div>

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/65 to-transparent" />
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/[0.02] blur-[70px]" />

                <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-white/42 transition-colors duration-500 group-hover:text-white/70">
                      {project.cat}
                    </span>

                    <div className="translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md md:flex">
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="max-w-[28rem]">
                    <h3
                      className={`font-heading uppercase leading-[0.92] tracking-[-0.05em] text-white transition-transform duration-500 group-hover:-translate-y-0.5 ${getTitleClass(
                        project.size
                      )}`}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/58 transition-colors duration-500 group-hover:text-white/70 md:mt-4 md:text-[15px] md:leading-7">
                      {project.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-3 md:mt-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 md:h-11 md:w-11">
                        {project.mediaType === 'video' ? (
                          <Play
                            size={16}
                            className="ml-0.5 text-white md:size-[18px]"
                            fill="currentColor"
                          />
                        ) : (
                          <ImageIcon size={17} className="text-white md:size-[18px]" />
                        )}
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.32em] text-white/40 transition-colors duration-500 group-hover:text-white/75">
                        View Case Study
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl"
          >
            <div className="flex h-full w-full items-start justify-center overflow-y-auto p-2 sm:p-4 md:items-center md:p-6">
              <button
                onClick={() => setSelectedProject(null)}
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
                          selectedProject.orientation === 'landscape'
                            ? 'max-w-[920px]'
                            : 'max-w-[320px] sm:max-w-[360px] md:max-w-[420px]'
                        } ${isFrameFullscreen ? '!max-w-none rounded-none border-0' : ''}`}
                      >
                        <div
                          className={`relative w-full bg-black ${
                            selectedProject.mediaType === 'image'
                              ? 'aspect-[4/5]'
                              : selectedProject.orientation === 'landscape'
                              ? 'aspect-video'
                              : 'aspect-[9/16]'
                          } ${isFrameFullscreen ? '!aspect-auto h-screen w-screen' : ''}`}
                        >
                          {selectedProject.mediaType === 'video' ? (
                            <>
                              <video
                                ref={videoRef}
                                src={selectedProject.src}
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
                            </>
                          ) : (
                            <img
                              src={selectedProject.src}
                              alt={selectedProject.title}
                              className="absolute inset-0 h-full w-full object-contain bg-black"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t border-white/10 p-4 sm:p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-orange-500">
                        {selectedProject.cat}
                      </p>

                      <h2 className="font-heading text-2xl uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-3xl md:text-5xl xl:text-6xl">
                        {selectedProject.title}
                      </h2>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/62 sm:mt-5 md:mt-6 md:text-base md:leading-8">
                        {selectedProject.desc}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-5 sm:mt-8 sm:gap-x-5 sm:gap-y-6 sm:pt-6 md:mt-10 md:gap-6 md:pt-8">
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Category
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedProject.cat}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Type
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedProject.mediaType === 'video' ? 'Video' : 'Image'}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Focus
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedProject.mediaType === 'video'
                            ? 'Editing, pacing, visual impact'
                            : 'Layout, offer clarity, visual impact'}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Orientation
                        </p>
                        <p className="text-sm text-white/85 md:text-base">
                          {selectedProject.mediaType === 'image'
                            ? '4:5 Graphic'
                            : selectedProject.orientation === 'landscape'
                            ? '16:9 Landscape'
                            : '9:16 Portrait'}
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
<div className="mt-16 flex flex-col items-center justify-center">
  <div className="mb-8 text-center">
    <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-orange-500">
      Portfolio Library
    </p>

    <h3 className="font-heading text-3xl uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-4xl md:text-5xl">
      SEE ALL MY <span className="italic text-orange-500">WORKS HERE.</span>
    </h3>
  </div>

  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
    {[
      {
        label: 'Videos',
        href: 'https://drive.google.com/drive/folders/1eRvvR1GAyF6xQM1Y5cd80wF3eB4tZMso',
      },
      {
        label: 'Graphics',
        href: 'https://drive.google.com/drive/folders/1pe1fBbySHRJYTqQoVq8Z76ZAwyA860m6',
      },
      {
        label: 'Meta Ads',
        href: 'https://drive.google.com/drive/folders/1XpZmkhqIHQLKF-bvPEPganrnNvMSKae8',
      },
    ].map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/12 bg-white/[0.035] px-7 py-4 text-[10px] uppercase tracking-[0.34em] text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-[2px] hover:border-orange-500/40 hover:bg-orange-500/[0.08] hover:text-white hover:shadow-[0_0_0_1px_rgba(255,140,0,0.15),0_18px_60px_rgba(255,120,0,0.08)] sm:w-auto sm:px-8"
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/10 blur-xl transition-all duration-700 group-hover:left-[120%]" />

        <span className="relative z-10">{link.label}</span>

        <span className="relative z-10 text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
          →
        </span>
      </a>
    ))}
  </div>
</div>
    </section>
  );
}
