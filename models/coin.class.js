class Coin extends PickableObject {

height = 140;
width = 140;
y = 50;


IMAGES_COINS_BLINKING = [
    'img_pollo_locco/img/8_coin/coin_1.png',
    'img_pollo_locco/img/8_coin/coin_2.png'
];

constructor() {
super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
this.loadImages(this.IMAGES_COINS_BLINKING);

this.x = 200 + Math.random() * 7000;
this.y = 30 + Math.random() * 250;


this.animate();

}



animate() {
    setInterval(() => {
        this.playAnimation(this.IMAGES_COINS_BLINKING);
    }, 500);

}

}