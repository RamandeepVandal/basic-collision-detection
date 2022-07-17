// rectangle class
class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 3;
        this.speedY = 3;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveX() {
        if (this.x > canvas.width - 40) {
            this.speedX = -this.speedX;
        } else if (this.x < 0) {
            this.speedX++;
        }
        this.x += this.speedX;
    }

    moveY() {
        if (this.y >= canvas.height) {
            this.speedY = -this.speedY;
        } else if (this.y < 5) {
            this.speedY++;
        }
        this.y += this.speedY;
    }
}


// circle class
class Circle {
    constructor(x, y, radius, color, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = Math.PI * 2;
        this.color = color;
        this.speedX = 3;
        this.speedY = 3;
        this.speedY = speedY;
    }

    draw() {
        ctx2.beginPath();
        ctx2.strokeStyle = 'Green';
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx2.stroke();
    }

    moveX() {
        if (this.x + this.radius > canvas2.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX;
        }
        this.x += this.speedX;
    }

    moveY() {
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY;
        }
        this.y += this.speedY;
    }
}


let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let canvas2 = document.getElementById('my-canvas2');
let ctx2 = canvas2.getContext('2d');

let collideNUM = document.getElementById('collide');
let collideNUM2 = document.getElementById('collide2');

// middle of the canvas
let middleX = canvas.width / 2;
let middleY = canvas.height / 2;
let middleX2 = canvas2.width / 2;
let middleY2 = canvas2.height / 2;

// create rectangles
let rec1 = new Rectangle(middleX, middleY, 50, 50, 'red');
let rec2 = new Rectangle(middleX, 400, 50, 50, 'blue');

// create circles
let cir1 = new Circle(middleX2, middleY2, 40, 'green',3);
let cir2 = new Circle(middleX2, 300, 40, 'purple',4);

let tempCollide = 'No';

// create animation
const animation = () => {
    requestAnimationFrame(animation);
    // clear canvas after every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    // horizontal rect
    rec1.draw();
    rec1.moveX();
    // vertical rect
    rec2.draw();
    rec2.moveY();

    // diagonal circle
    cir1.draw();
    cir1.moveX();
    cir1.moveY();
    // vertical circle
    cir2.draw();
    cir2.moveY();


    // collision detection -> for rectangles
    if (rec1.x < rec2.x + rec2.width && rec1.x + rec1.width > rec2.x &&
        rec1.y < rec2.y + rec2.height && rec1.y + rec1.height > rec2.y) {
        tempCollide = 'Yes';
        collideNUM.innerHTML = tempCollide;
        collideNUM.style.color = 'Green';
    } else {
        tempCollide = 'No';
        collideNUM.innerHTML = tempCollide;
        collideNUM.style.color = 'Red';
    }


    // collision detection -> for circles
    let rad = 90;
    let distanceX = cir2.x - cir1.x;
    let distanceY = cir2.y - cir1.y;

    if(Math.sqrt(Math.pow(distanceX, 2)+Math.pow(distanceY,2)) < rad) {
        tempCollide = 'Yes';
        collideNUM2.innerHTML = tempCollide;
        collideNUM2.style.color = 'Green';
    } else {
        tempCollide = 'No';
        collideNUM2.innerHTML = tempCollide;
        collideNUM2.style.color = 'Red';
    }


}

animation();