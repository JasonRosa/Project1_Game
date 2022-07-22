const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width;
const cHeight = canvas.height;



//canvas border
let game;
let player;

let boy = "./docs/assets/images/cuteboy/Jump7.png";
let girl = "./docs/assets/images/cutegirl/Jump23.png";

 /* this.ctx.drawImage('..\doc\assets\images\cuteboy\Jump7.png') */


const startBtnBlue = document.getElementById('start-blue');
const startBtnPink = document.getElementById('start-pink');

startBtnBlue.addEventListener("click", () => {
    if (!game) {
        player = new Component(150, 150, 350, 800, ctx, boy, 'boy');
        game = new Game(ctx, cWidth, cHeight, player);
        game.start();
    } else if (game && !game.isRunning) {
        game.reset();
    }

   
                   
});
startBtnPink.addEventListener("click", () => {
    if (!game) {    
            player = new Component(150, 150, 350, 800, ctx, girl, 'girl')
            game = new Game(ctx, cWidth, cHeight, player);
            game.start();
         } else if (game && !game.isRunning) {
        game.reset();
    }
});




document.addEventListener('keydown', (e) => {
    switch(e.code) {
        
        case 'KeyW':
            if(player.y > 10  )  {
                player.speedY -= 1;
            } else player.speedY = 0;
            break;
        case 'KeyS':
            if(player.y + player.height < cHeight) {
                player.speedY += 1;
            } else player.speedY = 0
            break;
        case 'KeyA':
            if (player.x > 10) {
                player.speedX -= 1;
            } else player.speedX = 0;
            break;
        case 'KeyD':
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

let myAudio = new Audio("./docs/assets/sounds/music.wav");
myAudio.loop = true;




