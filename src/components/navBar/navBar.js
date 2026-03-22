import { getCartCount } from "../../services/cart";
import Component from "../../utils/Component";

export default class NavBar extends Component {
  constructor() {
    super();
    this.navbar = document.createElement("nav");
    this.navbar.classList.add("container");
    this.count = getCartCount();
    this.countElement = null;

    window.addEventListener("cart:updated", () => {
      this.update();
    });
  }

  render() {
    this.navbar.innerHTML = `
      <div class="navbar">
        <a href="/" class="navbar__logo"> SHOP.CO </a>

        <ul class="navbar__menu">
          <li class="navbar__item">
            <a href="/products" class="navbar__link" data-link>Products</a>
          </li>
          <li class="navbar__item">
            <a href="/on-sale" class="navbar__link" data-link>On Sale</a>
          </li>
          <li class="navbar__item">
            <a href="/new-arrivals" class="navbar__link" data-link>New Arrivals</a>
          </li>
          <li class="navbar__item">
            <a href="/brands" class="navbar__link" data-link>Brands</a>
          </li>
        </ul>

        <div class="navbar__search">
          <span class="navbar__search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <form class="navbar__search-form">
            <input type="text" class="navbar__search-input" />
          </form>
        </div>

        <div class="navbar__actions">
          <a href="/cart" class="navbar__link navbar__cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart__count" data-count="${this.count}">${this.count}</span>
          </a>
          <a href="#" class="navbar__link navbar__profile">
            <i class="fa-regular fa-circle-user"></i>
          </a>
        </div>
      </div>
    

    `;

    this.countElement = this.navbar.querySelector(".cart__count");

    return this.navbar;
  }
  update() {
    this.count = getCartCount();
    this.countElement.textContent = this.count;
    this.countElement.setAttribute("data-count", this.count);
  }
}
