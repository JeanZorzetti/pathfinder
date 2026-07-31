/**
 * Gera `public/sitemap.xml` a partir das rotas de App.tsx e dos dados locais do próprio frontend.
 *
 *   node --experimental-strip-types scripts/generate-sitemap.mjs
 *
 * Por que não vem mais do backend: `/sitemap.xml` era um rewrite da Vercel para
 * `pathback.roilabs.com.br`, host que não resolve (NXDOMAIN) — o robots.txt mandava o Google
 * buscar o sitemap ali e ele recebia 502 DNS_HOSTNAME_NOT_FOUND. Além de morto, aquele sitemap
 * listava rotas que não existem neste app (`/types/<slug>`, `/test`); as rotas reais são
 * `/mbti/<tipo>` e `/test/<mbti|bigfive|enneagram>`.
 *
 * ponytail: roda à mão, não no `build` — o `--experimental-strip-types` depende do Node do
 * ambiente e não vale arriscar o build da Vercel por um arquivo que muda quando o conteúdo muda.
 * Mexeu em `blogArticles.ts` ou `mbtiTypesData.ts`? Rode de novo e commite o XML.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = "https://pathfinder.roilabs.com.br";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { mbtiTypesData } = await import("../src/data/mbtiTypesData.ts");
const { blogArticles } = await import("../src/data/blogArticles.ts");

// Só rota pública e indexável. Ficam de fora as bloqueadas no robots.txt (/dashboard, /journal),
// as de sessão (/auth, /forgot-password, /reset-password), as que dependem de um resultado de
// teste (/bigfive-result/:id, /results/mbti/:type) e /compatibility/:a/:b, que é combinatória.
const urls = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/premium", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.9" },
  { loc: "/mbti", changefreq: "monthly", priority: "0.9" },
  { loc: "/test/mbti", changefreq: "monthly", priority: "0.9" },
  { loc: "/test/bigfive", changefreq: "monthly", priority: "0.9" },
  { loc: "/test/enneagram", changefreq: "monthly", priority: "0.9" },
  ...Object.keys(mbtiTypesData).map((type) => ({
    loc: `/mbti/${type}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  ...Object.keys(blogArticles).map((id) => ({
    loc: `/blog/${id}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml: ${urls.length} URLs`);
