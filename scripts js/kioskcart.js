class Kioskcart extends Component {
    constructor (width, height, x, y, ctx, img) {
        super(width, height, x, y, ctx, img)
    }

    drawBoard() {
        this.ctx.drawImage(this.img, this.x , this.y, this.width, this.height);
    }
}

