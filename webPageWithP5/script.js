console.log("script works");

let circlePosSlider = document.getElementById("circlePositionSlider");
let circleSli

function setup() {
  let canvas = createCanvas(200, 200);
  canvas.parent("canvasContainer");

  background(0);
}

function draw() {
  background(0);
  fill("lightyellow");

  console.log(circlePosSlider.value);

  circle(width/2, height/2, 50);

}
