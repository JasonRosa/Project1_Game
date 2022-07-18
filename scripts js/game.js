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
    }
  
    start() {
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
  
      if (this.frames % 300 === 0) {
        this.obstacles.push(new Component(20, 40, 'violet',  Math.floor(Math.random() * this.width), 0, this.ctx));

        this.obstacles.push(new Component(20, 40, 'red', Math.floor(Math.random() * this.width), 0, this.ctx));
  
        this.obstacles.push (new Component(20, 40, 'aquamarine', Math.floor(Math.random() * this.width), 0, this.ctx)
        );
      }
    }

    checkGameOver = () => {
        const crashed = this.obstacles.some((obstacle) => {
            return this.player.crashWith(obstacle)
        });

        if (crashed) {
            this.stop();
        }
    };


    checkGameWin = () => {
      if (this.player.y <= 5) {
        this.stop()
        this.ctx.fillText('You won', 200, 100)
       }
    };

    score() {
        const points = Math.floor(this.frames / 5)
        this.ctx.font = '24px sans-serif'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`Score: ${points}`, 40, 50);
    }
  
    updateGameArea = () => {
      this.clear();
      this.checkGameOver();
      this.updateObstacles();
      this.checkGameWin()
      this.player.newPos();
      this.player.draw();
      this.score();
    };
  }