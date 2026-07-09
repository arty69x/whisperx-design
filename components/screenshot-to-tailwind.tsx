"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Check,
  Code2,
  Copy,
  Eye,
  ImageIcon,
  Loader2,
  RotateCcw,
  Sparkles,
  Upload,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { staggerContainer, slideUp } from "@/lib/motion"
import { WpxButton } from "@/components/ui/wpx-button"
import {
  WpxCard,
  WpxCardBody,
  WpxCardHeader,
  WpxCardTitle,
  WpxCardDescription,
} from "@/components/ui/wpx-card"
import { WpxBadge } from "@/components/ui/wpx-badge"
import { WpxInput } from "@/components/ui/wpx-input"

type Status = "idle" | "loading" | "done" | "error"
type ResultTab = "preview" | "code"

const MAX_BYTES = 8 * 1024 * 1024 // 8MB

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error("Could not read file"))
    reader.readAsDataURL(file)
  })
}

function buildPreviewDoc(html: string) {
  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><script src="https://cdn.tailwindcss.com"></script><style>body{margin:0}</style></head><body>${html}</body></html>`
}

export function ScreenshotToTailwind() {
  const [image, setImage] = React.useState<string | null>(null)
  const [fileName, setFileName] = React.useState<string>("")
  const [notes, setNotes] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [error, setError] = React.useState<string>("")
  const [html, setHtml] = React.useState<string>("")
  const [tab, setTab] = React.useState<ResultTab>("preview")
  const [copied, setCopied] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const loadFile = React.useCallback(async (file: File | undefined | null) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG, JPG, or WEBP).")
      setStatus("error")
      return
    }
    if (file.size > MAX_BYTES) {
      setError("Image is too large. Please use a file under 8MB.")
      setStatus("error")
      return
    }
    const dataUrl = await fileToDataUrl(file)
    setImage(dataUrl)
    setFileName(file.name)
    setHtml("")
    setError("")
    setStatus("idle")
  }, [])

  // Paste-from-clipboard support
  React.useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith("image/"),
      )
      if (item) void loadFile(item.getAsFile())
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [loadFile])

  async function handleGenerate() {
    if (!image) return
    setStatus("loading")
    setError("")
    try {
      const res = await fetch("/api/screenshot-to-tailwind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, notes: notes.trim() || undefined }),
      })
      const data = (await res.json()) as { html?: string; error?: string }
      if (!res.ok || !data.html) {
        throw new Error(data.error || "Generation failed.")
      }
      setHtml(data.html)
      setTab("preview")
      setStatus("done")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setStatus("error")
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function reset() {
    setImage(null)
    setFileName("")
    setNotes("")
    setHtml("")
    setError("")
    setStatus("idle")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Header */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-10 flex flex-col gap-4"
      >
        <motion.div variants={slideUp}>
          <WpxBadge tone="pink">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI Powered
          </WpxBadge>
        </motion.div>
        <motion.h1
          variants={slideUp}
          className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl"
        >
          Screenshot to Tailwind
        </motion.h1>
        <motion.p
          variants={slideUp}
          className="max-w-2xl text-pretty leading-relaxed text-muted-foreground"
        >
          Drop in a screenshot of any interface and get clean, responsive,
          production-ready HTML styled with Tailwind CSS — ready to copy into your
          project.
        </motion.p>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* Left: input */}
        <WpxCard className="h-fit">
          <WpxCardHeader>
            <WpxCardTitle>Upload</WpxCardTitle>
            <WpxCardDescription>
              PNG, JPG, or WEBP up to 8MB. You can also paste from your clipboard.
            </WpxCardDescription>
          </WpxCardHeader>
          <WpxCardBody className="flex flex-col gap-4">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="Upload screenshot"
              onChange={(e) => void loadFile(e.target.files?.[0])}
            />

            <AnimatePresence mode="wait">
              {image ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group relative overflow-hidden rounded-xl ring-1 ring-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Screenshot to convert${fileName ? `: ${fileName}` : ""}`}
                    className="max-h-72 w-full object-contain bg-secondary"
                  />
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground ring-1 ring-border backdrop-blur transition-colors hover:bg-background"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="dropzone"
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    void loadFile(e.dataTransfer.files?.[0])
                  }}
                  className={cn(
                    "flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 p-6 text-center transition-colors",
                    "hover:border-primary/60 hover:bg-secondary/60",
                    dragging && "border-primary bg-primary/5",
                  )}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                    {dragging ? (
                      <Upload className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <ImageIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {dragging ? "Drop to upload" : "Click, drag, or paste an image"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Screenshots of websites, apps, or components
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            <WpxInput
              label="Extra instructions (optional)"
              placeholder="e.g. make it dark mode, use rounded cards"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              helper="Guide the output with specific requirements."
            />

            {status === "error" && error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <div className="flex items-center gap-3">
              <WpxButton
                onClick={handleGenerate}
                disabled={!image || status === "loading"}
                className="flex-1"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Generate Tailwind
                  </>
                )}
              </WpxButton>
              {(image || html) && status !== "loading" ? (
                <WpxButton variant="outline" size="md" onClick={reset} aria-label="Start over">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </WpxButton>
              ) : null}
            </div>
          </WpxCardBody>
        </WpxCard>

        {/* Right: output */}
        <WpxCard className="flex min-h-[28rem] flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border p-4">
            <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
              <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
                <Eye className="h-4 w-4" aria-hidden="true" />
                Preview
              </TabButton>
              <TabButton active={tab === "code"} onClick={() => setTab("code")}>
                <Code2 className="h-4 w-4" aria-hidden="true" />
                Code
              </TabButton>
            </div>
            {html ? (
              <WpxButton size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copy
                  </>
                )}
              </WpxButton>
            ) : null}
          </div>

          <div className="relative flex-1">
            {!html && status !== "loading" ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
                  <Code2 className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium text-foreground">
                  Your generated markup will appear here
                </p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  Upload a screenshot and hit Generate to see a live preview and the
                  copyable Tailwind code.
                </p>
              </div>
            ) : null}

            {status === "loading" ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-3 p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
                <p className="text-sm font-medium text-foreground">
                  Analyzing your screenshot…
                </p>
                <p className="text-xs text-muted-foreground">
                  This usually takes a few seconds.
                </p>
              </div>
            ) : null}

            {html && status !== "loading" ? (
              tab === "preview" ? (
                <iframe
                  title="Generated Tailwind preview"
                  className="h-full min-h-[24rem] w-full bg-white"
                  sandbox="allow-scripts"
                  srcDoc={buildPreviewDoc(html)}
                />
              ) : (
                <pre className="h-full min-h-[24rem] overflow-auto bg-secondary/50 p-4 text-xs leading-relaxed">
                  <code className="font-mono text-foreground">{html}</code>
                </pre>
              )
            ) : null}
          </div>
        </WpxCard>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-[var(--shadow-token-sm)]"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
