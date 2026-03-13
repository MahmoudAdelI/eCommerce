import productCard from "../../components/productCard/productCard.js";
import Page from "../../utils/Page.js";
import hero from "./components/hero/hero.js";

export default class Home extends Page {
  async render() {
    const res = await fetch("https://dummyjson.com/products");
    const { products } = await res.json();
    console.log(products);
    const data = products[4];

    const page = document.createElement("div");
    page.innerHTML = `
      ${hero()}

      <h1 class="heading separator-label">NEW ARRIVALS</h1>

      ${productCard({
        title: data?.title,
        img: data?.images[0],
        rating: Math.floor(data?.rating),
        price: (data?.price * (1 - data?.discountPercentage / 100)).toFixed(2),
        oldPrice: data?.price,
        discount: data?.discountPercentage,
      })}
      <div class="button">View All</div>

    `;
    return page;
  }
}
