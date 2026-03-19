export default function paginate(products, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return products.slice(start, end);
}
