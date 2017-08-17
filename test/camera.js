function Camera(map, width, height) {
    this.map = map;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tileSize - width;
    this.maxY = map.rows * map.tileSize - height;

    this.x = 0;
    this.y = 0;

    this.speed = 256;

    this.isFollow = 0;
}

Camera.prototype.update = function (dt) {
    if (keys[65]) this.x -= this.speed * dt;
    if (keys[68]) this.x += this.speed * dt;
    if (keys[87]) this.y -= this.speed * dt;
    if (keys[83]) this.y += this.speed * dt;
    this.isFollow = keys[32];

}
Camera.prototype.follow = function (target) {
    if (!this.isFollow) return;
    this.x = (target.x - this.width / 2);
    this.y = (target.y - this.height / 2);
}