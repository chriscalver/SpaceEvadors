var ship;
var scrollingenemy = [];
var fallingenemy = [];
let fallingenemtOn = false;
let fallingenemyX = 0;
let fallingenemyY = 0;
var angle = 0;

var fallingenemy2 = [];
var fire = [];
var torpedo = [];

let spritesheet;
let sprites = [];
let spritelength = 128;
let spritedistance = 30;
let explosionSpritesheet;
let explosionSprites = [];
let animation = [];
let explode = false;
let explodecounter = 0;
let blowup;

let playerImage;
let enemyPic;
let enemyImage;
let enemyImage2;
let enemyImage3;
let scrollingeneypic;
let menuImage;
var score = 0;

let bg;
let bgWidth;
let bgHeight;
let bgX = 0;
let bgY = 0;

let intro = true;
let leveloneintro = false;
let levelone = false;
let leveltwointro = false;
let leveltwo = false;
let wave = 0;
var edge = false;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let shootPressed = false;
let pauseGame = false;

function preload() {
  playerImage = loadImage("guitar.png");
  enemyImage = loadImage("enemy1.png");
  enemyImage2 = loadImage("enemy2.png");
  enemyImage3 = loadImage("enemy3.png");
  // enemyPic = loadImage('enemy3.png');
  planetexpress = loadImage("planetexpress.png");
  font = loadFont("gamefont.ttf");
  bg = loadImage("back.png");
  menuImage = loadImage("menu.png");
  spritesheet = loadImage("shipfire.png");
  explosionSpritesheet = loadImage("explosion.png");
}

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  bgHeight = height;
  bgWidth = width;

  let w = spritesheet.width / 4;
  let h = spritesheet.height;

  for (let x = 0; x < 4; x++) {
    sprites[x] = spritesheet.get(x * w, 0, w, h); // first 2 are top left coorinates
  }

  let explWidth = explosionSpritesheet.width / 8; //  256
  let explHeight = explosionSpritesheet.height / 6; // 256

  // there are six rows, create a for loop to iterate through them
  for (let y = 0; y < 6; y++) {
    // create another emoty array for that row
    explosionSprites[y] = [];
    // there are 8 images in a row, iterate through them
    for (let x = 0; x < 8; x++) {
      // get the image subsection there and then stor in the array
      explosionSprites[y][x] = explosionSpritesheet.get(
        x * explWidth,
        y * explHeight,
        explWidth,
        explHeight
      );
      animation.push(
        explosionSpritesheet.get(
          x * explWidth,
          y * explHeight,
          explWidth,
          explHeight
        )
      );
    }
  }

  blowup = new Bomb(0.9, animation);
  ship = new Ship();
  document.addEventListener("keydown", this.keydown);
  document.addEventListener("keyup", this.keyup);

  // setTimeout(getfallingenemy, 1000);
  // function getfallingenemy() {
  //     for (var i = 0; i < 3; i++) {
  //         fallingenemy[i] = new fallingEnemy(i * 75 + 275, random(-100, -600), enemyImage);
  //     }
  //     leveloneintro = false;
  //     //leveltwo = false;
  //     wave = 1;
  // }
}

// draw area

