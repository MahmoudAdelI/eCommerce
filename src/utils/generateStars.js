export default function generateStars(rating) {
  const roundedRating = Math.round(rating);
  const fullStars = "★".repeat(roundedRating);
  const emptyStars = "☆".repeat(5 - roundedRating);
  return fullStars + emptyStars;
}
