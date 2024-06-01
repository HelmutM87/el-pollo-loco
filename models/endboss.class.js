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

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGE_DEATH);

        this.x = 7400;
        this.animate();
        this.checkLive();
    }

    checkLive() {
        this.checkLiveInterval = setInterval(() => {
            if (this.energy < 1) {
                this.isKilled();
                console.log('Endboss is dead');
            }
        }, 80);
        this.intervalIds.push(this.checkLiveInterval);
    }

    animate() {
        this.intervalIds.push(setInterval(() => {
            this.moveLeft();
            if (this.speed === 0) {
                this.playAnimation(this.IMAGES_ALERT, 200); // Alert-Animation mit 200 Millisekunden
            } else {
                this.playAnimation(this.IMAGES_WALKING, 200); // Walking-Animation mit 200 Millisekunden
            }
        }, 200));

        this.randomizeSpeed();
    }

    randomizeSpeed() {
        this.intervalIds.push(setTimeout(() => {
            this.speed = 0; // Endboss anhalten

            this.intervalIds.push(setTimeout(() => {
                this.speed = 0.15 + Math.random() * 5; // Zufällige Geschwindigkeit setzen
                this.randomizeSpeed(); // Neue Verzögerung und Geschwindigkeit zufällig setzen
            }, Math.random() * 5000)); // Zufällige Verzögerung zwischen 0 und 5000 ms

        }, Math.random() * 5000)); // Zufällige Verzögerung zwischen 0 und 5000 ms
    }

    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        if (this.energy < 1) {
            this.isKilled();
            // this.deleteEnemy();
        } else {
            this.playHurtAnimation();
        }
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);

        // Endboss bewegt sich schnell nach links für 500 Millisekunden
        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 20);

        setTimeout(() => {
            clearInterval(moveLeftInterval); // Bewegung nach links stoppen nach 500 Millisekunden
            const attackDuration = Math.min(1000, this.IMAGES_ATTACK.length * 200);
            this.playAnimation(this.IMAGES_ATTACK, attackDuration);
            this.attack_sound.play();
        }, 500); // 500 Millisekunden
    }

    isKilled() {
        // Führe weitere Aktionen aus

        this.playAnimation(this.IMAGE_DEATH, 800); // Death-Animation für 1000 Millisekunden
        this.enemy_dying_sound.play();
        this.attack_sound.pause();
        // Stoppe alle Intervalle, einschließlich checkLive-Interval, nachdem die Aktionen ausgeführt wurden
        setTimeout(() => {
            this.stopAllIntervals();
            this.removeFromEnemiesArray();
        }, 800); // 1000 Millisekunden Verzögerung vor dem Entfernen des Endbosses
    }

    removeFromEnemiesArray() {
        // Finde den Index des Endbosses im enemies-Array
        const index = level1.enemies.indexOf(this);
        if (index > -1) {
            level1.enemies.splice(index, 1); // Entferne den Endboss aus dem Array
        }
    }

    deleteEnemy() {
        this.stopAllIntervals();
        this.removeFromEnemiesArray();
    }

    clearAllIntervals() {
        this.intervalIds.forEach(intervalId => clearInterval(intervalId));
        this.intervalIds = [];
    }

    stopAllIntervals() {
        clearInterval(this.checkLiveInterval); // Stoppe checkLive-Interval
        this.intervalIds.forEach(intervalId => clearInterval(intervalId)); // Stoppe alle anderen Intervalle
        this.intervalIds = [];
    }
}
