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

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEATH);

        this.x = 500 + Math.random() * 8000;
        this.speed = 0.15 + Math.random() * 3;

        this.animate();
    }

    animate() {
        this.moveInterval = setInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = setInterval(() => this.playChicken(), 200);
    }

    playChicken() {
        if (this.isKilledCondition()) {
            this.playAnimation(this.IMAGE_DEATH);
            this.enemy_dying_sound.play();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    isKilledCondition() {
        // Diese Methode sollte die Bedingung zurückgeben, die überprüft, ob das Huhn getötet wurde
        // Zum Beispiel: return this.energy <= 0; (wenn es eine Energieeigenschaft gibt)
        return false; // Platzhalter, die tatsächliche Bedingung hier einfügen
    }

    isKilled() {
        // Stoppe alle Intervalle, wenn das Huhn getötet wird
        this.stopAllIntervals();

        // Führe weitere Aktionen aus
        this.playAnimation(this.IMAGE_DEATH);
        this.enemy_dying_sound.play();
    }

    stopAllIntervals() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
} 
