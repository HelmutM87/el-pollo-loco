class BottleStatusBar extends DrawableObject {
    stock = 10;
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];
    
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 30;
        this.width = 150;
        this.height = 40;
        this.setStock(0);
    }

    setStock(stock) {
        this.stock = stock;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.stock >= 10) {
            return 5;
        } else if (this.stock > 7) {
            return 4;
        } else if (this.stock > 5) {
            return 3;
        } else if (this.stock > 3) {
            return 2;
        } else if (this.stock > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}