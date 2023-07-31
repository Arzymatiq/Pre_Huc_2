//buttons
let logInButton = document.querySelector(".log_in_Button");
let registerUserModalBtn = document.querySelector("#register");
let loginUserModalBtn = document.querySelector("#LogIn");

let registerModalBtn = document.querySelector("#register_modal_btn");
let LogInModalBtn = document.querySelector("#LogIn_modal_btn");

let registerToModalBtn = document.querySelector("#register");
let logInToModalBtn = document.querySelector("#LogIn");

let saveChangesBtn = document.querySelector(".saveChangesBtn");
// let addProductBtn = document.querySelector('.addProductBtn')
//blocks
let registerUserModalBlock = document.querySelector(".register_inputs");
let loginUserModalBlock = document.querySelector(".LogIn_inputs");
//inputs connection
let inputsRegAvatar = document.querySelector(".reg-user_ava");
let inputsRegUserName = document.querySelector(".reg-user_name");
let inputsRegPassword = document.querySelector(".reg-password");
let inputsRegPasswordConfirm = document.querySelector(".reg-password_confirm");

let inputslogInUserName = document.querySelector(".logIn-user_Uame");
let inputslogInUserPassword = document.querySelector(".logIn-password");

let showPeapleOnLineText = document.querySelector(".disabled");

//add products inputs
let addProductsTitle = document.querySelector("#add_product_title");
let addProductsDesk = document.querySelector("#add_product_desk");
let addProductsImg = document.querySelector("#add_product_img");
let addProductBtn = document.querySelector("#add_product_btn");
let addProductsPrice = document.querySelector("#add_product_price");
// main
let cardContaner = document.querySelector("#card_contaner");

// change product inp
let changeAvatar = document.querySelector("#change_avatar_inp");
let changeTitle = document.querySelector("#change_title_inp");
let changeDesk = document.querySelector("#change_desk_inp");
let changePrice = document.querySelector("#change_price_inp");

console.log(inputsRegPassword);
let User_api = "http://localhost:8000/users";

function checkUserForProductCreate() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) return user.isAdmin;
    return false;
}
// console.log(checkAdmin());
function inputCleaner() {
    inputsRegUserName.value = "";
    inputsRegPassword.value = "";
    inputsRegPasswordConfirm.value = "";
}
registerUserModalBtn.addEventListener("click", () => {
    registerUserModalBlock.setAttribute(
        "style",
        "display: flex !important;flex-direction: column !important;"
    );
    registerModalBtn.setAttribute("style", "display: block !important;");

    loginUserModalBlock.setAttribute("style", "display: none !important;");
    LogInModalBtn.setAttribute("style", "display: none !important;");
});

loginUserModalBtn.addEventListener("click", () => {
    registerUserModalBlock.setAttribute("style", "display: none !important;");
    registerModalBtn.setAttribute("style", "display: none !important;");

    loginUserModalBlock.setAttribute(
        "style",
        "display: flex !important;flex-direction: column !important"
    );
    LogInModalBtn.setAttribute("style", "display: block !important;");
});

