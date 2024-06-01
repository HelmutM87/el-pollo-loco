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
    // throwableObjects = new ThrowableObject();
    canPressD = true;
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/glass.mp3');
    background_music = new Audio('audio/background-music.mp3');


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
            this.background_music.play();
            
        }, 80);
    }

   




    checkThrowObjects() {
        if (this.keyboard.D && this.canPressD && this.character.bottleDepot > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.decreaseBottleDepot();
            this.bottleStatusBar.setStock(this.character.bottleDepot);

            // Set canPressD to false
            this.canPressD = false;

            // After 0.8 seconds, set canPressD back to true
            setTimeout(() => {
                this.canPressD = true;
            }, 500);
        }
    }



    checkCollisions() {
        // Kollisionsprüfung für Trampling und Kollision mit Charakter
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isTrampling(enemy)) {
                if (enemy instanceof Endboss) {
                    console.log('Pepe is trampling on the Endboss, but nothing happens');
                } else {
                    console.log('Pepe is trampling on', enemy);
                    this.character.jump();
                    enemy.isKilled(index);
                    setTimeout(() => {
                        this.deleteEnemy(index);
                    }, 800);
                }
            } else if (this.character.isColliding(enemy)) {
                console.log('Pepe is colliding with', enemy);
                this.character.hit();
                this.liveStatusBar.setPercentage(this.character.energy);
                console.log('Energy:', this.character.energy);
            }
        });

        // Kollisionsprüfung für Münzen
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                console.log('Pepe picked up a', coin);
                this.character.pickCoin(coin);
                this.coin_sound.play();
                level1.coins.splice(index, 1);
                this.liveStatusBar.setPercentage(this.character.energy);
                console.log('Energy:', this.character.energy);
            }
        });

        // Kollisionsprüfung für Flaschen
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.pickBottle();
                this.bottle_sound.play();
                level1.bottles.splice(index, 1);
                this.bottleStatusBar.setStock(this.character.bottleDepot);
                console.log('Pepe has now', this.character.bottleDepot, 'bottles');
            }
        });

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        console.log('Bottle is colliding with the Endboss');
                        bottle.splash();
                        if (enemy.energy < 1) {
                            console.log('Endboss energy is less than 1. Removing Endboss.');
                            this.deleteEnemy(enemyIndex);
                        } else {
                            enemy.hit(2);
                            this.endbossStatusBar.setPercentage(enemy.energy);
                            console.log('Energy of Endboss:', enemy.energy);
                        }
                    } else {
                        console.log('Bottle is colliding with', enemy);
                        bottle.splash();
                        enemy.isKilled(enemyIndex);
                        setTimeout(() => {
                            this.deleteEnemy(enemyIndex, 1);
                        }, 800);
                    }
                }
            });
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
        // mo.drawFrame(this.ctx);
        // mo.drawOffset(this.ctx);

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

    deleteEnemy(index) {
        level1.enemies.splice(index, 1);
    }


}