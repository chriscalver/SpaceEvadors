class Bomb {

    constructor(speed, animation) {

        this.speed = speed;
        this.animation = animation;
        this.len = this.animation.length;
        this.index = 0;
        this.counter = 0;
       
        

    }

    show() {
        let index = floor(this.index) % this.len;
        image(this.animation[index], fallingenemyX - 15, fallingenemyY +10, 64, 64);
        
       // console.log("index " + this.index);

        //console.log("counter " + this.counter);
        
        //console.log("animation frame " + this.counter);
        this.counter += 1;
    }
    animate() { 
        this.index += this.speed;
        

    }



}