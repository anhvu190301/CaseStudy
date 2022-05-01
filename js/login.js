let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const form = id("loginForm");
const btnLogin = id("btnLogin");
const phone = id("floatingPhone");
const password = id("floatingPassword");

const errorMsg = classes("error");

const regPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validate = (e) => {
    e.preventDefault();

    let check = 0;

    if (phone.value === "") {
        handleError(phone, 0, "Số điện thoại không được để trống", "red");
    } else if (!regPhone.test(phone.value)) {
        handleError(phone, 0, "Số điện thoại sai định dạng", "red");
    } else {
        handleError(phone, 0, "", "green");
        check++;
    }

    if (password.value === "") {
        handleError(password, 1, "Mật khẩu không được để trống", "red");
    } else if (!regPassword.test(password.value)) {
        handleError(password, 1, "Mật khẩu sai định dạng", "red");
    } else {
        handleError(password, 0, "", "green");
        check++;
    }

    if (check === 2) {
        if (localStorage.getItem("phone") !== phone.value) {
            handleError(phone, 0, "Số điện thoại không đúng", "red");
            return false;
        } else {
            handleError(phone, 0, "", "green");
        }

        if (localStorage.getItem("password") !== password.value) {
            handleError(password, 1, "Mật khẩu không đúng", "red");
            return false;
        } else {
            handleError(password, 1, "", "green");
        }
        sessionStorage.setItem("phone", phone.value);
        window.location.replace(
            "../index.html"
        );
    }
};

let handleError = (id, serial, message, color) => {
    errorMsg[serial].innerHTML = message;
    id.style.border = `1px solid ${color}`;
};

btnLogin.addEventListener("click", validate, false);

phone.addEventListener("focus", () => {
    handleError(phone, 0, "", "");
});

password.addEventListener("focus", () => {
    handleError(password, 1, "", "");
});
