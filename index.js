import "./sass/style.scss";

window.addEventListener("DOMContentLoaded", init);
let filter = "flavor";

const paymentMethod = {
  mobilepay: false,
  card: false,
  contactless: false,
};

const countEl = document.querySelector(".amount");
let count = countEl.value;

const beerColors = {
  "Ruined Childhood": "#75b2ff",
  "El Hefe": "#ffda58",
  GitHop: "#553333",
  "Row 26": " #f85229",
  "Hollaback Lager": "#e8d2ae",
  "Hoppily Ever After": "#3ccb75",
  Sleighride: "#e072a4",
  Mowintime: "#3454d1",
  Steampunk: "#ff912d",
  "Fairy Tale Ale": "#ace365",
};

const basket = {
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

const Order = {};

function init() {
  getData();
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
  document.querySelector(".basket_pay").addEventListener("click", pressingPay);
}

function getPaymentMethod() {
  document.querySelectorAll(".payment_icon").forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button);
      paymentMethod[button.dataset.payment] = true;
      document.querySelector(`[data-payment=${button.dataset.payment}]`).classList.add("chosen");
      console.log(button.dataset.payment);
      console.log(paymentMethod);
      document.querySelectorAll(".payment_icon").forEach((method) => {
        if (button.dataset.payment !== method.dataset.payment) {
          method.classList.remove("chosen");
          paymentMethod[method.dataset.payment] = false;
          console.log(paymentMethod);
        }
      });
    });
  });
}

function pressingPay() {
  console.log("pay is pressed!");
  if (Object.keys(paymentMethod).every((k) => !paymentMethod[k])) {
    console.log("no payment chosen!");
  } else if (paymentMethod.mobilepay) {
    console.log("mobilepay is chosen");
  } else if (paymentMethod.card) {
    console.log("card is chosen");
  } else if (paymentMethod.contactless) {
    console.log("contactless is chosen");
  }
}

function showDetails(beer, beerName) {
  console.log(beer);
  const details = document.querySelector("#singleview");
  details.style.display = "block";

  console.log(count);
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
    // document.querySelector(".remove_added_beer").removeEventListener("click", removeBasketItem);
    restatCounter();
  });

  let basket_item_name = beer.name.split(" ").join("_").toLowerCase() + "_basket";

  document.querySelector(".add_beer").addEventListener("click", addToBasket);

  function addToBasket() {
    console.log(basket_item_name, "is added to basket");
    const basketItem = createAddedElement(beer, basket_item_name);

    if (!basket[basketItem.dataset.field]) {
      console.log(basket_item_name);
      basket[basketItem.dataset.field] = true;
      document.querySelector(".added_beers ul").append(basketItem);

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
      document.querySelector(`.${basket_item_name} p:nth-child(4)`).textContent = price + ",-";

      calculateBasketAmount(basket_item_name);
      restatCounter();
    }

    displayTotal();

    document.querySelector(`.remove_${basket_item_name}`).addEventListener("click", () => {
      removeBasketItem(basketItem, basket_item_name);
    });
  }

  document.querySelector(".plus").addEventListener("click", plus);
  document.querySelector(".minus").addEventListener("click", minus);

  setColorsOfBeer(beer);
  addEventListenerToButtons();
}

function removeBasketItem(basketItem, basket_item_name) {
  console.log("you want to remove", basketItem);
  document.querySelector(`.remove_${basket_item_name}`).removeEventListener("click", removeBasketItem);
  basketItem.remove();
  basket[basketItem.dataset.field] = false;
  displayTotal();
}

function setColorsOfBeer(beer) {
  for (const [name, color] of Object.entries(beerColors)) {
    if (beer.name === name) {
      document.querySelector(".add_beer").style.backgroundColor = color;
      document.documentElement.style.setProperty("--colored_bg", color);
    } else if (!beer.name === name) {
      document.querySelector(".add_beer").style.backgroundColor = "#343331";
      document.documentElement.style.setProperty("--colored_bg", "#343331");
    }
  }
}

function addEventListenerToButtons() {
  document.querySelectorAll(".description_tabs button").forEach((btn) => {
    btn.addEventListener("click", filterDesc);
  });
}

