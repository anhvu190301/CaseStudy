import product1 from "../data/baby-boy-suit.json" assert { type: "json" };
import product2 from "../data/baby-boy-clothes.json" assert { type: "json" };
import product3 from "../data/baby-boy-coat.json" assert { type: "json" };
import product4 from "../data/baby-girl-clothes.json" assert { type: "json" };
import product5 from "../data/baby-girl-coat.json" assert { type: "json" };
import product6 from "../data/baby-girl-dress.json" assert { type: "json" };
import product7 from "../data/baby-girl-suit.json" assert { type: "json" };
import product8 from "../data/baby-girl-trousers.json" assert { type: "json" };

const products = product1.concat(
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8
);

let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const hotProducts = id("shop-products");

const formatPrice = (price) => new Intl.NumberFormat().format(price);

window.saveIndex = (idx) => {
    localStorage.setItem("id", idx);
};

const findOccurrences = (arr = []) => {
    const res = [];
    arr.forEach((el) => {
        const index = res.findIndex((obj) => {
            return obj["id"] === el;
        });
        if (index === -1) {
            res.push({
                id: el,
                count: 1,
            });
        } else {
            res[index]["count"]++;
        }
    });
    return res;
};

let cartItem = JSON.parse(localStorage.getItem("cart"));
window.addToCart = (idx) => {
    if (cartItem == null) cartItem = [];
    cartItem.push(idx);
    localStorage.setItem("cart", JSON.stringify(cartItem));
};

const renderProduct = () => {
    const idx = localStorage.getItem("id");

    if (!idx) {
        return false;
    }
    let product = products.find((item) => item.id === parseInt(idx));
    const imgProduct = classes("detail-img")[0];

    const slideItem = id("detail-slides");
    slideItem.innerHTML = product.image
        .map(
            (e, index) =>
                `
            <div class="detail-slide-item">
                <div>
                    <img
                        src="${e}"
                        alt="Slide ${index}"
                        class="img-fluid slide-img"
                        xoriginal="${e}"
                        xpreview="${e}"
                    />
                </div>
            </div>
        `
        )
        .join("");

    const sliderNav = id("detail-slider-nav");
    sliderNav.innerHTML = product.image
        .map(
            (e, index) =>
                `
                <div class="detail-slider-nav__img">
                    <img
                        src="${e}"
                        alt="Slide ${index}"
                        class="img-fluid"
                    />
                </div>
            `
        )
        .join("");
    id("id-product").value = product.id;
    classes("detail-content__title")[0].innerHTML = product.title;
    classes("detail-content__price")[0].innerHTML = `${formatPrice(
        product.price
    )}đ`;
};

renderProduct();

hotProducts.innerHTML = product1
    .map(
        (e) =>
            `
        <div class="shop-product">
            <a onclick="return saveIndex(${
                e.id
            })" href="../html/article-detail.html" >
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

id("btn-add-cart").addEventListener("click", function () {
    addToCart(parseInt(id("id-product").value));
    classes("ping")[0].innerHTML = findOccurrences(cartItem).length;
});
