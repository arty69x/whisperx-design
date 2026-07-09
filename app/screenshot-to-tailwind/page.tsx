import type { Metadata } from "next"
import { ScreenshotToTailwind } from "@/components/screenshot-to-tailwind"

export const metadata: Metadata = {
  title: "Screenshot to Tailwind — VISCERA",
  description:
    "Convert any UI screenshot into clean, responsive, production-ready Tailwind CSS HTML.",
}

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <ScreenshotToTailwind />
    </main>
  )
}
