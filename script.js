const QUANT_CIRCULOS = 50;

const raios = [];
const pos = [];
const vels = [];
const grav = new p5.Vector(0, 0.06);

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);

  //valores iniciais
  for (let i = 0; i < QUANT_CIRCULOS; i++) {
    raios.push(random(4, 10));
    pos.push(createVector(random(width), random(height)));
    vels.push(createVector(random(-2.5, 2.5), random(-2.5, 2.5)));
  }
}

function draw() {
  background(60);

  const mouseVec = createVector(mouseX, mouseY);

  for (let i = 0; i < QUANT_CIRCULOS; i++) {
    //fisica
    vels[i].add(grav);
    pos[i].add(vels[i]);

    //colisoes
    if (pos[i].y + raios[i] > height) {
      pos[i].y = height - raios[i];
      vels[i].y *= -1;
    }

    if (pos[i].x + raios[i] > width) {
      pos[i].x = width - raios[i];
      vels[i].x *= -1;
    }

    if (pos[i].x - raios[i] < 0) {
      pos[i].x = raios[i];
      vels[i].x *= -1;
    }

    //drag
    vels[i].mult(0.997);

    //aplica aceleração na direção do mouse
    if (mouseIsPressed) {
      noFill();
      circle(mouseX, mouseY, 50 * 2);
      let diferenca = p5.Vector.sub(mouseVec, pos[i]);
      if (diferenca.mag() < 50) {
        vels[i].add(diferenca.limit(1.5));
      }
    }

    //desenha
    fill(pos[i].x, 100, 100);
    circle(pos[i].x, pos[i].y, raios[i] * 2);
  }
}
