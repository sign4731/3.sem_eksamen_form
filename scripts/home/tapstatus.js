export async function getTapData(jsonData) {
  let url = "https://hold-kaeft-vi-har-det-godt.herokuapp.com/";
  let tapData = await fetch(url);
  tapData = await tapData.json();

  checkTapStatus(tapData["taps"], jsonData);
}

export const available = {
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

function checkTapStatus(taps, jsonData) {
  setStartStyleArticle();

  taps.forEach((beerTap) => {
    for (let i = 0; i < jsonData.length; i++) {
      const beername = jsonData[i].name;
      console.log(beername);

      if (beerTap.beer === beername) {
        available[beername] = true;
        console.log(available.beername);
        console.log(available);
        document.querySelector(`[data-beer="${beername} image"]`).style.opacity = 1;
        document.querySelector(`[data-beeravailability="${beername} availability"]`).style.opacity = 0;
      }
    }
  });

  setTimeout(() => {
    checkTapStatus(taps, jsonData);
  }, 100000);
}

function setStartStyleArticle() {
  const beerArticles = document.querySelectorAll(".beer_image");
  console.log(beerArticles);

  beerArticles.forEach((article) => {
    article.style.opacity = 0.3;
  });

  const not_available = document.querySelectorAll(".tap_status");
  not_available.forEach((p) => {
    p.style.opacity = 1;
  });
}
