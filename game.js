/**
 * Created by lmy on 17-10-29.
 */
var ctx = document.getElementById("canvas");
var context = ctx.getContext("2d");

let speed = 2;
let spaceShip = {x: 130, y: 300};
let splits = [];
let bullets = [];

let pressLeft = false;
let pressRight = false;
let pressUp = false;
let pressDown = false;
function getSpeed(s) {
    speed = s;
}

function showSpaceShip() {
    let img = new Image();
    img.src = "images/space.png";
    context.drawImage(img, spaceShip.x, spaceShip.y, 40, 40);
}

function showSplits(i) {
    let img = new Image();
    img.src = "images/game2.png";
    context.drawImage(img, splits[i].x, splits[i].y, 40, 40);
    splits[i].y += speed;
}

function showBullets(i) {
    context.fillStyle = "red";
    context.fillRect(bullets[i].startX, bullets[i].startY, 4, 4);
    bullets[i].startY -= 5;
}

function clearSplits() {
    let newSplits = splits.filter((split) => split.y < 400);
    splits = newSplits;
}
/*function clearBullets() {
    let newBullets = bullets.filter((bullet) => bullet.startY > 0);
    bullets = newBullets;
}*/
function keyEvent(event) {
    if (event.keyCode === 37) {
        pressLeft = true;
    }
    else if (event.keyCode === 38)
        pressUp = true;

    else if (event.keyCode === 39) {
        pressRight = true;
    }

    else if (event.keyCode === 40)
        pressDown = true;
    if (event.keyCode === 32) {
        bullets.push({startX: spaceShip.x + 13, startY: spaceShip.y});
    }
}

function keyEventUp(event) {
    if (event.keyCode === 37) {
        pressLeft = false;
    }
    else if (event.keyCode === 38 && spaceShip.y > 0)
        pressUp = false;

    else if (event.keyCode === 39) {
        pressRight = false;
    }
    else if (event.keyCode === 40 && spaceShip.y < 385)
        pressDown = false;
}

function judge() {
    if (pressLeft) {
        if (spaceShip.x < 0) {
            spaceShip.x = 290;
        }
        spaceShip.x -= 5;
    } else if (pressUp && spaceShip.y > 5) {
        spaceShip.y -= 5;
    } else if (pressRight) {
        if (spaceShip.x > 285) {
            spaceShip.x = -5;
        }
        spaceShip.x += 5;
    } else if (pressDown && spaceShip.y < 370) {
        spaceShip.y += 5;
    }
}

function strike() {
    for (let i = 0; i < splits.length; i++) {
        if (Math.abs(splits[i].x - spaceShip.x) < 23 && Math.abs(splits[i].y - spaceShip.y) < 20) {
            clearInterval(m);
            context.fillStyle = "red";
            context.font = "50px Georgia";
            context.fillText("Game Over!", 20, 200);
        }
    }
}

function bulletStrike() {
    for (let i = 0; i < splits.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
            if (splits[i].x < bullets[j].startX + 4 && splits[i].x + 18 > bullets[j].startX && splits[i].y >= bullets[j].startY && bullets[j].startY > 0) {
                splits.splice(i, 1);
                bullets.splice(j, 1);
            }
        }
    }
}

function draw() {
    judge();
    if (parseInt(Math.random() * 1000) % 10 === 0) {
        splits.push({x: Math.random() * 300, y: 0});
    }
    clearSplits();
    context.clearRect(0, 0, 300, 400);
    for (let i = 0; i < splits.length; i++) {
        showSplits(i);
    }
    for (let j = 0; j < bullets.length; j++) {
        showBullets(j);
    }
    bulletStrike();
    showSpaceShip();
    strike();
}

var m = setInterval(draw, 50);
function newGame() {
    clearInterval(m);
    m = setInterval(draw, 50);
    spaceShip = {x: 130, y: 300};
    splits = [];
    bullets = [];
    pressLeft = false;
    pressRight = false;
    pressUp = false;
    pressDown = false;
}
