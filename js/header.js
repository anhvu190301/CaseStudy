let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const btnAvatar = classes("header-avatar");

const dismiss = () => {
    let submenu = classes("dismiss");
    submenu[0].style.display = "none";
};

const renderIsLogin = () => {
    const header = classes("header-btn-group");
    const html = `
            <div class="dropdown" id="dropdown">
                <ion-icon
                    class="header-avatar"
                    name="person-circle-outline"
                    onclick="openMenu()"
                ></ion-icon>
                <ul
                    id="dropdown-menu"
                    class="dismiss"
                >
                    <li>
                        <span class="dropdown-item" onclick="logout()">Đăng xuất</span>
                    </li>
                </ul>
            </div>
            `;
    if (sessionStorage.getItem("phone")) {
        replaceTargetWith("header-btn-group", html);
    }
};

const replaceTargetWith = (targetID, html) => {
    var i,
        div,
        elm,
        last,
        target = document.getElementById(targetID);
    div = document.createElement("div");
    div.innerHTML = html;
    i = div.childNodes.length;
    last = target;
    while (i--) {
        target.parentNode.insertBefore((elm = div.childNodes[i]), last);
        last = elm;
    }
    target.parentNode.removeChild(target);
};

const openMenu = (e) => {
    const dropdownMenu = id("dropdown-menu");
    if (window.getComputedStyle(dropdownMenu).display === "block") {
        dropdownMenu.style.display = "none";
    } else {
        dismiss();
        dropdownMenu.style.display = "block";
    }
};

const logout = () => {
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("password");
    const dropdown = classes("dropdown");
    if (dropdown[0]) {
        replaceTargetWith(
            "dropdown",
            `
                <div
                    id="header-btn-group"
                    class="text-end header-btn-group d-flex justify-content-center"
                >
                    <a href="../html/login.html" class="text-decoration-none">
                        <button type="button" class="btn btn-login me-2">
                            Đăng nhập
                        </button></a
                    >
                    <a
                        href="../html/register.html"
                        class="text-decoration-none"
                    >
                        <button type="button" class="btn btn-register">
                            Đăng ký
                        </button></a
                    >
                </div>
            `
        );
    }
    location.reload();
};

window.onload = renderIsLogin();
