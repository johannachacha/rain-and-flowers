let petals = [];
let drops = [];

let numPetals = 90;
let numDrops = 140;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let i = 0; i < numPetals; i++) {
    petals.push(new Petal(random(width), random(-height, 0)));
  }

  for (let i = 0; i < numDrops; i++) {
    drops.push(new Drop(random(width), random(-height, 0)));
  }
}

function draw() {
  drawGradientBackground();

  // lluvia
  for (let d of drops) {
    d.update();
    d.show();
  }

  // pétalos
  for (let p of petals) {
    p.update();
    p.show();
  }
}

// 🌧 clase lluvia
class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(4, 10);
    this.length = random(10, 20);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }

  show() {
    stroke(200, 200, 255, 180);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
  }
}

// 🌸 clase pétalos
class Petal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(12, 24);
    this.speed = random(1, 3);
    this.angle = random(360);
    this.rotationSpeed = random(-1, 1);
  }

  update() {
    this.y += this.speed;
    this.angle += this.rotationSpeed;

    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(random(240, 255), random(150, 180), random(160, 200), 220);
    ellipse(0, 0, this.size * 1.3, this.size);
    pop();
  }
}

// 🌅 fondo degradado
function drawGradientBackground() {
  let c1 = color(255, 200, 230);
  let c2 = color(180, 140, 220);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let col = lerpColor(c1, c2, inter);
    stroke(col);
    line(0, y, width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
