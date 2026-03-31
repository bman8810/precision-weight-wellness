#!/usr/bin/env node

/**
 * One-time image generation script using xAI Grok API.
 * Usage: node scripts/generate-images.mjs
 */

const API_KEY = process.env.XAI_API_KEY || "";
const API_URL = "https://api.x.ai/v1/images/generations";

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUTPUT_DIR = join(import.meta.dirname, "..", "public", "images");

const images = [
  {
    filename: "blog/glp1-medications.png",
    prompt:
      "A clean, editorial-style still life photograph of modern GLP-1 medication injection pens arranged on a marble surface with soft warm lighting. Cream and gold color palette, shallow depth of field, premium medical aesthetic. No text, no logos, no faces. Minimal and elegant.",
  },
  {
    filename: "blog/eligibility-consultation.png",
    prompt:
      "A warm, inviting photograph of a modern medical consultation desk with a stethoscope, clipboard, and a small plant. Soft natural light streaming through a window. Cream walls, warm wood tones, gold accents. Upper East Side NYC medical office aesthetic. No people, no text. Premium wellness photography.",
  },
  {
    filename: "blog/sustainable-weight-loss.png",
    prompt:
      "An artistic, editorial photograph of a tape measure gently curled on a clean white marble surface alongside fresh vegetables and a glass of water. Warm, soft lighting with cream and gold tones. Minimal composition, shallow depth of field. Premium health and wellness aesthetic. No text, no faces.",
  },
  {
    filename: "hero-wellness.png",
    prompt:
      "A premium, editorial photograph of a serene modern medical wellness office interior. Cream-colored walls, gold accent fixtures, comfortable seating area, large windows with soft natural light. Upper East Side Manhattan aesthetic. Warm, inviting, luxurious but understated. No people, no text. Wide aspect ratio.",
  },
  {
    filename: "about-office.png",
    prompt:
      "A beautiful photograph of an elegant dermatology and wellness clinic waiting room on the Upper East Side of Manhattan. Warm cream tones, gold accents, modern minimalist furniture, fresh flowers, soft ambient lighting. Premium medical practice aesthetic. No people, no text.",
  },
];

async function generateImage(prompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "grok-imagine-image",
      prompt,
      n: 1,
      response_format: "b64_json",
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  return data.data[0].b64_json;
}

async function main() {
  await mkdir(join(OUTPUT_DIR, "blog"), { recursive: true });

  for (const img of images) {
    const outPath = join(OUTPUT_DIR, img.filename);
    console.log(`Generating: ${img.filename}...`);

    try {
      const b64 = await generateImage(img.prompt);
      const buffer = Buffer.from(b64, "base64");
      await writeFile(outPath, buffer);
      console.log(`  ✓ Saved ${outPath} (${(buffer.length / 1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  console.log("\nDone.");
}

main();
