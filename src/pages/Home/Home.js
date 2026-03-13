import button from "../../components/button/button.js";
import grid from "../../components/grid/grid.js";
import productCard from "../../components/productCard/productCard.js";
import Page from "../../utils/Page.js";
import categoryGrid from "./components/categoryGrid/categoryGrid.js";
import hero from "./components/hero/hero.js";

export default class Home extends Page {
  async render() {
    const url = "https://dummyjson.com/products";
    const res = await fetch(url);
    const { products } = await res.json();
    console.log(products);

    const data = products.map((p) =>
      productCard({
        title: p?.title,
        img: p?.images[0],
        rating: Math.floor(p?.rating),
        price: (p?.price * (1 - p?.discountPercentage / 100)).toFixed(2),
        oldPrice: p?.price,
        discount: p?.discountPercentage,
      }),
    );

    const page = document.createElement("div");
    page.innerHTML = `
      ${hero()}
      <div class="container">
      
        <h1 class="heading separator-label">NEW ARRIVALS</h1>
        ${grid(data.slice(0, 4))}
        
        ${button("View All")}
        <div class="hr"></div>
        
        <h1 class="heading separator-label">TOP SELLING</h1>
        ${grid(data.slice(4, 8))}

        ${button("View All")}

        ${categoryGrid()}
        </div>
    `;
    return page;
  }
}
