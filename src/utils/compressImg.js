class CompressImage {
  constructor(file) {
    this.maxSize = 1024 * 1024;
    this.file = file;
  }

  convertImageToBase64() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.file);
    fileReader.addEventListener("load", res => {
      const { result } = res.target;
      this.handleCompressImg(result);
    });
  }

  handleCompressImg(base64) {
    const maxSize = 1024 * 1024;
    const image = new Image();
    let compressRatio = 1;
    image.src = base64;
    image.addEventListener("load", () => {
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;
      console.log(naturalWidth, naturalHeight);
      const naturalSize = naturalWidth * naturalHeight;
      /**
       * 当图片大于最大值时，才需要压缩
       */
      if (naturalSize > maxSize) {
        compressRatio = naturalSize / maxSize;
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const canvasWidth = naturalWidth / Math.sqrt(compressRatio);
      const canvasHeight = naturalHeight / Math.sqrt(compressRatio);
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      console.log(canvasWidth, canvasHeight);
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      const compressBase64 = canvas.toDataURL("image/jpeg");
      console.log(compressBase64);
    });
  }
}

export { CompressImage };