async function checkTodbRegister(username) {
    let res = await fetch(User_api);
    let data = await res.json();
    data = data.some((item) => item.name == username);
    console.log(data);
    return data;
}
async function regiserFunc() {
    if (
        !inputsRegUserName.value.trim() ||
        !inputsRegPassword.value.trim() ||
        !inputsRegPasswordConfirm.value.trim()
    ) {
        alert("some inputs are empty");
        return;
    }
    let checkingUserToregister = await checkTodbRegister(
        inputsRegUserName.value
    );
    if (checkingUserToregister) {
        alert("this user name is already exist");
        return;
    }
    if (inputsRegPassword.value !== inputsRegPasswordConfirm.value) {
        alert("password id dpn't match");
        return;
    }
    let userObj = {
        avatar: inputsRegAvatar.value,
        name: inputsRegUserName.value,
        password: inputsRegPassword.value,
        isAdmin: false,
    };
    await fetch(User_api, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    inputCleaner();
}
registerModalBtn.addEventListener("click", regiserFunc);

async function checkTodbLogIn(username) {
    let res = await fetch(User_api);
    let data = await res.json();
    data = data.some((item) => item.name == username);
    console.log(data);
    return data;
}

async function checkUserObj(UserPass) {
    try {
        let res = await fetch(User_api);
        let data = await res.json();
        let matchedUser = data.find((element) => element.name === UserPass);

        if (matchedUser) {
            return matchedUser;
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function loginFunc() {
    if (!inputslogInUserName.value || !inputslogInUserPassword.value) {
        alert("some inputs are empty");
        return;
    }

    let userObj = await checkUserObj(inputslogInUserName.value);

    // let checkingUserToLogIn = await checkTodbLogIn(inputslogInUserName.value);

    if (!userObj) {
        alert("there is no people online");
        return;
    }
    console.log(userObj);
    if (userObj.password != inputslogInUserPassword.value) {
        return alert("password wrong");
    }

    let LogInuserObj = {
        name: inputslogInUserName.value,
        password: inputslogInUserPassword.value,
        isAdmin: true,
    };

    localStorage.setItem("user", JSON.stringify(LogInuserObj));
}
LogInModalBtn.addEventListener("click", loginFunc);

function showPeapleOnLine() {
    let a = JSON.parse(localStorage.getItem("user"));

    if (a) {
        showPeapleOnLineText.innerText = `${a.name} online`;
        return;
    } else {
        showPeapleOnLineText.innerText = `no user online`;
        return;
    }
}
showPeapleOnLine();

//add logic

// addProductsTitle
// addProductsDesk
// addProductsImg
// addProductBtn
function checkUserForProductCreate() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) return user.isAdmin;
    return false;
}
let products_Api = "http://localhost:8000/products";

async function render() {
    cardContaner.innerHTML = ``;
    let res = await fetch(products_Api);
    let products = await res.json();
    products.forEach(
        (product) =>
            (cardContaner.innerHTML += `
            
                <div class="card" style="width: 18rem;">
                    <img src="${
                        product.url
                    }" class="card-img-top" alt="error:(" width:80%>
                    <div class="card-body">
                     <h5 class="card-title">${product.title}</h5>
                         <p class="card-text">${product.price}$</p>
                         ${
                             checkUserForProductCreate()
                                 ? `
                         <a href="#" class="btn btn-primary btn-edit" data-bs-toggle="modal"
                         data-bs-target="#changeModal" id ="edit${product.id}">edit</a> 
                         <a href="#" class="btn btn-primary btn-delete" id ="delete-${product.id}">delete</a>`
                                 : `
                         `
                         }
                         <a href="#" class="btn btn-primary save-to-cart" id ="order-${
                             product.id
                         }">order now</a>
                            
                </div>
            </div>
    `)
    );
    addEditEvent();
    addDeleteEvent();
}
render();
//add ligic
async function addProducts() {
    if (
        !addProductsTitle.value ||
        !addProductsDesk.value ||
        !addProductsImg.value ||
        !addProductsPrice.value
    ) {
        alert("some inputs are empty");
        return;
    }
    let productObj = {
        title: addProductsTitle.value,
        deck: addProductsDesk.value,
        url: addProductsImg.value,
        price: addProductsPrice.value,
    };
    await fetch(products_Api, {
        method: "POST",
        body: JSON.stringify(productObj),
        headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    await render();
}
addProductBtn.addEventListener("click", addProducts);

async function addProductDataToForm(e) {
    let productId = e.target.id.split("")[4];
    console.log(productId);

    let res = await fetch(`${products_Api}/${productId}`);
    let productObj = await res.json();

    console.log(productObj);
    changeAvatar.value = productObj.url;
    changeTitle.value = productObj.title;
    changeDesk.value = productObj.deck;
    changePrice.value = productObj.price;

    saveChangesBtn.setAttribute("id", productObj.id);
}
//edit logic
function addEditEvent() {
    let editProductBtns = document.querySelectorAll(".btn-edit");
    editProductBtns.forEach((btn) =>
        btn.addEventListener("click", addProductDataToForm)
    );
}
async function saveChanges(e) {
    let updatedProductObj = {
        id: e.target.id,
        url: changeAvatar.value,
        title: changeTitle.value,
        desc: changeDesk.value,
        price: changePrice.value,
    };
    console.log(updatedProductObj);
    await fetch(`${products_Api}/${e.target.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProductObj),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    saveChangesBtn.removeAttribute("id");
    render();
}
saveChangesBtn.addEventListener("click", saveChanges);
//delete logic
async function deleteProductFromData(e) {
    let productId = e.target.id.split("-")[1];
    console.log(productId);
    let res = await fetch(`${products_Api}/${productId}`, {
        method: "DELETE",
    });
    render;
}

function addDeleteEvent() {
    let deleteProductBtns = document.querySelectorAll(".btn-delete");
    deleteProductBtns.forEach((btn) =>
        btn.addEventListener("click", deleteProductFromData)
    );
}
