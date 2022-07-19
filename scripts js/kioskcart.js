class Kioskcart extends Component {
    constructor (width, height, color, x, y, ctx) {
        super(width, height, color, x, y, ctx)
        this.direction = "static";
    }

    drawBoard() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x , this.y, this.width, this.height);
    }
}

