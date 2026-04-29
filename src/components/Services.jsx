import { motion } from "framer-motion";

const services = [
  {
    eyebrow: "PAID SOCIAL",
    title: "META ADS",
    description:
      "Native-style ad edits built for stronger hooks, cleaner pacing, and better conversion flow.",
    points: ["Hook-first structure", "Performance-led execution"],
  },
  {
    eyebrow: "VERTICAL CONTENT",
    title: "Short Form",
    description:
      "Fast, strategic cuts designed to hold attention instantly across Reels, TikTok, and Shorts.",
    points: ["Retention-driven edits", "Built for repeatable output"],
  },
  {
    eyebrow: "YOUTUBE / STORY",
    title: "Long Form",
    description:
      "Structured edits with stronger narrative rhythm, clean support visuals, and polished flow.",
    points: ["Story-led pacing", "Depth + watchability"],
  },
  {
    eyebrow: "VISUAL DESIGN",
    title: "Graphic Design",
    description:
      "Scroll-stopping visuals, ad creatives, and branded layouts designed to look premium and convert.",
    points: ["Ad graphics", "Brand-first visuals"],
  },
  {
    eyebrow: "DIGITAL PRESENCE",
    title: "Website Design",
    description:
      "Modern, conversion-aware website visuals built to make brands feel sharper and more credible.",
    points: ["Premium UI direction", "Visual trust + polish"],
  },
];

const videoTools = [
  { name: "pr", full: "Premiere" },
  { name: "ae", full: "After Effects" },
  { name: "dr", full: "DaVinci" },
  { name: "ps", full: "Photoshop" },
  { name: "ai", full: "Illustrator" },
  { name: "lr", full: "Lightroom" },
];

const aiTools = [
  { name: "sora", full: "Sora AI" },
  { name: "runway", full: "Runway" },
  { name: "mj", full: "Midjourney" },
  { name: "pika", full: "Pika" },
  { name: "veo3", full: "Veo" },
];

function ServicePill({ service, index }) {
  const titleParts = service.title.split(" ");
  const first = titleParts[0];
  const rest = titleParts.slice(1).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-6 transition-all duration-500 hover:border-orange-500/25 hover:bg-white/[0.045] hover:shadow-[0_0_50px_rgba(249,115,22,0.08)] md:px-7 md:py-7"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_45%)]" />
      </div>

      <div className="relative z-10">
        <p className="mb-4 text-[10px] uppercase tracking-[0.36em] text-orange-500">
          {service.eyebrow}
        </p>

        <h3 className="font-heading text-[1.8rem] uppercase leading-[0.92] tracking-[-0.05em] text-white md:text-[2rem]">
          {first}{" "}
          <span className="italic text-orange-600">
            {rest}
          </span>
        </h3>

        <p className="mt-4 min-h-[84px] text-[15px] leading-7 text-white/62">
          {service.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/8 pt-4">
          {service.points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-2 text-[13px] text-white/72"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, direction = 1, speed = 20 }) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden select-none py-4 md:py-6">
      <motion.div
        initial={{ x: direction > 0 ? "0%" : "-33.33%" }}
        animate={{ x: direction > 0 ? "-33.33%" : "0%" }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
        style={{ willChange: "transform" }}
        className="flex min-w-max flex-nowrap items-center gap-8 md:gap-12"
      >
        {duplicatedItems.map((tool, i) => (
          <div key={i} className="group flex items-center gap-4 md:gap-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] transition-all duration-500 group-hover:border-orange-500/50 group-hover:bg-white/[0.05] md:h-14 md:w-14">
              <img
                src={`/tools/${tool.name}.png`}
                alt={tool.name}
                loading="lazy"
                className="h-1/2 w-1/2 object-contain grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/28 transition-colors duration-500 group-hover:text-orange-500 md:text-[9px]">
              {tool.full}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function WhatIOffer() {
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3, 5);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-0 h-[420px] w-[420px] rounded-full bg-orange-600/6 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[360px] w-[360px] rounded-full bg-orange-600/4 blur-[140px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-8 hidden overflow-hidden md:block">
        <h2 className="select-none text-center text-[14vw] font-black uppercase italic leading-none tracking-[-0.08em] text-white/[0.03]">
          DO
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid grid-cols-1 gap-8 md:mb-18 md:grid-cols-[1fr_0.9fr] md:items-end"
        >
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-orange-500">
              Services
            </p>

            <h2 className="font-heading text-5xl uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              WHAT I <span className="italic text-orange-600">DO.</span>
            </h2>
          </div>

          <div className="md:justify-self-end md:text-right">
            <p className="max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              Creative built to perform, look premium, and leave a stronger
              impression across content, campaigns, and digital presence.
            </p>
            <div className="mt-8 h-[1px] w-14 bg-orange-600/50 md:ml-auto" />
          </div>
        </motion.div>

        <div className="space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {firstRow.map((service, index) => (
              <ServicePill
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 md:px-[16.66%]">
            {secondRow.map((service, index) => (
              <ServicePill
                key={service.title}
                service={service}
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </div>

      {/* tools preserved */}
      <div className="relative z-10 mt-16 border-t border-white/5 pt-8 md:mt-20 md:pt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-32" />

        <div className="flex flex-col gap-1 md:gap-2">
          <MarqueeRow items={videoTools} direction={1} speed={15} />
          <MarqueeRow items={aiTools} direction={-1} speed={12} />
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl justify-center px-6 md:mt-16">
          <p className="w-full border-t border-white/10 pt-6 text-center text-[7px] uppercase tracking-[0.8em] text-white/10 md:pt-8 md:text-[8px]">
            Optimized workflow for high-retention creative production
          </p>
        </div>
      </div>
    </section>
  );
}