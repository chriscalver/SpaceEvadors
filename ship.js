
function Ship() {
  this.x = width / 2;
  this.xdir = 0;
  this.y = 450;
  this.r = 100; 

  this.show = function () {
  
    image(playerImage, this.x - this.r / 2, this.y, this.r, this.r);
    if (this.x <= 12) {
      this.x = 13;     // keep ship in frame
    }
    if (this.x > width - 8) { // keep ship in frame
      this.x = width - 10;
    }
    if (this.y < 300){
      this.y = 300;
    }
    if (this.y > 400){
      this.y = 400;
    }
  }

  this.setDir = function (dir) {
    this.xdir = dir;
  }

  this.move = function (dir) {
    // this.x += this.xdir*6;
    if (rightPressed) {
      //console.log("right on");
      this.x += 3;
    } else if (leftPressed) {
      this.x -= 3;
    }

    if (upPressed) {
      //console.log("right on");
      this.y += 2;
    } else if (downPressed) {
      this.y -= 2;
    }
  }
}