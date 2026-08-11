import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const staticHtml = await readFile(
    new URL("../static/index.html", import.meta.url),
    "utf8",
  );

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const pathname = new URL(request.url).pathname;
          if (pathname === "/index.html") {
            return new Response(staticHtml, {
              status: 200,
              headers: { "content-type": "text/html; charset=utf-8" },
            });
          }
          return new Response("Not found", { status: 404 });
        },
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Semana do Plástico landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(response.headers.get("cache-control") ?? "", /s-maxage=300/);

  const html = await response.text();
  assert.ok(Buffer.byteLength(html) < 10 * 1024);
  assert.match(html, /<title>Semana do Plástico \| Falcão Bauer<\/title>/i);
  assert.match(html, /semana do plástico/i);
  assert.match(html, /programação/i);
  assert.match(html, /Uma semana para transformar ideias/i);
  assert.match(html, /Nome do apresentador/g);
  assert.ok((html.match(/Nome do apresentador/g) ?? []).length >= 5);
  assert.match(html, /Assistir no Teams/i);
  assert.match(html, /class="loading-screen"/i);
  assert.match(html, /class="loading-brand"/i);
  assert.match(html, /href="\/site\.css"/);
  assert.match(html, /src="\/scroll-reveal\.js"/);
  assert.doesNotMatch(
    html,
    /codex-preview|Your site is taking shape|react-loading-skeleton|_next\/static|self\.__next_f/i,
  );
});

test("keeps the event content centralized and the page in full-page scroll mode", async () => {
  const [page, styles, appStyles, reveal, workerSource] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/site.css", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/scroll-reveal.js", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  ]);

  assert.match(styles, /scroll-snap-type:\s*y mandatory/);
  assert.match(styles, /height:\s*100svh/);
  assert.match(styles, /min-height:\s*100svh/);
  assert.match(styles, /@keyframes loading-brand-cycle/);
  assert.match(styles, /@keyframes loading-screen-exit/);
  assert.match(styles, /@keyframes content-reveal/);
  assert.match(styles, /translate:\s*clamp\(2\.5rem, 6vw, 6rem\) 0/);
  assert.match(styles, /html\.reveal-ready/);
  assert.match(styles, /snap-section\.is-revealed\.hero h1/);
  assert.match(
    styles,
    /presentation-card:nth-child\(1\)[^}]*animation-delay:\s*0\.32s/s,
  );
  assert.match(
    styles,
    /presentation-card:nth-child\(5\)[^}]*animation-delay:\s*0\.08s/s,
  );
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.equal(
    styles.trim(),
    appStyles.replace(/^@import "tailwindcss";\s*/, "").trim(),
  );
  assert.match(page, /className="loading-screen"/);
  assert.match(reveal, /IntersectionObserver/);
  assert.match(reveal, /classList\.add\("is-revealed"\)/);
  assert.match(reveal, /classList\.remove\("is-revealed"\)/);
  assert.match(workerSource, /landingPageHtml/);
  assert.doesNotMatch(page, /ScrollReveal|useState|useEffect|"use client"/);
  assert.match(
    styles,
    /grid-template-rows:\s*minmax\(0, 80%\)\s+minmax\(0, 20%\)/,
  );
  assert.match(page, /const presentations/);
  assert.match(page, /const socialLinks/);
  assert.match(page, /const contactInfo/);
  assert.match(page, /https:\/\/x\.com\/falcaobauer/);
  assert.match(page, /https:\/\/www\.instagram\.com\/falcaobauer\//);
  assert.match(page, /https:\/\/www\.facebook\.com\/falcaobauerqualidade\//);
  assert.match(page, /https:\/\/www\.linkedin\.com\/company\/falcao-bauer\/home\//);
  assert.match(page, /\(11\) 3611-0833/);
  assert.match(page, /Rua Aquinos, 111/);
  assert.match(page, /presentation-card/);
  assert.match(page, /social-footer/);
  assert.match(page, /date: "10\/08"/);
  assert.match(page, /https:\/\/falcaobauer\.com\.br/);
  assert.doesNotMatch(page, /conecte-se|social-title/);
  assert.doesNotMatch(page, /social-link-copy|social-link-arrow/);
});
