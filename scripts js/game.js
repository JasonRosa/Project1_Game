class Game {
    constructor(ctx, width, height, player) {
      this.frames = 0;
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.player = player;
      this.obstacles = [];
      this.interval = null;
      this.isRunning = false;
      this.kiosks = [];
      this.shoppingCart = [];
      this.attached = true;
      this.points = Math.floor(this.frames / 5)
      this.zombiesKilled = 0;
      this.message = ''
      this.messageTimer = 0;
  
    }
  
    start = () => {
       for (let i = 0; i <= 2; i++) {
        this.kiosks.push(
          new Kioskcart(
            100,
            100,
            Math.floor(Math.random() * 600),
            Math.floor(Math.random() * 900),
            this.ctx,
            "../doc/assets/images/icecreamcart.png"
          )
        );
      }

       /* for (let i = 0; i <= 2; i++) {
          this.kiosks.push(
            new Kioskcart(
              80,
              80,
              Math.floor(Math.random() * 600),
              Math.floor(Math.random() * 900),
              this.ctx,
              "../doc/assets/images/icecreamcart.png"
            )
          );
      } */

      this.shoppingCart.push(
        new Component(
          70,
          70,
          Math.floor(Math.random() * 600),
          Math.floor(Math.random() * 900),
          this.ctx,
          "./doc/assets/images/6011-removebg-preview.png"
        )
      );

      this.interval = setInterval(this.updateGameArea, 1000 / 60);
      this.isRunning = true;
    } 


    reset = () => {
        this.player.x = 0;
        this.player.y = 110;
        this.frames = 0;
        this.obstacles = [];
        this.start();
    };
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
    }

    drawKiosk() {
      this.kiosks.forEach((kiosk) => {
        kiosk.drawBoard()
      })
      this.shoppingCart.forEach((i) => {
        i.draw()
      })
    }

    checkKioksCollision() {

      let crashedKiosk;
      const crashed = this.kiosks.some((kiosk) => {
        if(this.player.crashWith(kiosk)){
          crashedKiosk = kiosk;
          return true;
        }
     });

     if(crashed){
      this.player.speedX = 0;
      this.player.speedY = 0

     if(this.player.crashBottom(crashedKiosk)){
        this.player.y += 1;
        
     } else if(this.player.crashTop(crashedKiosk)){
      this.player.y -= 1
      
     } else if(this.player.crashRight(crashedKiosk)){
      this.player.x += 1
      
     } else if(this.player.crashLeft(crashedKiosk)){
      this.player.x -= 1 
     }
     }
  
    }
  

  
      updateObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
          this.obstacles[i].draw();
          if(this.obstacles[i].img === 'south') {
            this.obstacles[i].moveDown();
          } else if (this.obstacles[i].img === 'north') {
            this.obstacles[i].moveDiagonalRight();
          } else this.obstacles[i].moveDown();
        }

      
      this.frames += 1;

      if (this.frames % 60 === 0) {
        this.obstacles.push(
          new Component(
            70,
            70,
            Math.floor(Math.random() * this.width),
            0,
            this.ctx,
            "../doc/assets/images/zombies/3/front/Attack4.png"
          )
        );
          
        this.obstacles.push(
          new Component(
            70,
            70,
            Math.floor(Math.random() * this.width),
            0,
            this.ctx,
            "../doc/assets/images/zombies/1/front/Walk24.png"
          )
        );
  
        this.obstacles.push(
          new Component(
            70,
            70,
            Math.floor(Math.random() * this.width),
            0,
            this.ctx,
            "../doc/assets/images/zombies/4/right/Attack3.png"
          )
        );

        this.obstacles.push(
          new Component(
            70,
            70,
            Math.floor(Math.random() * this.width),
            0,
            this.ctx,
            "../doc/assets/images/zombies/6/left/Attack4.png"
          )
        );  

        this.obstacles.push(
          new Component(
            70,
            70,
            Math.floor(Math.random() * this.width),
            0,
            this.ctx,
            "../doc/assets/images/zombies/5/front/Attack5.png"
          )
        );
      }
    }
    
    
    checkGameOver = () => {
        const crashed = this.obstacles.some((obstacle) => {
            return this.player.crashWith(obstacle)
        });

        if (crashed && !this.player.hasWeapon) {
            this.stop();
            //this.ctx.drawImage("../doc/assets/images/cuteboy/Dead5.png")
            this.ctx.fillText("F#%$ I´m dead!", 200, 100) 
            this.ctx.font = '100px  bold sans-serif '
            this.ctx.fillStyle = 'black'
        }
        }
     //doc\assets\images\cutegirl\Dead (7).png

    checkBonus = () => {
      if(this.zombiesKilled !==0 && this.zombiesKilled % 5 === 0){
        this.player.hasWeapon = false;
        console.log(this.player.hasWeapon)
      }
      const crash = this.shoppingCart.some((obstacle) => {
         return this.player.crashWith(obstacle) 
      });

      if (crash) {
        this.shoppingCart = [];
        this.player.hasWeapon = true;
        this.points += 30
        this.message = "Let´s kick some zombie a$$!"
        this.messageTimer = 120;
      }
    }
  
      checkPoints = () => {
        const crashes = this.obstacles.some((obstacle, i) => {
          if(this.player.crashWith(obstacle)){
            this.obstacles.splice(i, 1)
            return true
          } 
        });
  
        if (crashes && this.player.hasWeapon) {
          //this.shoppingCart = [];
          this.zombiesKilled++;
          this.points += 80 
          this.message = "Take that zombie scum!!"
          this.messageTimer = 120;
          this.ctx.font = '100px  bold sans-serif '
          this.ctx.fillStyle = 'black'
        } 

    }

    checkMessage = () => {
      if(this.message && this.messageTimer > 0){
        this.ctx.font = '50px bold sans-serif '
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`${this.message}`, 200, 100) 
        this.messageTimer--
      }
    }


    checkGameWin = () => {
      if (this.player.y <= 5) {
        this.stop()
        this.ctx.fillText("Holy sh*t I survived!", 200, 100) //how do I stylize this? can I make a direct association in CSS?
        this.ctx.font = '50px bold sans-serif';
        this.ctx.fillStyle = 'black';
      }
    }

    score = () => {
        this.ctx.font = '24px sans-serif bold';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score: ${this.points}`, 40, 50);
    };
  
    updateGameArea = () => {
      this.clear();
      this.checkGameOver();
      this.checkPoints();
      this.drawKiosk();
      this.checkBonus()
      this.checkKioksCollision()
      this.updateObstacles();
      this.checkGameWin()
      this.player.newPos();
      this.player.draw();
      this.score();
      this.checkMessage()
    };
}