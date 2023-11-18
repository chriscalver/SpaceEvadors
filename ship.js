
function Ship() {
  this.x = width / 2;
  this.xdir = 0;
  this.r = 80;
 

  this.show = function () {
  
    image(playerImage, this.x - this.r / 2, height - 100, this.r, this.r);

    if (this.x <= 12) {
      this.x = 8;
    }

    if (this.x > width - 8) {
      this.x = width - 10;
    }
  }

  this.setDir = function (dir) {
    this.xdir = dir;
  }

  this.move = function (dir) {
    // this.x += this.xdir*6;
    if (rightPressed) {
      console.log("right on");
      this.x += 6;
    } else if (leftPressed) {
      this.x -= 6;
    }

  }
}