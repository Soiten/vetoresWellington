let quant_bolas = 10;
let grav = new p5.Vector(0, 0.016);
let cores = [];
let raios = [];
let massas = [];
let pos = [];
let vels = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < quant_bolas; i++) {
    pos.push(createVector(random(width), random(20)));
    vels.push(createVector(random(-2, 2), random(-2, 2)));
    let taxa = random(1, 2);
    massas.push(taxa * 20);
    raios.push(taxa * 7);
    cores.push((taxa - 1) * 330);
  }
}

function draw() {
  background(10);

  for (let i = 0; i < quant_bolas; i++) {
    for (let j = 0; j < quant_bolas; j++) {
      if (j == i) continue;
      const distance = pos[i].dist(pos[j]);
      if (distance < raios[i] + raios[j]) {
        [pos[i], vels[i], pos[j], vels[j]] = resolveCollision(
          pos[i],
          vels[i],
          massas[i],
          raios[i],
          pos[j],
          vels[j],
          massas[j],
          raios[j],
          distance
        );
      }
    }
    if (pos[i].x < raios[i]) {
      pos[i].x = raios[i];
      vels[i].mult(-1, 1);
    }
    if (pos[i].y < raios[i]) {
      pos[i].y = raios[i];
      vels[i].mult(1, -1);
    }
    if (pos[i].x > width - raios[i]) {
      pos[i].x = width - raios[i];
      vels[i].mult(-1, 1);
    }
    if (pos[i].y > height - raios[i]) {
      pos[i].y = height - raios[i];
      vels[i].mult(1, -1);
    }

    vels[i].add(grav);
    pos[i].add(vels[i]);
    fill(cores[i], 100, 100);
    circle(pos[i].x, pos[i].y, raios[i] * 2);
  }
}

function resolveCollision(p1, v1, m1, r1, p2, v2, m2, r2, distance) {
  let n = p5.Vector.sub(p1, p2).div(distance);
  let p = p5.Vector.sub(p5.Vector.mult(v1, n), p5.Vector.mult(v2, n))
    .mult(2)
    .div(m1 + m2);
  v1 = p5.Vector.sub(v1, p5.Vector.mult(n, p5.Vector.mult(p, m1)));
  v2 = p5.Vector.add(v2, p5.Vector.mult(n, p5.Vector.mult(p, m2)));

  let mid = p5.Vector.sub(p2, p1).setMag(r1).add(p1).add(p1.copy().sub(p2).setMag(r2).add(p2)).mult(0.5);

  p1 = mid.copy().add(
    p1
      .copy()
      .sub(mid)
      .setMag(r1 * 1.01)
  );
  p2 = mid.copy().add(
    p2
      .copy()
      .sub(mid)
      .setMag(r2 * 1.01)
  );

  return [p1, v1, p2, v2];
}

function mouseClicked() {
  quant_bolas++;
  pos.push(createVector(mouseX, mouseY));
  vels.push(createVector(random(-2, 2), random(-2, 2)));
  let taxa = random(1, 2);
  massas.push(taxa * 20);
  raios.push(taxa * 7);
  cores.push((taxa - 1) * 330);
}
