"use client";

const items = [
  "BRANDING",
  "UI/UX DESIGN",
  "SOCIAL MEDIA",
  "EDITORIAL",
  "MOTION GRAPHICS",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden py-4 md:py-6" style={{ borderTop: "1px solid rgba(230,57,70,0.1)", borderBottom: "1px solid rgba(230,57,70,0.1)" }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "rgba(230,57,70,0.12)",
              letterSpacing: "5px",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              background: "var(--red)",
              borderRadius: "50%",
              verticalAlign: "middle",
              margin: "0 1rem",
              opacity: 0.3,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}
