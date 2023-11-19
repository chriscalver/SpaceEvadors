let enemies = [];
var ship;
var scrollingenemy = [];
var fallingenemy = [];
var fallingenemy2 = [];
var fire = [];
let bgImage;
let playerImage;
let enemyImage;
let planetexpress;

let beginGame = true;
let rightPressed = false;
let leftPressed = false;
let shootPressed = false;
let checkbox;
let pauseGame = false;
let unpauseGame = false;


function preload() {
    bgImage = loadImage('back.png');
    playerImage = loadImage('player.png');
    enemyImage = loadImage('enemy2.png');
    planetexpress = loadImage('planetexpress.png')
}

function setup() {
    //checkbox = createCheckbox("Pause Game", false);
    // checkbox.position(1050, 655);
    createCanvas(800, 650);
    ship = new Ship();
    //fire = new Fire();

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

    setTimeout(showfallingenemy, 2000);
    //  setTimeout(showfallingenemy, 4000);   

    function showfallingenemy() {
        for (var i = 0; i < 6; i++) {
            fallingenemy[i] = new fallingEnemy(i * 100 + 120, -100);
        }
        beginGame = false;
    }



    setTimeout(showscrollingenemy, 9000);
    function showscrollingenemy() {       //scrolling futurama ship
        for (var i = 0; i < 1; i++) {
            scrollingenemy[i] = new scrollingEnemy(-120, -20);
        }
    }


    // spawn additional enemies
    // for (let i = 0; i < 5; i++) {
    //     let enemy = {
    //         x: random(100, width - 100),
    //         y: random(0, -1000),
    //     };
    //     enemies.push(enemy);
    // }
}

function draw() {

    

    if (pauseGame) { // check for pause
        //checkbox.label = "Game Paused";
        textSize(52);
        fill('grey');
        text('Game Paused', 230, 230);
        pauseGame = true;
        return;
    }

    background(bgImage);
    if (beginGame) {
        textSize(52);
        fill('grey');
        text('Level One', 280, 230);
    }
    rectMode(CENTER);
    ship.show();
    ship.move();


    for (var i = 0; i < fallingenemy.length; i++) {
        fallingenemy[i].show();
        fallingenemy[i].move();
        // if (flowers[i].x > width || flowers[i].x < 0) {
        //     edge = true;
        // }
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

        //collision detection
        for (var j = 0; j < scrollingenemy.length; j++) {
            if (fire[i].hits(scrollingenemy[j])) {
                // scrollingenemy[j].kill();
                scrollingenemy[j].grow();

                fire[i].evaporate();
            }
        }

        for (var j = 0; j < fallingenemy.length; j++) {
            if (fire[i].hits2(fallingenemy[j])) {
                //fallingenemy[j].grow();        //  drop hits flower and grows
                fallingenemy[j].kill();
                fire[i].evaporate();
            }
        }
    }

    var edge = false;



    if (edge) {
        for (var i = 0; i < scrollingenemy.length; i++) {
            scrollingenemy[i].shiftDown();
        }
    }

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
        }
    }
}

keydown = (event) => {
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
        console.log("Pause = " + pauseGame);
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
};

function mousePressed() {
    //spawn bullet
    var drop = new Fire(ship.x, height);
    fire.push(drop);
}