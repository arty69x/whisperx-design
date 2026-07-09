const projects = [
  {
    id: "001",
    label: "Fashion commerce",
    title: "Noir Signal",
    year: "2026",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    copy: "A cinematic storefront system for luxury drops, editorial storytelling, and frictionless conversion.",
  },
  {
    id: "002",
    label: "Built environment",
    title: "Concrete Index",
    year: "2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    copy: "A brutalist portfolio and bid engine for architects shipping landmark structural work.",
  },
  {
    id: "003",
    label: "AI workflow",
    title: "Whisper Lab",
    year: "2026",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    copy: "An operator dashboard that turns messy capture, transcripts, and briefs into polished brand assets.",
  },
]

const stats = [
  ["48h", "prototype sprints"],
  ["16", "design-system primitives"],
  ["4.9×", "launch velocity"],
]

const capabilities = ["Product strategy", "Interface systems", "Motion direction", "AI-assisted content", "Conversion polish", "Launch QA"]

const launchLinks = [
  {
    title: "Open App Dashboard",
    href: "/app",
    eyebrow: "Workspace",
    copy: "Jump into the polished WhisperX dashboard template with stats, activity, and quick actions.",
  },
  {
    title: "Open Design System",
    href: "/design-system",
    eyebrow: "Tokens + components",
    copy: "Review the VISCERA/WPX color, radius, shadow, type, button, card, and input foundations.",
  },
  {
    title: "Open Screenshot Tool",
    href: "/screenshot-to-tailwind",
    eyebrow: "AI utility",
    copy: "Convert a UI screenshot into clean responsive Tailwind markup from the landing page.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(219,39,119,.26),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,.18),transparent_26%),linear-gradient(180deg,#0b0b10_0%,#11111a_52%,#07070a_100%)]" />

      <nav className="wpx-container sticky top-4 z-50 flex items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-3 backdrop-blur-xl">
        <a className="font-display text-sm font-black uppercase tracking-[0.24em]" href="#top">
          VISCERA ©26
        </a>
        <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.22em] text-white/65 md:flex">
          <a className="transition hover:text-white" href="#work">Work</a>
          <a className="transition hover:text-white" href="#system">System</a>
          <a className="transition hover:text-white" href="#launch">Open</a>
          <a className="transition hover:text-white" href="#contact">Contact</a>
        </div>
        <a className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-primary hover:text-white" href="/app">
          Open app
        </a>
      </nav>

      <section id="top" className="wpx-container relative grid min-h-[86vh] items-end gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            WhisperX design-system refresh
          </div>
          <h1 className="huge-type max-w-5xl text-[clamp(4.8rem,16vw,15rem)]">
            Vision <span className="outline-text block">Systems</span>
          </h1>
          <p className="max-w-2xl text-xl text-white/68 md:text-2xl">
            A polished product template for studios that need editorial drama, enterprise-grade component structure, and launch-ready responsive detail.
          </p>
          <div className="grid max-w-2xl grid-cols-3 gap-3">
            {stats.map(([value, label]) => (
              <div key={label} className="wpx-glass rounded-2xl p-4">
                <div className="font-display text-2xl font-black">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1400" alt="Editorial portrait used as VISCERA hero artwork" />
          <div className="hero-panel__caption">Live template / responsive / conversion-ready</div>
        </div>
      </section>

      <div className="border-y border-white/10 py-5">
        <div className="wpx-marquee-inner whitespace-nowrap font-display text-5xl font-black uppercase tracking-[-.05em] text-white/10 md:text-8xl">
          New era — product polish — design systems — launch templates — New era — product polish — design systems — launch templates —
        </div>
      </div>

      <section id="launch" className="wpx-container py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="section-kicker">Open from homepage</div>
            <h2 className="mt-5 max-w-4xl font-display text-5xl font-black uppercase tracking-[-.06em] md:text-7xl">
              Connected entry points for every template.
            </h2>
          </div>
          <a className="rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white/70 transition hover:border-primary hover:text-white" href="/app">
            Launch dashboard
          </a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {launchLinks.map((item) => (
            <a key={item.href} className="launch-card group" href={item.href}>
              <span className="text-xs font-black uppercase tracking-[0.24em] text-primary">{item.eyebrow}</span>
              <strong className="mt-5 block font-display text-3xl font-black uppercase tracking-[-.05em] text-white transition group-hover:text-primary">
                {item.title}
              </strong>
              <span className="mt-4 block text-sm leading-6 text-white/60">{item.copy}</span>
              <span className="mt-8 inline-flex text-xs font-black uppercase tracking-[0.2em] text-white/80">Open now →</span>
            </a>
          ))}
        </div>
      </section>

      <section id="work" className="wpx-container py-24">
        <div className="section-kicker">Selected archive</div>
        <div className="mt-8 grid gap-5">
          {projects.map((project) => (
            <article key={project.id} className="project-card group">
              <div className="project-card__media">
                <img src={project.image} alt={`${project.title} project artwork`} />
              </div>
              <div className="project-card__body">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.22em] text-primary">
                  <span>{project.id} / {project.label}</span>
                  <span>{project.year}</span>
                </div>
                <h2 className="font-display text-5xl font-black uppercase tracking-[-.06em] md:text-8xl">{project.title}</h2>
                <p className="max-w-xl text-lg text-white/62">{project.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="wpx-container grid gap-8 py-24 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="section-kicker">System upgrade</div>
          <h2 className="mt-6 font-display text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">Template with muscle.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <div key={capability} className="wpx-glass rounded-3xl p-6 text-lg font-bold text-white/80">
              {capability}
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="wpx-container py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-black md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-black/50">Next launch window</p>
          <a className="mt-4 block font-display text-5xl font-black uppercase tracking-[-.06em] md:text-8xl" href="mailto:hello@viscera.studio">
            Let&apos;s build the signal.
          </a>
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-black/10 pt-6 text-xs font-black uppercase tracking-[0.2em] text-black/55">
            <span>© 2026 VISCERA Studio</span>
            <span>Berlin // Tokyo // Remote</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