function filterDesc() {
  filter = this.dataset.field;
  document.querySelectorAll(".description_tabs button").forEach((btn) => {
    btn.classList.remove("chosen_desc");
  });

  document.querySelectorAll(".desc_wrapper p").forEach((p) => {
    p.classList.add("hidden");
  });

  this.classList.add("chosen_desc");
  document.querySelector(`.${filter}_desc`).classList.remove("hidden");
}

function plus() {
  console.log(count);
  count++;
  countEl.value = count;
  document.querySelector(".minus").style.backgroundColor = "white";
}

function minus() {
  console.log(count);
  if (count > 1) {
    count--;
    countEl.value = count;
    if (count < 2) {
      document.querySelector(".minus").style.backgroundColor = "#f4f4f4";
    }
  }
}

function calculateBasketAmount(basket_item_name) {
  document.querySelector(`.${basket_item_name} .plus_basket`).addEventListener("click", () => plusBasket());
  document.querySelector(`.${basket_item_name} .minus_basket`).addEventListener("click", () => minusBasket());
  console.log(document.querySelector(`.${basket_item_name} .minus_basket`));

  let basketCounter = document.querySelector(`.${basket_item_name} .basket_amount`);
  let basketCount = basketCounter.value;
  // let basketPrice = parseInt(document.querySelector(`.${basket_item_name} .basket_text:nth-child(4)`).textContent);

  function plusBasket() {
    console.log("hej plus");
    basketCount++;
    basketCounter.value = basketCount;
    let newBasketPrice = 40 * basketCount;
    let newnewPrice = newBasketPrice.toString();
    document.querySelector(`.${basket_item_name} .basket_text:nth-child(4)`).textContent = `${newnewPrice},-`;
    document.querySelector(`.${basket_item_name} .minus_basket`).style.backgroundColor = "white";
    displayTotal();
  }
  function minusBasket() {
    console.log("hej minus");
    if (basketCount > 1) {
      basketCount--;
      basketCounter.value = basketCount;
      let newBasketPrice = 40 * basketCount;
      let newnewPrice = newBasketPrice.toString();
      document.querySelector(`.${basket_item_name} .basket_text:nth-child(4)`).textContent = `${newnewPrice},-`;
      displayTotal();

      if (basketCount < 2) {
        document.querySelector(`.${basket_item_name} .minus_basket`).style.backgroundColor = "#f4f4f4";
        displayTotal();
      }
    }
  }
}

function createAddedElement(beer, basket_item_name) {
  console.log(beer);

  const price = 40 * document.querySelector(".amount").value + ",-";
  console.log(price);

  const li = document.createElement("li");
  li.classList.add(basket_item_name);
  li.dataset.field = beer.name;

  const img = document.createElement("img");
  img.src = `beer_images_with_circle/${beer.name}.png`;
  li.append(img);

  const div_text = document.createElement("div");
  const div_amount = document.createElement("div");
  li.append(div_text);
  div_text.append(div_amount);

  let text = [beer.name, "40,-", price];
  text.forEach(function (el) {
    const p = document.createElement("p");
    p.textContent = el;
    p.classList.add("basket_text");
    div_text.append(p);
  });

  const plus_minus_button_value = ["+", "-"];

  plus_minus_button_value.forEach(function (el) {
    const button = document.createElement("button");
    button.textContent = el;

    if (el === "+") {
      button.classList.add("plus_minus", "plus_basket");
    } else {
      button.classList.add("plus_minus", "minus_basket");
    }

    div_amount.append(button);
  });

  const input = document.createElement("input");
  const amount = document.querySelector(".amount").value;
  input.classList.add("basket_amount");

  input.value = amount;
  input.disabled = true;

  div_amount.append(input);

  const button = document.createElement("button");
  button.classList.add("remove_added_beer", `remove_${basket_item_name}`);
  li.append(button);

  return li;
}

function restatCounter() {
  document.querySelector(".amount").value = 1;
  count = 1;
}

function displayTotal() {
  let priceCount = 0;
  document.querySelectorAll(".basket_text:nth-child(4)").forEach((element) => {
    let itemTotal = parseInt(element.textContent);
    console.log(itemTotal);
    priceCount += itemTotal;
  });
  console.log("this is price count", priceCount);
  let stringifiedPrice = priceCount.toString();
  console.log("price as string", stringifiedPrice);
  document.querySelector(".total_price").textContent = `${priceCount},-`;
}
