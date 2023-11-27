let enemies = [];
var ship;
var scrollingenemy = [];
var fallingenemy = [];
var fallingenemy2 = [];
var fire = [];
var torpedo = [];
//let bgImage;
let playerImage;
let enemyImage;
let enemyImage2;
let enemyImage3;
let planetexpress;
var score = 0;

let bg;
let bgWidth;
let bgHeight;
let bgX = 0;
let bgY = 0;

let levelone = true;
let wave = 0;
var edge = false;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let shootPressed = false;
let pauseGame = false;

function preload() {
   // bgImage = loadImage('back.png');
    playerImage = loadImage('guitar.png');
    enemyImage = loadImage('enemy1.png');
    enemyImage2 = loadImage('enemy2.png');
    //enemyImage3 = loadImage('enemy3.png');
    planetexpress = loadImage('planetexpress.png');
    font = loadFont('gamefont.ttf');
    bg = loadImage("back.png");
}

function setup() {

    createCanvas(800, 600);
    bgHeight = height;
    bgWidth = width;
    //console.log(bgWidth);
   
    ship = new Ship();
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

    setTimeout(getfallingenemy, 2000);
    function getfallingenemy() {
        for (var i = 0; i < 3; i++) {
            fallingenemy[i] = new fallingEnemy(i * 75 + 275, random(-100, -700), enemyImage);
        }
        levelone = false;
        wave = 1;
    }
    setTimeout(getscrollingenemy, 9000);
    function getscrollingenemy() {       //scrolling futurama ship
        for (var i = 0; i < 1; i++) {
            scrollingenemy[i] = new scrollingEnemy(-120, -20);
        }
    }
}



function draw() {
    background('black');
    
    console.log("waves =" + wave);
    // image(bg, bgX, 0, bgWidth, bgHeight);
    image(bg, bgX, bgY, bgWidth, bgHeight);

    // image(bg, bgX + bgWidth, 0, bgWidth, bgHeight);
    image(bg, bgX, bgY - bgHeight, bgWidth, bgHeight);
    if (pauseGame) { // check for pause
        //checkbox.label = "Game Paused";  
        // bgY ;    
        textFont(font);
        textSize(32);
        fill('grey');
        text('Game Paused', 230, 230);
        levelone = false;
        return;
    }

    

    textFont(font);

    textSize(22);
    fill('grey');
    text('Level One', 50, 30);


    textSize(22);
    fill('grey');
    text('SCORE:', 515, 30);

    textSize(22);
    fill('grey');
    // text('0000000', 630, 30);
    text(score, 655, 30);

   
    bgY += 2;
    //console.log(bgY);
    if (bgY > bgHeight) {
        bgY = 0;
    }


    if (levelone) {
        textFont(font);
        textSize(32);

        fill('grey');
        text('Level One', 260, 230);
        text('Stratocasters', 200, 300);
    }
    rectMode(CENTER);
    ship.show();
    ship.move();

  //  setTimeout(fallingenemy.turn(), 5000);

    for (var i = 0; i < fallingenemy.length; i++) {
        fallingenemy[i].show();
        fallingenemy[i].move();
        if (fallingenemy[i].y > 20 && fallingenemy[i].y < 80){
            fallingenemy[i].turn();
        }  
        if (fallingenemy[i].y > 120 && fallingenemy[i].y < 180){
            //fallingenemy[i].xdir *= -1;
           fallingenemy[i].turnback();
        }  
        if (fallingenemy[i].y > 220 && fallingenemy[i].y < 250){
            //fallingenemy[i].xdir *= -1;
           fallingenemy[i].turn();
        } 
        if (fallingenemy[i].y > 620) {

            fallingenemy[i].kill();
        }
        // if (fallingenemy[i].x > width || fallingenemy[i].x < 0) {
        //     edge = true;
        // }
    }




    if (edge) {
        for (var i = 0; i < fallingenemy.length; i++) {
            fallingenemy[i].shift();
        }
        
    }
    for (var i = 0; i < scrollingenemy.length; i++) {
        scrollingenemy[i].show();
        scrollingenemy[i].move();
        // if (flowers[i].x > width || flowers[i].x < 0) {
        //     edge = true;
        // }
        
    }


    //update and draw enemies
    for (let enemy of enemies) {
        enemy.y += 2;
        //enemy.x += 1;
        image(enemyImage, enemy.x, enemy.y, 60, 60);
    }

    for (var i = 0; i < fire.length; i++) {
        fire[i].show();
        fire[i].move();

        if (fire[i].y < 0) {    // delete fire if if leaves the screen
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

        // if (torpedo[i].y < 0) {    // delete fire if if leaves the screen
        //     torpedo[i].evaporate();

        // }

        //collision detection
        // for (var j = 0; j < scrollingenemy.length; j++) {
        //     if (fire[i].hits(scrollingenemy[j])) {
        //         scrollingenemy[j].kill();
        //         //scrollingenemy[j].grow();
        //         fire[i].evaporate();
        //         score += 100;
        //     }
        // }

        
    }








    // console.log("enemies " + fallingenemy.length);



    for (var i = fire.length - 1; i >= 0; i--) {
        if (fire[i].toDelete) {   // toDelete comes from drop 15
            fire.splice(i, 1);        // delete drop from array
        }

    }

    for (var i = scrollingenemy.length - 1; i >= 0; i--) {
        if (scrollingenemy[i].toDelete) {   // toDelete comes from drop 15
            scrollingenemy.splice(i, 1);        // delete drop from array
        }
    }


    for (var i = fallingenemy.length - 1; i >= 0; i--) {
        if (fallingenemy[i].toDelete) {   // toDelete comes from drop 15
            fallingenemy.splice(i, 1);        // delete drop from array
            //   console.log(fallingenemy.length);

        }
        if (fallingenemy.length < 1) {
            for (var i = 0; i < 4; i++) {
                fallingenemy[i] = new fallingEnemy(i * 150 + 155, random(-100, -500), enemyImage2);
            }
            wave += 1;
        }

    }
}














keydown = (event) => {
    if (event.code == "KeyW") {
        downPressed = true;
        // console.log("right");
    }
    if (event.code == "KeyX") {
        upPressed = true;
        // console.log("right");
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
        shootPressed = true;
    }
    if (event.code == "KeyP") {
        if (pauseGame == false) {
            pauseGame = true;
        } else {
            pauseGame = false;

        }
        //console.log("Pause = " + pauseGame);
        // console.log("Unpause = " +unpauseGame);
    }
};


keyup = (event) => {
    if (event.code == "KeyD") {
        rightPressed = false;
    }
    if (event.code == "KeyA") {
        leftPressed = false;
    }
    if (event.code == "Space") {
        var drop = new Fire(ship.x, height);
        fire.push(drop);
        // shootPressed = false;
    }
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

// spawn additional enemies
// for (let i = 0; i < 5; i++) {
//     let enemy = {
//         x: random(100, width - 100),
//         y: random(0, -1000),
//     };
//     enemies.push(enemy);
// }