function ImgLoder(imgPath) {
    let image = new Image();
    image.src = imgPath;

    return image;
}

var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();
    this.images[key] = img;

    img.src = src;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};