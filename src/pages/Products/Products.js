import Component from "../../utils/Component";
import filter from "./components/filter/filter.js";
import productCard from "../../components/productCard/productCard.js";
import { fetchCategories, fetchProducts } from "../../services/api.js";
import { getFilter, setFilter } from "../../services/queryParams.js";
import pagination from "./components/pagination/pagination.js";
import { navigateTo } from "../../app/router.js";
import paginate from "../../utils/paginate.js";

export default class Products extends Component {
  constructor() {
    super();
    this.page = document.createElement("div");
    this.page.classList.add("products", "container");
    this.filter = getFilter();
    this.abortController = new AbortController();
  }

  async render() {
    try {
      const signal = this.abortController.signal;

      const [categories, products] = await Promise.all([
        fetchCategories(signal),
        fetchProducts(signal),
      ]);

      // Apply all active filters
      const filteredProducts = this.applyFilters(products, this.filter);
      const PRODUCTS_PER_PAGE = 9;
      const paginatedProducts = paginate(
        filteredProducts,
        this.filter.page,
        PRODUCTS_PER_PAGE,
      );
      localStorage.setItem("products", JSON.stringify(paginatedProducts));

      const productsCards = paginatedProducts
        .map((p) =>
          productCard({
            id: p?.id,
            title: p?.title,
            img: p?.images[0],
            rating: Math.floor(p?.rating),
            price: (p?.price * (1 - p?.discountPercentage / 100)).toFixed(2),
            oldPrice: p?.price,
            discount: p?.discountPercentage,
          }),
        )
        .join("");

      this.page.innerHTML = `
      ${filter(categories, this.filter)}
      <section class="products__wrapper">
        <div class="products__grid">
          ${productsCards}
        </div>
       ${pagination(this.filter.page, filteredProducts.length)}
      </section>
      `;

      this.page.addEventListener("click", (e) => {
        this.handleCategoryClick(e);

        this.handleFilterClick(e);

        this.handlePaginationClick(e);
      });

      return this.page;
    } catch (error) {
      console.log(error);
    }
  }
  cleanup() {
    this.abortController?.abort();
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

  handleCategoryClick(e) {
    if (e.target.closest("[data-category]")) {
      const category = e.target.dataset.category;
      e.target.classList.toggle("filter__category-option--active");
      if (this.filter.category.has(category)) {
        this.filter.category.delete(category);
      } else {
        this.filter.category.add(category);
      }
    }
  }

  handleFilterClick(e) {
    if (e.target.closest(".filter__button")) {
      this.filter.minPrice = document.querySelector(
        ".filter-price__input--min",
      ).value;
      this.filter.maxPrice = document.querySelector(
        ".filter-price__input--max",
      ).value;
      this.filter.page = 1; // Reset to first page when filters change
      const url = setFilter(this.filter);
      navigateTo(url);
    }
  }
  handlePaginationClick(e) {
    const pageBtn = e.target.closest("button[data-page]");
    if (pageBtn) {
      this.filter.page = Number(pageBtn.dataset.page);
      const url = setFilter(this.filter);
      navigateTo(url);
    }
  }
}
