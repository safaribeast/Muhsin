"use client";

import { useState, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "copied">("idle");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus("sending");

    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );

      const fullMessage = `Subject: Portfolio Inquiry from ${formData.name}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      navigator.clipboard.writeText(fullMessage).catch(() => {});

      window.location.href = `mailto:muhsinadam38@gmail.com?subject=${subject}&body=${body}`;

      setStatus("success");

      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 4000);
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("muhsinadam38@gmail.com");
    setStatus("copied");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {/* Left - Info */}
          <div className="text-center lg:text-left">
            <span className="text-label mb-2 md:mb-3 block">Contact</span>
            <h2 className="heading-lg mb-4 md:mb-6">
              Let&apos;s work together.
            </h2>
            <p className="text-body text-sm md:text-base mb-8 md:mb-12 max-w-md mx-auto lg:mx-0">
              Have a project in mind? I&apos;d love to hear about it.
              Send me a message and I&apos;ll get back to you soon.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <span className="text-label mb-1 md:mb-2 block">Email</span>
                <button
                  onClick={copyEmail}
                  className="text-sm md:text-base text-[var(--text)] hover:text-[var(--accent)] transition-colors link-subtle"
                >
                  {status === "copied" ? (
                    <span className="text-[var(--accent)]">Copied!</span>
                  ) : (
                    "muhsinadam38@gmail.com"
                  )}
                </button>
              </div>
              <div>
                <span className="text-label mb-1 md:mb-2 block">Location</span>
                <span className="text-sm md:text-base text-[var(--text)]">Arusha, Tanzania</span>
              </div>
              <div>
                <span className="text-label mb-1 md:mb-2 block">Social</span>
                <div className="flex justify-center lg:justify-start gap-4">
                  <a
                    href="https://instagram.com/younggraphix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-small text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@younggraphix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-small text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div ref={formRef} className="relative">
            {/* Success Overlay */}
            <div
              className={`absolute inset-0 bg-[var(--bg)] flex items-center justify-center z-10 transition-all duration-500 ${
                status === "success"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="text-center animate-fade-up px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-[var(--accent)] flex items-center justify-center animate-scale-in">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] text-[var(--text)] mb-2 md:mb-3">
                  Message Ready
                </h3>
                <p className="text-xs md:text-small text-[var(--text-muted)] max-w-xs mx-auto">
                  Your email app should open now. If not, the message has been copied to your clipboard.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className={`space-y-4 md:space-y-6 transition-all duration-300 ${status === "success" ? "opacity-0" : "opacity-100"}`}>
              <div>
                <label className="text-label mb-1 md:mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-transparent border border-[var(--border)] text-[var(--text)] focus:border-[var(--text)] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-label mb-1 md:mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-transparent border border-[var(--border)] text-[var(--text)] focus:border-[var(--text)] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-label mb-1 md:mb-2 block">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-transparent border border-[var(--border)] text-[var(--text)] resize-none focus:border-[var(--text)] focus:outline-none transition-colors"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
                className="btn btn-primary w-full text-sm md:text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className={`inline-flex items-center gap-2 transition-transform duration-300 ${status === "sending" ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`}>
                  Send Message
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${status === "sending" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </span>
              </button>

              <p className="text-[10px] md:text-[11px] text-[var(--text-muted)] text-center">
                Clicking send will open your default email app with the message pre-filled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
