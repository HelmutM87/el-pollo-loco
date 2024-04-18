class Endboss extends MovableObject {

    height = 400;
    width = 350;
    y = 55;

    // offset = {
    //     top: 70,
    //     left: 30,
    //     right: 55,
    //     bottom: 80
    // };

    offset = {
        top: 65,
        left: 30,
        right: 30,
        bottom: 0
    };

    attack_sound = new Audio('audio/hen-attacs.mp3');
    gack_sound = new Audio('audio/hen-gacks.mp3');
    chicken_dying_sound = new Audio('audio/chicken-dying.mp3');
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

    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        
        this.x = 7550;
        this.animate();

        // this.speed = 0.15 + Math.random() * 2;
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
            if (this.speed === 0) {
                this.playAnimation(this.IMAGES_ALERT, 200); // Alert-Animation mit 200 Millisekunden
            } else {
                const randomState = Math.random();
                if (randomState < 0.3) { // 30% Chance, dass die Attack-Animation abgespielt wird
                    const attackDuration = Math.min(2000, this.IMAGES_ATTACK.length * 200); // Mindestens 1000 Millisekunden
                    this.playAnimation(this.IMAGES_ATTACK, attackDuration); // Attack-Animation
                    // this.attack_sound.play();
                } else {
                    this.playAnimation(this.IMAGES_WALKING, 200); // Walking-Animation mit 200 Millisekunden
                    
                }
            }
        }, 200);

        this.randomizeSpeed();
    }

    randomizeSpeed() {
       
        setTimeout(() => {
            this.speed = 0; // Endboss anhalten
            
            setTimeout(() => {
                this.speed = 0.15 + Math.random() * 5; // Zufällige Geschwindigkeit setzen
                this.randomizeSpeed(); // Neue Verzögerung und Geschwindigkeit zufällig setzen
            }, Math.random() * 5000); // Zufällige Verzögerung zwischen 0 und 5000 ms

        }, Math.random() * 5000); // Zufällige Verzögerung zwischen 0 und 5000 ms
    }
}