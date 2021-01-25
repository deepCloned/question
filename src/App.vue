<template>
  <div id="app">
    <div class="voucher">
      <div class="voucher-header">奥园居委会来沪人员排摸表</div>
      <div class="voucher-list">
        <div
          v-for="(item, parentIndex) of voucherList"
          :key="item.id"
          class="voucher-item"
        >
          <!-- type 00-单选 01-多选 02-输入 03-图片 -->
          <div v-if="item.type === '00'" class="common single">
            <div
              v-if="item.content"
              class="title"
              :class="[item.rquired === '00' ? 'required' : '']"
            >
              {{ item.content }}
            </div>
            <div class="list">
              <div
                class="item"
                v-for="(question,
                selfIndex) of item.questionnaireSelectsResponse"
                :key="question.id"
                @click="handleChangeSingle(parentIndex, selfIndex)"
              >
                <div
                  class="check-status center"
                  :class="{
                    active: question.selectName == item.activeAnswerContent
                  }"
                >
                  <div
                    v-if="question.selectName == item.activeAnswerContent"
                    class="inner-circle"
                  ></div>
                </div>
                <div class="check-content">{{ question.selectName }}</div>
              </div>
            </div>
          </div>
          <div v-if="item.type === '02'" class="common input">
            <div class="input-content">
              <span
                class="title"
                :class="[item.rquired === '00' ? 'required' : '']"
                >{{ item.content + ":" }}</span
              >
              <input
                type="text"
                :placeholder="'请输入' + item.content"
                v-model="item.answerContentResponse.content"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="info-list">
        <div class="info-item">本人承诺：</div>
        <div class="info-item">1、以上提供的资料真实准确。</div>
        <div class="info-item">
          2、如有不实，本人愿意承担由此引发的一切后果及法律责任。
        </div>
        <div class="info-item">
          注：对于您所填写的信息，我们会予以严格保密。
        </div>
      </div>
      <div class="sign-my">
        <div class="my sign-name">
          <span class="self-sign">本人签名：</span>
          <span class="now" v-if="!signImg" @click="handleShowSign"
            >立即签名</span
          >
          <img
            @click="handleShowSign"
            class="sign-img"
            v-else
            :src="signImg"
            alt=""
          />
        </div>
        <div class="my date">
          <span>日期：</span>
          <span>{{ signDate }}</span>
        </div>
      </div>
    </div>
    <div class="voucher message">
      <div class="voucher-header">疫情防控告知书</div>
      <div class="info-list">
        <div class="info-item">
          1、倡导个人防护“三件套”(佩戴口罩，社交距离，个人卫生)、“五还要”(口罩还要戴，社交距离还要留，咳嗽喷嚏还要遮，双手还要经常洗，窗户还要尽量开)；
        </div>
        <div class="info-item">
          2、做好自身健康检测，如出现发热、咳嗽等症状，要佩戴医用口罩及时前往发热门诊就诊；
        </div>
        <div class="info-item">
          3、倡导节庆文明新风，不摆席、少串门、少走动，倡导就地过节、非必要不外出、减少人员聚集、减少人员流动、减少旅途风险；
        </div>
        <div class="info-item">
          4、家庭中如有来自或途径中高风险地区人员来沪或返沪，提供7日内有效核酸检测阴性证明，并主动向奥园居委会报告(北区居委会联系电话：37028131；南区居委会联系电话：67628615)；
        </div>
        <div class="info-item">5、主动配合疫情防控相关要求。</div>
      </div>
      <div class="desc">
        <div class="desc-item">奥园社区居民名委员会</div>
        <div class="desc-item">2021年1月24日</div>
      </div>
      <div class="footer-desc">
        <div class="line"></div>
        <div class="me-answer">本人已知晓以上内容，并告知全体家庭成员。</div>
        <div class="me-answer sign">
          <span class="sign-desc">签名：</span>
          <img class="sign-img" :src="signImg" alt="" />
        </div>
        <div class="loca">
          家庭住址：<span v-if="voucherList[4].answerContentResponse.content">{{
            voucherList[4].answerContentResponse.content
          }}</span>
        </div>
      </div>
    </div>
    <div class="button" @click="handleSubmit">
      提交
    </div>

    <div v-show="showSign" class="popup">
      <sign-canvas
        class="sign-canvas"
        ref="SignCanvas"
        :options="options"
        v-model="value"
      />
      <div class="operation">
        <div @click="handleHideSign" class="opera-item">取消</div>
        <div @click="canvasClear" class="opera-item">清除</div>
        <div @click="saveAsImg" class="opera-item">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Voucher } from "./model/voucher";
