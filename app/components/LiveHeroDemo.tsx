"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  bottoms,
  formatCompatibilityScore,
  sampleOutfits,
  scoreBrowserPreview,
  tops,
  type Garment,
} from "@/app/data";

const lookup = (items: Garment[], id: string) =>
  items.find((item) => item.id === id) ?? items[0];

const sampleButtonClass = (isActive: boolean) =>
  [
    "rounded-full border px-4 py-2 text-sm font-semibold transition",
    isActive
      ? "border-[var(--amethyst)] bg-[var(--amethyst)] text-[#f8f6fc]"
      : "border-[rgba(73,72,80,0.18)] bg-[rgba(248,246,252,0.84)] text-[var(--shadow-grey)] hover:border-[var(--lilac-ash)] hover:bg-[rgba(248,246,252,0.95)]",
  ].join(" ");

export default function LiveHeroDemo() {
  const [selectedOutfitId, setSelectedOutfitId] = useState(sampleOutfits[0].id);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const selectedOutfit =
    sampleOutfits.find((outfit) => outfit.id === selectedOutfitId) ??
    sampleOutfits[0];
  const top = lookup(tops, selectedOutfit.topId);
  const bottom = lookup(bottoms, selectedOutfit.bottomId);
  const preview = scoreBrowserPreview(top, bottom);
  const explanation = preview.reasons
    .slice(0, 2)
    .map((reason) => reason.split(":")[0])
    .join(" + ");

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  return (
    <section className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
      <div className="space-y-8">
        <div className="theme-pill inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
          OutfitOps
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--amethyst)]" />
          Live demo
        </div>

        <div className="space-y-5">
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] text-[var(--shadow-grey)] md:text-7xl">
            Upload or select an outfit and see compatibility live.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--charcoal)] md:text-lg">
            A product demo for outfit scoring: inspect the top and bottom, read
            the compatibility score, and understand why the pairing works or
            breaks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="#results"
            className="theme-button-primary rounded-full px-6 py-4 text-center text-sm font-semibold transition"
          >
            Try real outfits
          </a>
          <a
            href="#playground"
            className="theme-button-secondary rounded-full border px-6 py-4 text-center text-sm font-semibold transition"
          >
            Open full demo
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="theme-card rounded-[28px] border p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lilac-ash)]">
              Live interaction
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--charcoal)]">
              Select curated outfits and see a score update instantly.
            </p>
          </div>
          <div className="theme-card rounded-[28px] border p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lilac-ash)]">
              Real examples
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--charcoal)]">
              Compare saved notebook outputs that scored strong or weak.
            </p>
          </div>
          <div className="theme-card rounded-[28px] border p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lilac-ash)]">
              Product view
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--charcoal)]">
              Frame the project around use cases, not just model architecture.
            </p>
          </div>
        </div>
      </div>

      <div className="theme-dark-card rounded-[36px] p-5">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--lavender)]">
                Live interaction
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Top + Bottom + Score
              </h2>
            </div>
            <label className="cursor-pointer rounded-full border border-white/15 bg-white/8 px-4 py-3 text-sm font-semibold text-[var(--lavender)] transition hover:bg-white/12">
              Upload image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  if (uploadedImage) {
                    URL.revokeObjectURL(uploadedImage);
                  }

                  setUploadedImage(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {sampleOutfits.map((outfit) => (
              <button
                key={outfit.id}
                type="button"
                className={sampleButtonClass(outfit.id === selectedOutfit.id)}
                onClick={() => setSelectedOutfitId(outfit.id)}
              >
                {outfit.name}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-[rgba(245,242,252,0.84)]">
            {selectedOutfit.note}
          </p>

          {uploadedImage ? (
            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--lavender)]">
                  Uploaded image preview
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--amethyst)]"
                  onClick={() => {
                    if (uploadedImage) {
                      URL.revokeObjectURL(uploadedImage);
                    }

                    setUploadedImage(null);
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-[20px] bg-black/10">
                <Image
                  src={uploadedImage}
                  alt="Uploaded outfit preview"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  unoptimized
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[rgba(245,242,252,0.84)]">
                Uploaded images are previewed locally in this deploy. Live
                scoring below uses the selected sample outfit so the interaction
                stays fast without a hosted inference service.
              </p>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_0.92fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_100%)]">
                <Image
                  src={top.image}
                  alt={top.name}
                  width={520}
                  height={520}
                  className="h-full w-full object-contain p-4"
                  sizes="(max-width: 1024px) 50vw, 240px"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--lavender)]">
                Top
              </p>
              <p className="mt-1 text-lg font-semibold">{top.name}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_100%)]">
                <Image
                  src={bottom.image}
                  alt={bottom.name}
                  width={520}
                  height={520}
                  className="h-full w-full object-contain p-4"
                  sizes="(max-width: 1024px) 50vw, 240px"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--lavender)]">
                Bottom
              </p>
              <p className="mt-1 text-lg font-semibold">{bottom.name}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[var(--lavender)] p-5 text-[var(--shadow-grey)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--lilac-ash)]">
                Compatibility
              </p>
              <p className="mt-3 text-4xl font-semibold">
                {formatCompatibilityScore(preview.score)}
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--charcoal)]">
                Explanation: {explanation}
              </p>
              <div className="mt-5 overflow-hidden rounded-full bg-[rgba(73,72,80,0.12)]">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-[var(--shadow-grey)] via-[var(--charcoal)] to-[var(--amethyst)]"
                  style={{ width: `${preview.score}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--charcoal)]">
                {preview.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
