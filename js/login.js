let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const form = id("loginForm");
const btnLogin = id("btnLogin");
const phone = id("floatingPhone");
const password = id("floatingPassword");

const errorMsg = classes("error");

const regPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validate = (e) => {
    e.preventDefault();

    let check = 0;

    if (phone.value === "") {
        handleError(phone, 0, "Phone number can not be left blank", "red");
    } else if (!regPhone.test(phone.value)) {
        handleError(phone, 0, "Invalid phone number", "red");
    } else {
        handleError(phone, 0, "", "green");
        check++;
    }

    if (password.value === "") {
        handleError(password, 1, "Password can not be blank", "red");
    } else if (!regPassword.test(password.value)) {
        handleError(password, 1, "Incorrect password format", "red");
    } else {
        handleError(password, 0, "", "green");
        check++;
    }

    if (check === 2) {
        if (localStorage.getItem("phone") !== phone.value) {
            handleError(phone, 0, "Incorrect phone number", "red");
            return false;
        } else {
            handleError(phone, 0, "", "green");
        }

        if (localStorage.getItem("password") !== password.value) {
            handleError(password, 1, "Incorrect password", "red");
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
