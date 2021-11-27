let img;
let cam;

function preload() {
  img = createImage(640, 480);
}


function setup(){
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  // cam.id = "cameraStream"
  // cam.hide();
}

function draw() {
  background("yellow");


  img.loadPixels();
  cam.loadPixels();

  for(let y = 0; y < 480; y++){
    for(let x = 0; x < 640; x++){

      let index = (y * width + x) * 4;

      let red = cam.pixels[index + 0];
      let green = cam.pixels[index + 1];
      let blue = cam.pixels[index + 2];
      // let alpha = cam.pixels[index + 3];

      img.pixels[index + 0] = 130;
      img.pixels[index + 1] = green;
      img.pixels[index + 2] = 150;
      img.pixels[index + 3] = 255;
    }
  }
  img.updatePixels();

  image(img, 0, 0);
}
