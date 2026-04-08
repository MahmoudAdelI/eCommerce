import Loader from "../components/loader/loader.js";

// routing
const routes = {
  "/": () => import("../pages/Home/Home.js"),
  "/products": () => import("../pages/Products/Products.js"),
  "/product": () => import("../pages/Product/Product.js"),
  "/cart": () => import("../pages/Cart/Cart.js"),
};

export const navigateTo = async (url) => {
  history.pushState(null, "", url);
  renderPage();
};

let currentPage = null;
export const renderPage = async () => {
  // cleanup previous component side effects (prevent memory leaks)
  currentPage?.cleanup();

  // select view and render a loader
  const view = document.getElementById("view");
  view.innerHTML = Loader();

  // capture the pathname and import page module
  const path = window.location.pathname;
  const importFn =
    routes[path] || (() => import("../pages/NotFound/NotFound.js"));
  const module = await importFn();

  // save the current page till next render for cleanup
  currentPage = new module.default();

  // get the page content
  const pageContent = await currentPage.render();

  // clean DOM and render new page content
  view.innerHTML = "";
  view.appendChild(pageContent);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const initRouter = async () => {
  window.addEventListener("popstate", renderPage);

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      navigateTo(link.href);
    }
  });

  renderPage();
};
