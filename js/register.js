let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const form = id("register");
const btnLogin = id("btnRegister");
const phone = id("floatingPhone");
const password = id("floatingPassword");
const repassword = id("floatingRePassword");

const errorMsg = classes("error");

const regPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validate = (e) => {
    e.preventDefault();

    let check = 0;

    // validate phone
    if (phone.value === "") {
        handleError(phone, 0, "Phone number can not be left blank", "red");
    } else if (!regPhone.test(phone.value)) {
        handleError(phone, 0, "Invalid phone number", "red");
    } else {
        handleError(phone, 0, "", "green");
        check++;
    }

    // validate password
    if (password.value === "") {
        handleError(password, 1, "Password can not be blank", "red");
    } else if (!regPassword.test(password.value)) {
        handleError(
            password,
            1,
            "Password must be at least 8 alphanumeric characters",
            "red"
        );
    } else {
        handleError(password, 1, "", "green");
        check++;
    }

    // validate re-password
    if (repassword.value === "") {
        handleError(
            repassword,
            2,
            "Re-entered password cannot be blank",
            "red"
        );
    } else if (password.value !== repassword.value) {
        handleError(repassword, 2, "Re-entered password is incorrect", "red");
    } else {
        handleError(repassword, 2, "", "green");
        check++;
    }

    if (check === 3) {
        localStorage.setItem("phone", phone.value);
        localStorage.setItem("password", password.value);
        window.location.replace(
            "../html/login.html"
        );
    }
};

let handleError = (id, serial, message, color) => {
    errorMsg[serial].innerHTML = message;
    id.style.border = `1px solid ${color}`;
};

btnLogin.addEventListener("click", function () {
    validate(event);
});

phone.addEventListener("focus", () => {
    handleError(phone, 0, "", "");
});

password.addEventListener("focus", () => {
    handleError(password, 1, "", "");
});

repassword.addEventListener("focus", () => {
    handleError(repassword, 2, "", "");
});
