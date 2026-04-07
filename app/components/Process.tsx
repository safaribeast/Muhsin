"use client";

const steps = [
  { number: "01", title: "Discovery", description: "Uncovering the DNA of your project." },
  { number: "02", title: "Creative Design", description: "Bringing the vision to life visually." },
  { number: "03", title: "Refinement", description: "Polishing every pixel to perfection." },
  { number: "🚀", title: "Final Launch", description: "Delivering high-impact final assets." },
];

export default function Process() {
  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-12">
      <span className="reveal" style={{ fontSize: "0.65rem", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red)", marginBottom: "1rem", display: "block" }}>
        How I Work
      </span>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
        The <em style={{ fontStyle: "italic", color: "var(--red)" }}>process</em>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-12 relative">
        <div className="hidden md:block absolute" style={{ top: "35px", left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, var(--red), transparent)", zIndex: 0 }} />

        {steps.map((step, index) => (
          <div key={step.number} className={`relative z-[1] text-center reveal reveal-d${index + 1}`}>
            <div className="flex items-center justify-center mx-auto"
              style={{
                width: "clamp(50px, 10vw, 70px)", height: "clamp(50px, 10vw, 70px)",
                border: "2px solid var(--red)",
                marginBottom: "1rem",
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                color: "var(--red)",
                background: "var(--black)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}>
              {step.number}
            </div>
            <h4 style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              {step.title}
            </h4>
            <p style={{ color: "var(--cream-dim)", fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)", fontWeight: 300 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
