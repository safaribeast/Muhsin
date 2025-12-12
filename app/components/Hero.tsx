"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-hidden">
      <div className="container">
        {/* Mobile Profile Image - Shows at top on mobile */}
        <div className="block lg:hidden mb-8 animate-fade-up">
          <div className="relative w-32 h-32 mx-auto md:w-40 md:h-40">
            <div className="absolute inset-0 border border-[var(--accent)] opacity-20 translate-x-2 translate-y-2" />
            <img
              src="/images/hero-profile.jpeg"
              alt="Muhsin Adam Mnaro"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Label */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 md:mb-8 animate-fade-up">
              <span className="dot" />
              <span className="text-label">Graphic Designer</span>
            </div>

            {/* Main Heading */}
            <h1 className="heading-xl mb-4 md:mb-6">
              <span className="block animate-fade-up delay-1">
                Muhsin Adam Mnaro
              </span>
              <span className="block text-[var(--text-muted)] animate-fade-up delay-2">
                Young-graphix
              </span>
            </h1>

            {/* Description */}
            <p className="text-body text-base md:text-lg mb-8 md:mb-10 animate-fade-up delay-3 max-w-md mx-auto lg:mx-0">
              Transforming ideas into visual stories. Based in Arusha, Tanzania,
              I create designs that connect brands with their audiences.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 animate-fade-up delay-4">
              <a href="#works" className="btn btn-primary text-sm md:text-base px-5 md:px-7">
                View Work
              </a>
              <a href="#contact" className="btn btn-secondary text-sm md:text-base px-5 md:px-7">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right - Profile Image (Desktop) */}
          <div className="hidden lg:block animate-fade-up delay-3">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border border-[var(--accent)] opacity-20" />
              <div className="relative aspect-[4/5] max-w-md ml-auto overflow-hidden">
                <img
                  src="/images/hero-profile.jpeg"
                  alt="Muhsin Adam Mnaro"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-30" />
              </div>
              <div className="absolute -bottom-6 left-0 right-0 text-right pr-4">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  Arusha, Tanzania
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-[var(--border)] animate-fade-up delay-5">
          <div className="flex justify-center lg:justify-start flex-wrap gap-8 md:gap-12 lg:gap-20">
            {[
              { number: "50+", label: "Projects" },
              { number: "30+", label: "Clients" },
              { number: "5+", label: "Years" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="block text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] text-[var(--text)]">
                  {stat.number}
                </span>
                <span className="text-label mt-1 block text-[10px] md:text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Scroll Indicator - Desktop only */}
      {isVisible && (
        <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 animate-fade-in">
          <a
            href="#works"
            className="group flex flex-col items-center gap-3 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] writing-vertical">
              Scroll
            </span>
            <div className="w-px h-16 bg-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[var(--accent)] scroll-line-animate" />
            </div>
          </a>
        </div>
      )}
    </section>
  );
}
