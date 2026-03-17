import { navigateTo } from "../app/router";

export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    page: Number(params.get("page")) || 1,
    category: new Set(params.getAll("category") || []),
    minPrice: Number(params.get("minPrice")) || null,
    maxPrice: Number(params.get("maxPrice")) || null,
  };
}

export function setQueryParams(filter) {
  const query = new URLSearchParams(window.location.search);

  Object.entries(filter).forEach(([key, value]) => {
    if (value instanceof Set || value instanceof Array) {
      query.delete(key);

      value.forEach((v) => {
        query.append(key, v);
      });
    } else if (value !== undefined && value !== null) {
      query.set(key, value);
    }
  });
  const url = `${window.location.pathname}?${query.toString()}`;

  navigateTo(url);
}
