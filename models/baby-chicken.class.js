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

    // offset = {
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0
    // };
    IMAGES_CHICKS_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_CHICK_DEATH = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    baby_chicken_dying_sound = new Audio('audio/baby-chicken-dying.mp3');


    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKS_WALKING);
        this.loadImages(this.IMAGE_CHICK_DEATH);

        this.x = 500 + Math.random() * 8000;
        this.speed = 0.15 + Math.random() * 2;

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