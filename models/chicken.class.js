class Chicken extends MovableObject {
    height = 60;
    width = 55;
    y = 360;
   
    // offset = {
    //     top: 3,
    //     left: 3,
    //     right: 6,
    //     bottom: 8
    // };

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

    chicken_dying_sound = new Audio('audio/chicken-dying.mp3');

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEATH);

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
            if (this.isDead()) {
                this.playAnimation(this.IMAGE_DEATH);
                this.chicken_dying_sound.play();
            } else {
            this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

        // setInterval(() => {
        //    let i = this.currentImage % this.IMAGES_WALKING.length;
        //    let path = this.IMAGES_WALKING[i];
        //    this.img = this.imageCache[path];
        //    this.currentImage++;
        // }, 200);
    }

    
    
}