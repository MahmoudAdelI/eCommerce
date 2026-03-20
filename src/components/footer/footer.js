import Component from "../../utils/Component";

export default class Footer extends Component {
  constructor() {
    super();
    this.footer = document.createElement("footer");
    this.footer.classList.add("footer");
  }
  render() {
    this.footer.innerHTML = `
      <div class="container">
        <div class="footer__subscribe">
          <h2 class="heading">
            stay upto date about <br />
            our latest offers
          </h2>

          <div class="footer__subscribe-actions">
            <!-- <input type="text" class="footer__subscribe-input" /> -->
            <div class="footer__input-wrapper">
              <span class="footer__input-icon">
                <i class="fa-regular fa-envelope"></i>
              </span>
              <input
                type="text"
                class="footer__input"
                placeholder="Enter your email address"
              />
            </div>
            
            <button class="footer__subscribe-button">
              Subscribe to Newsletter
            </button>

          </div>
        </div>

        <div class="footer__content">
          <div class="footer__shop">
            <h1 class="footer__logo">SHOP.CO</h1>
            <p class="footer__description">
              We have clothes that matches your style and which you're proud to
              wear, From women to men.
            </p>
          </div>

          <div class="footer__column">
            <h4 class="footer__title">company</h4>
            <ul class="footer__links">
              <li><a href="" class="footer__link">about</a></li>
              <li><a href="" class="footer__link">feature</a></li>
              <li><a href="" class="footer__link">works</a></li>
              <li><a href="" class="footer__link">career</a></li>
            </ul>
          </div>
          <div class="footer__column">
            <h4 class="footer__title">help</h4>
            <ul class="footer__links">
              <li><a href="" class="footer__link">customer support</a></li>
              <li><a href="" class="footer__link">delivery details</a></li>
              <li><a href="" class="footer__link">terms & conditions</a></li>
              <li><a href="" class="footer__link">privacy policy</a></li>
            </ul>
          </div>
          <div class="footer__column">
            <h4 class="footer__title">faq</h4>
            <ul class="footer__links">
              <li><a href="" class="footer__link">account</a></li>
              <li><a href="" class="footer__link">manage deliveries</a></li>
              <li><a href="" class="footer__link">orders</a></li>
              <li><a href="" class="footer__link">payments</a></li>
            </ul>
          </div>
          <div class="footer__column">
            <h4 class="footer__title">resources</h4>
            <ul class="footer__links">
              <li><a href="" class="footer__link">free ebooks</a></li>
              <li><a href="" class="footer__link">development tutorial</a></li>
              <li><a href="" class="footer__link">how to-blog</a></li>
              <li><a href="" class="footer__link">youtube playlist</a></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>
        <div class="footer__bottom">
          <p class="footer__copyright">© 2026 SHOP.CO. All rights reserved.</p>
        </div>
      </div>`;
    return this.footer;
  }
}
