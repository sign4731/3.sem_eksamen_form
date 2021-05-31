import "../../sass/index.scss";

("use strict");

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log(localStorage);
    document.querySelector(".pay").addEventListener("click", checkTextValidity);

    showPaymentAmount();
}

function showPaymentAmount() {
    let paymentAmount = localStorage.getItem("paymentAmount");

    document.querySelector(
        ".payment_amount"
    ).textContent = `${paymentAmount},-`;
}

async function checkTextValidity() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    if (form.checkValidity()) {
        console.log("form is valid");
        const orderid = await postOrder();
        console.log(orderid);
        window.location.href = `process.html?id=${orderid}`;
    } else {
        console.log("form is not valid");
    }
}

async function postOrder() {
    let order = localStorage.getItem("itemsArray");
    console.log(order);

    let jsonData = await fetch(
        "https://hold-kaeft-vi-har-det-godt.herokuapp.com/order",
        {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: order,
        }
    );
    const data = await jsonData.json();
    return data.id;
}
