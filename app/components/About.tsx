"use client";

export default function About() {
  const services = [
    {
      title: "Brand Identity",
      description: "Logos, color systems, typography, and brand guidelines.",
    },
    {
      title: "Print Design",
      description: "Posters, brochures, packaging, and marketing materials.",
    },
    {
      title: "Digital Design",
      description: "Social media graphics, event flyers, and promotional artwork.",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="container">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {/* Image */}
          <div className="lg:order-2">
            <div className="aspect-[4/5] max-w-sm mx-auto lg:max-w-none bg-[var(--border)]">
              <img
                src="/images/hero-profile.jpeg"
                alt="Muhsin Adam Mnaro"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:order-1 text-center lg:text-left">
            <span className="text-label mb-2 md:mb-3 block">About</span>
            <h2 className="heading-lg mb-6 md:mb-8">
              Creating visual stories that connect and inspire.
            </h2>

            <div className="space-y-4 md:space-y-5 text-body text-sm md:text-base mb-8 md:mb-10 max-w-md mx-auto lg:mx-0">
              <p>
                I&apos;m Muhsin Adam Mnaro, a graphic designer based in Arusha,
                Tanzania. Known as Young-graphix, I specialize in creating visual
                identities that help brands tell their story.
              </p>
              <p>
                My approach is simple: understand the story, then design with
                intention. Every project is an opportunity to create something
                meaningful that resonates with its audience.
              </p>
              <p>
                Drawing from East African culture and contemporary design trends,
                I craft work that feels both timeless and relevant.
              </p>
            </div>

            <a href="#contact" className="btn btn-primary text-sm md:text-base">
              Work With Me
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-12 text-center md:text-left">
            <div>
              <span className="text-label mb-2 md:mb-3 block">Services</span>
              <h3 className="heading-md">What I do</h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group pb-6 md:pb-8 border-b border-[var(--border)] text-center sm:text-left"
              >
                <span className="text-xs md:text-small text-[var(--text-muted)] mb-3 md:mb-4 block">
                  0{index + 1}
                </span>
                <h4 className="text-base md:text-lg font-[family-name:var(--font-playfair)] text-[var(--text)] mb-2 md:mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h4>
                <p className="text-xs md:text-small text-[var(--text-secondary)]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
