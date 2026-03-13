export default function productCard(data) {
  const stars = data.rating
    ? "★".repeat(Math.round(data.rating)) +
      "☆".repeat(5 - Math.round(data.rating))
    : "☆☆☆☆☆";

  return `
    <div class="product-card">
      <div class="product-card__image-wrapper">
        ${
          data.img
            ? `<img src="${data.img}" alt="${data.title || "Product"}" class="product-card__image" />`
            : `<div class="product-card__no-image">No image</div>`
        }
      </div>

      <div class="product-card__content">
        <h3 class="product-card__title">${data.title || "Untitled"}</h3>

        <div class="product-card__rating">
          <span class="product-card__stars">${stars}</span>
          <span class="product-card__rating-count">${data.rating ?? "—"}/5</span>
        </div>

        <div class="product-card__price">
          <span class="product-card__price-current">$${data.price ?? "N/A"}</span>
          ${
            data.discount != null && data.discount !== 0
              ? `<span class="product-card__price-old">$${data.oldPrice}</span>
               <span class="product-card__discount">-${data.discount}%</span>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}
