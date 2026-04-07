"use client";

import { useState, useEffect, useRef } from "react";

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;

    const animate = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
      posRef.current -= speedRef.current;

      const singleSetWidth = track.scrollWidth / 3;
      if (singleSetWidth > 0 && Math.abs(posRef.current) >= singleSetWidth) {
        posRef.current += singleSetWidth;
      }

      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [projects]);

  const handleMouseEnter = () => { targetSpeedRef.current = 0.15; };
  const handleMouseLeave = () => { targetSpeedRef.current = 0.5; };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  if (projects.length === 0) return null;

  const tripled = [...projects, ...projects, ...projects];

  return (
    <>
      <section id="portfolio" className="py-12 md:py-20 lg:py-28">
        <div className="px-4 md:px-8 lg:px-12 mb-8 md:mb-12">
          <span className="reveal" style={{ fontSize: "0.65rem", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red)", marginBottom: "1rem", display: "block" }}>
            Selected Work
          </span>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            Projects that <em style={{ fontStyle: "italic", color: "var(--red)" }}>speak</em>
          </h2>
        </div>

        <div
          className="reveal reveal-d2"
          style={{ position: "relative", overflow: "hidden" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fade edges - smaller on mobile */}
          <div className="hidden sm:block" style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "120px",
            background: "linear-gradient(90deg, var(--black), transparent)",
            zIndex: 3, pointerEvents: "none",
          }} />
          <div className="hidden sm:block" style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "120px",
            background: "linear-gradient(270deg, var(--black), transparent)",
            zIndex: 3, pointerEvents: "none",
          }} />

          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "clamp(0.8rem, 2vw, 1.5rem)",
              width: "max-content",
              willChange: "transform",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            {tripled.map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                className="group relative overflow-hidden"
                onClick={() => setSelected(project)}
                style={{
                  width: "min(350px, 75vw)",
                  aspectRatio: "3/4",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.06]"
                  style={{ filter: "grayscale(0.2) brightness(0.7)" }}
                  draggable={false}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.95))" }} />
                <div className="absolute top-0 left-0 right-0 transition-transform duration-500 origin-left group-hover:scale-x-100" style={{ height: "2px", background: "var(--red)", transform: "scaleX(0)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div style={{ fontSize: "0.55rem", letterSpacing: "4px", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.4rem" }}>
                    {project.tag}
                  </div>
                  <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", letterSpacing: "2px", marginBottom: "0.3rem" }}>
                    {project.title}
                  </div>
                  <p className="transition-opacity duration-300 group-hover:opacity-100 hidden sm:block"
                    style={{ color: "var(--cream-dim)", fontSize: "0.8rem", fontWeight: 300, opacity: 0.5 }}>
                    {project.description}
                  </p>
                </div>
                <div className="absolute items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:flex"
                  style={{ top: "1rem", right: "1rem", width: "32px", height: "32px", border: "1px solid var(--red)", color: "var(--red)", fontSize: "0.9rem" }}>
                  &#8599;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            animation: "lbFadeIn 0.3s ease forwards",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div
            className="relative w-full"
            style={{ maxWidth: "680px", animation: "lbSlideUp 0.4s cubic-bezier(0.4,0,0.2,1) forwards" }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute flex items-center justify-center transition-all duration-300 hover:bg-red hover:text-black hover:border-red"
              style={{
                top: "-44px", right: "0",
                width: "34px", height: "34px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--cream)", fontSize: "1rem", cursor: "pointer", zIndex: 10,
              }}
            >
              &#10005;
            </button>

            <div className="relative overflow-hidden" style={{ background: "var(--black-card)" }}>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-auto object-contain block mx-auto"
                style={{ maxHeight: "60vh" }}
              />
            </div>

            <div className="p-4 md:p-6" style={{ background: "var(--black-card)", borderTop: "2px solid var(--red)" }}>
              <div style={{ fontSize: "0.55rem", letterSpacing: "4px", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.4rem" }}>
                {selected.tag}
              </div>
              <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", letterSpacing: "3px", lineHeight: 1, marginBottom: "0.5rem" }}>
                {selected.title}
              </div>
              <p style={{ color: "var(--cream-dim)", fontSize: "0.85rem", fontWeight: 300 }}>
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
