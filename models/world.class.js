class World {


    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    bottles = level1.bottles;
    coins = level1.coins;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    liveStatusBar = new LiveStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();

            this.checkThrowObjects();
        }, 200);
    }





    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }





    checkCollisions() {

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                console.log('Pepe is colliding with', enemy);
                this.character.hit();
                this.liveStatusBar.setPercentage(this.character.energy);
                // this.endbossStatusBar.setPercentage(this.endboss.energy);
                console.log('Energy:', this.character.energy);
            } 

        });

        this.level.coins.forEach((coin, index) => {
              if (this.character.isColliding(coin)) {
                console.log('Pepe is colliding with', coin);
                this.character.pickCoin();
                level1.coins.splice(index,1);
                this.liveStatusBar.setPercentage(this.character.energy);
                console.log('Energy:', this.character.energy);
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
              console.log('Pepe is colliding with', bottle);
              this.character.pickBottle();
              level1.bottles.splice(index,1);
              this.bottleStatusBar.setStock(this.character.bottleDepot);
              console.log('Pepe has', this.character.bottleDepot, 'bottles');
          }
      });
    }

    

    draw() {
        //alles wird gecleart, bevor es neu gezeichnet wird
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        // ----------------Space for fixed objects -------------------//



        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);

        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.liveStatusBar);
        this.addToMap(this.endbossStatusBar);
        // this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);



        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawOffset(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    // pickCoin() {
    //     this.energy += 5;
    //     let i = 0;
    //     this.level.coins.forEach(() => {
    //         if(this.character.isColliding(level1.coins[i])){
    //             if(mute == false){
    //                 this.coinSound.play();
    //             }
    //             level1.coins.splice(i,1);
    //             this.coinStatusBar.collect();
    //         }
    //         i++;
    //     }); 

    // } 

}