"use client"

import { WpxCard, WpxCardHeader, WpxCardTitle, WpxCardBody } from "@/components/ui/wpx-card"
import { WpxButton } from "@/components/ui/wpx-button"
import { WpxBadge } from "@/components/ui/wpx-badge"
import { WpxInput } from "@/components/ui/wpx-input"

const stats = [
  { label: "Total Revenue", value: "$48,290", delta: "+12.4%", tone: "success" as const },
  { label: "Active Users", value: "3,842", delta: "+4.1%", tone: "blue" as const },
  { label: "Churn Rate", value: "1.9%", delta: "-0.6%", tone: "success" as const },
  { label: "Open Tickets", value: "27", delta: "+3", tone: "warning" as const },
]

const activity = [
  { name: "Nova Chen", action: "upgraded to Pro", time: "2m ago" },
  { name: "Ravi Patel", action: "created a project", time: "18m ago" },
  { name: "Mila Roux", action: "invited 3 members", time: "1h ago" },
  { name: "Deniz Aksoy", action: "closed ticket #4821", time: "3h ago" },
]

export default function DashboardPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              V
            </div>
            <span className="font-sans text-lg font-bold tracking-tight">VISCERA</span>
            <WpxBadge tone="blue">WhisperX</WpxBadge>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden w-64 sm:block">
              <WpxInput placeholder="Search…" aria-label="Search" />
            </div>
            <WpxButton variant="primary" size="sm">
              New project
            </WpxButton>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-sans text-3xl font-bold tracking-tight text-balance">Overview</h1>
            <p className="mt-1 text-muted-foreground leading-relaxed">Your workspace at a glance.</p>
          </div>
          <div className="flex gap-2">
            <WpxButton variant="ghost" size="sm">
              Export
            </WpxButton>
            <WpxButton variant="secondary" size="sm">
              Filters
            </WpxButton>
          </div>
        </div>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <WpxCard key={s.label}>
              <WpxCardBody>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <span className="font-sans text-2xl font-bold tracking-tight">{s.value}</span>
                  <WpxBadge tone={s.tone}>{s.delta}</WpxBadge>
                </div>
              </WpxCardBody>
            </WpxCard>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WpxCard className="lg:col-span-2">
            <WpxCardHeader>
              <WpxCardTitle>Recent activity</WpxCardTitle>
              <WpxButton variant="ghost" size="sm">
                View all
              </WpxButton>
            </WpxCardHeader>
            <WpxCardBody>
              <ul className="flex flex-col gap-4">
                {activity.map((a) => (
                  <li key={a.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-sm text-muted-foreground">{a.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </li>
                ))}
              </ul>
            </WpxCardBody>
          </WpxCard>

          <WpxCard>
            <WpxCardHeader>
              <WpxCardTitle>Quick actions</WpxCardTitle>
            </WpxCardHeader>
            <WpxCardBody>
              <div className="flex flex-col gap-3">
                <WpxButton variant="primary" className="w-full justify-center">
                  Invite teammate
                </WpxButton>
                <WpxButton variant="secondary" className="w-full justify-center">
                  Create report
                </WpxButton>
                <WpxButton variant="ghost" className="w-full justify-center">
                  Billing settings
                </WpxButton>
              </div>
            </WpxCardBody>
          </WpxCard>
        </div>
      </div>
    </main>
  )
}
