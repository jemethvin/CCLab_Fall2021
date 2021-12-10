//feedback: 
//1. add restart button
//2. more impressive explosion effects
//3. auto-initialize 

aliens = [];
bullets = [];
fighters = [];
stars = [];

alienCount = 0;
shootCount = 0;

alienTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);

  fighter = fighters.push(new Fighter());
}

function draw() {
  background(0);
  push();
  translate(20, 20);
  textSize(15);
  textAlign(LEFT);
  fill(150);
  text('Arrow keys to move,', 0, 0)
  text('Space key to fire.', 0, 25)
  pop();
  
  alienTimer += 1;
  if (alienTimer % 500 == 499 && alienCount < 6) {
    alienCount += 1;
    aliens.push(new Alien(fighters[0].angle));
  }
  if (alienTimer > 500) {
    alienTimer = 0;
  }

  bullets.push(
    new Bullet(
      fighters[0].x,
      fighters[0].y,
      fighters[0].angle,
      fighters[0].speed
    )
  );
  for (let i = 0; i < 1; i++) {
    if (bullets[i].active == true) {
      bullets[i].display();
      bullets[i].update();
    }
    if (bullets[i].active == false) {
      bullets[i].x = fighters[0].x;
      bullets[i].y = fighters[0].y;
      bullets[i].angle = fighters[0].angle;
    }
    if (
      bullets[i].x > fighters[0].x + 700 ||
      bullets[i].x < fighters[0].x - 700 ||
      bullets[i].y < fighters[0].y - 700 ||
      bullets[i].y > fighters[0].y + 700
    ) {
      // if(bullets[i].x > width + 50 || bullets[i].x < -50 || bullets[i].y > height + 50 || bullets[i].y < -50){
      bullets.splice(0, 1);
      // bullets[i].update();
    }
    if (bullets.length > 1) {
      bullets.splice(bullets.length - 1, 1);
      bullets[i].update();
    }
    if (keyIsDown(32) == true) {
      bullets[i].active = true;
    }
  }
  for (let i = 0; i < aliens.length; i++) {
    if (dist(aliens[i].x, aliens[i].y, fighters[0].x, fighters[0].y) < 70) {
      fighters[0].explode = true;
    }
    for (let j = 0; j < bullets.length; j++) {
      if (
        dist(aliens[i].x, aliens[i].y, bullets[j].x, bullets[j].y) < 40 &&
        bullets[j].active == true
      ) {
        aliens[i].explode = true;
        bullets[j].active = false;
        shootCount += 1;
      }
      if (aliens[i].explode == true) {
        stars.push(
          new Star(aliens[i].x, aliens[i].y, aliens[i].color)
        );
        aliens.splice(i, 1);
        alienCount -= 1;
      }
    }
  }
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
  if (fighters[0].explode == false) {
    fighters[0].keyIsDown();
    fighters[0].update();
    fighters[0].display();
  } else {
    push();
    translate(width/2, height/2);
    
    fill(71, 71, 71)
    stroke(255);
    rect(0, 0, 150, 35);
    rect(0, 50, 100, 20);
    
    fill(255);
    stroke(0);
    textSize(20);
    textAlign(CENTER);
    text('Game Over', 0, 5)
    textSize(10);
    text('Your score: ' + shootCount,  0, 52)
    
    pop();
    fighters.splice(0, 1);
    noLoop();
  }
  for (i = 0; i < alienCount; i++) {
    // EXPLOSION SHOULD GO HERE // hi
    aliens[i].update();
    aliens[i].display();
  }
}
class Fighter {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;

    this.angle = 90;
    this.speed = 0;

    this.upArrow = false;
    this.leftArrow = false;
    this.rightArroupArrow = false;

