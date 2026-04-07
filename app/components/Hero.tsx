"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-4 md:px-8 lg:px-12 pt-[64px] pb-8">
      {/* Background Hexagon Shape */}
      <div
        className="absolute hidden md:block"
        style={{
          right: "-10%",
          top: "10%",
          width: "600px",
          height: "600px",
          background: "var(--red)",
          opacity: 0.04,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          animation: "floatShape 12s ease-in-out infinite",
        }}
      />

      <div className="relative z-[2] w-full" style={{ maxWidth: "900px" }}>
        {/* Greeting */}
        <span className="block animate-fade-up delay-3"
          style={{ fontFamily: "var(--font-signature)", fontSize: "clamp(1.8rem, 5vw, 2.5rem)", color: "var(--red)" }}>
          Hello!
        </span>

        {/* Title */}
        <h1 className="animate-fade-up delay-5"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            lineHeight: 0.9,
            letterSpacing: "-2px",
            margin: "0.5rem 0 1rem",
          }}>
          <span className="text-stroke">CREATIVE</span>
          <br />
          <span style={{ color: "var(--red)" }}>VANGUARD</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up delay-7"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            color: "var(--cream-dim)",
            maxWidth: "500px",
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
          Pushing the boundaries of digital aesthetics through high-octane
          branding and editorial design systems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center animate-fade-up delay-9" style={{ gap: "1rem", marginTop: "2rem" }}>
          <a href="#portfolio"
            className="inline-flex items-center transition-all duration-300 hover:-translate-y-0.5"
            style={{
              gap: "0.8rem",
              padding: "0.9rem 2rem",
              background: "var(--red)",
              color: "var(--black)",
              fontWeight: 600,
              fontSize: "0.8rem",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
            }}>
            View My Work &#8599;
          </a>
          <a href="#contact"
            className="transition-all duration-300 hover:border-red hover:text-red"
            style={{
              padding: "0.9rem 2rem",
              border: "1px solid var(--cream-muted)",
              fontSize: "0.8rem",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              color: "var(--cream-dim)",
            }}>
            Get In Touch
          </a>
        </div>

        {/* Stat - inline on mobile */}
        <div className="animate-fade-up delay-11 mt-10 lg:absolute lg:right-0 lg:bottom-8 lg:mt-0 lg:text-right">
          <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(3rem, 8vw, 5rem)", color: "var(--red)", lineHeight: 1 }}>123+</div>
          <div style={{ fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase" as const, color: "var(--cream-muted)" }}>
            Projects Delivered
          </div>
        </div>
      </div>

      {/* 3D Character Image */}
      <div className="absolute hidden lg:block animate-fade-in delay-10"
        style={{ right: "5%", top: "50%", transform: "translateY(-50%)", width: "min(420px, 30vw)" }}>
        <div className="relative">
          <div className="absolute" style={{
            top: "10%", left: "50%", transform: "translateX(-50%)",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(230,57,70,0.08), transparent 70%)",
            filter: "blur(40px)",
          }} />
          <img
            src="/images/cartoon-character.png"
            alt="Young_graphic123 - 3D Character"
            className="relative z-[1] w-full h-auto object-contain drop-shadow-2xl"
            style={{
              maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
