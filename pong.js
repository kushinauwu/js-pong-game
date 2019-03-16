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

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callback();
