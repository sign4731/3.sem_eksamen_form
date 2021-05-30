export const paymentMethod = {
  mobilepay: false,
  card: false,
  contactless: false,
};

export function getPaymentMethod() {
  document.querySelectorAll(".payment_icon").forEach((button) => {
    button.addEventListener("click", () => {
      paymentMethod[button.dataset.payment] = true;
      document.querySelector(`[data-payment=${button.dataset.payment}]`).classList.add("chosen");

      document.querySelectorAll(".payment_icon").forEach((method) => {
        if (button.dataset.payment !== method.dataset.payment) {
          method.classList.remove("chosen");
          paymentMethod[method.dataset.payment] = false;
        }
      });
    });
  });
}
