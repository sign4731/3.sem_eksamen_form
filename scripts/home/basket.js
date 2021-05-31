export function displayTotal() {
  let priceCount = 0;
  document.querySelectorAll(".subtotal").forEach((element) => {
    let itemTotal = parseInt(element.textContent);
    console.log(itemTotal);
    priceCount += itemTotal;
  });

  console.log("this is price count", priceCount);
  let stringifiedPrice = priceCount.toString();
  console.log("price as string", stringifiedPrice);
  document.querySelector(".total_price").textContent = `${priceCount},-`;
  getBasketNumber(priceCount);
}

function getBasketNumber(priceCount) {
  let basketNumber = priceCount / 40;
  console.log(basketNumber);
  if (basketNumber < 1) {
    document.querySelector(".basket_number").classList.add("hidden");
  } else {
    document.querySelector(".basket_number").classList.remove("hidden");
    document.querySelector(".basket_number").textContent = basketNumber;
  }
}

export function calculateBasketAmount(basket_item_name) {
  document.querySelector(`.${basket_item_name} .plus_basket`).addEventListener("click", () => plusBasket());
  document.querySelector(`.${basket_item_name} .minus_basket`).addEventListener("click", () => minusBasket());
  console.log(document.querySelector(`.${basket_item_name} .minus_basket`));

  let basketCounter = document.querySelector(`.${basket_item_name} .basket_amount`);
  let basketCount = basketCounter.value;

  function plusBasket() {
    basketCount++;
    basketCounter.value = basketCount;
    let newBasketPrice = 40 * basketCount;
    let newnewPrice = newBasketPrice.toString();
    document.querySelector(`.${basket_item_name} .subtotal`).textContent = `${newnewPrice},-`;
    document.querySelector(`.${basket_item_name} .minus_basket`).style.backgroundColor = "white";
    displayTotal();
  }
  function minusBasket() {
    console.log("hej minus");
    if (basketCount > 1) {
      basketCount--;
      basketCounter.value = basketCount;
      let newBasketPrice = 40 * basketCount;
      let newnewPrice = newBasketPrice.toString();
      document.querySelector(`.${basket_item_name} .subtotal`).textContent = `${newnewPrice},-`;
      displayTotal();

      if (basketCount < 2) {
        document.querySelector(`.${basket_item_name} .minus_basket`).style.backgroundColor = "#f4f4f4";
        displayTotal();
      }
    }
  }
}

export function removeBasketItem(basketItem, basket_item_name) {
  console.log("you want to remove", basketItem);
  document.querySelector(`.remove_${basket_item_name}`).removeEventListener("click", removeBasketItem);
  basketItem.remove();
  basket[basketItem.dataset.field] = false;
  displayTotal();
}

export function createAddedElement(beer, basket_item_name) {
  console.log(beer);

  const price = 40 * document.querySelector(".amount").value + ",-";
  console.log(price);

  const li = document.createElement("li");
  li.classList.add(basket_item_name);
  li.dataset.field = beer.name;

  const img = document.createElement("img");
  img.src = `beer_images_with_circle/${beer.name}.png`;
  li.append(img);

  const div_text = document.createElement("div");
  const div_amount = document.createElement("div");
  li.append(div_text);
  div_text.append(div_amount);

  let text = ["40,-", beer.name];
  text.forEach(function (el) {
    const p = document.createElement("p");
    console.log(p);
    p.textContent = el;
    p.classList.add("basket_text");
    div_text.append(p);
  });

  const totalAmount = document.createElement("p");
  totalAmount.textContent = price;
  totalAmount.classList.add("subtotal");
  li.append(totalAmount);

  const minus_button = document.createElement("button");
  minus_button.textContent = "-";
  minus_button.classList.add("plus_minus", "minus_basket");
  div_amount.append(minus_button);

  const input = document.createElement("input");
  const amount = document.querySelector(".amount").value;
  input.classList.add("basket_amount");
  div_amount.append(input);

  input.value = amount;
  input.disabled = true;

  const plus_button = document.createElement("button");
  plus_button.textContent = "+";
  plus_button.classList.add("plus_minus", "plus_basket");
  div_amount.append(plus_button);

  const button = document.createElement("button");
  button.classList.add("remove_added_beer", `remove_${basket_item_name}`);
  li.append(button);

  return li;
}
