// functions that calls APIs
export async function fetchProducts(signal) {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=194", {
      signal,
    });
    const data = await res.json();
    return data.products;
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
