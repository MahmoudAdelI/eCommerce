import reviewCard from "../../components/review/reviewCard";
import calcDiscount from "../../utils/calcDiscount";
import Component from "../../utils/Component";
import generateStars from "../../utils/generateStars";
import { getProductId } from "../../utils/queryParamsHelper";

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.productId = getProductId();
    this.page = document.createElement("div");
    this.page.classList.add("product-details", "container");
  }

  async render() {
    const product = JSON.parse(localStorage.getItem("products"))?.find(
      (p) => p.id === this.productId,
    );

    this.page.innerHTML = `
            <div class="wrapper">
            <section class="product">
              <div class="product__images">
                <div class="product__thumbnails">
                  ${product.images
                    .map(
                      (img, index) =>
                        `
                      <div class="product__thumbnail">
                        <img src="${img}" alt="${product.title}" class="product__thumbnail-img" data-index="${index}" />
                      </div>
                      `,
                    )
                    .join("")}
                </div>
                <div class="product__main-image">
                  <img src="${product.images[0]}" alt="${product.title}" class="product__main-img" />
                </div>
              </div>
              <div class="product__details">
                <div class="product__title">${product.title}</div>
                <div class="product__rating">
                  <span class="rating__stars">${generateStars(product.rating)}</span>
                  <span class="rating__count">${product.rating || "—"}/5</span>
                  
                </div>
                <div class="product__price">
                  <div class="product__current-price">$${calcDiscount(product.price, product.discountPercentage)}</div>
                  ${
                    product.discountPercentage
                      ? `
                  <div class="product__old-price">$${product.price}</div>
                  <div class="product__price-discount">-${product.discountPercentage}%</div>
                  `
                      : ""
                  }
                </div>
                <p class="product__description">${product.description}</p>
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
              <span class="product__reviews-count">(${product.reviews ? product.reviews.length : 0})</span>
              </div>
              <div class="product__reviews-list">
              ${
                product.reviews && product.reviews.length > 0
                  ? product.reviews.map((r) => reviewCard(r)).join("")
                  : `<p class="product__no-reviews">No reviews yet.</p>`
              }
              </div>
            </section>
          </div>
        `;
    return this.page;
  }
}
