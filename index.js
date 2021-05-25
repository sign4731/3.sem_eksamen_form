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

  document.querySelector(".add_beer").addEventListener("click", () => createAddedElement(beer));

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
  let container = document.querySelector(".added_beers");
  let temp = document.querySelector("#basket_template");

  // const clone = temp.cloneNode(true).content;
  let clone = temp.content.cloneNode(true).firstElementChild;
  clone.querySelector(".basket_article").dataset.field = beer.name;
  clone.querySelector(".basket_beer_image").src = `beer_images_with_circle/${beer.name}.png`;
  clone.querySelector(".basket_beer_name").textContent = beer.name;
  clone.querySelector(".basket_beer_price").textContent = "40,-";
  clone.querySelector(".basket_beer_subtotal").textContent = "40" * document.querySelector(".amount").value;

  container.appendChild(clone);

  restatCounter();
}

function restatCounter() {
  document.querySelector(".amount").value = 0;
}
