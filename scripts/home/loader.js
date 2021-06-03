export function removeLoader() {
  console.log("loader is removed");
  document.querySelector("#loading").classList.add("hidden_fade");
}
export function showLoader() {
  console.log("loader is shown");
  document.querySelector("#loading").classList.remove("hidden_fade");
}
