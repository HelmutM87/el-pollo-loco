class Coin extends DrawableObject {

height = 140;
width = 140;
y = 50;

offset = {
    top: 0,
    left: 30,
    right: 30,
    bottom: 50
};

collectCoin_sound = new Audio('audio/coin.mp3');

IMAGES_COINS_BLINKING = [
    'img_pollo_locco/img/8_coin/coin_1.png',
    'img_pollo_locco/img/8_coin/coin_2.png'
];

constructor() {
super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
this.loadImages(this.IMAGES_COINS_BLINKING);

this.x = -1400 + Math.random() * 8000;

this.y = 15 + Math.random() * 250;


this.animate();

}



animate() {
    setInterval(() => {
        this.playAnimation(this.IMAGES_COINS_BLINKING);
    }, 500);

}

}