export default function categoryGrid() {
  return `
  <section class="category-section">
  <h2 class="category__title">BROWSE BY CATEGORY</h2>
  
  <div class="category__grid">
    <!-- Shoes Card -->
    <a href="/products" data-link class="category__card category__card--shoes">
      <h3 class="category__card-title">Shoes</h3>
    </a>
    
    <!-- whatches Card -->
    <a href="/products" data-link  class="category__card category__card--watches">
      <h3 class="category__card-title">Watches</h3>
    </a >
    
    <!-- Glasses Card -->
    <a href="/products" data-link class="category__card category__card--glasses">
      <h3 class="category__card-title">Glasses</h3>
    </a>
    
    <!-- sports Card -->
    <a href="/products" data-link class="category__card category__card--sports">
      <h3 class="category__card-title">Sports</h3>
    </a>
  </div>
</section>`;
}
