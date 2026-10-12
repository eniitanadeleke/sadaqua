// The Browse causes filters live in the web address, e.g.
//   /giver/causes?q=healthcare&category=feeding&urgency=urgent&area=FCT&scope=local&sort=recent
// so a filtered list can be shared, bookmarked and reached with the Back button.

import { CATEGORIES } from "@/lib/categories";

export const URGENCY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "urgent", label: "Urgent" },
  { value: "not-urgent", label: "Not urgent" },
];

export const SORT_OPTIONS = [
  { value: "recent", label: "Most recent" },
  { value: "urgent", label: "Urgent first" },
  { value: "almost-funded", label: "Almost funded" },
];

export const DEFAULT_FILTERS = {
  q: "",
  category: "all",
  urgency: "all",
  area: "all",
  scope: "all",
  sort: "recent",
};

const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);

/** Turns the address's ?... values into clean filters (unknown values fall back to "all"). */
export function readFilters(params = {}) {
  return {
    q: typeof params.q === "string" ? params.q.trim() : "",
    category: pick(params.category, CATEGORIES.map((c) => c.key), "all"),
    urgency: pick(params.urgency, URGENCY_OPTIONS.map((o) => o.value), "all"),
    area: typeof params.area === "string" && params.area ? params.area : "all",
    scope: pick(params.scope, ["local", "other"], "all"),
    sort: pick(params.sort, SORT_OPTIONS.map((o) => o.value), "recent"),
  };
}

/** Builds the causes address for some filters, leaving out anything still at its default. */
export function causesHref(filters, base = "/giver/causes") {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value && value !== DEFAULT_FILTERS[key]) params.set(key, value);
  }
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

/** True when any filter (other than the sort order) is switched on */
export function hasActiveFilters(filters) {
  return ["q", "category", "urgency", "area", "scope"].some(
    (key) => filters[key] !== DEFAULT_FILTERS[key]
  );
}
