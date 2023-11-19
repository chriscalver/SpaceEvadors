

function Fire(x, y) {
  this.x = x;
  this.y = y;
  this.r = 3;
  this.toDelete = false;

  this.show = function() {
    noStroke();
    fill(250, 0, 0);
    ellipse(this.x, this.y - 100, this.r*2, this.r*2);
  }

  this.evaporate = function() { // send back for deletion
    this.toDelete = true;
  }
  
  //collison detection

  this.hits = function(scrollingenemy) {
    var d = dist(this.x, this.y, scrollingenemy.x +78, scrollingenemy.y + 50);
    
    if (d < this.r  + scrollingenemy.r) {
      return true;
    } else {
      return false;
    }
  }

  this.hits2 = function(fallingenemy) {
    var d = dist(this.x, this.y, fallingenemy.x + 30, fallingenemy.y + 100);
    
    if (d < this.r + fallingenemy.r) {
      return true;
    } else {
      return false;
    }
  }
  this.move = function() {
    this.y = this.y - 10;
  }
}