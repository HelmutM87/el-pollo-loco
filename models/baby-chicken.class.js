/**
 * Represents a Baby Chicken enemy in the game.
 * @extends MovableObject
 */
class BabyChicken extends MovableObject {
    height = 60;
    width = 55;
    y = 360;
    offset = {
        top: 3,
        left: 8,
        right: 12,
        bottom: 8
    };

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEATH = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    enemy_dying_sound = new Audio('audio/baby-chicken-dying.mp3');

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEATH);
        this.x = 500 + Math.random() * 8000;
        this.speed = 0.15 + Math.random() * 3;
        this.animate();
    }

    /**
     * Initiates the animation and movement of the BabyChicken.
     */
    animate() {
        this.moveInterval = setInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = setInterval(() => this.playBabyChicken(), 200);
    }

    /**
     * Controls the animation of the BabyChicken based on its state (walking or dead).
     */
    playBabyChicken() {
        if (this.isKilledCondition()) {
            this.playAnimation(this.IMAGE_DEATH);
            if (!isMuted)
                this.enemy_dying_sound.play();
        } else
            this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Placeholder method to determine if the BabyChicken is killed.
     * @returns {boolean} Returns false by default, should be overridden with actual logic.
     */
    isKilledCondition() {
        return false;
    }

    /**
     * Handles the actions to be taken when the BabyChicken is killed.
     */
    isKilled() {
        this.stopAllIntervals();
        this.playAnimation(this.IMAGE_DEATH);
        if (!isMuted) {
            this.enemy_dying_sound.play();
        }
    }

    /**
     * Stops all intervals related to the BabyChicken's movement and animation.
     */
    stopAllIntervals() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}