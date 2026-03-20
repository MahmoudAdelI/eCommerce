export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);

  window.dispatchEvent(new Event("cart:updated"));
}

export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);

  window.dispatchEvent(new Event("cart:updated"));
}

export function updateCartItem(productId, quantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);

    window.dispatchEvent(new Event("cart:updated"));
  }
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}
