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

//Ball inherits from rectangle
class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vec;
    }
}

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ball = new Ball;
console.log(ball);

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = 'white';
context.fillRect(0, 0, 10, 10);
