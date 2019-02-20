const Canvas = require('./canvas');

/**
 * Exports the painting to a Base64-encoded string.
 *
 * @param {Number} scale
 * @returns {Promise<*>}
 */
module.exports = function (scale) {
  const that = this;
  const exported = new Canvas();
  const eCtx = exported.getContext('2d');

  scale = scale || 1;
  exported.width = this.width * this.cellWidth * scale;
  exported.height = this.height * this.cellHeight * scale;

  return new Promise((resolve, reject) => {
    if (that.backgroundImageExport) {
      // Make sure background image is loaded before drawing into canvas (required as any CSS is not part of canvas and thus ignored while rendering)
      const background = new Image();
      background.src = this.backgroundImageExport;

      background.onload = () => {
        eCtx.drawImage(background, 0, 0, exported.width, exported.height);
        that.drawPainting(eCtx, scale);

        const b64 = exported.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
        resolve(b64)
      };

    } else {
      // No background image provided
      reject('Export has been aborted. Reason: No background image has been provided for export (required as any CSS rule - including "background" - will be ignored during render)')
    }
  });
};
