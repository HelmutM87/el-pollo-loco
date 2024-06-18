    /**
    * Represents a chicken enemy in the game, inheriting from MovableObject.
    */
    class Chicken extends MovableObject {
    height = 60;
    width = 55;
    y = 360;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEATH = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    enemy_dying_sound = new Audio('audio/chicken-dying.mp3');

    /**
     * Constructor for the Chicken class.
     * Initializes the chicken object with initial properties and animations.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEATH);
        this.x = 500 + Math.random() * 8000;
        this.speed = 0.15 + Math.random() * 3;
        this.animate();
    }

    /**
     * Initiates animation intervals for movement and playing chicken animations.
     */
    animate() {
        this.moveInterval = setInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = setInterval(() => this.playChicken(), 200);
    }

    /**
     * Plays the appropriate chicken animation based on its state.
     */
    playChicken() {
        if (this.isKilledCondition()) {
            this.playAnimation(this.IMAGE_DEATH);
            this.enemy_dying_sound.play();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Checks if the chicken meets the condition to be considered killed.
     * @returns {boolean} Always returns false (override in subclasses for specific conditions).
     */
    isKilledCondition() {
        return false;
    }

    /**
     * Executes actions when the chicken is killed, stops all intervals and plays death animation.
     */
    isKilled() {
        this.stopAllIntervals();
        this.playAnimation(this.IMAGE_DEATH);
        if (!isMuted) {
            this.enemy_dying_sound.play();
        }
    }

    /**
     * Stops all animation intervals for the chicken object.
     */
    stopAllIntervals() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
} 