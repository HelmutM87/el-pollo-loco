class MovableObject extends DrawableObject {
    //x;
    //y;
    //width;
    //height;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bottleDepot = 0;
    lastHit = 0;
    lastKeyDown = 0;

    // offset = {
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0
    // };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 155;
        }
    }

    // isIdle() {

    // }



    // // character.isColliding(chicken);
    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x + mo.width &&
    //         this.y < mo.y + mo.height;
    // }

    

    // isColliding(chicken);
    // isColliding(mo) {
    //     return (this.X + this.width) >= mo.X && this.X <= (mo.X + mo.width) && 
    //     (this.Y + this.offsetY + this.height) >= mo.Y &&
    //     (this.Y + this.offsetY) <= (mo.Y + mo.height) && 
    //     mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    // isColliding(mo) {
    //         return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
    //         (this.y + this.offsety + this.height) >= moy &&
    //         (this.y + this.offsety) <= (mo.y + mo.height)
    //     }

    // isColliding(obj) {
    //     return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
    //         this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
    //         this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
    //         this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    // }


    
    

    

    //     startSleepTimer() {
    //         this.lastKeyDown = new Date().getTime(); // set the initial time when a key was last pressed

    //         // check if no keys are pressed for 5 seconds
    //         setInterval(() => {
    //             const currentTime = new Date().getTime();
    //             const timeDifference = (currentTime - this.lastKeyDown) / 1000; // calculate time difference in seconds
    //             if (timeDifference >= 5) {
    //                 this.isSleeping(); // if no keys pressed for 5 seconds, play sleeping animation
    //             }
    //         }, 1000); // check every second
    //     }



    

    


    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Differnence in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    // playAnimation(images) {
    //     let i = this.currentImage % images.length;
    //     let path = images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    // }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
        this.jumping_sound.play();
    }

}           