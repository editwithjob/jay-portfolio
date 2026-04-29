import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

import Hero from './components/Hero';
import Showreel from './components/Showreel';
import ProjectGrid from './components/ProjectGrid';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import AboutTimeline from './components/AboutTimeline';
import Footer from './components/Footer';

function App() {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.75 : 0.95,
      smoothWheel: !prefersReducedMotion && !isMobile,
      smoothTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      lerp: 0.08,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      lenisRef.current = null;

      if (window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  const scrollToSection = (target) => {
    lenisRef.current?.scrollTo(target);
  };

  return (
    <main className="relative overflow-x-hidden bg-[#0a0a0a] font-inter text-white selection:bg-orange-600 selection:text-white">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-40 opacity-5" />

      <nav className="fixed top-0 z-50 flex w-full items-center justify-between p-6 mix-blend-difference md:p-12">
        <div className="text-2xl font-black italic uppercase tracking-tighter md:text-3xl">
          JAY.
        </div>

        <div className="flex gap-6 text-xs font-medium uppercase tracking-widest md:gap-12">
          <button onClick={() => scrollToSection('#work')}>Work</button>
          <button onClick={() => scrollToSection('#about')}>Story</button>
          <button onClick={() => scrollToSection('#contact')}>Contact</button>
        </div>
      </nav>

      <Hero />
      <Showreel />

      <section id="work">
        <ProjectGrid />
      </section>

      <section id="about">
        <AboutTimeline />
      </section>

      <Services />
      <Testimonials />

      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}

export default App;