let audioBool1 = true;
let audioBool2 = false;
let audioBool3 = false;
let audioBool4 = false;
let audioBool5 = false;

let archerFlag1 = true;
let archerFlag2 = false;
let archerFlag3 = false;
let archerFlag4 = false;
let archerFlag5 = false;


let cycleFinish = false;

function preload() {
  archer1 = loadImage("libraries/pictures/archer1-bow.png");
  archer2 = loadImage("libraries/pictures/archer1-raise.png");
  archer3 = loadImage("libraries/pictures/archer1-draw.png");
  archer4 = loadImage("libraries/pictures/archer1-release.png");
  archer5 = loadImage("libraries/pictures/archer1-finish.png");

  archerMad1 = loadImage("libraries/pictures/archer1-bow-upset.png");
  archerMad2 = loadImage("libraries/pictures/archer1-raise-upset.png");
  archerMad3 = loadImage("libraries/pictures/archer1-draw-upset.png");

  angerQuiet = loadImage("libraries/pictures/anger-quiet.png");
  angerSpeak = loadImage("libraries/pictures/anger-speak.png");

  backgroundHalf = loadImage("libraries/pictures/background-half.png");

  archerBowMusic = loadSound("libraries/sounds/archer-standby.mp3");
  archerRaiseMusic = loadSound("libraries/sounds/archer-readying.mp3");
  archerDrawMusic = loadSound("libraries/sounds/archer-anticipate.mp3");

  arrowRelease = loadSound("libraries/sounds/arrow-release.mp3");
  arrowBang = loadSound("libraries/sounds/arrow-bang.mp3");
}

function setup() {
  frameRate(60);
  createCanvas(720, 720);
  var canvas = document.getElementById("canvas");


  // background(0);
  // image(backgroundHalf, 0, 0);
  alert("Please remember to read the rules... You will regret it otherwise!");

  archer = new Archer();
  blackOut = new BlackOut();
  music = new Music();
}

function draw() {
  image(backgroundHalf, 0, 0);

  blackOut.update();
  blackOut.display();

  archer.update();

  if(audioBool1){
    music.bowMusic();
  }else if(audioBool2){
    music.raiseMusic();
  }else if(audioBool3){
    music.drawMusic();
  }else if(audioBool4){
    music.arrowRelease();
  }else if(audioBool5){
    music.arrowBang();
  }

  if(archer.counter == archer.randomStandby){
    audioBool1 = true;
  }
}

class Archer {
  constructor() {
    this.counter = 0;

    this.randomStandby = int(random(350, 420));
    this.randomReadying = int(random(100, 200));
    this.randomAnticipate = int(random(90, 400));
    this.randomHold = int(random(120, 180));
    this.finishHold = 120;

    this.coinFlip = random(0, 1);
  }
  update() {
    if(this.counter == this.randomStandby){
      archerFlag1 = true;
    }else if(this.coutner == this.randomStandby + this.randomReadying){
      archerFlag2 = true;
    }else if(this.counter == this.randomStandby + this.randomReadying + this.randomAnticipate){
      archerFlag3 = true;
    }else if(this.counter == this.randomStandby + this.randomReadying + this.randomAnticipate + this.randomHold){
      archerFlag4 = true; 
    }
  }
}


class BlackOut {
  constructor() {
    this.color = 0;
    this.alpha = 255;
  }
  display() {
    fill(this.color, this.alpha);
    rect(0, 0, 720, 720);
  }
  update() {
    if (cycleFinish == false) {
      this.alpha -= 2;
    } else if (this.alpha <= 0) {
      this.alpha = 0;
    }
    if (cycleFinish == true) {
      this.alpha += 2;
    } else if (this.alpha >= 255) {
      this.alpha = 255;
    }
  }
}

class Music {
  bowMusic(){
    archerBowMusic.play();
    audioBool1 = false;
  }
  raiseMusic(){
    archerRaiseMusic.play();
    audioBool2 = false;
  }
  drawMusic(){
    archerDrawMusic.play();
    audioBool3 = false;
  }
  arrowRelease(){
    arrowRelease.play();
    audioBool4 = false;
  }
  arrowBang(){
    arrowBang.play();
    audioBool5 = false;
  }
}


// var dice = random(0, 1);
//   if(dice - 0.5 > 0){
//     console.log("true")
//   }else{
//     console.log("false")
//   }
