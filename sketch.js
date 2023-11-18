let enemies = [];
var ship;
var flowers = [];
var newflowers = [];
var drops = [];
let bgImage;
let playerImage;
let enemyImage;
let planetexpress;

function preload() {
    bgImage = loadImage('back.png');
    playerImage = loadImage('player.png');
    enemyImage = loadImage('enemy2.png');
    planetexpress = loadImage('planetexpress.png')
}

let checkbox;
function setup() {
    checkbox = createCheckbox("Pause Game", false);
    checkbox.position(1050, 655);
    createCanvas(800, 650);
    ship = new Ship();
    drop = new Drop();

    for (var i = 0; i < 6; i++) {
        newflowers[i] = new newFlower(i * 100 + 120, -100);
    }

    setTimeout(showFlowers, 9000);

    function showFlowers() {       //scrolling futurama ship
        for (var i = 0; i < 1; i++) {
            flowers[i] = new Flower(-520, -30);
        }

    }

    // spawn enemies
    // for (let i = 0; i < 5; i++) {
    //     let enemy = {
    //         x: random(100, width - 100),
    //         y: random(0, -1000),
    //     };
    //     enemies.push(enemy);
    // }
}

function draw() {

    if (checkbox.checked()) { // check for pause
        checkbox.label = "Game Paused";
        return;
    }
    background(bgImage);
    rectMode(CENTER);

    ship.show();
    ship.move();

    //update and draw enemies
    for (let enemy of enemies) {
        enemy.y += 2;
        //enemy.x += 1;
        image(enemyImage, enemy.x, enemy.y, 60, 60);
    }

    for (var i = 0; i < drops.length; i++) {
        drops[i].show();
        drops[i].move();

        //collision detection
        for (var j = 0; j < flowers.length; j++) {
            if (drops[i].hits(flowers[j])) {
                // flowers[j].kill();
                flowers[j].grow();

                drops[i].evaporate();
            }
        }

        for (var j = 0; j < newflowers.length; j++) {
            if (drops[i].hits2(newflowers[j])) {
                //newflowers[j].grow();        //  drop hits flower and grows
                newflowers[j].kill();
                drops[i].evaporate();
            }
        }
    }
    var edge = false;

    for (var i = 0; i < newflowers.length; i++) {
        newflowers[i].show();
        newflowers[i].move();

        // if (flowers[i].x > width || flowers[i].x < 0) {
        //     edge = true;
        // }
    }




    for (var i = 0; i < flowers.length; i++) {
        flowers[i].show();
        flowers[i].move();
        // if (flowers[i].x > width || flowers[i].x < 0) {
        //     edge = true;
        // }
    }

    if (edge) {
        for (var i = 0; i < flowers.length; i++) {
            flowers[i].shiftDown();
        }
    }

    for (var i = drops.length - 1; i >= 0; i--) {
        if (drops[i].toDelete) {   // toDelete comes from drop 15
            drops.splice(i, 1);        // delete drop from array
        }
    }

    for (var i = flowers.length - 1; i >= 0; i--) {
        if (flowers[i].toDelete) {   // toDelete comes from drop 15
            flowers.splice(i, 1);        // delete drop from array
        }
    }
    for (var i = newflowers.length - 1; i >= 0; i--) {
        if (newflowers[i].toDelete) {   // toDelete comes from drop 15
            newflowers.splice(i, 1);        // delete drop from array
        }
    }

}

function keyPressed() {
    if (keyCode === 32) {   // space bar
        var drop = new Drop(ship.x, height);
        drops.push(drop);
    }

    if (keyCode === 68) {    // key d right
        ship.setDir(1);
    }
    if (keyCode === 65) {   // key  a left
        ship.setDir(-1);
    }
}

function keyReleased() {
    if (key != 68) {
        //  ship.setDir(0);
    }
    if (key != 65) {
        //  ship.setDir(0);
    }
}

function mousePressed() {
    //spawn bullet
    var drop = new Drop(ship.x, height);
    drops.push(drop);
}