import { Http } from "../utils/util";

class Voucher {
  /**
   * 获取调查问卷问题列表
   * @param id String 问卷id号
   * @param userPieceworkId Number 问卷
   */
  static async getVoucherList(data) {
    return await Http.request({
      url: `/voucher/queryVoucherList`,
      data
    });
  }

  /**
   * 提交问卷信息
   */
  static async saveVoucherList(data) {
    return await Http.request({
      url: `/voucher/saveVoucherList`,
      data
    });
  }
}

export { Voucher };
