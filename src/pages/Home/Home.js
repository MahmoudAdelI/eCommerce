import button from "../../components/button/button.js";
import grid from "../../components/grid/grid.js";
import productCard from "../../components/productCard/productCard.js";
import reviewCard from "../../components/review/reviewCard.js";
import { fetchProducts } from "../../services/api.js";
import Page from "../../utils/Component.js";
import categoryGrid from "./components/categoryGrid/categoryGrid.js";
import hero from "./components/hero/hero.js";

export default class Home extends Page {
  async render() {
    const products = await fetchProducts();

    const reviewsData = products.flatMap((p) => {
      return p.reviews.filter((r) => r.rating == 5);
    });

    const productsCards = products.map((p) =>
      productCard({
        title: p?.title,
        img: p?.images[0],
        rating: Math.floor(p?.rating),
        price: (p?.price * (1 - p?.discountPercentage / 100)).toFixed(2),
        oldPrice: p?.price,
        discount: p?.discountPercentage,
      }),
    );

    const reviews = reviewsData.map((r) => reviewCard(r));
    const page = document.createElement("div");
    page.innerHTML = `
      ${hero()}
      <div class="container">
      
        <h1 class="heading separator-label">NEW ARRIVALS</h1>
        ${grid(productsCards.slice(0, 4))}
        
        ${button("View All")}
        <div class="hr"></div>
        
        <h1 class="heading separator-label">TOP SELLING</h1>
        ${grid(productsCards.slice(4, 8))}
        
        ${button("View All")}
        
        ${categoryGrid()}
        
        <h1 class="heading ">OUR HAPPY CUSTOMERS</h1>
        
        
        
        </div>
        <div class="reviews-container">
          ${reviews.slice(0, 12).join("")}
        </div>
    `;
    return page;
  }

  cleanup() {}
}
