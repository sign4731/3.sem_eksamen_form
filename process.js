import "./sass/style.scss";

window.addEventListener("DOMContentLoaded", init);

function init() {
  getData();
}

async function getData() {
  let url = "https://hold-kaeft-vi-har-det-godt.herokuapp.com";
  let jsonData = await fetch(url);
  jsonData = await jsonData.json();

  getOrderId(jsonData);
  setTimeout(function () {
    getData();
  }, 5000);
}

function getOrderId(jsonData) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const orderId = parseInt(urlParams.get("id"));

  trackOrder(jsonData, orderId);
  showOrderId(orderId);
}

function showOrderId(orderId) {
  document.querySelector(".order_number").textContent = " #" + orderId;
}

function trackOrder(jsonData, orderId) {
  const serving = jsonData["serving"];

  let orderInQueue = null;
  let servingOrder = false;

  for (let i = 0; i < serving.length; i++) {
    if (serving[i].id == orderId) {
      servingOrder = true;
      orderInQueue = false;
    } else {
      servingOrder = false;
    }
  }

  setCircleTransition();
  setQueueStatus();
  SetServingStatus();
  setOrderDoneStatus();

  console.log(`queue = ${orderInQueue}`);
  console.log(`serving = ${servingOrder}`);

  function setQueueStatus() {
    if (orderInQueue === null) {
      orderInQueue = true;
    }

    if (orderInQueue === true) {
      console.log("order is in queue");

      setTimeout(() => {
        document.querySelector("#process_main svg circle:nth-child(2)").style.strokeDashoffset = "calc(530px - (530px * 33.33) / 100)";
      }, 500);
    }
  }

  function SetServingStatus() {
    if (servingOrder === true) {
      console.log("order is being served");

      document.querySelector(".ill").src = "/public/preparing-order.svg";
      document.querySelector("#process_main svg circle:nth-child(2)").style.strokeDashoffset = "calc(530px - (530px * 66.66) / 100)";
    }
  }

  function setOrderDoneStatus() {
    if (orderInQueue === false && servingOrder === false) {
      console.log("order is done");
      document.querySelector(".ill").src = "/public/order-done.svg";
      document.querySelector("#process_main svg circle:nth-child(2)").style.strokeDashoffset = "calc(530px - (530px * 100) / 100)";

      servingOrder = false;
      orderInQueue = false;
    }
  }
}

function setCircleTransition() {
  document.querySelector("#process_main > div.percent > svg > circle:nth-child(2)").style.transition = "stroke-dashoffset 1s linear";
}
