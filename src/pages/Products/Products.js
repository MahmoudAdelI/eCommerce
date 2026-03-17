import Component from "../../utils/Component";
import filter from "./components/filter/filter.js";
import productCard from "../../components/productCard/productCard.js";
import { fetchCategories, fetchProducts } from "../../services/api.js";
import {
  getQueryParams,
  setQueryParams,
} from "../../utils/queryParamsHelper.js";

export default class Products extends Component {
  constructor() {
    super();
    this.filter = getQueryParams();
    this.abortController = null;
  }

  async render() {
    try {
      console.log(this.filter);

      this.abortController = new AbortController();
      const signal = this.abortController.signal;

      const [categories, allProducts] = await Promise.all([
        fetchCategories(signal),
        fetchProducts(signal),
      ]);

      // Apply all active filters
      const filteredProducts = this.applyFilters(allProducts, this.filter);
      const paginatedProducts = this.paginate(
        filteredProducts,
        this.filter.page,
      );

      const productsCards = paginatedProducts.map((p) =>
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
      page.classList.add("products", "container");

      page.innerHTML = `
      ${filter(categories, this.filter)}
      <section class="products__wrapper">
        <div class="products__grid">
          ${productsCards.join("")}
        </div>
        <div>Pagination</div>
      </section>
      `;

      page.addEventListener("click", (e) => {
        if (e.target.closest("[data-category]")) {
          const category = e.target.dataset.category;
          e.target.classList.toggle("filter__category-option--active");
          if (this.filter.category.has(category)) {
            this.filter.category.delete(category);
          } else {
            this.filter.category.add(category);
          }
        }
        if (e.target.closest(".filter__button")) {
          this.filter.minPrice = document.querySelector(
            ".filter-price__input--min",
          ).value;
          this.filter.maxPrice = document.querySelector(
            ".filter-price__input--max",
          ).value;
          this.filter.page = 1; // Reset to first page when filters change
          setQueryParams(this.filter);
        }
      });

      return page;
    } catch (error) {
      console.log(error);
    }
  }
  cleanup() {
    this.abortController?.abort();
  }

  paginate(products, page, perPage = 8) {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return products.slice(start, end);
  }

  applyFilters(products, filters) {
    let filtered = products;

    // Filter by category
    if (filters.category && filters.category.size > 0) {
      filtered = filtered.filter((p) => filters.category.has(p.category));
    }
    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice || Infinity;
    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice,
    );

    return filtered;
  }
}
