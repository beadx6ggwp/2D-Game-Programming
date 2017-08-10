function Tilemap(name, tileSize) {
    this.image = Loader.getImage(name);
    this.tileSize = tileSize;
    this.cols = 12;
    this.rows = 12;
    this.map = [[
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
    ], [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]];
}

Tilemap.prototype.getTile = function (layer, col, row) {
    return this.map[layer][row * this.cols + col];
}

Tilemap.prototype.draw = function (ctx, layer) {
    for (var c = 0; c < this.cols; c++) {
        for (var r = 0; r < this.rows; r++) {
            var tile = this.getTile(layer, c, r);
            if (tile == 0) continue;// 0 => empty tile
            this.drawTile(ctx, tile - 1, 0, c, r);
        }
    }
}
Tilemap.prototype.drawTile = function (ctx, sx, sy, tx, ty) {
    ctx.drawImage(
        this.image, // image
        sx * this.tileSize, // source x
        sy * this.tileSize, // source y
        this.tileSize, // source width
        this.tileSize, // source height
        tx * this.tileSize,  // target x
        ty * this.tileSize, // target y
        this.tileSize, // target width
        this.tileSize // target height
    );
}