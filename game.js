class Game {
  constructor() {
    this.numberOfSymbolsOnCard = 8; // prime + 1
    this.cards = [];

    this.prime = this.numberOfSymbolsOnCard - 1;
    // numberOfCards = n ** 2 + n + 1;

    this.cards = this.generateCards(this.prime);
    this.shuffleCards();

    this.cardNo = 0;

    this.cardSize = 350;
    console.log(symbols);
    console.log(this.cards);
    this.card1Locs = [];
    this.card2Locs = [];

    this.nextCards();

    this.generateLocs();

    // this.card1;
    // this.card1;
  }

  shuffleCards() {
    for (let c of this.cards) {
      shuffle(c, true);
    }
    shuffle(this.cards, true);
  }

  generateLocs() {
    let a = 0;
    let r = this.cardSize / 2 - 50;

    for (let i = 0; i < this.card1.length - 1; i++) {
      let x = r * cos(a);
      let y = r * sin(a);
      let thisImg = imgs[this.card1[i] - 1];
      this.card1Locs.push({ img: thisImg, x: width - width / 4 + x, y: height / 2 + y });

      a += TWO_PI / 7;
    }

    this.card1Locs.push({ img: imgs[this.card1[7] - 1], x: width - width / 4, y: height / 2 });

    a = 0;
    r = this.cardSize / 2 - 50;

    for (let i = 0; i < this.card2.length - 1; i++) {
      let x = r * cos(a);
      let y = r * sin(a);

      let thisImg = imgs[this.card2[i] - 1];
      this.card2Locs.push({ img: thisImg, x: width - width / 4 + x, y: height / 2 + y });

      a += TWO_PI / 7;
    }

    this.card2Locs.push({ img: imgs[this.card2[7] - 1], x: width - width / 4, y: height / 2 });
  }

  nextCards() {
    if (this.cardNo >= this.cards.length - 2) {
      shuffleCards();
      this.cardNo = 0;
    }
    this.card1 = this.cards[this.cardNo];
    this.card2 = this.cards[this.cardNo + 1];

    console.log(this.card1, this.card2);

    this.cardNo += 2;
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

    imageMode(CENTER);

    for (let i = 0; i < this.card1Locs.length - 1; i++) {
      let thisLoc = this.card1Locs[i];
      push();
      translate(thisLoc.x, thisLoc.y);
      rotate(random(TWO_PI));
      let thisImg = thisLoc.img;
      image(thisImg, 0, 0, 75, 75, 0, 0, thisImg.width, thisImg.height, CONTAIN);
      pop();

      console.log("adding image", thisImg);
    }

    push();
    translate(width / 4, height / 2);
    rotate(random(TWO_PI));
    let middleImg = imgs[this.card1[7] - 1];
    image(middleImg, 0, 0, 75, 75, 0, 0, middleImg.width, middleImg.height, CONTAIN);
    pop();

    for (let i = 0; i < this.card2Locs.length - 1; i++) {
      let thisLoc = this.card2Locs[i];
      push();
      translate(thisLoc.x, thisLoc.y);
      rotate(random(TWO_PI));
      let thisImg = thisLoc.img;
      image(thisImg, 0, 0, 75, 75, 0, 0, thisImg.width, thisImg.height, CONTAIN);
      pop();

      console.log("adding image", thisImg);
    }

    push();
    translate(width - width / 4, height / 2);
    rotate(random(TWO_PI));
    middleImg = imgs[this.card2[7] - 1];
    image(middleImg, 0, 0, 75, 75, 0, 0, middleImg.width, middleImg.height, CONTAIN);
    pop();
  }

  isSymbolClicked(mx, my) {
    let x = width / 4;
    let y = height / 2;

    let a = 0;
    let r = this.cardSize / 2 - 50;

    for (let i = 0; i < this.card1.length - 1; i++) {}
  }
}
