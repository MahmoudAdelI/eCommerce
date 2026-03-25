import { navigateTo } from "../../app/router";
import { getCartCount } from "../../services/cart";
import Component from "../../utils/Component";

export default class NavBar extends Component {
  constructor() {
    super();
    this.navbar = document.createElement("nav");
    this.navbar.classList.add("container");
    this.count = getCartCount();

    this.navbar.addEventListener("submit", (e) => this.handleSubmit(e));
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
            <a href="/products" class="navbar__link" data-link>On Sale</a>
          </li>
          <li class="navbar__item">
            <a href="/products" class="navbar__link" data-link>New Arrivals</a>
          </li>
          <li class="navbar__item">
            <a href="/products" class="navbar__link" data-link>Brands</a>
          </li>
        </ul>

        
        <form class="navbar__search-form">
          <button class="navbar__search-btn" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
            <input type="text" class="navbar__search-input" />
          </form>
       

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

    return this.navbar;
  }
  update() {
    this.count = getCartCount();
    this.render();
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = this.navbar.querySelector(".navbar__search-input");
    const query = input.value.trim();
    const url = `/products?search=${encodeURIComponent(query)}`;
    navigateTo(url);
  }
}
