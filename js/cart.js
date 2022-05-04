import product1 from "../data/mlb.json" assert { type: "json" };
import product2 from "../data/adidas.json" assert { type: "json" };
import product3 from "../data/balenciaga.json" assert { type: "json" };
import product4 from "../data/converse.json" assert { type: "json" };
import product5 from "../data/gucci.json" assert { type: "json" };
import product6 from "../data/nike-jordan.json" assert { type: "json" };
import product7 from "../data/vans.json" assert { type: "json" };
import product8 from "../data/xvessel.json" assert { type: "json" };

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

const formatPrice = (price) => new Intl.NumberFormat().format(price);

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

const cartProducts = id("cart-products");

const renderProduct = () => {
    if (!sessionStorage.getItem("phone")) {
        window.location.replace(
            "../html/login.html"
        );
        return false;
    }
    const cartItem = findOccurrences(JSON.parse(localStorage.getItem("cart")));

    const findProduct = (idx) => products.find((e) => e.id === idx);
    const sumTotal = cartItem.reduce(
        (prev, curr) => prev + findProduct(curr?.id)?.price * curr?.count,
        0
    );

    cartProducts.innerHTML =
        cartItem
            .map(
                (e) =>
                    `
                <li class="mb-2">
                    <div class="cart-product">
                        <div class="cart-product__img-wrapper">
                            <img
                                src="${findProduct(e.id)?.img[0]}"
                                alt=""
                            />
                        </div>
                        <div class="cart-product__content">
                            <div class="cart-product__name">
                                ${findProduct(e.id)?.title}
                            </div>
                            <div class="cart-product__price">Đơn giá: ${formatPrice(
                                findProduct(e.id)?.price
                            )}đ</div>
                            <div class="cart-product__quantity">Số lượng: ${
                                e.count
                            }</div>
                        </div>
                    </div>
                </li>
                `
            )
            .join("") +
        `
            <li
                class="list-group-item d-flex justify-content-between"
            >
                <span>Total (VND)</span>
                <strong>${formatPrice(sumTotal)}đ</strong>
            </li>
        `;

    classes("badge")[0].innerHTML = findOccurrences(cartItem).length;
};

renderProduct();
