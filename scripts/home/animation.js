import { gsap } from "gsap";

export function startStaggerAnimation() {
  gsap.from(".card", {
    duration: 0.5,
    scale: 0.5,
    opacity: 0,
    delay: 0.5,
    stagger: 0.1,
    ease: "ease-in-out",
    force3D: true,
  });
}

export function startBasketAnimation() {
  gsap.to("#basket", { duration: 1, x: 0 });
}
