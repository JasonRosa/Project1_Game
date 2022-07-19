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
    }
  
    start = () => {
      /* for (let i = 0; i <= 4; i++) {
        this.kiosks.push(
          new Kioskcart(
            70,
            70,
            "black",
            Math.floor(Math.random() * 600),
            Math.floor(Math.random() * 900),
            this.ctx
          )
        );
      } */
      this.shoppingCart.push(
        new Component(
          70,
          70,
          "yellow",
          Math.floor(Math.random() * 600),
          Math.floor(Math.random() * 900),
          this.ctx
        )
      );
      this.interval = setInterval(this.updateGameArea, 1000/60);
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
        
      const crashedTop = this.kiosks.some((kiosk) => {
          return this.player.crashTop(kiosk);
       });

       const crashedBottom = this.kiosks.some((kiosk) => {
          return this.player.crashBottom(kiosk);
       });

       const crashedLeft = this.kiosks.some((kiosk) => {
         return this.player.crashLeft(kiosk);
       });

       const crashedRight = this.kiosks.some((kiosk) => {
         return this.player.crashRight(kiosk);
       });

       if (crashedTop) {
        console.log("Im crashing TOP")
        /* this.player.speedY - 5; */
       } else if (crashedBottom) {
        console.log("Im crashing BOTTOM");
        /* this.player.speedY + 5; */
       } else if (crashedLeft) {
        console.log("Im crashing LEFT");
        /* this.player.speedX + 5; */
       } else if (crashedRight) {
        console.log("Im crashing RIGHT");
        /*this.player.speedX - 5; */
       } 
    }

  
      updateObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
          this.obstacles[i].draw();
          if(this.obstacles[i].color === 'violet') {
            this.obstacles[i].moveDown();
          } else if (this.obstacles[i].color === 'aquamarine') {
            this.obstacles[i].moveDiagonalRight();
          } else this.obstacles[i].moveDown();
        }
  
      this.frames += 1;
  
      if (this.frames % 60 === 0) {
        this.obstacles.push(new Component(20, 40, 'violet',  Math.floor(Math.random() * this.width), 0, this.ctx));

        this.obstacles.push(new Component(20, 40, 'red', Math.floor(Math.random() * this.width), 0, this.ctx));
  
        this.obstacles.push (new Component(20, 40, 'aquamarine', Math.floor(Math.random() * this.width), 0, this.ctx)
        );

        this.obstacles.push (new Component(20, 40, 'green', Math.floor(Math.random() * this.width), 0, this.ctx)
        );  
        
        this.obstacles.push (new Component(20, 40, 'brown', Math.floor(Math.random() * this.width), 0, this.ctx)
        );
      }
    }

    checkGameOver = () => {
        const crashed = this.obstacles.some((obstacle) => {
            return this.player.crashWith(obstacle)
        });

        if (crashed) {
            this.stop();
            this.ctx.fillText("F#%$ I´m dead!", 200, 100) 
            this.ctx.font = '24px sans-serif'
        this.ctx.fillStyle = 'black'
        }
    };

    checkBonus = () => {
      const crash = this.shoppingCart.some((obstacle, i) => {
         return this.player.crashWith(obstacle) 
      });

      if (crash) {
        this.shoppingCart = [];
        this.points += 30
      }

    }


    checkGameWin = () => {
      if (this.player.y <= 5) {
        this.stop()
        this.ctx.fillText("Holy Sh*t I survived!", 200, 100) //how do I stylize this? can I make a direct association in CSS?
        this.ctx.font = '24px sans-serif'
        this.ctx.fillStyle = 'black'
      }
    };

    score() {
        this.ctx.font = '24px sans-serif'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`Score: ${this.points}`, 40, 50);
    }
  
    updateGameArea = () => {
      this.clear();
      this.checkGameOver();
      this.drawKiosk();
      this.checkBonus()
      //this.checkKioksCollision()
      this.updateObstacles();
      this.checkGameWin()
      this.player.newPos();
      this.player.draw();
      this.score();
    };
  }