export default function navBar() {
  return `
   <nav class="container navbar">
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
       <a href="#" class="navbar__cart-link">
         <i class="fa-solid fa-cart-shopping"></i>
       </a>
       <a href="#" class="navbar__profile-link">
         <i class="fa-regular fa-circle-user"></i>
       </a>
     </div>
   </nav>

`;
}
