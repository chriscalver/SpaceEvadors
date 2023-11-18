
function Flower(x, y) {                //planet express ship
    this.x = x;
    this.y = y;
    this.r = 160;  
    this.xdir = 2;
    this.toDelete = false;
  
    this.grow = function() {
      this.r = this.r + 4;
    }

    this.kill = function() {
        this.toDelete = true;
      }

    this.shiftDown = function() {
      this.xdir *= -1;
      this.y += this.r;
    }
  
    this.move = function() {
     this.x = this.x + this.xdir;
    }
    
    this.show = function() {
      //noStroke();
      // fill(255, 0, 200, 150);     
      image(planetexpress, this.x, this.y, this.r, this.r);
       //rectMode(CENTER);
      //circle(this.x, this.y, this.r);
      
    }  
  }
  