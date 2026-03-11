/* returning string

export function Header(title) {
  return `<header><h1>${title}</h1></header>`;
}

// components/ProductCard.js
export function ProductCard(product) {
  return `
    <div class="card">
      <h2>${product.name}</h2>
      <p>${product.price}</p>
    </div>
  `;
}


*/

/* returning dom element for adding event listeners

export function Counter() {
  const btn = document.createElement("button");
  btn.textContent = "Count: 0";
  let count = 0;
  btn.addEventListener("click", () => {
    count++;
    btn.textContent = `Count: ${count}`;
  });
  return btn; // must return element to keep the listener alive
}

*/
