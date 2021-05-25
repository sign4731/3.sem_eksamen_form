import "./sass/style.scss";

window.addEventListener("DOMContentLoaded", init);
let filter = "flavor";

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
  console.log(beer, beerName);
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
    document.querySelector(".amount").value = 0;
  });

  // document.querySelector(".add_beer").addEventListener("click", () => createAddedElement(beer));
  document.querySelector(".add_beer").addEventListener("click", () => {
    const basketItem = createAddedElement(beer);
    console.log(basketItem.dataset.field);
    if (!basket[basketItem.dataset.field]) {
      basket[basketItem.dataset.field] = true;
      document.querySelector(".added_beers").append(basketItem);
      restatCounter();
      console.log(basket);
    } else if (basket[basketItem.dataset.field]) {
      console.log(basketItem);
      let new_amount = document.querySelector(".amount").value;
      let old_amount = document.querySelector(".basket_amount").value;
      console.log(new_amount);
      console.log(document.querySelector(".basket_amount").value);
      let newnewAmount = old_amount.parseInt + new_amount.parseInt;
      console.log(typeOf(newnewAmount));
      document.querySelector(".basket_amount").value = newnewAmount;
    }
  });

  setColorsOfBeer(beer);
  calculateAmount(beer);
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

function calculateAmount() {
  document.querySelector(".plus").addEventListener("click", () => plus());
  document.querySelector(".minus").addEventListener("click", () => minus());
  const countEl = document.querySelector(".amount");
  let count = countEl.value;

  function plus() {
    count++;
    countEl.value = count;
    document.querySelector(".minus").style.backgroundColor = "white";
  }
  function minus() {
    if (count > 0) {
      count--;
      countEl.value = count;
      if (count < 1) {
        document.querySelector(".minus").style.backgroundColor = "#f4f4f4";
      }
    }
  }
}

function createAddedElement(beer) {
  console.log(beer);
  const price = 40 * document.querySelector(".amount").value;
  const li = document.createElement("li");
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
    button.classList.add("plus_minus");
    div.append(button);
  });
  const input = document.createElement("input");
  const amount = document.querySelector(".amount").value;
  input.classList.add("basket_amount");
  input.value = amount;
  input.disabled = true;
  li.append(input);

  console.log(li);

  return li;
}

function restatCounter() {
  document.querySelector(".amount").value = 0;
}
