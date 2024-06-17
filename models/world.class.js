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
    canPressD = true;
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/glass.mp3');
    background_music = new Audio('audio/background-music.mp3');
    battle_music = new Audio('audio/hen-attac-background-music.mp3');
    win_music = new Audio('audio/winner-song.mp3');
    lose_music = new Audio('audio/loser-song.mp3');
    isBattleMusicPlaying = false;
    isMuted = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.isBattleMusicPlaying = false;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        this.background_music.play();
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 80);
    }


    switchToBattleMusic() {
        if (!this.isBattleMusicPlaying) {
            this.background_music.pause();
            this.battle_music.play();
            this.isBattleMusicPlaying = true;
        }
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.canPressD && this.character.bottleDepot > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.decreaseBottleDepot();
            this.bottleStatusBar.setStock(this.character.bottleDepot);
            this.canPressD = false;
            setTimeout(() => {
                this.canPressD = true;
            }, 500);
        }
    }


    // checkCollisions() {
    //     this.level.enemies.forEach((enemy, index) => {
    //         if (this.character.isTrampling(enemy)) {
    //             if (enemy instanceof Endboss) {
    //                 console.log('Pepe is trampling on the Endboss, but nothing happens');
    //             } else {
    //                 console.log('Pepe is trampling on', enemy);
    //                 this.character.jump();
    //                 enemy.isKilled(index);
    //                 setTimeout(() => {
    //                     this.deleteEnemy(index);
    //                 }, 800);
    //             }
    //         } else if (this.character.isColliding(enemy)) {
    //             console.log('Pepe is colliding with', enemy);
    //             this.character.hit();
    //             this.liveStatusBar.setPercentage(this.character.energy);
    //             console.log('Energy:', this.character.energy);
    //         }
    //     });

    //     this.level.coins.forEach((coin, index) => {
    //         if (this.character.isColliding(coin)) {
    //             console.log('Pepe picked up a', coin);
    //             this.character.pickCoin(coin);
    //             this.coin_sound.play();
    //             level1.coins.splice(index, 1);
    //             this.liveStatusBar.setPercentage(this.character.energy);
    //             console.log('Energy:', this.character.energy);
    //         }
    //     });

    //     this.level.bottles.forEach((bottle, index) => {
    //         if (this.character.isColliding(bottle)) {
    //             this.character.pickBottle();
    //             this.bottle_sound.play();
    //             level1.bottles.splice(index, 1);
    //             this.bottleStatusBar.setStock(this.character.bottleDepot);
    //             console.log('Pepe has now', this.character.bottleDepot, 'bottles');
    //         }
    //     });

    //     this.throwableObjects.forEach((bottle) => {
    //         this.level.enemies.forEach((enemy, enemyIndex) => {
    //             if (bottle.isColliding(enemy)) {
    //                 if (enemy instanceof Endboss) {
    //                     console.log('Bottle is colliding with the Endboss');
    //                     bottle.splash();
    //                     if (enemy.energy < 1) {
    //                         console.log('Endboss energy is less than 1. Removing Endboss.');
    //                         this.deleteEnemy(enemyIndex);
    //                     } else {
    //                         enemy.hit(2);
    //                         this.endbossStatusBar.setPercentage(enemy.energy);
    //                         console.log('Energy of Endboss:', enemy.energy);
    //                         this.switchToBattleMusic();
    //                     }
    //                 } else {
    //                     console.log('Bottle is colliding with', enemy);
    //                     bottle.splash();
    //                     enemy.isKilled(enemyIndex);
    //                     setTimeout(() => {
    //                         this.deleteEnemy(enemyIndex, 1);
    //                         winningGame();
    //                     }, 800);
    //                 }
    //             }
    //         });
    //     });
    // }

    checkCollisions() {
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
                    bottle.splash();
                    if (enemy instanceof Endboss) {
                        console.log('Bottle is colliding with the Endboss');
                        if (enemy.energy < 1) {
                            console.log('Endboss energy is less than 1. Removing Endboss.');
                            
                            this.deleteEndboss();
                            this.winningGame(); // Endgame when the Endboss is defeated
                        } else {
                            enemy.hit(2);
                            this.endbossStatusBar.setPercentage(enemy.energy);
                            console.log('Energy of Endboss:', enemy.energy);
                            this.switchToBattleMusic();
                        }
                    } else {
                        console.log('Bottle is colliding with', enemy);
                        enemy.isKilled(enemyIndex);
                        setTimeout(() => {
                            this.deleteEnemy(enemyIndex);
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
        this.addToMap(this.bottleStatusBar);

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


    // deleteEnemy(index) {
    //     level1.enemies.splice(index, 1);
    // }


    // toggleAudio() {
    //     this.isMuted = !this.isMuted;

    //     this.background_music.muted = this.isMuted;
    //     this.battle_music.muted = this.isMuted;
    //     this.win_music.muted = this.isMuted;
    //     this.lose_music.muted = this.isMuted;

    //     if (this.isMuted) {
    //         console.log('Background music is muted');
    //     } else {
    //         console.log('Background music is unmuted');
    //     }
    // }


    // winningGame() {
    //     clearAllIntervals();
    //     this.win_music.play();
    //     document.getElementById('canvas').classList.add("d-none");
    //     document.getElementById('canvas_navbar_header').classList.add("d-none");
    //     document.getElementById('canvas_navbar_footer').classList.add("d-none");
    //     document.getElementById('start_screen').classList.remove("z-index1");
    //     document.getElementById('won').classList.remove("d-none");
    //     document.getElementById('start_screen').classList.remove("start_screen");
    //     document.getElementById('start_screen').classList.add("end_screen_won");
    // }

    deleteEnemy(index) {
        if (!(this.level.enemies[index] instanceof Endboss)) {
            level1.enemies.splice(index, 1);
        }
    }

    deleteEndboss() {
        this.level.enemies = this.level.enemies.filter(enemy => !(enemy instanceof Endboss));
    }

    toggleAudio() {
        this.isMuted = !this.isMuted;

        this.background_music.muted = this.isMuted;
        this.battle_music.muted = this.isMuted;
        this.win_music.muted = this.isMuted;
        this.lose_music.muted = this.isMuted;

        if (this.isMuted) {
            console.log('Background music is muted');
        } else {
            console.log('Background music is unmuted');
        }
    }

    winningGame() {
        clearAllIntervals();
        this.battle_music.pause();
        this.background_music.pause();
        this.win_music.play();
        document.getElementById('canvas').classList.add("d-none");
        document.getElementById('canvas_navbar_header').classList.add("d-none");
        document.getElementById('canvas_navbar_footer').classList.add("d-none");
        document.getElementById('start_screen').classList.remove("z-index1");
        document.getElementById('won').classList.remove("d-none");
        document.getElementById('start_screen').classList.remove("start_screen");
        document.getElementById('start_screen').classList.add("end_screen_won");
    }

}