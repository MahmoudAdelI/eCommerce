/* components returns string

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

/* components returns dom element

export default function HomePage() {
  const div = document.createElement("div");
  div.innerHTML = Header("Home"); // string components go through innerHTML

  div.appendChild(Counter()); // element components get appended after
  return div;
}

*/
