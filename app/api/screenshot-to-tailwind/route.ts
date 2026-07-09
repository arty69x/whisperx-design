import { generateText } from "ai"

export const maxDuration = 60

const SYSTEM_PROMPT = `You are an expert frontend engineer that converts UI screenshots into clean, production-ready HTML styled exclusively with Tailwind CSS utility classes.

Rules:
- Output a SINGLE self-contained block of semantic HTML. No <html>, <head>, or <body> tags.
- Use only Tailwind CSS utility classes for styling. Never use inline style attributes or <style> tags.
- Match layout, spacing, typography, color, and hierarchy as closely as possible to the screenshot.
- Use semantic elements (header, nav, main, section, footer, button, ul/li) and sensible responsive classes (sm:, md:, lg:).
- Add accessible attributes: alt text for images, aria-labels for icon-only buttons, proper heading order.
- For images use https://placehold.co/{w}x{h} placeholders with descriptive alt text.
- For icons, use inline SVGs with Tailwind sizing classes (e.g. h-5 w-5). Do not reference icon libraries.
- Do NOT include explanations, comments, or markdown code fences. Return raw HTML only.`

function stripFences(text: string) {
  return text
    .replace(/^\s*```(?:html)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim()
}

export async function POST(req: Request) {
  try {
    const { image, notes } = (await req.json()) as {
      image?: string
      notes?: string
    }

    if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
      return Response.json(
        { error: "A valid image data URL is required." },
        { status: 400 },
      )
    }

    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4.5",
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Convert this screenshot into responsive Tailwind CSS HTML." +
                (notes ? `\n\nAdditional requirements: ${notes}` : ""),
            },
            { type: "image", image },
          ],
        },
      ],
    })

    return Response.json({ html: stripFences(text) })
  } catch (err) {
    console.error("[v0] screenshot-to-tailwind error:", err)
    return Response.json(
      { error: "Failed to generate markup. Please try again." },
      { status: 500 },
    )
  }
}
