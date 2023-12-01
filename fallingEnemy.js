
function fallingEnemy(x, y, pic) {
  this.x = x;
  this.y = y;
  this.pic = pic;
  //this.pic.width*.1
  this.r = 20;
  this.xdir = random([2, -2]);

  this.grow = function () {
    this.r = this.r + 2;
  }

  this.turn = function () {
    //this.xdir *= -1;
    this.x += this.xdir;
  }

  this.turnback = function () {
    this.x += this.xdir * -1;
  }

  this.kill = function () {
    this.toDelete = true;
  }

  this.move = function () {
    // this.x = this.x + this.xdir;
    this.y += .9;
  }

  this.shift = function () {
    //this.x = this.x + this.xdir;
    //this.y -= -1;
    this.x -= 1;
    this.y -= 1;
  }




  this.show = function () {
    noStroke();
    fill(255, 0, 200, 150);
  //  push();
  //  translate(this.x, this.y);
 //   rotate(angle);
 //   imageMode(CENTER);
    image(this.pic, this.x, this.y, this.pic.width * .15, this.pic.height * .15);  //enemy.png 
  //  angle += 1;
  //  pop();
  }
}