function draw() {
  //console.log("wave = " + wave  + " " + "levelone = " + levelone + " " + "leveltwo = " + leveltwo);
  // console.log("levelone " + levelone);
  // console.log("leveltwo = " + leveltwo);
  background("black");
  console.log(wave);
  bgY += 2;
  //console.log(bgY);
  if (bgY > bgHeight) {
    bgY = 0;
  }

  image(bg, bgX, bgY, bgWidth, bgHeight);
  image(bg, bgX, bgY - bgHeight, bgWidth, bgHeight);
  if (explode) {
    blowup.show();
    blowup.animate();
    //console.log(explode);
    explodecounter += 1;

    if (blowup.index >= blowup.len) {
      //console.log("Hey");
      explode = false;
      blowup.index = 0;
    }
  }

  // rectMode(CENTER);
  ship.show();
  ship.move();
  image(
    sprites[frameCount % 4],
    ship.x - 64,
    ship.y + spritedistance,
    128,
    spritelength
  );

  if (pauseGame) {
    // check for pause
    textFont(font);
    textSize(32);
    fill("grey");
    text("Game Paused", 230, 230);
    //levelone = false;
    return;
  }

  if (intro) {
    textFont(font);
    textSize(34);
    fill("grey");
    text("Guitar Wars", 210, 230);
    textSize(22);
    text("Press Spacebar to start", 150, 300);
  }

  if (leveloneintro) {
    textFont(font);
    textSize(32);

    fill("grey");
    text("Level One", 260, 230);
    text("Stratocasters", 200, 300);

    setTimeout(getscrollingenemy, 1000);
    function getscrollingenemy() {
      //scrolling futurama ship
      for (var i = 0; i < 1; i++) {
        scrollingenemy[i] = new scrollingEnemy(random(-300, -400), -20);
      }
    }

    setTimeout(levelonepause, 2000);
    function levelonepause() {
      levelone = true;
      leveloneintro = false;
    }
  }

  if (levelone) {
    textFont(font);
    textSize(22);
    fill("grey");
    text("Level One", 50, 30);
    text("SCORE:", 515, 30);
    text(score, 655, 30);

    //setTimeout(getfallingenemy, 1000);
    //function getfallingenemy() {
    //if(fallingEnemy.length)

    if (fallingenemy.length < 1) {
      for (var i = 0; i < 4; i++) {
        fallingenemy[i] = new fallingEnemy(
          i * 150 + 155,
          random(-100, -500),
          enemyImage2
        );
      }

      wave += 1;
    }
    // for (var i = 0; i < 3; i++) {
    //         fallingenemy[i] = new fallingEnemy(i * 75 + 275, random(-100, -600), enemyImage);
    //     }
    //     leveloneintro = false;
    //     //leveltwo = false;
    //     wave = 1;
    // }

    for (var i = 0; i < fallingenemy.length; i++) {
      fallingenemy[i].show();
      fallingenemy[i].move();

      if (fallingenemy[i].y > 10 && fallingenemy[i].y < 40) {
        fallingenemy[i].turn();
      }
      if (fallingenemy[i].y > 41 && fallingenemy[i].y < 42) {
        var torp = new Torpedo(fallingenemy[i].x, fallingenemy[i].y);
        torpedo.push(torp);
      }
      if (fallingenemy[i].y > 42 && fallingenemy[i].y < 80) {
        fallingenemy[i].turnback();
      }
      if (fallingenemy[i].y > 82 && fallingenemy[i].y < 120) {
        //fallingenemy[i].xdir *= -1;
        fallingenemy[i].turn();
      }
      if (fallingenemy[i].y > 121 && fallingenemy[i].y < 122) {
        var torp = new Torpedo(fallingenemy[i].x, fallingenemy[i].y);
        torpedo.push(torp);
      }
      if (fallingenemy[i].y > 132 && fallingenemy[i].y < 200) {
        fallingenemy[i].turnback();
      }
      if (fallingenemy[i].y > 620) {
        fallingenemy[i].kill();
      }
      // if (fallingenemy[i].x > width || fallingenemy[i].x < 0) {
      //     edge = true;
      // }
    }
    for (var i = 0; i < scrollingenemy.length; i++) {
      scrollingenemy[i].show();
      scrollingenemy[i].move();
      if (fallingenemy.length < 1) {
        for (var i = 0; i < 4; i++) {
          fallingenemy[i] = new fallingEnemy(
            i * 150 + 155,
            random(-100, -500),
            enemyImage2
          );
        }
        wave += 1;
      }
    }
  }

  if (wave == 3) {
    levelone = false;
    fallingenemy = [];
    leveltwointro = true;
    //console.log("HHHHHHHHHHHHHHHHH");
    //  console.log("levelone " + levelone);
  }

  if (leveltwointro) {
    textFont(font);
    textSize(32);
    fill("grey");
    text("Level Two", 260, 230);
    text("Les Pauls", 260, 300);
    // fallingenemy = [];
    // scrollingenemy = [];
    setTimeout(leveltwopause, 2000);
    function leveltwopause() {
      leveltwo = true;
      leveltwointro = false;
      //wave = 1;
      // wave += 1;
    }
  }

  if (leveltwo) {
    textFont(font);
    textSize(22);
    fill("grey");
    text("Level Two", 50, 30);
    text("SCORE:", 515, 30);
    text(score, 655, 30);

    //setTimeout(getfallingenemy, 1000);
    //function getfallingenemy() {
    //if(fallingEnemy.length)

    if (fallingenemy.length < 1) {
      for (var i = 0; i < 4; i++) {
        fallingenemy[i] = new fallingEnemy(
          i * 150 + 155,
          random(-100, -500),
          enemyImage3
        );
      }

      wave += 1;
    }
    // for (var i = 0; i < 3; i++) {
    //         fallingenemy[i] = new fallingEnemy(i * 75 + 275, random(-100, -600), enemyImage);
    //     }
    //     leveloneintro = false;
    //     //leveltwo = false;
    //     wave = 1;
    // }

    for (var i = 0; i < fallingenemy.length; i++) {
      fallingenemy[i].show();
      fallingenemy[i].move();

      if (fallingenemy[i].y > 10 && fallingenemy[i].y < 40) {
        fallingenemy[i].turn();
      }
      if (fallingenemy[i].y > 41 && fallingenemy[i].y < 42) {
        var torp = new Torpedo(fallingenemy[i].x, fallingenemy[i].y);
        torpedo.push(torp);
      }
      if (fallingenemy[i].y > 42 && fallingenemy[i].y < 80) {
        fallingenemy[i].turnback();
      }
      if (fallingenemy[i].y > 82 && fallingenemy[i].y < 120) {
        //fallingenemy[i].xdir *= -1;
        fallingenemy[i].turn();
      }
      if (fallingenemy[i].y > 121 && fallingenemy[i].y < 122) {
        var torp = new Torpedo(fallingenemy[i].x, fallingenemy[i].y);
        torpedo.push(torp);
      }
      if (fallingenemy[i].y > 132 && fallingenemy[i].y < 200) {
        fallingenemy[i].turnback();
      }
      if (fallingenemy[i].y > 620) {
        fallingenemy[i].kill();
      }
      // if (fallingenemy[i].x > width || fallingenemy[i].x < 0) {
      //     edge = true;
      // }
    }
    for (var i = 0; i < scrollingenemy.length; i++) {
      scrollingenemy[i].show();
      scrollingenemy[i].move();
      if (fallingenemy.length < 1) {
        for (var i = 0; i < 4; i++) {
          fallingenemy[i] = new fallingEnemy(
            i * 150 + 155,
            random(-100, -500),
            enemyImage3
          );
        }
        wave += 1;
      }
    }
  }

  if (wave == 6) {
    leveltwo = false;
    fallingenemy = [];

    textFont(font);
    textSize(22);
    fill("grey");
    text("GAME OVER", 300, 230);
    text("Game Over", 50, 30);
    text("SCORE:", 515, 30);
    text(score, 655, 30);

    //leveltwointro = true;
    //  console.log(wave);
    //  console.log("levelone " + levelone);
  }

  if (edge) {
    for (var i = 0; i < fallingenemy.length; i++) {
      fallingenemy[i].shift();
    }
  }

  for (var i = 0; i < fire.length; i++) {
    fire[i].show();
    fire[i].move();

    if (fire[i].y < 0) {
      // delete fire if if leaves the screen
      fire[i].evaporate();
    }
    //collision detection
    for (var j = 0; j < scrollingenemy.length; j++) {
      if (fire[i].hits(scrollingenemy[j])) {
        scrollingenemy[j].kill();
        //scrollingenemy[j].grow();
        fire[i].evaporate();
        score += 100;
      }
    }
    for (var j = 0; j < fallingenemy.length; j++) {
      if (fire[i].hits2(fallingenemy[j])) {
        //fallingenemy[j].grow();        //  drop hits flower and grows
        fallingenemy[j].kill();
        fire[i].evaporate();
        score += 50;
      }
    }
  }
  for (var i = 0; i < torpedo.length; i++) {
    torpedo[i].show();
    torpedo[i].move();
  }
  for (var i = fire.length - 1; i >= 0; i--) {
    if (fire[i].toDelete) {
      // toDelete comes from drop 15
      fire.splice(i, 1); // delete drop from array
    }
  }
  for (var i = scrollingenemy.length - 1; i >= 0; i--) {
    if (scrollingenemy[i].toDelete) {
      // toDelete comes from drop 15
      fallingenemyX = scrollingenemy[i].x + 100;
      fallingenemyY = scrollingenemy[i].y + 35;
      explode = true;
      scrollingenemy.splice(i, 1); // delete drop from array
    }
  }
  for (var i = fallingenemy.length - 1; i >= 0; i--) {
    if (fallingenemy[i].toDelete) {
      // toDelete comes from drop 15
      fallingenemyX = fallingenemy[i].x;
      fallingenemyY = fallingenemy[i].y;
      //console.log(fallingenemyX);

      fallingenemy.splice(i, 1); // delete from array
      explode = true;
      console.log(explode);
      //   console.log(fallingenemy.length);
    }

    // if (fallingenemy.length < 1) {
    //     for (var i = 0; i < 4; i++) {
    //         fallingenemy[i] = new fallingEnemy(i * 150 + 155, random(-100, -500), enemyImage2);
    //     }
    //     wave += 1;
    // }
  }
  image(menuImage, 0, 550, 800, 50);
}