import { Common } from "./model/common";
import SignCanvas from "sign-canvas";
export default {
  name: "App",
  components: {
    SignCanvas
  },
  data() {
    return {
      value: null,
      options: {
        writeWidth: 1,
        canvasWidth: 375,
        canvasHeight: 300,
        isShowBorder: false,
        lastWriteWidth: 1,
        maxWriteWidth: 2,
        bgColor: "#fff"
      },
      testList: [
        {
          answerChooseResponses: null,
          answerContentResponse: { content: "" },
          content: "姓名",
          id: 158,
          questionId: 16,
          questionnaireSelectsResponse: null,
          rquired: "00",
          sequence: 1,
          type: "02"
        },
        {
          answerChooseResponses: null,
          answerContentResponse: { content: "" },
          content: "身份证号码",
          id: 159,
          questionId: 16,
          questionnaireSelectsResponse: null,
          rquired: "00",
          sequence: 2,
          type: "02"
        },
        {
          answerChooseResponses: null,
          answerContentResponse: { content: "" },
          content: "手机号码",
          id: 160,
          questionId: 16,
          questionnaireSelectsResponse: null,
          rquired: "00",
          sequence: 3,
          type: "02"
        },
        {
          answerChooseResponses: null,
          answerContentResponse: { content: "" },
          content: "居住地址",
          id: 162,
          questionId: 16,
          questionnaireSelectsResponse: null,
          rquired: "00",
          sequence: 5,
          type: "02"
        },
        {
          activeAnswerContent: "",
          answerChooseResponses: null,
          answerContentResponse: null,
          content: "从事行业（单选）",
          id: 163,
          questionId: 16,
          questionnaireSelectsResponse: [
            { id: 1836, questionContentId: 163, selectName: "进口冷链" },
            { id: 1837, questionContentId: 163, selectName: "物流运输" },
            { id: 1838, questionContentId: 163, selectName: "维修装修" },
            { id: 1839, questionContentId: 163, selectName: "口岸检疫" }
          ],
          rquired: "00",
          sequence: 6,
          type: "00"
        },
        {
          answerChooseResponses: null,
          answerContentResponse: { content: "" },
          content: "房东姓名",
          id: 166,
          questionId: 16,
          questionnaireSelectsResponse: null,
          rquired: "01",
          sequence: 9,
          type: "02"
        }
      ],
      questionId: 16,
      voucherList: [],
      signImg: "",
      signDate: "",
      showSign: false
    };
  },
  methods: {
    /**
     * 改变单项选择框
     */
    handleChangeSingle(parentIndex, selfIndex) {
      console.log(parentIndex, selfIndex);
      const { voucherList } = this;
      const selects = voucherList[parentIndex].questionnaireSelectsResponse;
      voucherList[parentIndex].activeAnswerContent =
        selects[selfIndex].selectName;
      this.voucherList = voucherList;
    },
    /**
     * 改变输入项内容
     */
    handleInputContent(e) {
      console.log(e);
      const { parentIndex } = e.currentTarget.dataset;
      const { value } = e.detail;
      const { voucherList } = this;
      voucherList[parentIndex].answerContentResponse.content = value;
      this.voucherList = voucherList;
    },
    /**
     * 确认提交
     */
    async handleSubmit() {
      console.log(this.voucherList);
      const { voucherList, questionId } = this;
      console.log(voucherList);
      /**
       * 提交之前处理数据
       */
      const list = [];
      let errorCount = 0;
      voucherList.forEach(ele => {
        let item = {
          id: ele.id
        };
        if (ele.type === "01") {
          let tempList = [];
          const chooseAnswer = ele.questionnaireSelectsResponse;
          chooseAnswer.forEach(item => {
            if (item.isActive) {
              tempList.push({
                questionSelectId: item.id
              });
            }
          });
          if (ele.rquired === "00" && tempList.length === 0) {
            errorCount++;
          }
          item.answerChooseResponses = tempList;
        } else if (ele.type === "02" || ele.type === "03") {
          let content = ele.answerContentResponse.content;
          if (ele.rquired === "00" && !content) {
            errorCount++;
          }
          item.answerContentResponse = {
            content
          };
        } else if (ele.type === "00") {
          let content = ele.activeAnswerContent;
          if (ele.rquired === "00" && !content) {
            errorCount++;
          }
          item.answerContentResponse = {
            content
          };
        }
        list.push(item);
      });
      console.log("confirm list", list);
      /* 发送请求 */
      if (errorCount > 0) {
        console.log("完善信息");
      } else {
        console.log({
          voucherList: list,
          questionId: Number(questionId)
        });
        try {
          const submitRes = await Voucher.saveVoucherList({
            voucherList: list,
            questionId: Number(questionId)
          });
          if (submitRes.resultCode === "00") {
            alert("提交成功");
          }
        } catch (err) {
          alert("提交失败，请重试");
        }
      }
    },
    getSignDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.signDate = `${year}年${month}月${day}日`;
    },
    /**
     * 清除画板
     */
    canvasClear() {
      this.$refs.SignCanvas.canvasClear();
    },

    /**
     * 保存图片
     */
    async saveAsImg() {
      const img = this.$refs.SignCanvas.saveAsImg();
      const base64 = img.split(",")[1];
      const uploadRes = await Common.uploadImg(base64);
      this.signImg = uploadRes.imgUrl;
      const { voucherList } = this;
      /* 保存到问卷列表中 */
      voucherList[voucherList.length - 1].answerContentResponse.content =
        uploadRes.imgUrl;
      this.voucherList = voucherList;
      this.handleHideSign();
      this.canvasClear();
    },
    handleShowSign() {
      this.showSign = true;
    },
    handleHideSign() {
      this.showSign = false;
    },
    async getVoucherList() {
      const { questionId } = this;
      try {
        const res = await Voucher.getVoucherList({
          questionId
        });
        const { voucherList } = res;
        for (let i = 0; i < voucherList.length; i++) {
          if (!voucherList[i].answerContentResponse) {
            this.$set(voucherList[i], "answerContentResponse", {});
            voucherList[i].answerContentResponse.content = "";
          }
          if (voucherList[i].type === "00") {
            voucherList[i].activeAnswerContent = "";
          }
        }
        this.voucherList = voucherList;
        console.log(res);
      } catch (err) {
        alert("请求失败，请刷新页面");
      }
    }
  },
  async created() {
    this.getSignDate();
    this.getVoucherList();
  }
};
</script>

