"use client";

const tools = ["PHOTOSHOP", "ILLUSTRATOR", "AFTER EFFECTS", "FIGMA"];

export default function Tools() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12 text-center" style={{ borderTop: "1px solid rgba(230,57,70,0.1)" }}>
      <span className="reveal" style={{ fontSize: "0.65rem", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red)", marginBottom: "1rem", display: "block" }}>
        My Arsenal
      </span>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
        Tools of the <em style={{ fontStyle: "italic", color: "var(--red)" }}>trade</em>
      </h2>

      <div className="flex flex-wrap justify-center gap-4 md:gap-10 lg:gap-16 mt-8 md:mt-12 reveal reveal-d2">
        {tools.map((tool) => (
          <span
            key={tool}
            className="relative cursor-default group"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
              letterSpacing: "clamp(2px, 0.5vw, 5px)",
              color: "var(--cream-muted)",
              transition: "0.4s",
            }}
          >
            <span className="group-hover:text-red transition-colors duration-400">{tool}</span>
            <span className="absolute transition-all duration-400 group-hover:w-full" style={{ bottom: "-4px", left: 0, width: 0, height: "2px", background: "var(--red)" }} />
          </span>
        ))}
      </div>
    </section>
  );
}
