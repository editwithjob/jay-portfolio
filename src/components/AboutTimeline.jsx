import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

function TimelineCard({ item, index }) {
  const cardRef = useRef(null);
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start center', 'end start'],
  });

  const driftY = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const smoothDrift = useSpring(driftY, { stiffness: 80, damping: 20, mass: 1 });
  const yearOpacity = useTransform(scrollYProgress, [0, 0.85], [0.98, 0.08]);
  const yearScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 0.985]);

  const yImage = useTransform(scrollYProgress, [0, 1], [34, -44]);
  const yText = useTransform(scrollYProgress, [0, 1], [18, -16]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.82, 1], [0.48, 1, 1, 0.74]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.972, 1, 0.988]);

  return (
    <div
      ref={cardRef}
      className="relative flex justify-start pt-10 md:gap-10 md:pt-32 lg:pt-40"
    >
      {/* Left rail / year */}
      <div className="sticky top-28 z-30 hidden self-start md:flex md:w-[220px] lg:w-[260px]">
        <div className="relative flex items-center gap-5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_22px_rgba(249,115,22,0.18)]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_65%)]" />
            <div className="relative h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.95)]" />
          </div>

          <motion.h3
            style={{ y: smoothDrift, opacity: yearOpacity, scale: yearScale }}
            className="select-none whitespace-nowrap text-6xl font-black uppercase italic tracking-[-0.09em] text-white/16 will-change-transform transform-gpu lg:text-7xl xl:text-[6.4rem]"
          >
            {item.year}
          </motion.h3>
        </div>
      </div>

      {/* Mobile year */}
      <div className="mb-4 block md:hidden">
        <h3 className="text-3xl font-black uppercase tracking-[-0.06em] text-white/18">
          {item.year}
        </h3>
      </div>

      {/* Card */}
      <motion.div
        style={{ opacity, scale }}
        className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md will-change-transform transform-gpu md:rounded-[34px]"
      >
        {/* ambient */}
        <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-orange-600/10 blur-[95px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/[0.025] blur-[85px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.015))]" />

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 ${
            isReversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
          }`}
        >
          {/* Text */}
          <motion.div
            style={{ y: yText }}
            className="relative z-10 p-6 will-change-transform transform-gpu sm:p-7 md:p-9 lg:p-10 xl:p-12"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-orange-500/70" />
              <p className="text-[10px] uppercase tracking-[0.38em] text-orange-500">
                {item.label}
              </p>
            </div>

            <h4 className="font-heading text-3xl uppercase leading-[0.92] tracking-[-0.055em] text-white sm:text-4xl md:text-5xl">
              {item.title}
            </h4>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
              {item.description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/8 pt-6 sm:grid-cols-2 md:mt-10 md:gap-5 md:pt-8">
              {item.details.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4"
                >
                  <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    {detail.label}
                  </p>
                  <p className="text-sm leading-6 text-white/84 md:text-[15px]">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <div className="relative min-h-[300px] overflow-hidden border-t border-white/8 bg-black/50 lg:min-h-full lg:border-t-0">
            <motion.div
              style={{ y: yImage }}
              className="absolute inset-0 will-change-transform transform-gpu"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover grayscale opacity-72"
              />
            </motion.div>

            <div
              className={`absolute inset-0 ${
                isReversed
                  ? 'bg-gradient-to-t from-black via-black/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/18 lg:to-black/70'
                  : 'bg-gradient-to-t from-black via-black/25 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/18 lg:to-black/70'
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,rgba(0,0,0,0.35)_78%)]" />

            <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/10 bg-black/45 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                {item.visualLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                {item.visualText}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutTimeline() {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!measureRef.current) return;

    const el = measureRef.current;
    const updateHeight = () => setHeight(el.getBoundingClientRect().height);

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    const images = Array.from(el.querySelectorAll('img'));
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', updateHeight, { once: true });
      }
    });

    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 15%', 'end 85%'],
  });

  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 70,
    damping: 24,
    mass: 0.9,
  });

  const lineOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.06], [0, 1]),
    {
      stiffness: 70,
      damping: 24,
    }
  );

  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 20]);

  const data = useMemo(
    () => [
      {
        year: '2026',
        label: 'Present Chapter',
        title: 'Creative Strategist',
        description:
          'Now focused on building creative with stronger direction, sharper hooks, and more intentional performance. The work has evolved beyond editing into strategy, creative planning, and developing systems that help brands produce content with clearer conversion intent.',
        details: [
          { label: 'Focus', value: 'Strategizing, directing, quality control' },
          { label: 'Current Work', value: 'Researching and creating briefs for a creative team' },
        ],
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1400',
        visualLabel: 'Current chapter',
        visualText:
          'Shaping creative not just to look premium, but to perform with purpose.',
      },
      {
        year: '2025',
        label: 'Leadership',
        title: 'Team Leader / Senior Editor',
        description:
          'Stepped into a stronger leadership role while still staying hands-on with execution. This chapter focused on managing creative output, maintaining quality control, and helping teams produce stronger content across e-commerce, direct-response, and service-based brands.',
        details: [
          { label: 'Company', value: 'Adstronauts Creative' },
          { label: 'Clients', value: 'RxPros, Direct Meds, Medvi, Other Telehealth Brands' },
        ],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1400',
        visualLabel: 'Leadership shift',
        visualText:
          'A turning point where creative execution expanded into ownership and team direction.',
      },
      {
        year: '2024',
        label: 'Performance Editing',
        title: 'Senior Video Editor',
        description:
          'Worked heavily on social-first content, direct-response editing, and stronger visual storytelling built for attention. This phase sharpened pacing, retention structure, and the ability to build edits that feel native while still being performance-driven.',
        details: [
          { label: 'Company', value: 'Solar Bill Busters' },
          { label: 'Work Type', value: 'Paid social, promotional videos, digital campaigns' },
        ],
        image: '/images/timeline/2024.png ',
        visualLabel: 'Performance era',
        visualText:
          'A phase centered on stronger hooks, better pacing, and social-first editing discipline.',
      },
      {
        year: '2023',
        label: 'Hybrid Creative',
        title: 'Senior Video Editor & Graphic Designer',
        description:
          'Balanced both editing and design work across branded content, social media campaigns, and promotional visuals. This period built stronger versatility and helped shape a more complete creative identity across both motion and static assets.',
        details: [
          { label: 'Company', value: 'Infinite Energy Corporation' },
          { label: 'Work Type', value: 'Video editing, social content, branded design' },
        ],
        image: '/images/timeline/2023.png',
        visualLabel: 'Dual skill growth',
        visualText:
          'Where motion and graphic design started working together as one creative system.',
      },
      {
        year: '2022',
        label: 'Creative Expansion',
        title: 'Senior Video Editor',
        description:
          'Built more confidence in editing long-form and short-form content while refining storytelling flow, cut rhythm, and audience retention. This chapter helped solidify a more professional creative standard and cleaner execution across projects.',
        details: [
          { label: 'Company', value: 'Greater Property Group' },
          { label: 'Focus', value: 'Real estate content, social edits, branded storytelling' },
        ],
        image: '/images/timeline/2022.png ',
        visualLabel: 'Refinement phase',
        visualText:
          'A chapter that pushed editing from functional to polished and intentional.',
      },
      {
        year: '2021',
        label: 'Foundation',
        title: 'Graphic Designer & Video Editor',
        description:
          'This was the phase where creative became more serious. Working on social content, graphic assets, and early branded materials helped build the visual instincts and technical confidence that would later shape the portfolio.',
        details: [
          { label: 'Company', value: 'NWH Digitals' },
          { label: 'Built Around', value: 'Social content, graphics, and video execution' },
        ],
        image:
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1400',
        visualLabel: 'Creative foundation',
        visualText:
          'The stage where creative instincts became real output, not just experimentation.',
      },
      {
        year: '2020',
        label: 'Early Career',
        title: 'Junior Graphic Designer & Video Editor',
        description:
          'An early but important chapter focused on building practical creative experience. This period was about learning through real work, understanding visual communication, and developing the habits that shaped long-term growth in design and editing.',
        details: [
          { label: 'Company', value: 'FM Corporation' },
          { label: 'Role Focus', value: 'Graphic design, social media visuals, early video work' },
        ],
        image: '/images/timeline/2020.png ',
        visualLabel: 'Starting point',
        visualText:
          'The first real chapter where the creative path started becoming clear.',
      },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
      {/* Ambient background */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-orange-600/7 blur-[150px] will-change-transform transform-gpu"
      />
      <div className="pointer-events-none absolute bottom-20 right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-white/[0.02] blur-[180px]" />

      {/* Ghost background word */}
      <motion.div
        style={{ y: ghostY }}
        className="pointer-events-none absolute inset-x-0 top-20 hidden overflow-hidden will-change-transform transform-gpu md:block"
      >
        <h2 className="select-none text-center text-[15vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
          STORY
        </h2>
      </motion.div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          style={{ y: headerY }}
          className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center will-change-transform transform-gpu md:mb-24"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-orange-500">
            Personal timeline
          </p>

          <h2 className="font-heading text-5xl uppercase leading-[0.84] tracking-[-0.06em] text-white sm:text-6xl md:text-8xl">
            ABOUT <span className="italic text-orange-500">ME.</span>
          </h2>

          <p className="mt-5 text-[11px] uppercase tracking-[0.34em] text-white/40 md:text-sm">
            Just a guy that makes people feel
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-7xl">
          <div ref={measureRef} className="relative">
            {data.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Progress rail */}
          <div
            style={{ height: `${height}px` }}
            className="absolute left-[20px] top-0 hidden w-[2px] overflow-hidden bg-white/6 md:block"
          >
            <div className="absolute inset-x-0 top-0 h-full w-[2px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.08),rgba(255,255,255,0.03))]" />
            <motion.div
              style={{
                scaleY: lineScale,
                opacity: lineOpacity,
                transformOrigin: 'top',
              }}
              className="absolute inset-x-0 top-0 h-full w-[2px] rounded-full bg-orange-500 shadow-[0_0_22px_rgba(249,115,22,0.55)] will-change-transform transform-gpu"
            />
          </div>
        </div>
      </div>
    </section>
  );
}