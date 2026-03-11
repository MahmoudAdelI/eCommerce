/*

import { Header } from "../components/Header.js";
import { ProductCard } from "../components/ProductCard.js";

export default async function ProductsPage() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const cards = products.map(ProductCard).join("");

  const div = document.createElement("div");
  div.innerHTML = `
    ${Header("Products")}
    <main>${cards}</main>
  `;
  return div;
}

  */
