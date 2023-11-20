
function scrollingEnemy(x, y) {                //planet express ship
    this.x = x;
    this.y = y;
    this.r = 80;  
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
      image(planetexpress, this.x, this.y, this.r * 2, this.r * 2);          
    }  
  }
  