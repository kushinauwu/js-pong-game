// create a vector for all the pong elements
class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

// create generalized data structure for recatangles
class Rectangle {
    constructor(width, height) {
        this.pos = new Vec;
        this.size = new Vec(width, height);
    }

    get left() {
        return this.pos.x - this.size.x / 2;
    }

    get right() {
        return this.pos.x + this.size.x / 2
    }

    get top() {
        return this.pos.y - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y / 2
    }
}

// Ball inherits from rectangle
class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vec;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.ball = new Ball;
        console.log(this.ball);
        this.ball.pos.x = 100;
        this.ball.pos.y = 100;
        this.ball.velocity.x = 100;
        this.ball.velocity.y = 100;

        let lastTime;

        // use requestAnimationFrame to call callback to update the ball's position using arrow function
        const callback = (millis) => {
            // if a lastTime exists, update its position 
            if (lastTime) {
                this.updatePosition((millis - lastTime) / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        }
        callback();
    }

    updatePosition(dt) {
        this.ball.pos.x += this.ball.velocity.x * dt;
        this.ball.pos.y += this.ball.velocity.y * dt;

        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            this.ball.velocity.x = -this.ball.velocity.x
        }

        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.velocity.y = -this.ball.velocity.y
        }

        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._context.fillStyle = 'white';
        this._context.fillRect(this.ball.pos.x, this.ball.pos.y, this.ball.size.x, this.ball.size.y);
    }
}

// create pong canvas and elements
const canvas = document.getElementById('pong');
const pong = new Pong(canvas);
