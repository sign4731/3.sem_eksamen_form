export function addEventListenerToScreensaver() {
  document.querySelector("#screensaver").addEventListener("click", removeScreensaver);

  function removeScreensaver() {
    document.querySelector("#screensaver").style.display = "none";
    document.querySelector("#screensaver").removeEventListener("click", removeScreensaver);
  }
}
