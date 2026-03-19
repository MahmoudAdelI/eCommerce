export default function filter(_categories, active) {
  return `
    <aside class="filter">
        <div class="filter__header">
          <h3 class="filter__title">Filters</h3>
          <i class="fa-solid fa-sliders"></i>
        </div>
        <div class="line"></div>

        <div class="group">
          <h4 class="group__title">category</h4>
          <ul class="filter__categories">
            ${categories(_categories, active.category)}
          </ul>
        </div>

        <div class="line"></div>

        <div class="group">
          <h4 class="group__title">price</h4>
          <div class="filter__price">
            <div class="filter-price__field">
              <h6 class="filter-price__label">Min</h6>
              <input
                type="number"
                min="0"
                step="5"
                value=${active.minPrice}
                class="filter-price__input filter-price__input--min"
              />
            </div>

            <div class="filter-price__field">
              <h6 class="filter-price__label">Max</h6>
              <input
                type="number"
                step="5"
                value=${active.maxPrice}
                class="filter-price__input filter-price__input--max"
              />
            </div>
          </div>
        </div>

        <button class="button filter__button">Apply filter</button>

      </aside>
    `;
}

function categories(categories, active) {
  let items = categories
    .map(
      (c) =>
        `<li class="filter__category-option ${active.has(c) && "filter__category-option--active"}" data-category="${c}">${c}</li>`,
    )
    .join("");
  return items;
}
