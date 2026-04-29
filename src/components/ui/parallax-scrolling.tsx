'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    // Lenis is already in your App.jsx, but this ensures GSAP stays in sync
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax relative" ref={parallaxRef}>
      <section className="h-screen relative overflow-hidden">
        <div className="parallax__visuals relative h-full w-full">
          <div data-parallax-layers className="relative h-full w-full">
            {/* Background Layers */}
            <img src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp" data-parallax-layer="1" alt="" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <img src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp" data-parallax-layer="2" alt="" className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Title Layer */}
            <div data-parallax-layer="3" className="absolute inset-0 flex items-center justify-center z-10">
              <h2 className="text-white font-heading text-8xl md:text-[12rem] font-black italic uppercase tracking-tighter">Parallax</h2>
            </div>

            {/* Foreground Layer */}
            <img src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp" data-parallax-layer="4" alt="" className="absolute inset-0 w-full h-full object-cover z-20" />
          </div>
        </div>
      </section>
    </div>
  );
}