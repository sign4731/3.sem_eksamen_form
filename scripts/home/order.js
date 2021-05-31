import { paymentMethod } from "./payment_method";

export const basket = {
    "Ruined Childhood": false,
    "El Hefe": false,
    GitHop: false,
    "Row 26": false,
    "Hollaback Lager": false,
    "Hoppily Ever After": false,
    Sleighride: false,
    Mowintime: false,
    Steampunk: false,
    "Fairy Tale Ale": false,
};

export function pressingOrder() {
    console.log("pay is pressed!");
    localStorage.clear();
    console.log(localStorage);
    document.querySelectorAll(".pay_alert_message").forEach((btn) => {
        btn.classList.add("hidden");
    });
    if (Object.keys(basket).every((k) => !basket[k])) {
        console.log("basket is empty!");
        document
            .querySelector(".pay_alert_message:nth-child(4)")
            .classList.remove("hidden");
    } else if (Object.keys(paymentMethod).every((k) => !paymentMethod[k])) {
        console.log("no payment chosen!");
        document.querySelector(".pay_alert_message").classList.remove("hidden");
    } else if (paymentMethod.mobilepay) {
        console.log("mobilepay is chosen");
        document
            .querySelector(".pay_alert_message:nth-child(3)")
            .classList.remove("hidden");
    } else if (paymentMethod.contactless) {
        console.log("contactless is chosen");
        document
            .querySelector(".pay_alert_message:nth-child(3)")
            .classList.remove("hidden");
    } else if (paymentMethod.card) {
        console.log("card is chosen");
        findBasketItems();
        window.location.href = "form.html";
    }
}

function findBasketItems() {
    const basketItems = [];

    document.querySelectorAll(".added_beers li").forEach((element) => {
        let elementName = element.dataset.field;
        let elementAmount = document.querySelector(
            `.${element.className} .basket_amount`
        ).value;
        console.log(elementName);

        let items = JSON.parse(localStorage.getItem("itemsArray")) || [];
        let item = {
            name: elementName,
            amount: elementAmount,
        };
        items.push(item);
        basketItems.push(item);

        localStorage.setItem("itemsArray", JSON.stringify(items));

        console.log(JSON.parse(localStorage.getItem("itemsArray")));
    });

    setPaymentAmount(basketItems);

    function setPaymentAmount(items) {
        let totalPrice = 0;

        items.forEach((item) => {
            totalPrice += item.amount * 40;
        });

        localStorage.setItem("paymentAmount", JSON.stringify(totalPrice));
    }
}
