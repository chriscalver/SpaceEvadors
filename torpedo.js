

function Torpedo(x, y) {
  this.x = x;
  this.y = y;
  this.r = 3;
  this.toDelete = false;

  this.show = function () {
    noStroke();
    fill(250, 0, 0);
    ellipse(this.x + 18, this.y + 90, this.r * 2, this.r * 2);
  }

  this.evaporate = function () { // send back for deletion
    this.toDelete = true;
  }

  //collison detection

  // this.hits = function(ship) {
  //   var d = dist(this.x, this.y, ship.x +78, ship.y);

  //   if (d < this.r  + ship.r) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // this.hits2 = function(fallingenemy) {
  //   var d = dist(this.x, this.y, fallingenemy.x + 22, fallingenemy.y +30);

  //   if (d < this.r + fallingenemy.r) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  this.move = function () {
    this.y = this.y + 8;
  }
}

