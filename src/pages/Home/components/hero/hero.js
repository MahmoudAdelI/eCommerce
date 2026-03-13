import button from "../../../../components/button/button.js";
import ribbon from "../ribbon/rebbon.js";

export default function hero() {
  return `
    <div class="hero">
        <div class="hero__container container">
        <div class="hero__content">
            <h1 class="hero__heading">
            find clothes <br />
            that matches <br />
            your style
            </h1>

            <p class="hero__paragraph">
            Brose through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
            </p>

            ${button("button--hero", "shop now")}
            <div class="hero__metrics">
            <div class="hero__metric">
                <h2 class="hero__metric-number">200+</h2>
                <p class="hero__metric-text">International Brands</p>
            </div>
            <div class="hero__metric">
                <h2 class="hero__metric-number">2,000+</h2>
                <p class="hero__metric-text">High-Quality Products</p>
            </div>
            <div class="hero__metric">
                <h2 class="hero__metric-number">30,000+</h2>
                <p class="hero__metric-text">Happy Customers</p>
            </div>
            </div>
        </div>
        <div class="hero__image-container">
            <img src="./public//images/1.jpg" alt="hero-image" class="hero__image">
        </div>
        </div>
        ${ribbon()}
    </div>

    `;
}
