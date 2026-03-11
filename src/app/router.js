// routing
const routes = {
  "/": () => import("../pages/Home/Home.js"),
};

export const navigateTo = async (url) => {
  history.pushState(null, "", url);
  renderPage();
};

export const renderPage = async () => {
  const root = document.getElementById("view");
  root.innerHTML = `<div class="loader">Loading…</div>`;

  const path = window.location.pathname;
  const importFn =
    routes[path] || (() => import("../pages/NotFound/NotFound.js"));

  const module = await importFn();
  const pageContent = await module.default();

  root.innerHTML = "";
  root.appendChild(pageContent);
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
