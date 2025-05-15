src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"

document.addEventListener("DOMContentLoaded", (event) => {
  console.clear();

  // Function maintains aspect ratio and distance
  // between Splash and slogan image
  
  const svg = document.getElementById("splash_svg");
  // console.log(`const svg, ${svg}!`)
  const slogan = document.getElementById("splash_slogan_img");
  // console.log(`const slogan, ${slogan}!`)
  function updateImageSize() {
    const svgWidth = svg.clientWidth;
     // console.log(`const svgWidth, ${svgWidth}!`)
    const svgHeight = svg.clientHeight;
    // console.log(`const svgHeight, ${svgHeight}!`)
    const ratio = 0.425;
     // console.log(`const ratio, ${svg}!`)
    const resultWidth = svgWidth * ratio;
     // console.log(`const resultWidth, ${resultWidth}!`)
    const resultHeight = resultWidth * 0.175714286;
    // console.log(`const resultHeight, ${resultHeight}!`)
    slogan.style.width = `${resultWidth}px`;
    // console.log(`const resultWidth, ${slogan.style.width}!`)
    slogan.style.height = `${resultHeight}px`;
    // console.log(`const resultWidth, ${resultHeight}!`)

    // console.log(" Function slogan.style.width:")
    // console.log(slogan.style.width);
  }
  updateImageSize();

  // updates image size when browser size changes.
  window.addEventListener("resize", updateImageSize);

// Wrapper function: GSAP match media
  
gsap.set("#dot", {opacity:1, xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" }, 0);
  
gsap.from(".st0", {
  duration: .25,
  drawSVG: 0, 
  stagger: .25,
});

// Reegister plugins  
gsap.registerPlugin(DrawSVGPlugin,
CustomBounce, CustomEase, MotionPathPlugin, MotionPathHelper)

// declare variables
const tl = gsap.timeline();
  
tl.set("#dot", {x:0, y:0});
  
CustomBounce.create('myBounce', {
strength:0.6,
squash:4,
endAtStart: false,
squashID: "myBounce-squash"                 
})

tl.addLabel("Part I")
  .to("#dot", { y: 400, duration: 2, ease: "myBounce" })
  .to("#dot", { rotation: 15, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0)
  .to("#dot", {rotation: "+=25", x: 25, duration: 1, ease: "power1.in" }, 0)
  .to("#dot", {duration: 2.2, scaleX: 1.6, scaleY: 0.4, ease: "myBounce-squash"},0)
   
tl.addLabel("Part II")
  .to("#dot", {duration: 2,scaleX: 1.4, scaleY: 0.6, ease: "myBounce-squash", transformOrigin: "center bottom"}, 0)
  .to("#dot", { duration: 2,
  motionPath: {
    path: "M24.14,403.18299 C59.233,395.89299 -2.013,460.12399 22.775,616.90599 25.34225,633.14274 112.257,443.31199 122.096,367.81999 125.962,338.14799 115.543,497.54699 123.296,497.54699",
    align: "self",
    alignOrigin: [0.5, 0.5],
    autoRotate:true,
    selected: true,
  },
    ease: "myBounce",
});
 
tl.addLabel("Part III")
  .to("#dot", {y: 780, duration: 2, ease: "myBounce" },"-=.5")
  .to("#dot", {duration: 2,scaleX: 1.7, scaleY: 0.8, ease: "myBounce-squash", transformOrigin: "center bottom"}, 0)
     
tl.addLabel("Part IV")
  .to("#dot", {duration: 2, scaleX: 1.4, scaleY: 0.6, ease:"myBounce-squash", transformOrigin: "center bottom"})
  .to("#dot", {duration: 2, ease: "bounce.in", 
      motionPath: {
        path: [
          { x: 65, y: 780 },
          { x: 165, y: 250 },
          { x: 282, y: 830 }
            ],
         curviness: 3
}});
  
  <!-- try resizeObserver to keep slogan centered at all times -->
  
  const svg_cont = document.getElementById('svg_container');
  function setSloganPosition(xPercent, yPercent) {
    slogan.style.left = `${xPercent}%`;
    slogan.style.top = `${yPercent}%`;
 }

setSloganPosition(30, 99);

window.addEventListener('resize', () => {
    // Get the current percentages
    const xPercent = parseFloat(slogan.style.left);
    const yPercent = parseFloat(slogan.style.top);
    
    // Update child element position
    setSloganPosition(30, 99);
});

  tl.addLabel("Part V")
    .to("#dot", { duration: 1, r: 8, fill:"#D6B807" })
    .to("#dot", .3, {scale: 3, opacity: 0, ease: "power4.out",
  onComplete: () => tl.set("#dot", { scale: 2, opacity: 1 })
                    });
  
CustomEase.getSVGData('myBounce', {path:"#bounce", width:1920, height:780});

CustomEase.getSVGData('myBounce-squash', {path:"#squash", width:1920, height:780});

CustomEase.getSVGData('dot', {path:"#dot", width:1920, height:830});

GSDevTools.create({animation:tl});

// MotionPathHelper.create("#dot",)
});
