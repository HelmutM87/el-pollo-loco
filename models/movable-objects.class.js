class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bottleDepot = 0;
    lastHit = 0;
    lastKeyDown = 0;

    constructor() {
        super();
        this.canSleep = true;
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }


    hit() {
        this.stopSleeping();
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.canSleep = false;
            setTimeout(() => {
                this.canSleep = true;
            }, 8000);
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


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


    decreaseBottleDepot() {
        this.bottleDepot -= 1;
        if (this.bottleDepot < 1) {
            this.bottleDepot = 0;
        }
        console.log('Pepe has now', this.bottleDepot, 'bottles');
    }


    isKilled() {
        this.playAnimation(this.IMAGE_DEATH);
        this.enemy_dying_sound.play();
    }


    kill() {
        // this.playAnimation(this.IMAGE_DEATH);
    }
}           
