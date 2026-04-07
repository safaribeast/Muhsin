"use client";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
        {/* Left - Text */}
        <div className="flex-1">
          <span className="reveal" style={{ fontSize: "0.65rem", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red)", marginBottom: "1rem", display: "block" }}>
            About Me
          </span>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Who is <em style={{ fontStyle: "italic", color: "var(--red)" }}>Muhsin?</em>
          </h2>
          <p className="reveal reveal-d2" style={{ color: "var(--cream-dim)", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.9, fontWeight: 300, marginBottom: "2rem" }}>
            Beyond the screen, I&apos;m an architect of narratives. Based in the
            digital ether, I specialize in crafting visual languages that help
            brands cut through the noise.
          </p>

          <div className="flex flex-col" style={{ gap: "1.5rem" }}>
            <div className="flex items-start reveal reveal-d3" style={{ gap: "1rem" }}>
              <div className="flex items-center justify-center shrink-0" style={{ width: "40px", height: "40px", border: "1px solid var(--red)", color: "var(--red)", fontSize: "1rem" }}>
                &#9670;
              </div>
              <div>
                <h4 style={{ fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Storytelling
                </h4>
                <p style={{ color: "var(--cream-dim)", fontSize: "0.85rem", fontWeight: 300 }}>
                  Design that narrates a brand&apos;s core values.
                </p>
              </div>
            </div>
            <div className="flex items-start reveal reveal-d4" style={{ gap: "1rem" }}>
              <div className="flex items-center justify-center shrink-0" style={{ width: "40px", height: "40px", border: "1px solid var(--red)", color: "var(--red)", fontSize: "1rem" }}>
                &#9670;
              </div>
              <div>
                <h4 style={{ fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Branding
                </h4>
                <p style={{ color: "var(--cream-dim)", fontSize: "0.85rem", fontWeight: 300 }}>
                  Creating icons that stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Image Frame */}
        <div className="flex-1 w-full max-w-md lg:max-w-none reveal">
          <div className="relative w-full" style={{ aspectRatio: "3/4", border: "1px solid rgba(230,57,70,0.2)" }}>
            <div className="absolute hidden sm:block" style={{ top: "-15px", right: "-15px", bottom: "15px", left: "15px", border: "1px solid var(--red)", zIndex: -1 }} />
            <img
              alt="Muhsin - Portrait"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500"
              style={{ filter: "grayscale(0.5)" }}
              src="/images/cartoon2.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
