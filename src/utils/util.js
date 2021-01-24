import md5 from "blueimp-md5";
import CryptoJS from "crypto-js";
import axios from "axios";
import qs from "qs";

// const BASE_URL = "/api";
const BASE_URL = "https://rob.megameta.cn";
/**
 * 定义加密类
 */
class Encrypt {
  // 秘钥
  static key = "5RkLWI/aWIU+wumb1UmR/eUZC1iP2liF";
  // 加密
  static encryptByDes(data) {
    const keyHex = CryptoJS.enc.Utf8.parse(Encrypt.key);
    const encryptData = CryptoJS.TripleDES.encrypt(data, keyHex, {
      iv: CryptoJS.enc.Utf8.parse("01234567"),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encryptData.toString();
  }
  // 解密
  static decryptByDes(data) {
    const keyHex = CryptoJS.enc.Utf8.parse(Encrypt.key);
    const decryptData = CryptoJS.TripleDES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(data)
      },
      keyHex,
      {
        iv: CryptoJS.enc.Utf8.parse("01234567"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return decryptData.toString(CryptoJS.enc.Utf8);
  }
}

/**
 * 定义请求类
 * 封装原生请求为 promise
 */

class Http {
  static request({ url, method = "POST", data }) {
    const postData = Http.getRequestData(data);
    console.log(postData);
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}${url}`,
        data: qs.stringify(postData),
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method
      })
        .then(res => {
          if (res.data && res.data.rspCode === "0000") {
            const decryptData = Encrypt.decryptByDes(res.data.data);
            resolve(JSON.parse(decryptData));
          } else if (res.data && res.data.rspCode === "1111") {
            console.log("111");
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  // 获取请求参数
  static getRequestData(data) {
    let token = "3E7AABBC7ABC4F32B6B435EC366784DC";
    let signData = JSON.stringify(data);
    let stmb = new Date().getTime();
    let sData = `data=${signData}&stmb=${stmb}`;
    let sign = md5(sData).toUpperCase();
    let postData = Encrypt.encryptByDes(signData);
    return {
      data: postData,
      token,
      sign,
      stmb
    };
  }
}

export { Http };
