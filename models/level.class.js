class Level {
    enemies;   
    clouds;
    bottles;
    coins;
    backgroundObjects;
 
    level_end_x = 7280;

    constructor (enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}

// bottles, 