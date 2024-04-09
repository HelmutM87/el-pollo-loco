class Chicken extends MovableObject {
    height = 60;
    width = 55;
    y = 360;
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

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
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        // setInterval(() => {
        //    let i = this.currentImage % this.IMAGES_WALKING.length;
        //    let path = this.IMAGES_WALKING[i];
        //    this.img = this.imageCache[path];
        //    this.currentImage++;
        // }, 200);
    }

    // this.x -= 0.15;
}