// var FileSaver = require('file-saver'),

var Canvas = require('./canvas');

// export the painting to file
module.exports = function(file, scale) {
    var exported = new Canvas(),
        eCtx = exported.getContext('2d'),
        dataURL, base64;

    file = file || 'painting.png';
    scale = scale || 1;

    exported.width = this.width * this.cellWidth * scale;
    exported.height = this.height * this.cellHeight * scale;
    this.drawPainting(eCtx, scale);

    dataURL = exported.toDataURL("image/png");
    base64 = dataURL.replace(/^data:image\/png;base64,/, "");

    return base64;

    // if (process.title === 'browser') {
    //     exported.toBlob(function(blob) {
    //         FileSaver.saveAs(blob, file);
    //     });
    // } else {
    // exported.pngStream().pipe(require('fs').createWriteStream('./' + file));
    // }
};