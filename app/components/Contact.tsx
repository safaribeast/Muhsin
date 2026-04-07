"use client";

import { useState, useEffect } from "react";

interface Social {
  id: string;
  platform: string;
  url: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => setSocials(data))
      .catch(() => {});
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const fullMessage = `Subject: Portfolio Inquiry from ${formData.name}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      navigator.clipboard.writeText(fullMessage).catch(() => {});
      window.location.href = `mailto:muhsinadam38@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setTimeout(() => { setStatus("idle"); setFormData({ name: "", email: "", message: "" }); }, 4000);
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.9rem", background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream)",
    fontFamily: "var(--font-body)", fontSize: "0.9rem", transition: "0.3s", outline: "none",
  };

  return (
    <section id="contact" className="py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-12" style={{ background: "var(--black-light)" }}>
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-20">
        {/* Left */}
        <div className="flex-1 reveal">
          <span style={{ fontSize: "0.65rem", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red)", marginBottom: "1rem", display: "block" }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Let&apos;s build the <em style={{ fontStyle: "italic", color: "var(--red)" }}>future</em>
          </h2>
          <p style={{ color: "var(--cream-dim)", fontWeight: 300, lineHeight: 1.8, marginTop: "0.8rem", fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
            Have a project in mind? Let&apos;s turn your ideas into a cinematic masterpiece. Reach out and let&apos;s start the journey.
          </p>

          <div style={{ marginTop: "1.5rem" }}>
            <div className="flex items-center" style={{ gap: "0.8rem", marginBottom: "1.2rem" }}>
              <span style={{ color: "var(--red)", fontSize: "1rem" }}>&#10022;</span>
              <span style={{ color: "var(--cream-dim)", fontSize: "0.85rem" }}>muhsinadam38@gmail.com</span>
            </div>
            <div className="flex items-center" style={{ gap: "0.8rem", marginBottom: "1.2rem" }}>
              <span style={{ color: "var(--red)", fontSize: "1rem" }}>&#9678;</span>
              <span style={{ color: "var(--cream-dim)", fontSize: "0.85rem" }}>Digital Nomad | Worldwide</span>
            </div>
          </div>

          <div className="flex flex-wrap" style={{ gap: "1rem", marginTop: "1.5rem" }}>
            {socials.filter((s) => s.url).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
                style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-muted)", transition: "0.3s", paddingBottom: "2px", borderBottom: "1px solid transparent" }}
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex-1 w-full reveal reveal-d2">
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#10003;</div>
              <p style={{ fontFamily: "var(--font-headline)", fontSize: "1.5rem", letterSpacing: "3px" }}>MESSAGE SENT</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-muted)", marginBottom: "0.4rem" }}>Your Name</label>
                <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-muted)", marginBottom: "0.4rem" }}>Your Email</label>
                <input type="email" required placeholder="hello@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-muted)", marginBottom: "0.4rem" }}>Project Description</label>
                <textarea required placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" as const, minHeight: "100px" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
              <button type="submit" disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
                className="disabled:opacity-40 disabled:cursor-not-allowed w-full"
                style={{ padding: "1rem", background: "var(--red)", color: "var(--black)", border: "none", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", transition: "0.3s" }}>
                {status === "sending" ? "SENDING..." : "Send Message ↗"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
