import "./sass/style.scss";

window.addEventListener("DOMContentLoaded", init);
let filter = "flavor";

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
    restatCounter();
  });

  let basket_item_name = beer.name.split(" ").join("_").toLowerCase() + "_basket";

  document.querySelector(".add_beer").addEventListener("click", addToBasket);

  function addToBasket() {
    console.log(basket_item_name, "is added to basket");
    const basketItem = createAddedElement(beer, basket_item_name);
    console.log(basketItem);

    if (!basket[basketItem.dataset.field]) {
      console.log(basket_item_name);
      basket[basketItem.dataset.field] = true;
      document.querySelector(".added_beers").append(basketItem);

      calculateBasketAmount(basket_item_name);
      restatCounter();
    } else if (basket[basketItem.dataset.field]) {
      console.log(basket_item_name);
      let new_amount = parseFloat(document.querySelector(".amount").value);
      let old_amount = parseFloat(document.querySelector(`.${basket_item_name} .basket_amount`).value);
      let newnewAmount = old_amount + new_amount;

      document.querySelector(`.${basket_item_name} .basket_amount`).value = newnewAmount;

      const price = 40 * newnewAmount;

      document.querySelector("#basket p:nth-child(5)").textContent = price + ",-";

      calculateBasketAmount(basket_item_name);
      restatCounter();
    }
  }

  document.querySelector(".plus").addEventListener("click", plus);
  document.querySelector(".minus").addEventListener("click", minus);

  setColorsOfBeer(beer);
  addEventListenerToButtons();
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
  console.log(basketCounter);
  function plusBasket() {
    console.log("hej plus");
    basketCount++;
    console.log(basketCount);
    basketCounter.value = basketCount;
    document.querySelector(".minus").style.backgroundColor = "white";
  }
  function minusBasket() {
    console.log("hej minus");
    if (basketCount > 0) {
      basketCount--;
      basketCounter.value = basketCount;
      if (basketCount < 1) {
        document.querySelector(".minus").style.backgroundColor = "#f4f4f4";
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

  const button = document.createElement("button");
  button.classList.add("close_added_beer");
  button.value = "x";

  li.append(button);
  const img = document.createElement("img");
  img.src = `beer_images_with_circle/${beer.name}.png`;
  li.append(img);

  let text = [beer.name, "40,-", price];
  text.forEach(function (el) {
    const p = document.createElement("p");
    p.textContent = el;
    li.append(p);
  });

  const div = document.createElement("div");
  li.append(div);

  const plus_minus_button_value = ["+", "-"];

  plus_minus_button_value.forEach(function (el) {
    const button = document.createElement("button");
    button.textContent = el;

    if (el === "+") {
      button.classList.add("plus_minus", "plus_basket");
    } else {
      button.classList.add("plus_minus", "minus_basket");
    }

    div.append(button);
  });

  const input = document.createElement("input");
  const amount = document.querySelector(".amount").value;
  input.classList.add("basket_amount");

  input.value = amount;
  input.disabled = true;

  li.append(input);

  return li;
}

function restatCounter() {
  document.querySelector(".amount").value = 1;
  count = 1;
}
