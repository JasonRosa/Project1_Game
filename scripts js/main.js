const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width;
const cHeight = canvas.height;



let game;
//canvas border
let player



const startBtnBlue = document.getElementById('start-blue');
const startBtnPink = document.getElementById('start-pink');

startBtnBlue.addEventListener("click", () => {
    if (!game) {
         player = new Component(50, 50, img, 350, 800, ctx);
        game = new Game(ctx, cWidth, cHeight, player);
        game.start();
    } else if (game && !game.isRunning) {
        game.reset();
    }

    this.ctx.drawImage('..\doc\assets\images\cuteboy\Jump7.png')
                   
});
startBtnPink.addEventListener("click", () => {
    if (!game) {
         player = new Component(50, 50, img, 350, 800, ctx);
        game = new Game(ctx, cWidth, cHeight, player);
        game.start();
    } else if (game && !game.isRunning) {
        game.reset();
    }

      this.ctx.drawImage('..\doc\assets\images\cutegirl\Jump23.png')
});




document.addEventListener('keydown', (e) => {
    switch(e.code) {
        
        case 'ArrowUp':
            if(player.y > 10  )  {
                player.speedY -= 1;
            } else player.speedY = 0;
            break;
        case 'ArrowDown':
            if(player.y + player.height < cHeight) {
                player.speedY += 1;
            } else player.speedY = 0
            break;
        case 'ArrowLeft':
            if (player.x > 10) {
                player.speedX -= 1;
            } else player.speedX = 0;
            break;
        case 'ArrowRight':
            if (player.x + player.width < cWidth + 10) {
                player.speedX += 1;
            } else player.speedX = 0;
            break;
    }

    document.addEventListener('keyup', (e) => {
        player.speedX = 0;
        player.speedY = 0;
    });


})