/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * Inherits from MovableObject.
 */
class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE_FLYING = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    splash_sound = new Audio('audio/broken-bottle.mp3');

    offset = {
        top: 2,
        left: 2,
        right: 4,
        bottom: 4
    };
    
    constructor(x, y, direction) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_FLYING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.direction = direction;
        this.throw();
        this.animate();
    }

    /**
     * Throws the object, applying gravity and controlling its horizontal movement.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.direction) {
                this.x -= 4;
            } else {
                this.x += 6;
            }
            if (this.y > 360) {
                this.splash();
                if (!isMuted) {
                    this.splash_sound.play();
                }
            }
        }, 25);
    }

    /**
     * Animates the object, playing the flying animation.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_FLYING);
        }, 30);
    }

    /**
     * Handles the splash action when the object hits the ground, playing the splash animation and removing the object from the game.
     */
    splash() {
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0;
        setTimeout(() => {
            const index = world.throwableObjects.indexOf(this);
            if (index > -1) {
                world.throwableObjects.splice(index, 1);
            }
        }, this.IMAGES_BOTTLE_SPLASH.length * 60);
    }
}