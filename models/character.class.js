/**
 * Represents a character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 280;
    width = 150;
    y = 155;
    speed = 10;
    deathSoundPlayed = false;
    deathAnimationPlayed = false;

    offset = {
        top: 120,
        left: 30,
        right: 30,
        bottom: 0
    };

    lastKeyPressTime = new Date().getTime();
    idleTimer;
    isSleepingAnimationPlaying = false;
    isWalking = false;
    world;
    sleeping_sound = new Audio('audio/snore.mp3');
    walking_sound = new Audio('audio/pepe-running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hit_sound = new Audio('audio/ouch.mp3');
    dying_sound = new Audio('audio/aaaawww-loser.mp3');
    game_over_sound = new Audio('audio/loser-song.mp3');
    collectCoin_sound = new Audio('audio/coin.mp3');
    collectBottle_sound = new Audio('audio/glass.mp3');

    IMAGES_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.startIdleTimer();
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Starts character animation intervals.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 80);
    }

    /**
     * Moves the character based on keyboard input.
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        else if (this.canMoveLeft())
            this.moveLeft();
        else
            this.isWalking = false;
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if character can move right.
     * @returns {boolean} True if character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.world.canPressRightArrow;
    }

    /**
     * Moves character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!isMuted) {
            this.walking_sound.play();
        }
        this.isWalking = true;
    }

    /**
     * Checks if character can move left.
     * @returns {boolean} True if character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -1320;
    }

    /**
     * Moves character to the left.
     */
    moveLeft() {
        super.moveLeft();
        if (!isMuted) {
            this.walking_sound.play();
        }
        this.otherDirection = true;
        this.isWalking = true;
    }

    /**
     * Checks if the character can perform a jump action.
     * @returns {boolean} True if SPACE key is pressed and character is not above ground, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Plays the appropriate animation based on the character's state.
     */
    playCharacter() {
        if (this.isSleeping()) {
            this.isWalking = false;
            this.playAnimation(this.IMAGES_SLEEPING);
        } else if (this.isDead())
            this.playDeathFunctions();
        else if (this.isHurt())
            this.playHurtFunctions();
        else if (this.isAboveGround())
            this.playAnimation(this.IMAGES_JUMPING);
        else {
            if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Starts the idle timer to trigger sleep animations after a period of inactivity.
     */
    startIdleTimer() {
        this.idleTimer = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - this.lastKeyPressTime;
            if (elapsedTime >= 8000 && !this.isDead() && this.canSleep) {
                this.playSleepFunctions();
            } else {
                this.isSleepingAnimationPlaying = false;
                this.sleeping_sound.pause();
                if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.isSleeping() && !this.isWalking)
                    this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);
    }

    /**
     * Initiates sleep animations and plays sleep sound if not muted.
     */
    playSleepFunctions() {
        this.isSleepingAnimationPlaying = true;
        this.playAnimation(this.IMAGES_SLEEPING);
        if (!isMuted)
            this.sleeping_sound.play();
    }

    /**
     * Handles key press events and updates last key press time, pauses sleep sound, and prevents immediate sleep after key press.
     */
    handleKeyPress() {
        this.lastKeyPressTime = new Date().getTime();
        this.sleeping_sound.pause();
        this.canSleep = false;
        setTimeout(() => {
            this.canSleep = true;
        }, 8000);
    }

    /**
     * Handles key up events and updates last key press time.
     */
    handleKeyUp() {
        this.lastKeyPressTime = new Date().getTime();
    }

    /**
     * Checks if the character is currently in sleeping state.
     * @returns {boolean} True if sleeping animation is playing and character is not dead, false otherwise.
     */
    isSleeping() {
        return this.isSleepingAnimationPlaying && !this.isDead();
    }

    /**
     * Stops the sleeping animation and sound if currently playing.
     */
    stopSleeping() {
        if (this.isSleepingAnimationPlaying) {
            this.isSleepingAnimationPlaying = false;
            this.sleeping_sound.pause();
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Executes death animations and sounds, pauses background and battle music, and triggers game over if not muted.
     */
    playDeathFunctions() {
        this.world.background_music.pause();
        this.world.battle_music.pause();
        if (!this.deathAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.deathAnimationPlayed = true;
            }, 500);
        }
        if (!this.deathSoundPlayed) {
            this.stopLosingAnimations();
        }
    }

    /**
    * Stops losing animations and triggers game over sound if not muted after death sound ends.
    */
    stopLosingAnimations() {
        if (!isMuted) {
            this.dying_sound.play();
            this.dying_sound.addEventListener('ended', () => {
                this.world.background_music.pause();
                losingGame();
                if (!isMuted) {
                    this.game_over_sound.play();
                }
            });
        } else {
            setTimeout(() => {
                losingGame();
            }, 800);

        }
        this.deathSoundPlayed = true;
    }

    /**
     * Executes hurt animations, stops sleeping animations and sound, and plays hit sound if not muted.
     */
    playHurtFunctions() {
        this.stopSleeping();
        this.sleeping_sound.pause();
        this.playAnimation(this.IMAGES_HURT);
        if (!isMuted) {
            this.hit_sound.play();
        }
    }

    /**
     * Applies gravity effect to the character, making it fall towards the ground when not above ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 155) {
                    this.y = 155;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }
}