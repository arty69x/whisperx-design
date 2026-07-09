"use client"

import { motion } from "motion/react"
import { WpxButton } from "@/components/ui/wpx-button"
import { WpxBadge } from "@/components/ui/wpx-badge"
import { WpxInput } from "@/components/ui/wpx-input"
import {
  WpxCard,
  WpxCardHeader,
  WpxCardTitle,
  WpxCardDescription,
  WpxCardBody,
  WpxCardFooter,
} from "@/components/ui/wpx-card"
import { slideUp, staggerContainer } from "@/lib/motion"

const colorTokens = [
  { name: "background", className: "bg-background ring-1 ring-border" },
  { name: "card", className: "bg-card ring-1 ring-border" },
  { name: "primary", className: "bg-primary" },
  { name: "brand-orange", className: "bg-brand-orange" },
  { name: "brand-blue", className: "bg-brand-blue" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "destructive", className: "bg-destructive" },
]

const radiusTokens = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "full", className: "rounded-full" },
]

const shadowTokens = [
  { name: "sm", style: "var(--shadow-token-sm)" },
  { name: "md", style: "var(--shadow-token-md)" },
  { name: "lg", style: "var(--shadow-token-lg)" },
  { name: "glow-pink", style: "var(--shadow-glow-pink)" },
]

const typeScale = [
  { label: "Display", className: "font-display text-5xl font-extrabold tracking-tight" },
  { label: "Heading", className: "font-display text-3xl font-bold tracking-tight" },
  { label: "Title", className: "text-xl font-semibold" },
  { label: "Body", className: "text-base" },
  { label: "Caption", className: "text-sm text-muted-foreground" },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      variants={slideUp}
      className="border-t border-border py-12 first:border-t-0"
    >
      <h2 className="mb-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen">
      <header className="wpx-glass sticky top-0 z-10">
        <div className="wpx-container flex items-center justify-between py-4">
          <span className="font-display text-lg font-extrabold tracking-tight">
            VISCERA<span className="text-primary">/</span>WPX
          </span>
          <WpxBadge tone="pink">Design System v7</WpxBadge>
        </div>
      </header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="wpx-container pb-24"
      >
        <motion.div variants={slideUp} className="py-16">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            WhisperX Design OS
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl">
            Tokens &amp; components ready to build your system.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            A foundation of design tokens, motion, and primitives mapped straight from the
            WhisperX spec — extend it into any screen.
          </p>
        </motion.div>

        <Section title="Color">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colorTokens.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className={`h-20 w-full rounded-xl ${c.className}`} />
                <span className="text-xs text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="flex flex-col gap-4">
            {typeScale.map((t) => (
              <div key={t.label} className="flex flex-wrap items-baseline gap-4">
                <span className="w-24 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
                  {t.label}
                </span>
                <span className={t.className}>The quick brown fox</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Radius">
          <div className="flex flex-wrap gap-6">
            {radiusTokens.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 bg-secondary ring-1 ring-border ${r.className}`} />
                <span className="text-xs text-muted-foreground">{r.name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Elevation">
          <div className="flex flex-wrap gap-8">
            {shadowTokens.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-xl bg-card"
                  style={{ boxShadow: s.style }}
                />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <WpxButton variant="primary">Primary</WpxButton>
            <WpxButton variant="secondary">Secondary</WpxButton>
            <WpxButton variant="outline">Outline</WpxButton>
            <WpxButton variant="ghost">Ghost</WpxButton>
            <WpxButton variant="primary" size="sm">
              Small
            </WpxButton>
            <WpxButton variant="primary" size="lg">
              Large
            </WpxButton>
          </div>
        </Section>

        <Section title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <WpxBadge tone="pink">Pink</WpxBadge>
            <WpxBadge tone="orange">Orange</WpxBadge>
            <WpxBadge tone="blue">Blue</WpxBadge>
            <WpxBadge tone="success">Success</WpxBadge>
            <WpxBadge tone="warning">Warning</WpxBadge>
            <WpxBadge tone="neutral">Neutral</WpxBadge>
          </div>
        </Section>

        <Section title="Inputs">
          <div className="grid max-w-xl gap-5 sm:grid-cols-2">
            <WpxInput label="Email address" type="email" placeholder="you@studio.com" helper="We never share this." />
            <WpxInput label="Password" type="password" placeholder="••••••••" error="Password is too short." />
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { tone: "pink" as const, title: "Analytics", desc: "Track engagement across every artifact you ship." },
              { tone: "orange" as const, title: "Automation", desc: "Compose flows with the motion token system." },
              { tone: "blue" as const, title: "Insights", desc: "Surface signal from the noise in real time." },
            ].map((item) => (
              <WpxCard key={item.title}>
                <WpxCardHeader>
                  <WpxBadge tone={item.tone} className="w-fit">
                    Module
                  </WpxBadge>
                  <WpxCardTitle>{item.title}</WpxCardTitle>
                  <WpxCardDescription>{item.desc}</WpxCardDescription>
                </WpxCardHeader>
                <WpxCardBody>
                  <div className="h-24 rounded-lg bg-secondary ring-1 ring-border" />
                </WpxCardBody>
                <WpxCardFooter>
                  <WpxButton size="sm">Open</WpxButton>
                  <WpxButton size="sm" variant="ghost">
                    Details
                  </WpxButton>
                </WpxCardFooter>
              </WpxCard>
            ))}
          </div>
        </Section>
      </motion.div>
    </main>
  )
}
