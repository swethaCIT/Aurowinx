import { useEffect } from "react";

export const SITE_NAME = "AurowinX Technologies";
export const SITE_URL = "https://aurowinx.com";
const DEFAULT_DESCRIPTION =
  "AurowinX Technologies delivers semiconductor design services — SoC/ASIC design, " +
  "design verification, DFT engineering, physical design, and analog/mixed-signal IP — " +
  "alongside embedded systems, IoT automation, and power electronics engineering.";
const DEFAULT_IMAGE = `${SITE_URL}/images/Aurowinx-logo.png`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeMeta(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

/**
 * Sets the document title, meta description, canonical URL, and Open
 * Graph / Twitter Card tags for the current route. This is a pure-SPA app
 * with no SSR, so this only helps clients that execute JS (browsers,
 * modern crawlers) — see README for the tradeoffs.
 */
export function useSEO({ title, description = DEFAULT_DESCRIPTION, path = "/", image = DEFAULT_IMAGE, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Semiconductor Design & Engineering Services`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    if (noindex) {
      upsertMeta("name", "robots", "noindex, nofollow");
    } else {
      removeMeta("name", "robots");
      upsertLink("canonical", url);
    }
  }, [title, description, path, image, noindex]);
}
