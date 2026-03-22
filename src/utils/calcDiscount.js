export function calcDiscount(price, discountPercentage) {
  if (!price || !discountPercentage) return price;
  return (price * (1 - discountPercentage / 100)).toFixed(2);
}
