/**
 * Represents a movable object in the game.
 * Inherits from DrawableObject.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;             
    otherDirection = false;   
    speedY = 0;               
    acceleration = 2.5;       
    energy = 100;             
    bottleDepot = 0;          
    lastHit = 0;              
    lastKeyDown = 0;          
    canSleep = true;       

    /**
     * Constructs a new MovableObject instance.
     */
    constructor() {
        super();
        this.canSleep = true;
    }

    /**
     * Applies gravity to the object, causing it to fall if it is above ground or moving upwards.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    /**
     * Handles the hit action, reducing the object's energy and setting the last hit timestamp.
     */
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

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
        if (!isMuted) {
            this.jumping_sound.play();
        }
    }

    /**
     * Decreases the number of bottles in the object's depot.
     */
    decreaseBottleDepot() {
        this.bottleDepot -= 1;
        if (this.bottleDepot < 1) {
            this.bottleDepot = 0;
        }
    }

    /**
     * Plays the death animation and sound for the object.
     */
    isKilled() {
        this.playAnimation(this.IMAGE_DEATH);
        this.enemy_dying_sound.play();
    }

    /**
     * Method to handle object kill logic.
     */
    kill() {
        // this.playAnimation(this.IMAGE_DEATH);
    }
}