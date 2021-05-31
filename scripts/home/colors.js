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

export function setColorsOfBeer(beer) {
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

export function setColorOfBackButton(beer) {
  console.log(beer.name);
  if (beer.name === "GitHop" || beer.name === "Mowintime") {
    console.log("sercolor of baxk");
    document.querySelector(".close_singleview").style.backgroundImage = "url(/back_white.svg)";
  } else {
    document.querySelector(".close_singleview").style.backgroundImage = "url(/back.svg)";
  }
}