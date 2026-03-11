import Page from "../../Page.js";

export default class Home extends Page {
  render() {
    const page = document.createElement("div");
    page.innerHTML = `Home`;
    return page;
  }
}
