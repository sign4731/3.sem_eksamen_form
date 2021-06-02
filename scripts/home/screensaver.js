import startStaggerAnimation from "./stagger_animation";
export function addEventListenerToScreensaver() {
  document.querySelector("#screensaver").addEventListener("click", removeScreensaver);

  function removeScreensaver() {
    document.querySelector("#screensaver").classList.add("hidden_fade");
    document.querySelector("#screensaver").removeEventListener("click", removeScreensaver);

    startStaggerAnimation();
  }
}
