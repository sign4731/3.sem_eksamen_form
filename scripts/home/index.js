import "../../sass/index.scss";
import { addEventListenerToScreensaver } from "./screensaver";
import { getPaymentMethod } from "./payment_method";
import { pressingOrder, basket } from "./order";
import { displayTotal, calculateBasketAmount, removeBasketItem, createAddedElement } from "./basket";
import { setColorsOfBeer, setColorOfBackButton } from "./colors";
import { addEventListenerToButtons } from "./buttons";

const countEl = document.querySelector(".amount");
let count = countEl.value;

window.addEventListener("load", init);

function init() {
  addEventListenerToScreensaver();
  getData();
  addEventListenerToButtons();
  console.log("page is loaded");
}

async function getData() {
  let url = "https://hold-kaeft-vi-har-det-godt.herokuapp.com/beertypes";
  let jsonData = await fetch(url);
  jsonData = await jsonData.json();
  console.log({ jsonData });

  let container = document.querySelector("#beerlist_container");
  let temp = document.querySelector("template");

  jsonData.forEach((beer) => {
    const clone = temp.cloneNode(true).content;

    const beerName = beer.name;
    clone.querySelector(".beer_image").src = `beer_images_with_circle/${beerName}.png`;
    clone.querySelector(".beer_name").textContent = beer.name;
    clone.querySelector(".price").textContent = "40,-";
    clone.querySelector(".alc").textContent = beer.alc + "% alc.";

    clone.querySelector(".template-article").addEventListener("click", () => showDetails(beer, beerName));

    container.appendChild(clone);
  });

  getPaymentMethod();
  document.querySelector(".basket_pay").addEventListener("click", pressingOrder);
}

function showDetails(beer, beerName) {
  console.log(beer);
  const details = document.querySelector("#singleview");
  details.style.display = "block";

  details.querySelector(".sv_beer_image").src = `beer_images_shadow/${beerName}.png`;
  details.querySelector(".sv_beer_name").textContent = beer.name;
  details.querySelector(".sv_alc").textContent = beer.alc + "% alc.";
  details.querySelector(".description").textContent = beer.description.overallImpression;
  details.querySelector(".sv_price").textContent = "40,-";

  details.querySelector(".aroma_desc").textContent = beer.description.aroma;
  details.querySelector(".appearence_desc").textContent = beer.description.appearance;
  details.querySelector(".flavor_desc").textContent = beer.description.flavor;
  details.querySelector(".mouthfeel_desc").textContent = beer.description.mouthfeel;

  document.querySelector(".close_singleview").addEventListener("click", function () {
    details.style.display = "none";

    document.querySelector(".plus").removeEventListener("click", plus);
    document.querySelector(".minus").removeEventListener("click", minus);
    document.querySelector(".add_beer").removeEventListener("click", addToBasket);

    restatCounter();
  });

  let basket_item_name = beer.name.split(" ").join("_").toLowerCase() + "_basket";

  document.querySelector(".add_beer").addEventListener("click", addToBasket);

  function addToBasket() {
    const basketItem = createAddedElement(beer, basket_item_name);
    if (!basket[basketItem.dataset.field]) {
      basket[basketItem.dataset.field] = true;
      document.querySelector(".added_beers ul").append(basketItem);

      //animate item in
      document.querySelector(`.${basket_item_name}`).classList.add("backInLeft");

      checkIfPaymentIsChosen();
      removeEmptyBasketText();
      calculateBasketAmount(basket_item_name);
      restatCounter();
    } else if (basket[basketItem.dataset.field]) {
      console.log(basket_item_name);
      let new_amount = parseFloat(document.querySelector(".amount").value);
      let old_amount = parseFloat(document.querySelector(`.${basket_item_name} .basket_amount`).value);
      let newnewAmount = old_amount + new_amount;

      document.querySelector(`.${basket_item_name} .basket_amount`).value = newnewAmount;

      const price = 40 * newnewAmount;
      console.log(basketItem);
      document.querySelector(`.${basket_item_name} .subtotal`).textContent = price + ",-";

      calculateBasketAmount(basket_item_name);
      restatCounter();
    }

    removeBasketAnimationClass(basket_item_name);
    displayTotal();

    document.querySelector(`.remove_${basket_item_name}`).addEventListener("click", () => {
      removeBasketItem(basketItem, basket_item_name);
    });
  }

  document.querySelector(".plus").addEventListener("click", plus);
  document.querySelector(".minus").addEventListener("click", minus);

  setColorOfBackButton(beer);
  setColorsOfBeer(beer);
}

function restatCounter() {
  document.querySelector(".amount").value = 1;
  count = 1;

  document.querySelector(".minus").style.backgroundColor = "#f4f4f4";
}

export function plus() {
  console.log(count);
  count++;
  countEl.value = count;
  document.querySelector(".minus").style.backgroundColor = "white";
}

export function minus() {
  console.log(count);
  if (count > 1) {
    count--;
    countEl.value = count;
    if (count < 2) {
      document.querySelector(".minus").style.backgroundColor = "#f4f4f4";
    }
  }
}

function removeBasketAnimationClass(basket_item_name) {
  setTimeout(() => {
    document.querySelector(`.${basket_item_name}`).classList.remove("backInLeft");
  }, 1000);
}

function checkIfPaymentIsChosen() {
  document.querySelectorAll(".payment_icon").forEach(function (method) {
    if (method.classList.contains("chosen")) {
      document.querySelector(".basket_pay").style.opacity = 1;
    }
  });
}

function removeEmptyBasketText() {
  document.querySelector(".empty_basket").style.display = "none";
}
