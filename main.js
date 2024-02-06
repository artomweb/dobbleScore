let game;
let imgs = [];
// let currentMs;
let startMs;
let MAX_SECONDS;
let seconds;
let button;

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    imgs.push(loadImage(`PNG/${symbols[i]}.png`));
  }
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("sketch");
  game = new Game();
  startMs = millis();
  textSize(100);
  textAlign(CENTER, CENTER);

  let dSeconds = localStorage.getItem("MAX_SECONDS") || 60;
  changeTimeMode(dSeconds);
}

function draw() {
  background("#70C1B3");
  game.drawCards();
  text(seconds, width / 2, 100);
  text(game.score, width / 2, height - 100);
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

function changeTimeMode(mode) {
  console.log("mode", mode);

  let modesDiv = document.getElementsByClassName("timeMode");

  for (let i = 0; i < modesDiv.length; i++) {
    if (modesDiv[i].innerHTML == mode) {
      modesDiv[i].classList.add("active");
    } else {
      modesDiv[i].classList.remove("active");
    }
  }

  MAX_SECONDS = mode;
  seconds = MAX_SECONDS;

  localStorage.setItem("MAX_SECONDS", mode);
}
