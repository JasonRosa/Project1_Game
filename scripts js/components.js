class Component {
    constructor(width, height, color, x, y, ctx, imgUrl, ) {
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

    crashRight(obstacle) {
        return !(
          this.right() < obstacle.left() 
        );
    }
    crashLeft(obstacle) {
        return !(this.left() > obstacle.right());
    }
    crashTop(obstacle) {
        return !(this.bottom() < obstacle.top());
    }
    crashBottom(obstacle) {
        return !(this.top() > obstacle.bottom());
    }
}

class Zombie extends Component {
    constructor(width, height, color, x, y, ctx, imgUrl){
        super(width, height, color, x, y, ctx, imgUrl)
        this.direction = 'south'
    }


    moveDown() {
        this.y++;
        this.direction = 'south';
    }
    moveUp() {
        this.y--;
        this.direction = 'north';
    }

   moveLeft() {
        this.x++;
        this.direction = 'east';
    }

    moveRight() {
        this.x--;
        this.direction = 'west';
    } 

    moveDiagonalRight() {
        this.y++;
        this.x++;
        this.direction = 'south'
    }
draw(){ 
        if(this.direction === 'south'){
            this.img.src = './docs/assets/images/southZombie.png' // Image
        } else if(this.direction === 'north') {
            this.img.src = 'link to the north' // Image
        } else if (this.direction === 'west') {
            this.img.src = 'link to the west' // Image
        } else if (this.direction === 'east') {
          this.img.src = 'link to the east' // Image
        }

    }
}

   

    
   //this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
   

    class Shoppingcart extends Component {
        constructor(width, height, color, x, y, ctx /* imgUrl */){
            super(width, height, color, x, y, ctx /* imgUrl */)
            this.direction = 'south'
        }
    
        moveDown() {
            this.y++;
            this.direction = 'south';
        }
        moveUp(){
            this.y--;
            this.direction = 'north';
        }
    
       moveLeft(){
            this.x++;
            this.direction = 'east';
        }
    
        moveRight() {
            this.x--;
            this.direction = 'west';
        } 
    
        moveDiagonalRight() {
            this.y++;
            this.x++;
            this.direction = 'south'
        }
        
draw(){
    if(this.direction === 'south'){
        this.img.src = './docs/assets/images/southZombie.png' // Image
    } else if(this.direction === 'north') {
        this.img.src = 'link to the north' // Image
    } else if (this.direction === 'west') {
        this.img.src = 'link to the west' // Image
    } else if (this.direction === 'east') {
      this.img.src = 'link to the east' // Image
    }
}
}
/* document.addEventListener('keydown', (e) => {
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
    }); */


/* class Kioskcart extends Shoppingcart {
    constructor(width, height, color, x, y, ctx, imgUrl){
        super(width, height, color, x, y, ctx, imgUrl)
        this.direction = 'static'
       // static staticProperty = 'someValue'
       // static staticMethod() {
       // return this.img.src = './docs/assets/images/southZombie.png' // Image
    }
 } */

