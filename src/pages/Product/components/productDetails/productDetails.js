import { addToCart } from "../../../../services/cart";
import { calcDiscount } from "../../../../utils/calcDiscount";
import Component from "../../../../utils/Component";
import generateStars from "../../../../utils/generateStars";

export default class ProductDetails extends Component {
  constructor(product) {
    super();
    this.element = document.createElement("div");
    this.element.classList.add("product__details");
    this.product = product;

    this.quantity = 1;

    this.element.addEventListener("click", (e) => {
      this.handleQuantityChange(e);
      this.handleAddToCart(e);
    });
  }

  render() {
    this.element.innerHTML = `
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
                    <div class="product__counter-value">${this.quantity}</div>
                    <button class="product__counter-btn product__counter-btn--increase">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    </div>
                    <button class="button product__add">Add to Cart</button>
                </div>
                `;

    return this.element;
  }

  handleAddToCart(e) {
    const addBtn = e.target.closest(".product__add");
    if (!addBtn) return;
    addToCart(this.product, this.quantity);
  }

  handleQuantityChange(e) {
    if (e.target.closest(".product__counter-btn--decrease")) {
      if (this.quantity > 1) {
        this.quantity--;
        this.render();
      }
    } else if (e.target.closest(".product__counter-btn--increase")) {
      this.quantity++;
      this.render();
    }
  }
}
