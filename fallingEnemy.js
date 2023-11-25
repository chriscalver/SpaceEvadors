
function fallingEnemy(x, y) {
    this.x = x;
    this.y = y;
    this.r = 25;  
    this.xdir = 1;
  
    this.grow = function() {
      this.r = this.r + 2;
    }
  
    this.turn = function() {
     // this.xdir *= -1;
      //this.y += 1;
    }

    this.kill = function() {
      this.toDelete = true;
    }

    this.move = function() {
     // this.x = this.x + this.xdir;
      this.y -= -1;

    }
    
    this.shift = function() {
      //this.x = this.x + this.xdir;
      //this.y -= -1;
      this.x -= 1;
      this.y -= 1;      
    }
    

    this.show = function() {
      noStroke();
      fill(255, 0, 200, 150);
      image(enemyImage, this.x, this.y, this.r*2, this.r*2);  //enemy.png 
    }  
  }
  