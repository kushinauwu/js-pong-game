// create a vector for all the pong elements
class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set length(value) {
        const fact = value / this.length;
        this.x *= fact;
        this.y *= fact;
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

class Player extends Rectangle {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.ball = new Ball;
        console.log(this.ball);

        this.players = [
            new Player, new Player,
        ];

        this.players[0].pos.x = 30;
        this.players[1].pos.x = this._canvas.width - 30;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height / 2;
        })

        let lastTime;

        // use requestAnimationFrame to call callback to update the ball's position using arrow function
        const callback = (millis) => {
            // if a lastTime exists, update its position 
            if (lastTime) {
                this.updatePosition((millis - lastTime) / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        };
        callback();

        this.CHAR_PIXELS = 10;
        this.CHARS = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
        ].map(str => {
            const canvas = document.createElement('canvas');
            canvas.height = this.CHAR_PIXELS * 5;
            canvas.width = this.CHAR_PIXELS * 3;
            const context = canvas.getContext('2d');
            context.fillStyle = "white";
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect(
                        (i % 3) * this.CHAR_PIXELS,
                        (i / 3 | 0) * this.CHAR_PIXELS,
                        this.CHAR_PIXELS,
                        this.CHAR_PIXELS
                    );
                }
            });
            return canvas;
        });

        this.reset();
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
            const length = ball.velocity.length;
            ball.velocity.x = -ball.velocity.x;
            ball.velocity.y += 300 * (Math.random() - 0.5)
            ball.velocity.length = length * 1.05;
        }
    }

    draw() {
        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.drawRectangle(this.ball);
        this.players.forEach(player => this.drawRectangle(player));
        this.drawScore();
    }

    drawRectangle(rectangle) {
        this._context.fillStyle = 'white';
        this._context.fillRect(rectangle.left, rectangle.top, rectangle.size.x, rectangle.size.y);
    }

    drawScore() {
        const align = this._canvas.width / 3;
        const CHAR_WIDTH = this.CHAR_PIXELS * 4;
        this.players.forEach((player, index) => {
            const chars = player.score.toString().split('');
            const offset = align *
                (index + 1) -
                (CHAR_WIDTH * chars.length / 2) *
                this.CHAR_PIXELS / 2;
            chars.forEach((char, pos) => {
                this._context.drawImage(this.CHARS[char | 0],
                    offset + pos * CHAR_WIDTH, 20);
            });
        });
    }

    reset() {
        this.ball.pos.x = this._canvas.width / 2;
        this.ball.pos.y = this._canvas.height / 2;
        this.ball.velocity.x = 0;
        this.ball.velocity.y = 0;
    }

    start() {
        if (this.ball.velocity.x === 0 && this.ball.velocity.y === 0) {
            this.ball.velocity.x = 300 * (Math.random() > 0.5 ? 1 : -1);
            this.ball.velocity.y = 300 * (Math.random() * 2 - 1);
            this.ball.velocity.length = 250;
        }
    }

    updatePosition(dt) {
        this.ball.pos.x += this.ball.velocity.x * dt;
        this.ball.pos.y += this.ball.velocity.y * dt;

        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            const playerID = this.ball.velocity.x < 0 | 0;
            this.players[playerID].score++;
            console.log(playerID);
            this.reset();
            //this.ball.velocity.x = -this.ball.velocity.x
        }

        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.velocity.y = -this.ball.velocity.y
        }

        this.players[1].pos.y = this.ball.pos.y;

        this.players.forEach(player => this.collide(player, this.ball));

        this.draw();
    }
}

// create pong canvas and elements
const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].pos.y = event.offsetY;
});

canvas.addEventListener('click', event => {
    pong.start();
});
