import { calcDiscount } from "../../../utils/calcDiscount";
import Component from "../../../utils/Component";

export default class CartSummary extends Component {
  constructor(cart) {
    super();
    this.cart = cart;
    this.element = document.createElement("div");
    this.element.classList.add("cart__order");
    this.handleUpdate = this.update.bind(this);
    window.addEventListener("cart:updated", this.handleUpdate);
  }

  render() {
    const { subtotal, totalAfter, discount, discountPercent } =
      this.calculateTotals();
    this.element.innerHTML = `
            <div class="order__body">
                <h2 class="order__title">Order Summary</h2>
                <div class="order__summary">
                    <div class="order__row">
                        <span class="order__key">Subtotal</span>
                        <span class="order__value">$${subtotal}</span>
                    </div>
                    <div class="order__row">
                        <span class="order__key">Discount <span class="order__discount-percent">(-${discountPercent}%)</span></span>
                        <span class="order__value order__discount-value">-$${discount}</span>
                    </div>
                    <div class="order__row">
                        <span class="order__key">Delivery Fee</span>
                        <span class="order__value">$15</span>
                    </div>
                    <div class="line"></div>
                    <div class="order__row">
                        <span class="order__key order__total">Total</span>
                        <span class="order__value">$${+totalAfter + 15}</span>
                    </div>
                </div>

            </div>
            <div class="order__checkout">
                <button class="button order__checkout-btn">Checkout</button>
            </div>
        `;

    return this.element;
  }

  update(e) {
    this.cart = e.detail.cart;
    this.render();
  }
  cleanup() {
    window.removeEventListener("cart:updated", this.handleUpdate);
  }

  calculateTotals() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const totalAfter = this.cart.reduce(
      (sum, item) =>
        sum + calcDiscount(item.price, item.discountPercentage) * item.quantity,
      0,
    );
    const discount = subtotal - totalAfter;

    const discountPercent = subtotal > 0 ? (discount / subtotal) * 100 : 0;

    return {
      subtotal: subtotal.toFixed(2),
      totalAfter: totalAfter.toFixed(2),
      discount: discount.toFixed(2),
      discountPercent: discountPercent.toFixed(2),
    };
  }
}
