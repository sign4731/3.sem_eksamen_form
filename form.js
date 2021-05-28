import "./sass/style.scss";

("use strict");

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log(localStorage);
  document.querySelector(".pay").addEventListener("click", checkTextValidity);
}

function checkTextValidity() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  if (form.checkValidity()) {
    console.log("form is valid");
    postOrder();
    // window.location.href = "process.html";
  } else {
    console.log("form is not valid");
  }
}
function postOrder() {
  let order = localStorage.getItem("itemsArray");
  console.log(order);

  fetch("https://hold-kaeft-vi-har-det-godt.herokuapp.com/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: order,
  })
    .then((res) => res.json())
    .then((order) => console.log(order));
}