<style lang="less" scoped>
// page {
//   background: #f2f2f2;
// }
.voucher {
  padding-bottom: 30px;
}
.voucher-header {
  font-size: 16px;
  font-weight: 600;
  color: #445060;
  text-align: center;
  padding: 10px 0;
}
.voucher-list .voucher-item {
  box-sizing: border-box;
  padding: 6px;
  padding-left: 20px;
  margin-top: 8px;
  background: #fff;
  border-radius: 10px;
  font-size: 26px;
  color: #767676;
}
.voucher-item:nth-of-type(1) {
  margin-top: 0;
}
.common .title {
  font-size: 14px;
  color: #333;
}
.common .search-key {
  background: #eeebeb;
  margin: 10px 0;
  height: 50px;
  width: 600px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 6px 20px;
  font-size: 28px;
  color: #333;
}
.common .title.required {
  position: relative;
}
.common .title.required::after {
  display: block;
  content: "*";
  color: red;
  position: absolute;
  top: 4px;
  left: -18px;
}

/* 单选+多选综合 */
.common .list {
  margin-top: 6px;
  max-height: 200px;
  overflow-y: scroll;
}
.common .item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.common .item .check-status {
  border-radius: 50%;
  width: 14px;
  height: 14px;
  border: 1px solid #726666;
  transition: all 0.2s ease-in-out;
}
.common .item .check-status.active {
  /* border-color: #3362b2; */
  border-color: #dd8706;
}
.check-status .inner-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3362b2;
  background: #dd8706;
  transition: all 0.2s ease-in-out;
}
.common .item .check-content {
  margin-left: 16px;
  font-size: 14px;
}

/* 输入框样式 */
.input .input-content {
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
}
.input-content::after {
  display: block;
  content: "";
  position: absolute;
  width: 335px;
  height: 1px;
  background: #d6d6d6;
  left: -10px;
  bottom: 0px;
}
.input-content .label {
  font-size: 28px;
  color: #333;
}
.input-content input {
  color: #333;
  border: 0;
  outline: none;
  margin-left: 10px;
  margin-top: 1px;
  flex: 1;
}

/* 图片上传样式 */
.pic-url .image-choose {
  margin-top: 10px;
  width: 200px;
  height: 200px;
  border-radius: 6px;
  border: 1px solid #d6d6d6;
}
.image-choose .add-icon {
  width: 90px;
  height: 90px;
}
.image-choose .image {
  width: 100%;
  height: 100%;
}

/* 提交按钮样式 */
.button {
  width: 300px;
  height: 30px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  margin-left: 27px;
  background: #e7ae0f;
  color: #fff;
  border-radius: 6px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 承诺样式 */
.info-list {
  padding: 0 4px;
  font-size: 14px;
}
.message .info-list {
  line-height: 24px;
}
.desc {
  margin-top: 20px;
}
.desc .desc-item {
  font-size: 15px;
  text-align: right;
}

/* 底部央视 */
.footer-desc {
  font-size: 15px;
  margin-top: 20px;
}
.me-answer {
  display: flex;
  align-items: center;
}
.sign-img {
  width: 100px;
  height: 30px;
}

/* 我的签名 */
.sign-my {
  margin-top: 20px;
}
.sign-my .my {
  font-size: 15px;
  text-align: right;
}

.sign-name {
  display: flex;
  align-items: center;
}
.sign-name .self-sign {
  margin-left: auto;
}

.sign-name .now {
  color: blue;
}
.sign-name img {
  width: 100rpx;
  height: 30rpx;
}
.sign-my .date {
  margin-top: 6px;
}

/* 签字遮罩层 */
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .operation {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .opera-item {
      background: #fff;
      width: 70px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 16px;
      &:nth-of-type(2) {
        margin: 0 20px;
      }
    }
  }
}
</style>
