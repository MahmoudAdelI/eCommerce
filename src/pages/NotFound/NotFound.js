import Component from "../../utils/Component.js";

export default class NotFound extends Component {
  render() {
    const page = document.createElement("div");
    page.className = "not-found";
    page.innerHTML = `
        <div class="not-found__content">
            Not Found | 404
        </div>
    `;
    return page;
  }
}
