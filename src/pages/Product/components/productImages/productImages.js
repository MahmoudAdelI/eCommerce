import Component from "../../../../utils/Component";

export default class ProductImages extends Component {
  constructor(images) {
    super();
    this.element = document.createElement("div");
    this.element.classList.add("product__images");
    this.images = images;
    this.currentImageIndex = 0;

    this.element.addEventListener("click", (e) => this.handleChangeImage(e));
  }

  render() {
    this.element.innerHTML = `
            <div class="product__thumbnails">
                  ${this.images
                    .map(
                      (img, index) =>
                        `
                      <div class="product__thumbnail ${index == this.currentImageIndex ? "product__thumbnail--active" : ""}">
                        <img src="${img}" class="product__thumbnail-img" data-index="${index}" />
                      </div>
                      `,
                    )
                    .join("")}
                </div>
                <div class="product__main-image">
                  <img src="${this.images[this.currentImageIndex]}" class="product__main-img" />
                </div>
        `;
    return this.element;
  }

  handleChangeImage(e) {
    const imgThumbnail = e.target.closest(".product__thumbnail-img");
    if (!imgThumbnail) return;
    const index = imgThumbnail.dataset.index;
    this.currentImageIndex = index;
    this.render();
  }
}
