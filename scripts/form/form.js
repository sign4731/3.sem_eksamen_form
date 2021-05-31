import "../../sass/index.scss";
import IMask from "imask";

("use strict");

window.addEventListener("DOMContentLoaded", init);

function init() {
  setCardNumberMask();
  setExpiryDateMask();
  document.querySelector(".pay").addEventListener("click", checkTextValidity);
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

function setCardNumberMask() {
  const cardnumber = document.querySelector("#cardnumber");
  const cardnumberOption = {
    mask: "0000 0000 0000 0000",
  };
  const cardnumberMask = IMask(cardnumber, cardnumberOption);
}

function setExpiryDateMask() {
  const expiry_date = document.querySelector("#expiry_date");
  const expiryDateOption = {
    mask: "00/00",
  };
  const expiry_dateMask = IMask(expiry_date, expiryDateOption);
}
