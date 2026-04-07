"use client";

import { useState, useEffect } from "react";

interface Social {
  id: string;
  platform: string;
  url: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => setSocials(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8 lg:px-12 py-6"
      style={{ borderTop: "1px solid rgba(230,57,70,0.1)", fontSize: "0.75rem", color: "var(--cream-muted)" }}>
      <span>Young_graphic123 &copy; {currentYear}. All rights reserved.</span>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {socials.filter((s) => s.url).map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red transition-colors duration-300"
            style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase" }}
          >
            {social.platform}
          </a>
        ))}
      </div>
    </footer>
  );
}
