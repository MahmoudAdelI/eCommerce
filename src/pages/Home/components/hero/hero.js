import Component from "../../../../utils/Component";
import ribbon from "../ribbon/rebbon";

export default class Hero extends Component {
  constructor() {
    super();
    this.element = document.createElement("div");
    this.element.classList.add("hero");
    this.HeroAnimated = false;
  }
  render() {
    this.element.innerHTML = `
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

            <button class="button button--hero">shop now</button>
            <div class="hero__metrics">
            <div class="hero__metric">
                <h2 class="hero__metric-number">200</h2>
                <p class="hero__metric-text">International Brands</p>
            </div>
            <div class="hero__metric">
                <h2 class="hero__metric-number">2000</h2>
                <p class="hero__metric-text">High-Quality Products</p>
            </div>
            <div class="hero__metric">
                <h2 class="hero__metric-number">30000</h2>
                <p class="hero__metric-text">Happy Customers</p>
            </div>
            </div>
        </div>
        <div class="hero__image"></div>
        </div>
        ${ribbon()}`;

    this.animate();

    return this.element;
  }

  animateCount(el, target, duration = 2500) {
    const startTime = performance.now();

    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString() + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  animate() {
    const metrics = this.element.querySelectorAll(".hero__metric");

    let numbersDelay = 1;
    metrics.forEach((el) => {
      const numberEl = el.querySelector(".hero__metric-number");
      const target = +numberEl.textContent;
      this.animateCount(numberEl, target);

      el.style.animation = `fadeInUp 0.8s ease-out forwards ${(numbersDelay += 0.2)}s`;
    });
  }
}
