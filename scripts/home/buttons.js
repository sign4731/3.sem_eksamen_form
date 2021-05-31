let filter = "flavor";

export function addEventListenerToButtons() {
  document.querySelectorAll(".description_tabs button").forEach((btn) => {
    btn.addEventListener("click", filterDesc);
  });
  document.querySelector(".basket_icon").addEventListener("click", function () {
    document.querySelector("#basket").style.display = "block";
    document.querySelector("#help_body").style.display = "none";
  });
  document.querySelector(".help_icon").addEventListener("click", function () {
    document.querySelector("#help_body").style.display = "flex";
  });
  document.querySelector(".home_icon").addEventListener("click", function () {
    document.querySelector("#basket").style.display = "none";
    document.querySelector("#help_body").style.display = "none";
  });
  document.querySelector(".help_logo").addEventListener("click", function () {
    document.querySelector("#help_body").style.display = "flex";
    document.querySelector(".back").addEventListener("click", goBack);
  });
  function goBack() {
    document.querySelector("#help_body").style.display = "none";
    document.querySelector(".back").removeEventListener("click", goBack);
  }
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