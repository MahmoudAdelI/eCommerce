import formatDateLong from "../../utils/formatDate";

export default function reviewCard(data) {
  const stars = data.rating
    ? "★".repeat(Math.round(data.rating)) +
      "☆".repeat(5 - Math.round(data.rating))
    : "☆☆☆☆☆";
  return `
    <div class="review-card">
    <div class="review-card__stars">${stars}</div>
      <div class="review-card__reviewer">
        ${data.reviewerName}
        <span class="review-card__success"
          ><i class="fa-solid fa-circle-check"></i
        ></span>
      </div>
      <div class="review-card__review">"${data.comment}"</div>
      <div class="review-card__date">Posted on ${formatDateLong(data.date)}</div>
      </div>`;
}
