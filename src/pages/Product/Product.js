import reviewCard from "../../components/review/reviewCard";
import Component from "../../utils/Component";
import { getProductId } from "../../services/queryParams";
import ProductImages from "./components/productImages/productImages";
import { fetchProductById } from "../../services/api";
import ProductDetails from "./components/productDetails/productDetails";

export default class Product extends Component {
  constructor() {
    super();
    this.page = document.createElement("div");
    this.page.classList.add("product-details", "container");
    this.abortController = new AbortController();

    this.children = {
      productImages: null,
      productDetails: null,
    };

    this.productId = getProductId();
    this.product = null;
  }

  async render() {
    const { signal } = this.abortController;

    this.product =
      JSON.parse(localStorage.getItem("products"))?.find(
        (p) => p.id === this.productId,
      ) || (await fetchProductById(this.productId, signal));

    this.children.productImages = new ProductImages(this.product.images);
    this.children.productDetails = new ProductDetails(this.product);

    this.page.innerHTML = `
            <section class="product"></section>

            <div class="line"></div>

            <section class="product__reviews">
              <div class="product__reviews-heading">
              <h2 class="product__reviews-title">
               Customer Reviews
              </h2>
              <span class="product__reviews-count">(${this.product.reviews ? this.product.reviews.length : 0})</span>
              </div>
              <div class="product__reviews-list">
              ${
                this.product.reviews && this.product.reviews.length > 0
                  ? this.product.reviews.map((r) => reviewCard(r)).join("")
                  : `<p class="product__no-reviews">No reviews yet.</p>`
              }
              </div>
            </section>
        `;

    this.page
      .querySelector(".product")
      .append(
        this.children.productImages.render(),
        this.children.productDetails.render(),
      );
    return this.page;
  }

  cleanup() {
    this.abortController.abort();
  }
}
