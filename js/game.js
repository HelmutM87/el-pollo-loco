let canvas;
let world;
let keyboard = new Keyboard();
window.my_mute = false;
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);


function init() {
    initLevel();
    setTimeout(() => {
        canvas = document.getElementById('canvas');
        document.getElementById('play_button').classList.add("d-none");
        document.getElementById('canvas_navbar_footer').classList.remove("d-none");
        document.getElementById('canvas').classList.remove("d-none");
        document.getElementById('my_mute_button').classList.remove("d-none");
        document.getElementById('mobile_buttons').classList.remove("d-none");
        world = new World(canvas, keyboard);
        bindTouchEvents();
    }, 1500);
}

function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById('orientation_warning').style.display = 'flex';
    } else {
        document.getElementById('orientation_warning').style.display = 'none';
    }
}


function bindKeyEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) keyboard.RIGHT = true;
        if (e.keyCode == 37) keyboard.LEFT = true;
        if (e.keyCode == 38) keyboard.UP = true;
        if (e.keyCode == 40) keyboard.DOWN = true;
        if (e.keyCode == 32) keyboard.SPACE = true;
        if (e.keyCode == 68) keyboard.D = true;
        world.character.handleKeyPress();
    });

    window.addEventListener("keyup", (e) => {
        if (e.keyCode == 39) keyboard.RIGHT = false;
        if (e.keyCode == 37) keyboard.LEFT = false;
        if (e.keyCode == 38) keyboard.UP = false;
        if (e.keyCode == 40) keyboard.DOWN = false;
        if (e.keyCode == 32) keyboard.SPACE = false;
        if (e.keyCode == 68) keyboard.D = false;
        world.character.handleKeyUp();
    });
}


function bindTouchEvents() {
    document.getElementById('go_left_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
        world.character.handleKeyPress();
    });

    document.getElementById('go_left_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        world.character.handleKeyUp();
    });

    document.getElementById('go_right_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
        world.character.handleKeyPress();
    });

    document.getElementById('go_right_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
        world.character.handleKeyUp();
    });

    document.getElementById('jump_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
        world.character.handleKeyPress();
    });

    document.getElementById('jump_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
        world.character.handleKeyUp();
    });

    document.getElementById('throw_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
        world.character.handleKeyPress();
    });

    document.getElementById('throw_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
        world.character.handleKeyUp();
    });
}


function winningGame() {
    if (world) {
        world.winningGame();
    }
    document.getElementById('mobile_buttons').classList.add("d-none");
}

function losingGame() {
    clearAllIntervals();
    document.getElementById('canvas').classList.add("d-none");
    document.getElementById('mobile_buttons').classList.add("d-none");
    document.getElementById('start_screen').classList.remove("start_screen");
    document.getElementById('start_screen').classList.add("end_screen_lost");
    document.getElementById('lost').classList.remove("d-none");
}


function menu() {
    window.location.href = 'index.html';
}


window.addEventListener("keydown", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function openInfo() {
    document.getElementById('info').classList.remove("d-none");
}


function closeInfo() {
    document.getElementById('info').classList.add("d-none");
}


function toggleAudio() {
    if (world) {
        world.toggleAudio();
    }
    let muteButton = document.getElementById('my_mute_button');
    if (world.isMuted) {
        muteButton.src = '/images/backgroundmusic_mute.png';
    } else {
        muteButton.src = '/images/audio.png';
    }
}