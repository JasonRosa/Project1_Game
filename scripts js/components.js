class Component {
    constructor(width, height, color, x, y, ctx, imgUrl) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.speedX = 0;
      this.speedY = 0;
      const img = new Image();
      img.addEventListener('load', () => {})
      img.src = imgUrl;
      this.img = img;
    }


    newPos() {
        this.x += this.speedX //(this.x + this.speedX) % 1000;
        this.y += this.speedY //( this.y + this.speedY) % 500   
     }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x % 1000, this. y, this.width, this.height);
    }

    moveDown() {
        this.y++;
        this.direction = 'south'
    }
    moveUp(){
        this.y--;
        this.direction = 'north'
    }

    moveDiagonalRight() {
        this.y++;
        this.x++;
        this.direction = 'south'
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }

    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || 
        this.right() < obstacle.left() || this.left() > obstacle.right()
        );
    }
}

class Zombie extends Component {
    constructor(width, height, color, x, y, ctx, imgUrl){
        super(width, height, color, x, y, ctx, imgUrl)
        this.direction = 'south'
    }

    //add the left and right methods

    moveDown() {
        this.y++;
        this.direction = 'south'
    }
    moveUp(){
        this.y--;
        this.direction = 'north'
    }

    moveDiagonalRight() {
        this.y++;
        this.x++;
        this.direction = 'south'
    }

    draw(){
        if(this.direction === 'south'){
            this.img.src = './docs/assets/images/southZombie.png'
        } else if(this.direction === 'north') {
            this.img.src = 'link to the north'
        }
        //other 2 directions

        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

}