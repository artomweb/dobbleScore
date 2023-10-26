let game;
let imgs = [];

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    imgs.push(loadImage(`PNG/${symbols[i]}.png`));
  }
}

function setup() {
  createCanvas(800, 800);
  game = new Game();
  noLoop();
}

function draw() {
  background("#F8E8EE");
  game.drawCards();
}

function mouseClicked() {
  console.log(mouseX, mouseY);
  game.symbolClicked(mouseX, mouseY);
}