    this.explode = false;
  }
  display() {
    push();
    noStroke();

    translate(this.x, this.y);
    rotate(this.angle);
    // scale(3)

    fill(255); //ship main body
    rect(0, 0, 30, 20);
    rect(20, 0, 30, 10);
    rect(-15, -15, 30, 10);
    rect(-15, 15, 30, 10);
    rect(-20, -25, 10, 10);
    rect(-20, 25, 10, 10);

    fill(255, 0, 0); //detailing
    rect(-30, -15, 5, 10);
    rect(-30, 15, 5, 10); //wing tips

    fill(0, 0, 255); //wind shield
    rect(0, 0, 10, 20);

    // un-commentate for "crosshair"
    // stroke(255);
    // line(0, 0, 100, 0);
    pop();
  }
  update() {
    //updating the ship's position (calculated from center)
    this.x = this.x + this.speed * cos(this.angle);
    this.y = this.y + this.speed * sin(this.angle);

    //turning; left turns hold priority over right turns. lefty justice
    if (this.upArrow == true && this.speed <= 10) {
      this.speed += 0.25;
    } else if (this.speed > 10) {
      this.speed = 10;
    } else if (this.upArrow == false && this.speed > 0) {
      this.speed -= 0.15;
    } else {
      this.speed = 0;
    }
    if (this.leftArrow == true) {
      // "turns" the ship via this.a and this.d booleans
      this.angle -= 2.5;
    } else if (this.rightArrow == true) {
      this.angle += 2.5;
    }
    if (this.angle > 360) {
      //limits the angle between 0 and 360
      this.angle = 0;
    } else if (this.angle < 0) {
      this.angle = 360;
    }
    if (this.x >= width + 40) {
      //screen looping (X COORDINATE)
      this.x = -40;
    } else if (this.x < -40) {
      this.x = width + 40;
    }
    if (this.y >= height + 40) {
      //screen looping (Y COORDINATE)
      this.y = -40;
    } else if (this.y < -40) {
      this.y = height + 40;
    }
  }
  keyIsDown() {
    //console.log(key, keyCode);

    //booleans used to flag whether or not the ship
    //should move forward and/or turn
    if (keyIsDown(LEFT_ARROW)) {
      this.leftArrow = true;
    } else {
      this.leftArrow = false;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.rightArrow = true;
    } else {
      this.rightArrow = false;
    }
    if (keyIsDown(UP_ARROW)) {
      this.upArrow = true;
    } else {
      this.upArrow = false;
    }
  }
}

class Bullet {
  constructor(x, y, angle, speed) {
    this.x = x;
    this.y = y;

    this.angle = angle;
    this.speed = 15;

    this.active = false;
  }
  display() {
    push();
    noStroke();
    fill("orange");
    rect(this.x, this.y, 20);
    pop();
  }
  update() {
    if (this.active == true) {
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }
  }
}

class Alien {
  constructor(angle) {
    this.x = random(-60, width + 60);
    this.y = -60;
    this.speed = random(-5, 5);
    this.angle = random(-angle, angle);

    //RNG to decide what color the alien will be; default color is white but may immediately switch
    // this.colorDice = random(0, 4);
    this.colorDice = ceil(random(0, 6));

    this.color = "white";

    this.explode = false;
  }
  display() {
    push();
    noStroke();
    translate(this.x, this.y);
    fill(this.color);
    //body
    rect(0, 0, 60, 40);
    //arms
    rect(-35, 0, 10, 20);
    rect(35, 0, 10, 20);
    rect(-45, 15, 10, 30);
    rect(45, 15, 10, 30);
    rect(-15, 25, 10, 20);
    rect(15, 25, 10, 20);
    //antennae
    rect(-10, -25, 10, 10);
    rect(10, -25, 10, 10);
    rect(-20, -35, 10, 10);
    rect(20, -35, 10, 10);
    //eyes
    fill(0);
    rect(-15, 0, 10, 20);
    rect(15, 0, 10, 20);
    pop();
  }
  update() {
    //update location and direction
    this.x -= this.speed * cos(this.angle);
    this.y -= this.speed * sin(this.angle);

    //update alien color
    if (this.colorDice == 1) {
      this.color = "purple"; //purple
    } else if (this.colorDice == 2) {
      this.color = "blue"; //blue
    } else if (this.colorDice == 3) {
      this.color = "yellow"; //yellow
    } else if (this.colorDice == 4) {
      this.color = "green"; //green
    } else if (this.colorDice == 5) {
      this.color = "red";
    } else {
      this.color = "white";
    }

    //make sure speed value cannot be 0
    if (-1 < this.speed < 0) {
      this.speed = random(-10, -3);
    } else if (-3 < this.speed < 3) {
      this.speed = random(3, 10);
    }

    // console.log(this.x, this.y);
    if (this.x >= windowWidth + 80) {
      //screen looping (X COORDINATE)
      this.x = -80;
    } else if (this.x < -80) {
      this.x = windowWidth + 80;
    }
    if (this.y >= windowHeight + 80) {
      //screen looping (Y COORDINATE)
      this.y = -80;
    } else if (this.y < -80) {
      this.y = windowHeight + 80;
    }
  }
}

class Star {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    
    this.starPosX = random(-20, 20);
    this.starPosY = random(-20, 20);
    
    this.color = color;
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.color)
    rect(this.starPosX, this.starPosY, random(10, 20));
    rect(this.starPosX, this.starPosY, random(10, 20));
    pop();
  }
}