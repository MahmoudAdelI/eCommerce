export function getFilter() {
  const params = new URLSearchParams(window.location.search);

  return {
    page: Number(params.get("page")) || 1,
    category: new Set(params.getAll("category") || []),
    minPrice: Number(params.get("minPrice")) || null,
    maxPrice: Number(params.get("maxPrice")) || null,
  };
}
export function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || null;
}

export function setFilter(filter) {
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
  return url;
}

export function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id")) || null;
}
