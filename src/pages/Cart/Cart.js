import { getCart } from "../../services/cart";
import calcDiscount from "../../utils/calcDiscount";
import Component from "../../utils/Component";

export default class Cart extends Component {
  constructor() {
    super();
    this.page = document.createElement("div");
    this.page.classList.add("container");

    this.cart = getCart();
  }

  async render() {
    this.page.innerHTML = `
    <div class="cart">
        <ul class="cart__items">
            ${this.cart
              .map(
                (p) =>
                  `
                    <li class="cart__item" data-product-id="${p.id}">
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
        <div class="cart__order">
            <div class="order__body">
                <h2 class="order__title">Order Summary</h2>
                <div class="order__summary">
                    <div class="order__row">
                        <span class="order__key">Subtotal</span>
                        <span class="order__value">$100</span>
                    </div>
                    <div class="order__row">
                        <span class="order__key">Discount <span class="order__discount-percent">(-20%)</span></span>
                        <span class="order__value order__discount-value">-$100</span>
                    </div>
                    <div class="order__row">
                        <span class="order__key">Delivery Fee</span>
                        <span class="order__value">$15</span>
                    </div>
                    <div class="line"></div>
                    <div class="order__row">
                        <span class="order__key order__total">Total</span>
                        <span class="order__value">$115</span>
                    </div>
                </div>

            </div>
            <div class="order__checkout">
                <button class="button order__checkout-btn">Checkout</button>
            </div>
        </div>


    </div>
`;

    return this.page;
  }
}
//<img src="${p.images[0]}" alt="${p.title}" class="item__image">
