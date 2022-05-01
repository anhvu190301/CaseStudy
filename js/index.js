import product from "../data/baby-boy-suit.json" assert { type: "json" };
import boy_product from "../data/baby-boy-clothes.json" assert { type: "json" };
import girl_product from "../data/baby-girl-clothes.json" assert { type: "json" };

let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const hotProducts = id("shop-products");
const boyProducts = id("shop-products__boy");
const girlProducts = id("shop-products__girl");

const formatPrice = (price) => new Intl.NumberFormat().format(price);

window.saveIndex = (idx) => {
    localStorage.setItem("id", idx);
};

const renderProduct = (products, elementHTML) => {
    elementHTML.innerHTML = products
        .map(
            (e) =>
                `
        <div class="shop-product">
            <a onclick="return saveIndex(${
                e.id
            })" href="../html/article-detail.html">
                <div class="shop-product__img-wrapper">
                    <img src="${e.image[0]}" alt="" />
                </div>
                <div class="shop-product__content">
                    <div class="shop-product__name">${e.title}</div>
                    <p class="shop-product__description"></p>
                </div>
            </a>
            <div class="shop-product__row">
                <div class="shop-product__rating d-flex">
                    <div
                        class="shop-product__rating-star d-flex align-items-center pe-2"
                    >
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                    </div>
                    <span class="shop-product__rating-count"
                        >(${Math.floor(Math.random() * 1000) + 100})</span
                    >
                </div>
                <div class="shop-product__price">${formatPrice(e.price)}đ</div>
            </div>
            <div class="shop-product__label">Yêu thích</div>
        </div>
        `
        )
        .join("");
};

renderProduct(product, hotProducts);

renderProduct(boy_product, boyProducts);

renderProduct(girl_product, girlProducts);
