"use client";

import Image from "next/image";
import { useState } from "react";
import {
  bottoms,
  scoreBrowserPreview,
  tops,
  type Garment,
} from "@/app/data";

const pickCardClass = (isActive: boolean) =>
  [
    "group rounded-[28px] border p-3 text-left transition duration-200",
    isActive
      ? "border-[var(--amethyst)] bg-[var(--amethyst)] text-[#f8f6fc] shadow-[0_18px_50px_rgba(73,72,80,0.18)]"
      : "border-[rgba(73,72,80,0.16)] bg-[rgba(248,246,252,0.82)] text-[var(--shadow-grey)] hover:border-[var(--lilac-ash)] hover:bg-[rgba(248,246,252,0.95)]",
  ].join(" ");

const scoreBarClass = (score: number) => {
  if (score >= 80) {
    return "from-[var(--shadow-grey)] via-[var(--charcoal)] to-[var(--amethyst)]";
  }

  if (score >= 68) {
    return "from-[var(--charcoal)] via-[var(--lilac-ash)] to-[var(--amethyst)]";
  }

  return "from-[var(--shadow-grey)] via-[var(--lilac-ash)] to-[var(--lavender)]";
};

const lookup = (items: Garment[], id: string) =>
  items.find((item) => item.id === id) ?? items[0];

export default function OutfitPlayground() {
  const [topId, setTopId] = useState(tops[1].id);
  const [bottomId, setBottomId] = useState(bottoms[1].id);

  const top = lookup(tops, topId);
  const bottom = lookup(bottoms, bottomId);
  const preview = scoreBrowserPreview(top, bottom);

  return (
    <section
      id="playground"
      className="theme-card grid gap-8 rounded-[36px] border p-6 backdrop-blur lg:grid-cols-[1.05fr_0.95fr] lg:p-8"
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--charcoal)]">
            Playground
          </p>
          <h2 className="max-w-2xl font-serif text-4xl leading-none text-[var(--shadow-grey)] md:text-5xl">
            Try it yourself and see where the outfit starts to mismatch.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--charcoal)] md:text-base">
            This is the full interactive demo. Mix garment crops, inspect the score,
            and read which palette, silhouette, or styling signals push the outfit
            toward a stronger or weaker result.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-[24px] border border-[rgba(73,72,80,0.12)] bg-[rgba(248,246,252,0.75)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lilac-ash)]">
              1. Pick pieces
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--charcoal)]">
              Choose a top and bottom from the extracted garment set.
            </p>
          </div>
          <div className="rounded-[24px] border border-[rgba(73,72,80,0.12)] bg-[rgba(248,246,252,0.75)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lilac-ash)]">
              2. View score
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--charcoal)]">
              The browser model preview updates instantly with a compatibility score.
            </p>
          </div>
          <div className="rounded-[24px] border border-[rgba(73,72,80,0.12)] bg-[rgba(248,246,252,0.75)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lilac-ash)]">
              3. Read mismatches
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--charcoal)]">
              The explanation calls out where the pieces align or compete.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--charcoal)]">
              Choose a top
            </h3>
            <span className="text-xs text-[var(--lilac-ash)]">{top.note}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tops.map((item) => (
              <button
                key={item.id}
                type="button"
                className={pickCardClass(item.id === top.id)}
                onClick={() => setTopId(item.id)}
              >
                <div className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(216,216,246,0.65)_0%,rgba(177,143,207,0.24)_100%)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={420}
                    height={420}
                    className="h-full w-full object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 220px"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-sm opacity-80">{item.note}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--charcoal)]">
              Choose a bottom
            </h3>
            <span className="text-xs text-[var(--lilac-ash)]">{bottom.note}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {bottoms.map((item) => (
              <button
                key={item.id}
                type="button"
                className={pickCardClass(item.id === bottom.id)}
                onClick={() => setBottomId(item.id)}
              >
                <div className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(216,216,246,0.65)_0%,rgba(177,143,207,0.24)_100%)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={420}
                    height={420}
                    className="h-full w-full object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 220px"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-sm opacity-80">{item.note}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="theme-dark-card rounded-[32px] p-5 lg:sticky lg:top-8 lg:self-start">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--lavender)]">
              Demo result
            </p>
            <h3 className="mt-2 text-3xl font-semibold">{preview.label}</h3>
          </div>
          <div className="rounded-full border border-white/15 bg-white/8 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--lavender)]">
              Score
            </p>
            <p className="text-3xl font-semibold">{preview.score}</p>
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${scoreBarClass(preview.score)}`}
            style={{ width: `${preview.score}%` }}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
            <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_100%)]">
              <Image
                src={top.image}
                alt={top.name}
                width={520}
                height={520}
                className="h-full w-full object-contain p-4"
                sizes="(max-width: 1024px) 50vw, 280px"
              />
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--lavender)]">
                Selected top
              </p>
              <p className="mt-1 text-lg font-semibold">{top.name}</p>
              <p className="mt-2 text-sm leading-6 text-[rgba(245,242,252,0.84)]">{top.note}</p>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
            <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_100%)]">
              <Image
                src={bottom.image}
                alt={bottom.name}
                width={520}
                height={520}
                className="h-full w-full object-contain p-4"
                sizes="(max-width: 1024px) 50vw, 280px"
              />
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--lavender)]">
                Selected bottom
              </p>
              <p className="mt-1 text-lg font-semibold">{bottom.name}</p>
              <p className="mt-2 text-sm leading-6 text-[rgba(245,242,252,0.84)]">{bottom.note}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
          <p className="text-sm leading-7 text-[rgba(245,242,252,0.92)]">{preview.summary}</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[rgba(245,242,252,0.84)]">
            {preview.reasons.map((reason) => (
              <li
                key={reason}
                className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3"
              >
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
