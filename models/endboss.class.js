/**
 * Represents the Endboss in the game, inheriting from MovableObject.
 * Handles its animations, behaviors, and interactions within the game.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 350;
    y = 55;
    energy = 100;
    lastHit = 0;
    intervalIds = [];
    checkLiveInterval;

    offset = {
        top: 65,
        left: 30,
        right: 30,
        bottom: 0
    };

    attack_sound = new Audio('audio/hen-attacs.mp3');
    gack_sound = new Audio('audio/hen-gacks.mp3');
    enemy_dying_sound = new Audio('audio/chicken-dying.mp3');

    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGE_DEATH = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(world) {
        super();
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGE_DEATH);
        this.x = 7400;
        this.animate();
        this.checkLive();
    }

    /**
     * Periodically checks if the Endboss is alive.
     * If energy is less than 1, triggers the isKilled method.
     */
    checkLive() {
        this.checkLiveInterval = setInterval(() => {
            if (this.energy < 1) {
                this.isKilled();
            }
        }, 80);
        this.intervalIds.push(this.checkLiveInterval);
    }

    /**
     * Animates the Endboss by moving it left and playing the appropriate animations.
     * Also randomizes its speed.
     */
    animate() {
        this.intervalIds.push(setInterval(() => {
            this.moveLeft();
            if (this.speed === 0) {
                this.playAnimation(this.IMAGES_ALERT, 200);
            } else {
                this.playAnimation(this.IMAGES_WALKING, 200);
            }
        }, 200));
        this.randomizeSpeed();
    }

    /**
     * Randomizes the speed of the Endboss.
     * Sets speed to 0 for a random duration, then sets it to a random speed.
     */
    randomizeSpeed() {
        this.intervalIds.push(setTimeout(() => {
            this.speed = 0;
            this.intervalIds.push(setTimeout(() => {
                this.speed = 0.15 + Math.random() * 5;
                this.randomizeSpeed();
            }, Math.random() * 5000));
        }, Math.random() * 5000));
    }

    /**
     * Handles the Endboss being hit.
     * Decreases its energy and plays the hurt animation.
     * If energy drops below 1, triggers the isKilled method.
     * @param {number} damage - The amount of damage dealt to the Endboss.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        if (this.energy < 1) {
            this.isKilled();
        } else {
            this.playHurtAnimation();
        }
    }

    /**
     * Plays the hurt animation and initiates a temporary attack sequence.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 20);

        setTimeout(() => {
            clearInterval(moveLeftInterval);
            const attackDuration = Math.min(1000, this.IMAGES_ATTACK.length * 200);
            this.playAnimation(this.IMAGES_ATTACK, attackDuration);
            if (!isMuted) {
                this.attack_sound.play();
            }
        }, 500);
    }

    /**
     * Handles the Endboss being killed.
     * Plays the death animation, stops all intervals, and removes the Endboss from the enemies array.
     * Triggers the winningGame method in the game world.
     */
    isKilled() {
        this.attack_sound.pause();
        this.playAnimation(this.IMAGE_DEATH, 800);
        if (!isMuted) {
            this.enemy_dying_sound.play();
        }
        setTimeout(() => {
            this.stopAllIntervals();
            this.removeFromEnemiesArray();
            this.world.battle_music.pause();
            this.world.isBattleMusicPlaying = false;
            this.world.winningGame();
        }, 800);
    }

    /**
     * Removes the Endboss from the enemies array in the current level.
     */
    removeFromEnemiesArray() {
        const index = level1.enemies.indexOf(this);
        if (index > -1) {
            level1.enemies.splice(index, 1);
        }
    }

    /**
     * Deletes the Endboss by stopping all intervals and removing it from the enemies array.
     */
    deleteEnemy() {
        this.stopAllIntervals();
        this.removeFromEnemiesArray();
    }

    /**
     * Clears all intervals associated with the Endboss.
     */
    clearAllIntervals() {
        this.intervalIds.forEach(intervalId => clearInterval(intervalId));
        this.intervalIds = [];
    }

    /**
     * Stops all intervals and clears the checkLive interval.
     */
    stopAllIntervals() {
        clearInterval(this.checkLiveInterval);
        this.intervalIds.forEach(intervalId => clearInterval(intervalId));
        this.intervalIds = [];
    }
}