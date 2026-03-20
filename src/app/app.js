// gets root element and apply golbal layouts like (navbar)
import Navbar from "../components/navBar/navBar.js";
import Footer from "../components/footer/footer.js";
export const initApp = () => {
  const root = document.getElementById("root");

  const NavbarEl = new Navbar().render();

  const Main = document.createElement("main");
  Main.id = "view";

  const FooterEl = new Footer().render();
  root.appendChild(NavbarEl);
  root.appendChild(Main);
  root.appendChild(FooterEl);
};
