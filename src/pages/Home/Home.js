import grid from "../../components/grid/grid.js";
import productCard from "../../components/productCard/productCard.js";
import reviewCard from "../../components/review/reviewCard.js";
import { fetchProducts } from "../../services/api.js";
import Component from "../../utils/Component.js";
import categoryGrid from "./components/categoryGrid/categoryGrid.js";
import Hero from "./components/hero/hero.js";

export default class Home extends Component {
  constructor() {
    super();
    this.page = document.createElement("div");
    this.abortController = new AbortController();
    this.HeroAnimated = false;
    this.Hero = new Hero();
  }
  async render() {
    try {
      const { signal } = this.abortController;
      const products = await fetchProducts(signal);

      const reviewsData = products.flatMap((p) => {
        return p.reviews.filter((r) => r.rating == 5);
      });
      const productsCards = products.map((p) => productCard(p));

      const reviews = reviewsData.map((r) => reviewCard(r));

      this.page.innerHTML = `
        <div class="container">
        
          <h1 class="heading separator-label">NEW ARRIVALS</h1>
          ${grid(productsCards.slice(0, 4))}
          
          <a class="button view-all" href="/products">View All</a>
          <div class="hr"></div>
          
          <h1 class="heading separator-label">TOP SELLING</h1>
          ${grid(productsCards.slice(4, 8))}
          
          <a class="button view-all" href="/products">View All</a>
          ${categoryGrid()}
          
          <h1 class="heading ">OUR HAPPY CUSTOMERS</h1>
        
          </div>
          <div class="reviews-container">
            ${reviews.slice(0, 12).join("")}
          </div>
      `;
      this.page.prepend(this.Hero.render());

      return this.page;
    } catch (error) {
      console.log(error);
    }
  }

  cleanup() {
    this.abortController.abort();
  }
}
