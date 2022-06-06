var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var cactuses = [];
var jumpTimer = 0;
var animation;

function Update() {
    animation = requestAnimationFrame(Update);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (timer % 250 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);

    }

    cactuses.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x--;

        CollsionCheck(dino, a);

        a.draw();
    });

    if (jump) {
        dino.y -= 2;
        jumpTimer++;
    }
    if (!jump) {
        if (dino.y < 200) {
            dino.y++;
        }
    }
    if (jumpTimer > 60) {
        jump = false;
        jumpTimer = 0;
    }

    dino.draw()
}

Update();

//충돌 체크

function CollsionCheck(dino, cactus) {
    var x = cactus.x - (dino.x + dino.width);
    var y = cactus.y - (dino.y + dino.height);

    if (x < 0 && y < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}



var jump = false;

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jump = true;
    }
})
