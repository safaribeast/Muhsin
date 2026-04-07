"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-8 lg:px-12"
        style={{
          padding: undefined,
          height: "64px",
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(230,57,70,0.15)",
        }}>
        <a href="#" className="shrink-0" style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1rem, 3vw, 1.4rem)", letterSpacing: "3px", color: "var(--cream)" }}>
          YOUNG<span style={{ color: "var(--red)" }}>_</span>GRAPHIC<span style={{ color: "var(--red)" }}>123</span>
        </a>

        <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-red transition-colors duration-300"
              style={{ fontSize: "0.75rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-dim)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-fill-hover hover:text-[var(--black)] relative z-[1]"
            style={{
              padding: "0.5rem 1.5rem",
              border: "1px solid var(--red)",
              color: "var(--red)",
              fontSize: "0.7rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              transition: "0.3s",
            }}
          >
            Hire Me
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-[200] relative flex flex-col cursor-pointer"
          style={{ gap: "5px" }}
          aria-label="Toggle menu"
        >
          <span className={`block transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            style={{ width: "22px", height: "2px", background: "var(--cream)" }} />
          <span className={`block transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
            style={{ width: "22px", height: "2px", background: "var(--cream)" }} />
          <span className={`block transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            style={{ width: "22px", height: "2px", background: "var(--cream)" }} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[150] md:hidden flex flex-col justify-center items-center transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--black)", gap: "1.5rem", transitionTimingFunction: "cubic-bezier(0.77,0,0.18,1)" }}
      >
        {["Home", ...navLinks.map((l) => l.label)].map((label) => (
          <a
            key={label}
            href={label === "Home" ? "#" : `#${label.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red transition-colors duration-300"
            style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(2rem, 6vw, 3rem)", letterSpacing: "5px", color: "var(--cream-dim)" }}
          >
            {label.toUpperCase()}
          </a>
        ))}
      </div>
    </>
  );
}
