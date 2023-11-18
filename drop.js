

function Drop(x, y) {
  this.x = x;
  this.y = y;
  this.r = 2;
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

  this.hits = function(flower) {
    var d = dist(this.x, this.y, flower.x + 30, flower.y);

    if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }
  }

  this.hits2 = function(newflower) {
    var d = dist(this.x, this.y, newflower.x + 17, newflower.y);
    
    if (d < this.r + newflower.r) {
      return true;
    } else {
      return false;
    }
  }
  this.move = function() {
    this.y = this.y - 10;
  }
}
