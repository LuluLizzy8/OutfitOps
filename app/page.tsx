import Image from "next/image";
import OutfitPlayground from "./components/OutfitPlayground";
import {
  deploymentNotes,
  notebookExamples,
  pipelineSteps,
  projectMetrics,
} from "./data";

export default function Home() {
  const heroExample = notebookExamples[5];

  return (
    <main className="relative overflow-x-clip">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 pb-24 pt-10 md:px-10 lg:px-12">
        <section className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d9d0bf] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#6c5a43] shadow-[0_8px_30px_rgba(70,62,48,0.08)]">
              OutfitOps
              <span className="h-1.5 w-1.5 rounded-full bg-[#b86e56]" />
              Notebook-to-web demo
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] text-[#17211b] md:text-7xl">
                Turn your outfit compatibility notebook into something people can actually explore.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#4e5c50] md:text-lg">
                This Vercel-ready app wraps the outputs from
                `Outfit_Compatibility_Code.ipynb` into a polished showcase:
                real scored notebook examples, an interactive crop-based preview,
                and a simple explanation of the ML pipeline behind it.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="#notebook-gallery"
                className="rounded-full bg-[#1d4636] px-6 py-4 text-center text-sm font-semibold text-[#f6f1e8] shadow-[0_14px_35px_rgba(29,70,54,0.24)] transition hover:bg-[#17392c]"
              >
                See model outputs
              </a>
              <a
                href="#playground"
                className="rounded-full border border-[#b4b9ac] bg-white/75 px-6 py-4 text-center text-sm font-semibold text-[#1a241c] transition hover:border-[#74836f] hover:bg-white"
              >
                Open the browser playground
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {projectMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_14px_40px_rgba(70,62,48,0.08)] backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-[#1a241c]">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6c5a43]">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#4e5c50]">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[36px] bg-[#17362b] p-5 text-[#f6f1e8] shadow-[0_28px_90px_rgba(23,54,43,0.25)]">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-3">
              <Image
                src={heroExample.image}
                alt={`Notebook output for ${heroExample.originalImage}`}
                width={1200}
                height={400}
                className="h-auto w-full rounded-[22px]"
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#b7ccb9]">
                  Hero example
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {heroExample.score.toFixed(3)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#dce6dc]">
                  High notebook score pulled directly from your saved cell outputs.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#b7ccb9]">
                  Deploy shape
                </p>
                <p className="mt-2 text-2xl font-semibold">Next.js</p>
                <p className="mt-2 text-sm leading-6 text-[#dce6dc]">
                  No custom Vercel config required for the version shipped here.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#b7ccb9]">
                  Upgrade path
                </p>
                <p className="mt-2 text-2xl font-semibold">ONNX or API</p>
                <p className="mt-2 text-sm leading-6 text-[#dce6dc]">
                  Swap the playground heuristic for live model inference later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="notebook-gallery" className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6c5a43]">
              Notebook Gallery
            </p>
            <h2 className="font-serif text-4xl leading-none text-[#17211b] md:text-5xl">
              Real compatibility figures exported from your notebook.
            </h2>
            <p className="text-base leading-8 text-[#4e5c50]">
              Each card below comes from the saved figure outputs in your
              notebook. These are real scores produced by the pairwise outfit
              scoring workflow, not recreated screenshots.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {notebookExamples.map((example) => (
              <article
                key={example.id}
                className="overflow-hidden rounded-[32px] border border-white/70 bg-white/78 shadow-[0_16px_48px_rgba(70,62,48,0.08)] backdrop-blur"
              >
                <div className="border-b border-[#ebe2d1] p-3">
                  <Image
                    src={example.image}
                    alt={`Notebook compatibility output for ${example.originalImage}`}
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
                        example.tier === "High"
                          ? "bg-[#d9eddc] text-[#1d5a34]"
                          : "bg-[#f4d8cf] text-[#8d4638]"
                      }`}
                    >
                      {example.tier} score
                    </span>
                    <span className="rounded-full bg-[#efe8da] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6c5a43]">
                      {example.score.toFixed(3)}
                    </span>
                    <span className="rounded-full bg-[#efe8da] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6c5a43]">
                      {example.originalImage}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {example.pairTypes.map((pairType) => (
                      <span
                        key={`${example.id}-${pairType}`}
                        className="rounded-full border border-[#ddd2bf] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#465246]"
                      >
                        {pairType}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-[#4e5c50]">{example.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <OutfitPlayground />

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6c5a43]">
              Pipeline
            </p>
            <h2 className="font-serif text-4xl leading-none text-[#17211b] md:text-5xl">
              The story the app tells about your model is simple and honest.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[#4e5c50]">
              People landing on the site can see the end-to-end flow at a glance,
              inspect real notebook outputs, and understand why the current web
              build uses a lightweight browser score for interactivity.
            </p>
          </div>

          <div className="grid gap-4">
            {pipelineSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-[0_16px_48px_rgba(70,62,48,0.08)]"
              >
                <h3 className="text-xl font-semibold text-[#17211b]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4e5c50]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-[#d8cfbf] bg-white/72 p-6 shadow-[0_16px_48px_rgba(70,62,48,0.08)] backdrop-blur lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6c5a43]">
                Shipping notes
              </p>
              <h2 className="font-serif text-4xl leading-none text-[#17211b]">
                What this version is optimized for.
              </h2>
              <p className="text-base leading-8 text-[#4e5c50]">
                This is the fastest path to something you can deploy on Vercel and
                share right away. It already makes the project feel tangible, and
                it leaves a clean path toward live model serving later.
              </p>
            </div>

            <div className="grid gap-4">
              {deploymentNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[24px] border border-[#e8dfcf] bg-[#fbf7ef] px-5 py-4 text-sm leading-7 text-[#465246]"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
