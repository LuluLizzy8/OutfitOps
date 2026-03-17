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
      ? "border-[#204436] bg-[#204436] text-[#f6f1e8] shadow-[0_18px_50px_rgba(32,68,54,0.22)]"
      : "border-[#d6cfbf] bg-white/75 text-[#1d2b21] hover:border-[#96a58f] hover:bg-white",
  ].join(" ");

const scoreBarClass = (score: number) => {
  if (score >= 80) {
    return "from-[#1d6b53] via-[#6ca96f] to-[#f2c66d]";
  }

  if (score >= 68) {
    return "from-[#7a5537] via-[#d08c55] to-[#f1d089]";
  }

  return "from-[#8a473a] via-[#c46a52] to-[#e7b286]";
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
      className="grid gap-8 rounded-[36px] border border-white/60 bg-[#f7f3eb]/85 p-6 shadow-[0_24px_80px_rgba(54,60,48,0.12)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr] lg:p-8"
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6c5a43]">
            Browser Playground
          </p>
          <h2 className="max-w-2xl font-serif text-4xl leading-none text-[#1a241c] md:text-5xl">
            Mix a few garment crops and test a Vercel-friendly compatibility preview.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[#4d5a4f] md:text-base">
            This panel is intentionally lightweight. It uses a style heuristic
            inspired by your notebook pipeline so the web app stays easy to deploy
            on Vercel without a separate inference backend.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6c5a43]">
              Choose a top
            </h3>
            <span className="text-xs text-[#728174]">{top.note}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tops.map((item) => (
              <button
                key={item.id}
                type="button"
                className={pickCardClass(item.id === top.id)}
                onClick={() => setTopId(item.id)}
              >
                <div className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#f6f1e8_0%,#e9ece3_100%)]">
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6c5a43]">
              Choose a bottom
            </h3>
            <span className="text-xs text-[#728174]">{bottom.note}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {bottoms.map((item) => (
              <button
                key={item.id}
                type="button"
                className={pickCardClass(item.id === bottom.id)}
                onClick={() => setBottomId(item.id)}
              >
                <div className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#f6f1e8_0%,#e9ece3_100%)]">
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

      <div className="rounded-[32px] bg-[#18352b] p-5 text-[#f8f4ea] shadow-[0_20px_70px_rgba(24,53,43,0.24)] lg:sticky lg:top-8 lg:self-start">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b5cab7]">
              Live preview
            </p>
            <h3 className="mt-2 text-3xl font-semibold">{preview.label}</h3>
          </div>
          <div className="rounded-full border border-white/15 bg-white/8 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.22em] text-[#b5cab7]">
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
              <p className="text-xs uppercase tracking-[0.22em] text-[#b5cab7]">
                Selected top
              </p>
              <p className="mt-1 text-lg font-semibold">{top.name}</p>
              <p className="mt-2 text-sm leading-6 text-[#d7e2d6]">{top.note}</p>
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
              <p className="text-xs uppercase tracking-[0.22em] text-[#b5cab7]">
                Selected bottom
              </p>
              <p className="mt-1 text-lg font-semibold">{bottom.name}</p>
              <p className="mt-2 text-sm leading-6 text-[#d7e2d6]">{bottom.note}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
          <p className="text-sm leading-7 text-[#edf3ea]">{preview.summary}</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#d7e2d6]">
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
