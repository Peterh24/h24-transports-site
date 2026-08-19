import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { INDEXABLE_PAGES } from "@/data/pages";

/**
 * Sitemap dérivé du registre `PAGES` : les pages `noindex` (mentions légales,
 * CGV en attente de texte) en sont exclues automatiquement, au lieu d'être
 * listées à la main comme avant.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.map((page) => ({
    url: `${SITE.url}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(page.updated),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
