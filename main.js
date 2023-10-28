let game;
let imgs = [];
// let currentMs;
let startMs;
const MAX_SECONDS = 120;
let seconds = MAX_SECONDS;
let button;

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    imgs.push(loadImage(`PNG/${symbols[i]}.png`));
  }
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("container");
  game = new Game();
  startMs = millis();
  textSize(100);
  textAlign(CENTER, CENTER);

  button = createButton("Start Game");
  button.position(width / 2 - button.width / 2, height - 200);
  button.mousePressed(startGame);
}

function draw() {
  background("#F8E8EE");
  game.drawCards();
  text(seconds, width / 2, 100);
  text(game.score + "/" + game.rounds, width / 2, height - 100);
  if (!game.gameOn) return;
  let currentMs = millis();
  if (currentMs - startMs > 1000) {
    startMs = currentMs;
    seconds--;
    if (seconds <= 0) {
      seconds = 0;
      game.scores.push([round(new Date().getTime() / 1000), MAX_SECONDS, game.rounds, game.score]);
      updateScoreDiv();
      game.stopGame();
    }
  }
}

function mouseClicked() {
  console.log(mouseX, mouseY);
  game.isSymbolClicked(mouseX, mouseY);
}

function startGame() {
  seconds = MAX_SECONDS;
  game.startGame();
}

function updateScoreDiv() {
  let scoresDiv = document.getElementById("scores");
  scoresDiv.innerHTML = "";
  for (let s of game.scores) {
    let span = document.createElement("span");
    span.innerHTML = s.join(",");
    scoresDiv.appendChild(span);
    scoresDiv.appendChild(document.createElement("br"));
  }
}
