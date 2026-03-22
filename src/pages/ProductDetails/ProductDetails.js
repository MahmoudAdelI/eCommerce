import reviewCard from "../../components/review/reviewCard";
import calcDiscount from "../../utils/calcDiscount";
import Component from "../../utils/Component";
import generateStars from "../../utils/generateStars";
import { getProductId } from "../../services/queryParams";
import { addToCart } from "../../services/cart";

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.page = document.createElement("div");
    this.page.classList.add("product-details", "container");

    this.productId = getProductId();
    this.product = null;
    this.quantity = 1;

    this.page.addEventListener("click", (e) => {
      this.handleAddToCart(e);
      this.handleQuantityChange(e);
      this.handleChangeImage(e);
    });
  }

  async render() {
    this.product = JSON.parse(localStorage.getItem("products"))?.find(
      (p) => p.id === this.productId,
    );
    console.log(this.product);

    this.page.innerHTML = `
            <section class="product">
              <div class="product__images">
                <div class="product__thumbnails">
                  ${this.product.images
                    .map(
                      (img, index) =>
                        `
                      <div class="product__thumbnail">
                        <img src="${img}" alt="${this.product.title}" class="product__thumbnail-img" data-index="${index}" />
                      </div>
                      `,
                    )
                    .join("")}
                </div>
                <div class="product__main-image">
                  <img src="${this.product.images[0]}" alt="${this.product.title}" class="product__main-img" />
                </div>
              </div>
              <div class="product__details">
                <div class="product__title">${this.product.title}</div>
                <div class="product__rating">
                  <span class="rating__stars">${generateStars(this.product.rating)}</span>
                  <span class="rating__count">${this.product.rating || "—"}/5</span>
                  
                </div>
                <div class="product__price">
                  <div class="product__current-price">$${calcDiscount(this.product.price, this.product.discountPercentage)}</div>
                  ${
                    this.product.discountPercentage
                      ? `
                  <div class="product__old-price">$${this.product.price}</div>
                  <div class="product__price-discount">-${this.product.discountPercentage}%</div>
                  `
                      : ""
                  }
                </div>
                <p class="product__description">${this.product.description}</p>
                <div class="line"></div>
                <div class="product__cart-management">
                  <div class="product__counter">
                    <button class="product__counter-btn product__counter-btn--decrease">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <div class="product__counter-value">1</div>
                    <button class="product__counter-btn product__counter-btn--increase">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button class="button product__add">Add to Cart</button>
                </div>
              </div>
            </section>
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
    return this.page;
  }

  handleAddToCart(e) {
    if (e.target.closest(".product__add")) {
      addToCart(this.product, this.quantity);
    }
  }

  handleQuantityChange(e) {
    if (e.target.closest(".product__counter-btn--decrease")) {
      if (this.quantity > 1) {
        this.quantity--;
        this.page.querySelector(".product__counter-value").textContent =
          this.quantity;
      }
    } else if (e.target.closest(".product__counter-btn--increase")) {
      this.quantity++;
      this.page.querySelector(".product__counter-value").textContent =
        this.quantity;
    }
  }

  handleChangeImage(e) {
    if (e.target.closest(".product__thumbnail-img")) {
      const index = e.target.dataset.index;
      const mainImg = this.page.querySelector(".product__main-img");
      mainImg.src = this.product.images[index];
    }
  }
}
