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
        this.isRunning = false ;
    }
  
    updateObstacles() {
      for (let i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].x -= 1;
        this.obstacles[i].draw();
      }
  
      this.frames += 1;
  
      if (this.frames % 120 === 0) {
        let x = this.width;
  
        let minHeight = 20;
  
        let maxHeight = 200;
  
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  
        let minGap = 50;
  
        let maxGap = 200;
  
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
  
        this.obstacles.push(new Component(20, height, 'violet', x, 0, this.ctx));
  
        this.obstacles.push(
          new Component(20, x - height - gap, 'aquamarine', x, height + gap, this.ctx)
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

    score() {
        const points = Math.floor(this.frames / 5)
        this.ctx.font = '24px sans-serif'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`Score: ${points}`, 850, 50);
    }
  
    updateGameArea = () => {
      this.clear();
      this.checkGameOver();
      this.updateObstacles();
      this.player.newPos();
      this.player.draw();
      this.score();
    };
  }