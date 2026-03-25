import { calcDiscount } from "../../utils/calcDiscount";
import generateStars from "../../utils/generateStars";

export default function productCard(product) {
  return `
    <a class="product-card" data-product-id="${product.id || ""}" href="/product?id=${product.id || ""}" data-link>
      <div class="product-card__image-wrapper">
        ${
          product.images[0]
            ? `<img src="${product.images[0]}" alt="${product.title || "Product"}" class="product-card__image" />`
            : `<div class="product-card__no-image">No image</div>`
        }
      </div>

      <div class="product-card__content">
        <h3 class="product-card__title">${product.title || "Untitled"}</h3>

        <div class="product-card__rating">
          <span class="product-card__stars">${generateStars(product.rating || 0)}</span>
          <span class="product-card__rating-count">${product.rating || "—"}/5</span>
        </div>

        <div class="product-card__price">
          <span class="product-card__price-current">$${calcDiscount(product.price, product.discountPercentage) || "N/A"}</span>
          ${
            product.discount != null && product.discount !== 0
              ? `<span class="product-card__price-old">$${product.price || "N/A"}</span>
               <span class="product-card__discount">-${product.discountPercentage || "N/A"}%</span>`
              : ""
          }
        </div>
      </div>
    </a>
  `;
}
