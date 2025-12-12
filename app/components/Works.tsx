"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const posters = [
  "/images/works/project-1.jpeg",
  "/images/works/project-2.jpeg",
  "/images/works/project-3.jpeg",
  "/images/works/project-4.jpeg",
];

export default function Works() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const speedRef = useRef(0.5); // pixels per frame
  const targetSpeedRef = useRef(0.5);

  // Quadruple posters for seamless loop
  const allPosters = [...posters, ...posters, ...posters, ...posters];

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % posters.length);
    }
  }, [selectedIndex]);

  const goToPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + posters.length) % posters.length);
    }
  }, [selectedIndex]);

  // Smooth scroll animation using requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      // Smoothly interpolate current speed toward target speed
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;

      // Update position
      positionRef.current += speedRef.current;

      // Get half width for seamless loop (we have 4 copies, so reset at 50%)
      const halfWidth = track.scrollWidth / 2;

      // Reset position for seamless loop
      if (positionRef.current >= halfWidth) {
        positionRef.current = 0;
      }

      // Apply transform
      track.style.transform = `translateX(-${positionRef.current}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    targetSpeedRef.current = 0.15; // Slow down
  };

  const handleMouseLeave = () => {
    targetSpeedRef.current = 0.5; // Normal speed
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goToNext, goToPrev, closeModal]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section id="works" className="py-16 md:py-24 lg:py-32">
      {/* Header */}
      <div className="container mb-10 md:mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div>
            <span className="text-label mb-2 md:mb-3 block">Selected Work</span>
            <h2 className="heading-lg">Featured Projects</h2>
          </div>
          <p className="text-body text-sm md:text-base md:text-right md:whitespace-nowrap">
            A curated selection of poster designs and visual stories.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Gallery */}
      <div
        className="relative w-full overflow-hidden py-4 md:py-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-[var(--bg)] to-transparent" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {allPosters.map((poster, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => setSelectedIndex(index % posters.length)}
            >
              <div className="w-[220px] sm:w-[260px] md:w-[300px] h-[290px] sm:h-[340px] md:h-[400px] overflow-hidden bg-[var(--bg-secondary)]">
                <img
                  src={poster}
                  alt={`Poster design ${(index % posters.length) + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mt-8 md:mt-12">
        <div className="pt-6 md:pt-10 border-t border-[var(--border)] text-center">
          <a
            href="#contact"
            className="inline-flex flex-wrap justify-center items-center gap-2 md:gap-3 text-xs md:text-small text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>Interested in working together?</span>
            <span className="hidden sm:inline-block w-8 h-px bg-[var(--border)] group-hover:bg-[var(--accent)] group-hover:w-12 transition-all duration-300" />
            <span className="text-[var(--accent)]">Let&apos;s talk</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[var(--bg)] flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors z-10"
            onClick={closeModal}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="max-w-4xl max-h-[80vh] px-10 md:px-16 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={posters[selectedIndex]}
              alt={`Poster design ${selectedIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-xs md:text-small text-[var(--text-muted)]">
            {selectedIndex + 1} / {posters.length}
          </div>
        </div>
      )}
    </section>
  );
}
