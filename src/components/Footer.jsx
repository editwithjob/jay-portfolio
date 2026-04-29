import { Mail } from 'lucide-react';
import { FaWhatsapp, FaViber, FaTelegramPlane } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="relative bg-white text-black px-6 py-24 md:px-12 md:py-32 overflow-hidden">

      {/* BIG TEXT */}
      <div className="max-w-7xl mx-auto">
        <p className="mb-6 text-xs tracking-[0.4em] uppercase text-black/40">
          Have a story to tell?
        </p>

        <h2 className="font-heading text-[clamp(48px,10vw,140px)] leading-[0.9] tracking-[-0.04em] uppercase">
          LET’S CREATE
          <br />
          <span className="italic">THE</span>
          <br />
          UNFORGETTABLE.
        </h2>
      </div>

      {/* CONTACT ROW */}
      <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-end">

        {/* EMAIL */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-2">
            Email
          </p>

          <a
            href="mailto:jaycorpor@gmail.com"
            className="text-lg md:text-xl font-medium hover:opacity-60 transition"
          >
            jaycorpor@gmail.com
          </a>
        </div>

        {/* SOCIAL ICONS (UPDATED) */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            Message me
          </p>

          <div className="flex items-center gap-4">

            {/* WHATSAPP */}
            <a
              href="https://wa.me/639311724233"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition-all hover:bg-black hover:text-white"
            >
              <FaWhatsapp size={20} />
            </a>

            {/* VIBER */}
            <a
              href="viber://chat?number=+639311724233"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition-all hover:bg-black hover:text-white"
            >
              <FaViber size={20} />
            </a>

            {/* TELEGRAM */}
            <a
              href="https://t.me/+639311724233"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition-all hover:bg-black hover:text-white"
            >
              <FaTelegramPlane size={20} />
            </a>

          </div>
        </div>

        {/* OPTIONAL CTA TEXT */}
        <div className="text-right hidden md:block">
          <p className="text-sm text-black/40">
            Let’s turn your idea into something that performs.
          </p>
        </div>
      </div>

      {/* WATERMARK */}
      <div className="pointer-events-none absolute right-10 bottom-10 text-[20vw] font-black text-black/[0.04] leading-none">
        JAY
      </div>

    </section>
  );
}