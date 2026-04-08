// functions that calls APIs
export async function fetchProducts(signal, searchQuery) {
  try {
    const url = searchQuery
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=100`
      : "https://dummyjson.com/products?limit=194";
    const res = await fetch(url, {
      signal,
    });
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProductById(id, signal) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      signal,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategories(signal) {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list", {
      signal,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
