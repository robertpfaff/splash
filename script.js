console.clear();

CustomEase.create("swish", "M0,0 C0,0 -0.097,0.589 0.1,0.589 0.3,0.589 0.075,0 0.212,0 0.344,0 0.106,0.9 0.354,0.9 0.508,0.9 0.319,0 0.443,0 0.601,0 0.423,0.806 0.57,0.806 0.651,0.806 0.529,0.01 0.717,0.01 0.904,0.01 0.811,1 0.917,1 1.002,1 1,0 1,0 ");

gsap.registerPlugin(DrawSVGPlugin, CustomEase, CustomBounce);

const tl = gsap.timeline({});
// onComplete: myFunction resolve to home

tl.set(".circle", {opacity:0});

tl.from(".st0", {
  drawSVG: 0,
  stagger: 0.20,
  ease: "power1.inOut",  
});

tl.to(".circle", {opacity: 1}, ">");
// '>' insert at the END of the previous animation

tl.to(".circle", {delay: 0.1, duration: 2, y: -500, strength: .7, squash: 4, ease: "swish" }, ">");
