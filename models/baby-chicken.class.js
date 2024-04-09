class BabyChicken extends MovableObject {
    height = 60;
    width = 55;
    y = 360;
    IMAGES_CHICKS_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKS_WALKING);

        this.x = 500 + Math.random() * 7000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_CHICKS_WALKING);
        }, 200);

    }
}