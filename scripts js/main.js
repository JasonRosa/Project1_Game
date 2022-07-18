const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width;
const cHeight = canvas.height;



const player = new Component(50, 50, 'red', 350, 1140, ctx);



let game;



const startBtn = document.getElementById('start');

startBtn.addEventListener("click", () => {
    if (!game) {
        game = new Game(ctx, cWidth, cHeight, player);
        game.start();
    } else if (game && !game.isRunning) {
        game.reset();
    }

});

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        
        case 'ArrowUp':
            player.speedY -= 1;
            break;
        case 'ArrowDown':
            player.speedY += 1;
            break;
        case 'ArrowLeft':
            player.speedX -= 1;
            break;
        case 'ArrowRight':
            player.speedX += 1;
            break;
    }

    document.addEventListener('keyup', (e) => {
        player.speedX = 0;
        player.speedY = 0;
    });


})