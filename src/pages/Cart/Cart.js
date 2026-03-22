import { getCart, removeFromCart, updateCartItem } from "../../services/cart";
import { calcDiscount } from "../../utils/calcDiscount";
import Component from "../../utils/Component";
import CartSummary from "./cartSummary/CartSummary";

export default class Cart extends Component {
  constructor() {
    super();
    this.page = document.createElement("div");
    this.page.classList.add("container");

    this.cart = getCart();

    this.cartSummary = new CartSummary(this.cart);

    this.page.addEventListener("click", (e) => {
      this.handleQuantityChange(e);
      this.handleDeleteItem(e);
    });
  }

  async render() {
    this.page.innerHTML = `
    <div class="cart">
        <ul class="cart__items">
            ${this.cart
              .map(
                (p) =>
                  `
                    <li class="cart__item" data-product-id="${p.id}" data-quantity="${p.quantity}">
                        <div class="item__image-wrapper">
                            <img src="${p.images[0]}" alt="${p.title}" class="item__image">
                        </div>
                        <div class="item__info">
                            <h3 class="item__title">${p.title}</h3>
                            <div class="item__price">$${calcDiscount(p.price, p.discountPercentage)}</div>
                        </div>
                        <div class="product__controls">
                            <button class="product__delete">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                            <div class="product__quantity">
                                <button class="product__quantity-btn product__quantity-btn--decrease">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <div class="product__quantity-value">${p.quantity}</div>
                                <button class="product__quantity-btn product__quantity-btn--increase">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                `,
              )
              .join("")}
        </ul>


    </div>
`;

    this.page.querySelector(".cart").appendChild(this.cartSummary.render());

    return this.page;
  }

  cleanup() {
    this.cartSummary.cleanup();
  }

  handleQuantityChange(e) {
    const item = e.target.closest(".cart__item");
    if (!item) return;
    const productId = Number(item.dataset.productId);
    const valueElement = item.querySelector(".product__quantity-value");

    let quantity = Number(item.dataset.quantity);

    if (e.target.closest(".product__quantity-btn--decrease")) {
      if (quantity > 1) {
        quantity--;
        item.dataset.quantity = quantity;
        valueElement.textContent = quantity;
      }
    } else if (e.target.closest(".product__quantity-btn--increase")) {
      quantity++;
      item.dataset.quantity = quantity;
      valueElement.textContent = quantity;
    }

    updateCartItem(productId, quantity);
  }

  handleDeleteItem(e) {
    const item = e.target.closest(".cart__item");
    if (!item) return;
    if (e.target.closest(".product__delete")) {
      const productId = Number(item.dataset.productId);
      removeFromCart(productId);
      item.remove();
    }
  }
}
