
function Ship() {
    this.x = width/2;
    this.xdir = 0;
    this.r = 80;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  
    this.show = function() {
      //fill(255);
      //rectMode(CENTER);
      //imagemode(CENTER);
      image(playerImage, this.x - this.r/2, height-100, this.r, this.r);

      if (this.x <= 12) {
        this.x = 8;
      }

      if (this.x > width -8) {
        this.x = width -10;
      }
    }
  
    this.setDir = function(dir) {
      this.xdir = dir;
    }
  
    this.move = function(dir) {
      this.x += this.xdir*6;
    }  

    
  
  }
  