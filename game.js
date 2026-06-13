const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let p1 = { x: 50, y: 200, hp: 100 };
let p2 = { x: 500, y: 200, hp: 100 };

let bullets = [];

// KEY CONTROLS
let keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// SHOOT FUNCTION
function shoot(player) {
  bullets.push({
    x: player.x,
    y: player.y,
    dx: player === p1 ? 5 : -5,
    owner: player
  });
}

// INPUT
function update() {
  // Player 1 (WASD)
  if (keys["w"]) p1.y -= 3;
  if (keys["s"]) p1.y += 3;
  if (keys["a"]) p1.x -= 3;
  if (keys["d"]) p1.x += 3;

  // Player 2 (Arrow keys)
  if (keys["ArrowUp"]) p2.y -= 3;
  if (keys["ArrowDown"]) p2.y += 3;
  if (keys["ArrowLeft"]) p2.x -= 3;
  if (keys["ArrowRight"]) p2.x += 3;

  // Shooting
  if (keys["f"]) shoot(p1);
  if (keys["l"]) shoot(p2);

  // Move bullets
  bullets.forEach(b => {
    b.x += b.dx;

    // collision
    if (b.owner === p1 && Math.abs(b.x - p2.x) < 10 && Math.abs(b.y - p2.y) < 10) {
      p2.hp -= 10;
      b.x = -999;
    }

    if (b.owner === p2 && Math.abs(b.x - p1.x) < 10 && Math.abs(b.y - p1.y) < 10) {
      p1.hp -= 10;
      b.x = -999;
    }
  });

  bullets = bullets.filter(b => b.x > 0 && b.x < 600);
}

// DRAW
function draw() {
  ctx.clearRect(0, 0, 600, 400);

  // players
  ctx.fillStyle = "blue";
  ctx.fillRect(p1.x, p1.y, 20, 20);

  ctx.fillStyle = "red";
  ctx.fillRect(p2.x, p2.y, 20, 20);

  // bullets
  ctx.fillStyle = "white";
  bullets.forEach(b => {
    ctx.fillRect(b.x, b.y, 5, 5);
  });

  // HP
  ctx.fillStyle = "white";
  ctx.fillText("P1 HP: " + p1.hp, 10, 20);
  ctx.fillText("P2 HP: " + p2.hp, 500, 20);
}

// GAME LOOP
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