if (spritelength > 150) {
  spritelength = 150;
}

keydown = (event) => {
  if (event.code == "KeyW") {
    downPressed = true;
    spritelength += 50;
    if (spritelength > 250) {
      spritelength = 250;
    }
    spritedistance -= 25;
    //  console.log(spritedistance);
    if (spritedistance <= -35) {
      spritedistance = -35;
      //    console.log(spritedistance);
    }
    // console.log("right");
  }
  if (event.code == "KeyX") {
    upPressed = true;
    spritelength -= 50;
    if (spritelength <= 128) {
      spritelength = 128;
    }
    spritedistance += 25;
    // console.log(spritedistance);
    if (spritedistance >= 30) {
      spritedistance = 30;
      // console.log(spritedistance);
    }
  }
  if (event.code == "KeyD") {
    rightPressed = true;
    // console.log("right");
  }
  if (event.code == "KeyA") {
    leftPressed = true;
    //console.log("left");
  }
  if (event.code == "Space") {
    if (intro) {
      intro = false;
      leveloneintro = true;
      //levelone = true;
    }
  }
  if (event.code == "KeyP") {
    if (pauseGame == false) {
      pauseGame = true;
    } else {
      pauseGame = false;
    }
  }
};
keyup = (event) => {
  if (event.code == "KeyD") {
    rightPressed = false;
  }
  if (event.code == "KeyA") {
    leftPressed = false;
  }
  // if (event.code == "Space") {
  //     var drop = new Fire(ship.x, height);
  //     fire.push(drop);
  //     // shootPressed = false;
  // }
  if (event.code == "KeyW") {
    downPressed = false;
    // console.log("right");
  }
  if (event.code == "KeyX") {
    upPressed = false;
    // console.log("right");
  }
};

function mousePressed() {
  var drop = new Fire(ship.x, ship.y);
  fire.push(drop);
  //var torp =  new Torpedo(fallingenemy[1].x, fallingenemy[1].y);
  //  torpedo.push(torp);
}
