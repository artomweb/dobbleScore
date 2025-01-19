let game;
let imgs = [];
let frameData = [];
let spriteSheet;
let spriteMeta;

function preload() {
  // Load sprite sheet image and metadata JSON
  spriteSheet = loadImage("PNG/spritesheet.png"); // Replace with your sprite sheet path
  spriteMeta = loadJSON("spritesheet.json"); // Replace with your metadata path
}

function setup() {
  if (spriteSheet) {
    console.log("Sprite sheet loaded successfully");
    console.log("Sprite sheet width: " + spriteSheet.width);
    console.log("Sprite sheet height: " + spriteSheet.height);
  } else {
    console.log("Failed to load sprite sheet");
  }

  // Check if spriteMeta is loaded
  if (spriteMeta) {
    console.log("Sprite metadata loaded successfully");
    console.log("Metadata keys: " + Object.keys(spriteMeta));
  } else {
    console.log("Failed to load sprite metadata");
  }
  // Extract frame data from JSON
  for (let i = 0; i < spriteMeta.frames.length; i++) {
    let frame = spriteMeta.frames[i].frame;
    frameData.push({
      filename: spriteMeta.frames[i].filename,
      x: frame.x,
      y: frame.y,
      w: frame.w,
      h: frame.h,
    });
  }

  // Load each image (frame) from the sprite sheet
  for (let i = 0; i < frameData.length; i++) {
    let frame = frameData[i];
    imgs.push(spriteSheet.get(frame.x, frame.y, frame.w, frame.h));
  }

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
  game.drawCards(); // Assuming your game logic uses this function
  text(seconds, width / 2, 100);
  text(game.score, width / 2, height - 100);

  if (!game.gameOn) return;

  let currentMs = millis();
  if (currentMs - startMs > 1000) {
    startMs = currentMs;
    seconds--;
    if (seconds <= 0) {
      seconds = 0;
      game.scores.push([
        round(new Date().getTime() / 1000),
        MAX_SECONDS,
        game.rounds,
        game.score,
      ]);
      updateScoreDiv();
      game.stopGame();
    }
  }
  let cursorOverElement = false;
  for (let i = 0; i < game.card1Locs.length; i++) {
    let thisLoc = game.card1Locs[i];

    if (mouseInside(mouseX, mouseY, thisLoc.x, thisLoc.y, 50, 50)) {
      cursorOverElement = true;
      break;
    }
  }

  for (let i = 0; i < game.card2Locs.length; i++) {
    let thisLoc = game.card2Locs[i];

    if (mouseInside(mouseX, mouseY, thisLoc.x, thisLoc.y, 50, 50)) {
      cursorOverElement = true;
      break;
    }
  }
  // Update the cursor based on whether it's over an element
  if (cursorOverElement) {
    cursor("pointer"); // Set the cursor to a pointer when over an element
  } else {
    cursor("default"); // Set the cursor back to default if not over an element
  }

  image(spriteSheet, width / 2, height / 2, width, height);
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
