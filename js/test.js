import product1 from "../data/mlb.json" assert { type: "json" };
import product2 from "../data/adidas.json" assert { type: "json" };
import product3 from "../data/balenciaga.json" assert { type: "json" };
import product4 from "../data/converse.json" assert { type: "json" };
import product5 from "../data/gucci.json" assert { type: "json" };
import product6 from "../data/nike-jordan.json" assert { type: "json" };
import product7 from "../data/vans.json" assert { type: "json" };
import product8 from "../data/xvessel.json" assert { type: "json" };

const listProduct = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
];

const products = listProduct[0].concat(
    ...listProduct.filter((e) => e !== product1)
);

listProduct.unshift(products);

const filterList = [
    {
        id: 0,
        text: "Toàn bộ",
    },
    {
        id: 1,
        text: "Giày MLB",
    },
    {
        id: 2,
        text: "Giày Adidas",
    },
    {
        id: 3,
        text: "Giày Balenciaga",
    },
    {
        id: 4,
        text: "Giày Converse",
    },
    {
        id: 5,
        text: "Giày Gucci",
    },
    {
        id: 6,
        text: "Giày Nike Jordan",
    },
    {
        id: 7,
        text: "Giày Vans",
    },
    {
        id: 8,
        text: "Giày Xvessel",
    },
];
let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const shopProducts = id("shop-products");
const shopFiltersList = classes("list-group")[0];

window.saveIndex = (idx) => {
    localStorage.setItem("id", idx);
};

window.addToCart = (idx) => {
    let cartItem = JSON.parse(localStorage.getItem("cart"));
    if (cartItem == null) cartItem = [];
    cartItem.push(idx);
    localStorage.setItem("cart", JSON.stringify(cartItem));
};

window.renderProducts = (productID) => {
    shopProducts.innerHTML = listProduct[productID]
        .map(
            (e) =>
                `
        <div class="shop-product" >
            <a onclick="return saveIndex(${
                e.id
            })" href="../html/article-detail.html" >
                <div class="shop-product__img-wrapper">
                    <img src="${e.img}" alt="" />
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
                <div class="shop-product__price">${e.price}</div>
            </div>
            <div class="shop-product__btns">
                <div class="shop-product__btn">
                    <ion-icon 
                        class="heart-icon" 
                        name="heart-outline" 
                    ></ion-icon>
                </div>
                <div class="shop-product__btn">
                    <ion-icon class="cart-icon" name="cart-outline" onclick="return addToCart(${
                        e.id
                    })"></ion-icon>
                </div>
            </div>            
        </div>
        `
        )
        .join("");
    document.querySelector(".shop-handle__label h4").innerHTML =
        filterList[productID].text;
    if (productID !== 0) {
        document.querySelector(
            ".shop-handle__label h4:nth-child(3)"
        ).innerHTML = "Trang 1";
    }
};

if (window.location.href.indexOf("store.html") !== -1) {
    shopFiltersList.innerHTML = filterList
        .map(
            (e, id) =>
                `
                <li onclick="renderProducts(${id})" class="list-group-item shop-filters__item">
                    ${e.text}    
                </li>
                
            `
        )
        .join("");

    renderProducts(0);
}

const searchBar = id("search-bar");
searchBar.addEventListener("input", function (e) {
    const items = products.filter((e) =>
        e.title.toLowerCase().includes(searchBar.value.toLowerCase())
    );
    if (items.length > 0) {
        shopProducts.innerHTML = items
            .map(
                (e) =>
                    `
        <div class="shop-product" >
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
            <div class="shop-product__btns">
                <div class="shop-product__btn">
                    <ion-icon 
                        class="heart-icon" 
                        name="heart-outline" 
                    ></ion-icon>
                </div>
                <div class="shop-product__btn">
                    <ion-icon class="cart-icon" name="cart-outline" onclick="return addToCart(${
                        e.id
                    })"></ion-icon>
                </div>
            </div>            
        </div>
        `
            )
            .join("");
    } else {
        shopProducts.innerHTML = `<p class="w-100 text-center">Không tìm thấy sản phẩm nào</p>`;
    }
});
