export async function getTapData(jsonData) {
  let url = "https://hold-kaeft-vi-har-det-godt.herokuapp.com/";
  let tapData = await fetch(url);
  tapData = await tapData.json();

  checkTapStatus(tapData["taps"], jsonData);
}

function checkTapStatus(taps, jsonData) {
  setStartStyleArticle();

  taps.forEach((beerTap) => {
    for (let i = 0; i < jsonData.length; i++) {
      const beersOnTap = jsonData[i].name;
      console.log(beersOnTap);

      if (beerTap.beer === beersOnTap) {
        document.querySelector(`[data-beer="${beersOnTap} article"]`).style.opacity = 1;
        // document.querySelector(`[data-beerbutton="${beersOnTap} button"]`).style.opacity = 1;
      }
    }
  });
  setTimeout(() => {
    checkTapStatus(taps, jsonData);
  }, 100000);
}

function setStartStyleArticle() {
  const beerArticles = document.querySelectorAll(".template-article");
  beerArticles.forEach((article) => {
    article.style.opacity = 0.3;
  });
}
