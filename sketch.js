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

  // texto / poema
  drawTextOverlay();

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

// ---------- FONDO DEGRADADO ----------
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let t = map(y, 0, height, 0, 1);
    let c = lerpColor(
      color(255, 220, 235), // arriba
      color(160, 130, 210), // abajo
      t
    );
    stroke(c);
    line(0, y, width, y);
  }

  // brillo suave
  noStroke();
  fill(255, 255, 255, 40);
  ellipse(width * 0.2, height * 0.2, 260, 260);
}

// ---------- TEXTO / POEMA ----------
function drawTextOverlay() {
  noStroke();
  fill(255, 245, 255, 230);
  textSize(18);
  text("soft rain, falling petals", 20, 30);
  textSize(13);
  text("move the mouse: petals drift towards you", 20, 52);
}

// ---------- CLASE PÉTALO ----------
class Petal {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = random(0.7, 1.8);
    this.drift = random(-0.6, 0.6);
    this.size = random(12, 24);
    this.angle = random(360);
    this.rotationSpeed = random(-1, 1);
    this.baseColor = color(random(240, 255), random(140, 190), random(190, 240));
    this.glow = random(100, 180);
  }

  update() {
    this.pos.y += this.speed;
    this.pos.x += this.drift + sin(frameCount * 0.5 + this.angle) * 0.2;
    this.angle += this.rotationSpeed;

    // ligera atracción al mouse si está cerca
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < 200) {
      let lerpAmt = 0.003; // más grande = se acercan más rápido
      this.pos.x = lerp(this.pos.x, mouseX, lerpAmt);
      this.pos.y = lerp(this.pos.y, mouseY, lerpAmt * 0.5);
    }

    if (this.pos.y > height + 20) {
      this.pos.y = random(-120, -10);
      this.pos.x = random(width);
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    // halo brillante
    noStroke();
    fill(255, 200, 230, this.glow * 0.4);
    ellipse(0, 0, this.size * 1.8, this.size * 2.4);

    // pétalo
    fill(this.baseColor);
    ellipse(0, 0, this.size * 0.9, this.size * 1.8);
    pop();
  }
}

// ---------- CLASE GOTA ----------
class Drop {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.len = random(8, 16);
    this.speed = random(4, 9);
  }

  update() {
    this.pos.y += this.speed;

    if (this.pos.y > height) {
      this.pos.y = random(-200, 0);
      this.pos.x = random(width);
    }
  }

  show() {
    stroke(200, 220, 255, 180);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.len);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
