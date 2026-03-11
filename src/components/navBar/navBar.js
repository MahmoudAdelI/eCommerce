export const navBar = () => `
    <nav class="navbar">
      <a href="/" class="navbar__logo"> SHOP.CO </a>

      <ul class="navbar__menu">
        <li class="navbar__item">
          <a href="/shop" class="navbar__link" data-link>Shop</a>
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
        <span class="navbar__search-icon">Icon</span>
        <form class="navbar__search-form">
          <input type="text" class="navbar__search-input" />
        </form>
      </div>

      <div class="navbar__actions">
        <a href="#" class="navbar__cart-link">cart </a>
        <a href="#" class="navbar__profile-link">profile </a>
      </div>
    </nav>

`;
