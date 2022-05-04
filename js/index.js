import product from "../data/adidas.json" assert { type: "json" };

let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const hotProducts = id("shop-products");

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
                    <img src="${e.img[0]}" alt="" />
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
