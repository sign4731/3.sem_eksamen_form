import { gsap } from "gsap";

export default function startStaggerAnimation() {
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
