function Player(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;

    this.speed = 256;

    this.image = Loader.getImage("player");
}
Player.prototype.update = function (dt) {
    let dirx = 0, diry = 0;

    if (keys[37]) dirx = -1;
    else if (keys[39]) dirx = 1;
    else if (keys[38]) diry = -1;
    else if (keys[40]) diry = 1;
    
    this.x += dirx * this.speed * dt;
    this.y += diry * this.speed * dt;
}

Player.prototype.draw = function (ctx) {
    ctx.drawImage(
        this.image,
        this.x - this.width / 2 - (camera.x),
        this.y - this.height / 2 - (camera.y)
    );
}