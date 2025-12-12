"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 md:py-12 border-t border-[var(--border)]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Logo */}
          <a href="#" className="text-base md:text-lg font-[family-name:var(--font-playfair)] text-[var(--text)]">
            Young<span className="text-[var(--accent)]">.</span>graphix
          </a>

          {/* Nav Links */}
          <nav className="flex items-center gap-4 md:gap-6">
            {[{ label: "Works", href: "#works" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs md:text-small text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs md:text-small text-[var(--text-muted)]">
            &copy; {currentYear} Muhsin Adam Mnaro
          </p>
        </div>
      </div>
    </footer>
  );
}
