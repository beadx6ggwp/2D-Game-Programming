function Player(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;

    this.speed = 256;

    this.image = Loader.getImage("player");
}
Player.prototype.update = function (dt, dirx, diry) {
    this.x += dirx * this.speed * dt;
    this.y += diry * this.speed * dt;
}

Player.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.x, this.y);
}