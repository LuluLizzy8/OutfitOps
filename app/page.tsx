import Image from "next/image";
import LiveHeroDemo from "./components/LiveHeroDemo";
import OutfitPlayground from "./components/OutfitPlayground";
import { comparisonResults, pipelineSteps, useCases } from "./data";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 pb-24 pt-10 md:px-10 lg:px-12">
        <LiveHeroDemo />

        <section id="results" className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--charcoal)]">
              Real Examples
            </p>
            <h2 className="font-serif text-4xl leading-none text-[var(--shadow-grey)] md:text-5xl">
              Good vs. weak results make the model easier to trust.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--charcoal)]">
              These are saved notebook outputs, shown side by side so people can
              see what the system rewards and where it becomes cautious.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {comparisonResults.map((result) => (
              <article
                key={result.id}
                className="theme-card overflow-hidden rounded-[32px] border backdrop-blur"
              >
                <div className="border-b border-[rgba(73,72,80,0.12)] p-3">
                  <Image
                    src={result.image}
                    alt={result.label}
                    width={1200}
                    height={400}
                    className="h-auto w-full rounded-[24px]"
                    sizes="(max-width: 1280px) 100vw, 600px"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                        result.label === "Good outfit"
                          ? "bg-[rgba(177,143,207,0.2)] text-[var(--shadow-grey)]"
                          : "bg-[rgba(73,72,80,0.12)] text-[var(--shadow-grey)]"
                      }`}
                    >
                      {result.label}
                    </span>
                    <span className="rounded-full bg-[rgba(151,136,151,0.14)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)]">
                      {result.score.toFixed(3)}
                    </span>
                  </div>
                  <div className="rounded-[24px] bg-[rgba(216,216,246,0.6)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lilac-ash)]">
                      Reason
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--shadow-grey)]">
                      {result.reason}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-[var(--charcoal)]">{result.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--charcoal)]">
              How It Works
            </p>
            <h2 className="font-serif text-4xl leading-none text-[var(--shadow-grey)] md:text-5xl">
              A simple three-step pipeline.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--charcoal)]">
              Keep the explanation short: detect garments, extract features, then
              score compatibility.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {pipelineSteps.map((step) => (
              <div
                key={step.title}
                className="theme-card rounded-[28px] border p-6"
              >
                <h3 className="text-xl font-semibold text-[var(--shadow-grey)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--charcoal)]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <OutfitPlayground />

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--charcoal)]">
              Why It Matters
            </p>
            <h2 className="font-serif text-4xl leading-none text-[var(--shadow-grey)] md:text-5xl">
              This is useful beyond the demo itself.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--charcoal)]">
              The same compatibility signal can support product recommendations,
              styling decisions, and marketplace discovery.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="theme-card rounded-[28px] border p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lilac-ash)]">
                  Use case
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--shadow-grey)]">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--charcoal)]">{useCase.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
