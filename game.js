class Game {
  constructor() {
    this.numberOfSymbolsOnCard = 8; // prime + 1
    this.cards = [];
    this.gameOn = false;
    this.prime = this.numberOfSymbolsOnCard - 1;

    this.cardNo = 0;

    this.scores = [];

    this.cardSize = 350;

    this.card1Locs = [];
    this.card2Locs = [];

    this.rounds = 0;

    this.score = 0;
    this.gameOn = false;
  }

  makeCards() {
    this.cards = this.generateCards(this.prime);
    this.shuffleCards();
  }

  startGame() {
    this.score = 0;
    this.rounds = 0;

    this.makeCards();

    this.nextCards();
    this.generateLocs();
    this.gameOn = true;
  }

  stopGame() {
    this.gameOn = false;
  }

  shuffleCards() {
    for (let c of this.cards) {
      shuffle(c, true);
    }
    shuffle(this.cards, true);
  }

  generateLocs() {
    this.card1Locs = [];
    this.card2Locs = [];
    let a = 0;
    let r = this.cardSize / 2 - 50;
    let rot;

    for (let i = 0; i < this.card1.length - 1; i++) {
      let x = r * cos(a);
      let y = r * sin(a);
      rot = random(TWO_PI);
      let thisImg = imgs[this.card1[i] - 1];
      this.card1Locs.push({ imgIdx: this.card1[i] - 1, img: thisImg, x: width / 4 + x, y: height / 2 + y, rot });

      a += TWO_PI / 7;
    }

    rot = random(TWO_PI);
    this.card1Locs.push({ imgIdx: this.card1[7] - 1, img: imgs[this.card1[7] - 1], x: width / 4, y: height / 2, rot });

    a = 0;
    r = this.cardSize / 2 - 50;

    for (let i = 0; i < this.card2.length - 1; i++) {
      let x = r * cos(a);
      let y = r * sin(a);
      rot = random(TWO_PI);
      let thisImg = imgs[this.card2[i] - 1];
      this.card2Locs.push({ imgIdx: this.card2[i] - 1, img: thisImg, x: width - width / 4 + x, y: height / 2 + y, rot });

      a += TWO_PI / 7;
    }
    rot = random(TWO_PI);
    this.card2Locs.push({ imgIdx: this.card2[7] - 1, img: imgs[this.card2[7] - 1], x: width - width / 4, y: height / 2, rot });
  }

  nextCards() {
    console.log("CHOOSING NEXT CARDS", this.cardNo);
    if (this.cardNo >= this.cards.length - 2) {
      this.makeCards();
      this.generateLocs();
      this.cardNo = 0;
    }
    this.card1 = this.cards[this.cardNo];
    this.card2 = this.cards[this.cardNo + 1];

    console.log(this.card1, this.card2);

    this.cardNo += 2;

    this.generateLocs();
  }

  generateCards(n) {
    var cards = [];

    for (var i = 0; i <= n; i++) {
      // Add new card with the first symbol
      cards.push([1]);

      // Add n+1 symbols on the card (e.g. 8 symbols)
      for (var j = 0; j < n; j++) {
        cards[i].push(j + 1 + i * n + 1);
      }
    }

    // Add n sets of n cards
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        // Append a new card with 1 symbol
        cards.push([i + 2]);

        // Add n symbols on the card (e.g. 7 symbols)
        for (var k = 0; k < n; k++) {
          var val = n + 1 + n * k + ((i * k + j) % n) + 1;
          cards[cards.length - 1].push(val);
        }
      }
    }

    return cards;
  }

  drawCards() {
    circle(width / 4, height / 2, this.cardSize);
    circle(width - width / 4, height / 2, this.cardSize);

    if (!this.gameOn) return;

    let middleImg;

    imageMode(CENTER);

    for (let i = 0; i < this.card1Locs.length - 1; i++) {
      let thisLoc = this.card1Locs[i];
      push();
      translate(thisLoc.x, thisLoc.y);
      rotate(thisLoc.rot);
      let thisImg = thisLoc.img;
      image(thisImg, 0, 0, 75, 75, 0, 0, thisImg.width, thisImg.height, CONTAIN);
      pop();
    }

    push();
    translate(width / 4, height / 2);
    middleImg = imgs[this.card1[7] - 1];
    rotate(this.card1Locs[7].rot);
    image(middleImg, 0, 0, 75, 75, 0, 0, middleImg.width, middleImg.height, CONTAIN);
    pop();

    for (let i = 0; i < this.card2Locs.length - 1; i++) {
      let thisLoc = this.card2Locs[i];
      push();
      translate(thisLoc.x, thisLoc.y);
      rotate(thisLoc.rot);
      let thisImg = thisLoc.img;
      image(thisImg, 0, 0, 75, 75, 0, 0, thisImg.width, thisImg.height, CONTAIN);
      pop();
    }

    push();
    translate(width - width / 4, height / 2);
    middleImg = imgs[this.card2[7] - 1];
    rotate(this.card2Locs[7].rot);
    image(middleImg, 0, 0, 75, 75, 0, 0, middleImg.width, middleImg.height, CONTAIN);
    pop();
  }

  isSymbolClicked(mx, my) {
    if (!this.gameOn) return;
    // let found = false;
    for (let i = 0; i < this.card1Locs.length; i++) {
      let thisLoc = this.card1Locs[i];

      if (mouseInside(mx, my, thisLoc.x, thisLoc.y, 50, 50)) {
        console.log("FOUND", thisLoc);
        if (this.card2Locs.some((e) => e.imgIdx === thisLoc.imgIdx)) {
          console.log("YOU GOT IT RIGHT");
          this.score++;
        }
        this.rounds++;
        this.nextCards();
        return;
      }
    }

    for (let i = 0; i < this.card2Locs.length; i++) {
      let thisLoc = this.card2Locs[i];

      if (mouseInside(mx, my, thisLoc.x, thisLoc.y, 50, 50)) {
        console.log("FOUND", thisLoc);

        if (this.card1Locs.some((e) => e.imgIdx === thisLoc.imgIdx)) {
          console.log("YOU GOT IT RIGHT");
          this.score++;
        }
        this.rounds++;
        this.nextCards();
        return;
      }
    }
  }
}
