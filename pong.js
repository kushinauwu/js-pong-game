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

// crate pong canvas and elements
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ball = new Ball;
console.log(ball);
ball.pos.x = 100;
ball.pos.y = 100;
ball.velocity.x = 50;
ball.velocity.y = 50;

let lastTime;

// use requestAnimationFrame to call callback to update the ball's position
function callback(millis) {
    // if a lastTime exists, update its position 
    if (lastTime) {
        updatePosition((millis - lastTime) / 1000);
    }
    lastTime = millis;
    requestAnimationFrame(callback);
}

// update position of pong elements
function updatePosition(dt) {
    ball.pos.x += ball.velocity.x * dt;
    ball.pos.y += ball.velocity.y * dt;

    if (ball.pos.x < 0 || ball.pos.x > canvas.width) {
        ball.velocity.x = -ball.velocity.x
    }

    if (ball.pos.y < 0 || ball.pos.y > canvas.height) {
        ball.velocity.y = -ball.velocity.y
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callback();
