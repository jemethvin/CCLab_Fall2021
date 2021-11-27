let img;
let cam;

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  img = createImage(width, height);
  background(0);
  noStroke();
}

function draw() {

  cam.loadPixels();
  cam.hide();
  img.loadPixels();

  for(let y = 0; y <= 480; y + 16){
    for(let x = 0; x <= 640; x + 16){

      let index = (x + y*img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      fill(r, g, b);

      triangle(x - 8, y, x + 8, y, x, y + 16);
      x += 16;
      if(x > 640){
        y += 16;
      }
    }
  }
  for(let y = 16; y <= 480; y + 16){
    for(let x = 8; x <= 640; x + 16){

      let index = (x + y*img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let alpha = cam.pixels[index + 3];

      fill(r, g, b);

      triangle(x - 8, y, x + 8, y, x, y - 16);
      x += 16;
      if(x > 640){
        y += 16;
      }
    }
  }
  console.log(frameRate());
}
