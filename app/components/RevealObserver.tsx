"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      document
        .querySelectorAll(
          ".reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)"
        )
        .forEach((el) => observer.observe(el));
    };

    // Initial observe after a frame to ensure components have rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        observeAll();
      });
    });

    // Watch for dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
