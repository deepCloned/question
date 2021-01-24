import { Http } from "../utils/util";

class Common {
  static async uploadImg(base64Img) {
    return await Http.request({
      url: "common/uploadFile",
      data: {
        base64Img
      }
    });
  }
}

export { Common };
