import Page from "../../utils/Page.js";
import hero from "./components/hero/hero.js";

export default class Home extends Page {
  render() {
    const page = document.createElement("div");
    page.innerHTML = `
      ${hero()}

      <h1 class="heading">NEW ARRIVALS</h1>
    `;
    return page;
  }
}
