module.exports = {
  devServer: {
    proxy: {
      "/api": {
        //这里最好有一个 /
        target: "https://rob.megameta.cn", // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: config => {
    //调试JS
    config.devtool = "source-map";
  },
  publicPath: "./"
};
