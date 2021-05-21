import "./sass/style.scss";

window.addEventListener("DOMContentLoaded", init);
let filter = "flavor";

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
    clone.querySelector(".beer_image").src = `beer_images/${beerName}.png`;
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

  details.querySelector(".sv_beer_image").src = `beer_images/${beerName}.png`;
  details.querySelector(".sv_beer_name").textContent = beer.name;
  details.querySelector(".sv_alc").textContent = beer.alc + "% alc.";
  details.querySelector(".description").textContent = beer.description.overallImpression;
  details.querySelector(".sv_price").textContent = "40,-";

  details.querySelector(".aroma_desc").textContent = beer.description.aroma;
  details.querySelector(".appearence_desc").textContent = beer.description.appearance;
  details.querySelector(".flavor_desc").textContent = beer.description.flavor;
  details.querySelector(".mouthfeel_desc").textContent = beer.description.mouthfeel;

  document.querySelector(".close_singleview").addEventListener("click", () => (details.style.display = "none"));
  addEventListenerToButtons();
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
