"use client";

const services = [
  {
    num: "01",
    title: "Branding",
    description: "Logo design, visual identity systems, and brand guidelines that define your presence.",
    tags: ["Strategy", "Typography", "Visual Language"],
  },
  {
    num: "02",
    title: "UI/UX Design",
    description: "Creating digital interfaces that are intuitive, accessible, and visually stunning.",
    tags: ["Prototyping", "Design Systems", "App Interfaces"],
  },
  {
    num: "03",
    title: "Social Media",
    description: "Engaging visual content designed to stop the scroll and grow your audience.",
    tags: ["Campaign Design", "Motion Graphics", "Templates"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-12" style={{ background: "var(--black-light)" }}>
      <span className="reveal" style={{ fontSize: "0.65rem", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red)", marginBottom: "1rem", display: "block" }}>
        What I Do
      </span>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
        Core <em style={{ fontStyle: "italic", color: "var(--red)" }}>expertise</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 md:mt-12" style={{ gap: "2px" }}>
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`service-top-line group transition-all duration-400 hover:-translate-y-1 reveal reveal-d${index + 1}`}
            style={{
              padding: "clamp(1.5rem, 3vw, 3rem) clamp(1.2rem, 2.5vw, 2.5rem)",
              background: "var(--black-card)",
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "rgba(230,57,70,0.1)", lineHeight: 1, marginBottom: "0.8rem" }}>
              {service.num}
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)", marginBottom: "0.8rem", fontWeight: 400 }}>
              {service.title}
            </h3>
            <p style={{ color: "var(--cream-dim)", fontSize: "0.85rem", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.2rem" }}>
              {service.description}
            </p>
            <div className="flex flex-wrap" style={{ gap: "0.4rem" }}>
              {service.tags.map((tag) => (
                <span key={tag} className="transition-colors duration-300"
                  style={{ padding: "0.25rem 0.6rem", border: "1px solid rgba(230,57,70,0.2)", fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--cream-muted)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
