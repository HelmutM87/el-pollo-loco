class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 155;
    speed = 10;

    // offset = {
    //     top: 110,
    //     left: 25,
    //     right: 50,
    //     bottom: 122
    // };

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
    background_music = new Audio('audio/background-music.mp3');
    sleeping_sound = new Audio('audio/snore.mp3');
    walking_sound = new Audio('audio/pepe-running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hit_sound = new Audio('audio/ouch.mp3');
    dying_sound = new Audio('audio/aaaawww-loser.mp3');
    game_over_sound = new Audio('audio/loser-song.mp3');

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

    animate() {
        // setInterval(() => {
        //     if (!this.isSleepingAnimationPlaying && !this.isWalking) {
        //         this.playAnimation(this.IMAGES_IDLE);
        //     }
        // }, 200);

        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 80);
    }

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
        // this.jumping_sound.play();


        this.world.camera_x = -this.x + 100;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        this.isWalking = true;
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -1320;
    }

    moveLeft() {
        super.moveLeft();
        this.walking_sound.play();
        this.otherDirection = true;
        this.isWalking = true;
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    playCharacter() {
        if (this.isSleeping()) {
            this.isWalking = false;
            this.playAnimation(this.IMAGES_SLEEPING);
        } else if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            
            this.playAnimation(this.IMAGES_HURT);
            
            this.hit_sound.play();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    startIdleTimer() {
        this.idleTimer = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - this.lastKeyPressTime;
            if (elapsedTime >= 3000) {
                this.isSleepingAnimationPlaying = true;
                this.playAnimation(this.IMAGES_SLEEPING);
                // this.sleeping_sound.play();
            } else {
                
                // this.isSleepingAnimationPlaying = false;
                this.sleeping_sound.pause();
                if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.isWalking) {
                    this.playAnimation(this.IMAGES_IDLE);
                    
                }
            }
        }, 200);
    }

    handleKeyPress() {
        this.lastKeyPressTime = new Date().getTime();
        this.sleeping_sound.pause();
    }

    handleKeyUp() {
        this.lastKeyPressTime = new Date().getTime();
    }
    isSleeping() {

    }

    isJumpingOn(mo) {
        return this.isColliding(mo) && this.isAboveGround();
    }

    killByTrampling(enemy) {
        if (enemy.isDead()) return;
        enemy.hit();
        // enemy.smash_sound.currentTime = 0;
        // this.world.playSoundIfSwitchedOn(enemy.smash_sound);
        // this.world.deleteDeadEnemy(enemy);
        this.jump();
    }

}

