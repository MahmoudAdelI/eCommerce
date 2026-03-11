// gets root element and apply golbal layouts like (navbar)
import { navBar } from "../components/navBar/navBar.js";
export const initApp = () => {
  console.log("test");
  const root = document.getElementById("root");
  root.innerHTML = `
        ${navBar()}
        <main id="view"></main>
    `;
};
