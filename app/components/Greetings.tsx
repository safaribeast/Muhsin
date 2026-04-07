"use client";

export default function Greetings() {
  return (
    <section className="reveal py-12 md:py-20 px-4 md:px-8" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", borderTop: "1px solid rgba(230,57,70,0.1)", borderBottom: "1px solid rgba(230,57,70,0.1)" }}>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", lineHeight: 1.4, fontWeight: 400, marginBottom: "2rem" }}>
        Greetings! I&apos;m{" "}
        <span style={{ color: "var(--red)", fontStyle: "italic" }}>young_graphic123</span>, a passionate
        and motivated graphic designer.
      </h2>
      <div className="brutalist-divider" />
      <p style={{ color: "var(--cream-dim)", fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.9 }}>
        I believe that every brand has a story that deserves a cinematic stage.
        My mission is to translate complex ideas into visual experiences that
        are not just seen, but felt.
      </p>
    </section>
  );
}
