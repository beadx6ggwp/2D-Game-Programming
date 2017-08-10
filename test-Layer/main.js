//------------Init-----------------------------------
var ctx, width, height;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#777";

var animation,
    lastTime = 0,
    loop = true;

window.onload = function () {
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);

    main();
}
//--------------------------------------------

var keys = {};
var player;
var tileAtlas;

var map = {
    cols: 8,
    rows: 8,
    tsize: 64,
    layers: [[
        3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 2, 1, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 3,
        3, 3, 3, 1, 2, 3, 3, 3
    ], [
        4, 3, 3, 3, 3, 3, 3, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 5, 4, 4, 4,
        0, 3, 3, 0, 0, 3, 3, 3
    ]],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    }
};

function main() {
    console.log("Start");

    Loader.loadImage("player", "resource/character.png");
    Loader.loadImage("tiles", "resource/tiles.png");

    ctx = CreateDisplay("myCanvas", 800, 600);
    width = ctx.canvas.width; height = ctx.canvas.height;

    player = new Player(100, 100);
    tileAtlas = Loader.getImage("tiles");

    window.requestAnimationFrame(mainLoop);
}


function update(dt) {
    let dirx = 0, diry = 0;

    if (keys[37]) dirx = -1;
    else if (keys[39]) dirx = 1;
    else if (keys[38]) diry = -1;
    else if (keys[40]) diry = 1;
    player.update(dt, dirx, diry);
}

function draw(ctx) {
    drawLayer(0);

    player.draw(ctx);

    drawLayer(1);
}

function drawLayer(layer) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(layer, c, r);
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    c * map.tsize,  // target x
                    r * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
}


function mainLoop(timestamp) {
    let Timesub = timestamp - lastTime;// get sleep
    let DeltaTime = Timesub / 1000;
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = ctx_backColor;
    ctx.fillRect(0, 0, width, height);
    //--------Begin-----------

    update(DeltaTime);
    draw(ctx);

    //--------End---------------

    let debugStr = [
        "Fps: " + 1000 / Timesub,
        "Timesub: " + Timesub,
        "DeltaTime: " + DeltaTime
    ];
    drawString(ctx, debugStr.join("\n"),
        0, height - debugStr.length * ctx_fontsize,
        "#FFF", ctx_fontsize, ctx_font);

    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}


function keydown(e) {
    keys[e.keyCode] = true;
};
function keyup(e) {
    delete keys[e.keyCode];
}


//----tool-------
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//---------------------
function CreateDisplay(id, width, height) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText = [
        "display: block;",
        "margin: 0 auto;",
        "background: #FFF;",
        "border:1px solid #000;"
    ].join("");
    document.body.appendChild(canvas);

    return canvas.getContext("2d");
}