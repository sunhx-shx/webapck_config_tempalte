const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");
const env = require("../config/dev.env");
const webpack =require("webpack")

module.exports = merge(common, {

  mode:'development', // 开发模式
  devtool: 'inline-source-map',    // devtool控制是否生成，以及如何生成 source map,可以将编译后的代码映射回原始源代码,用于追踪定位源代码中的错误发生的位置

  devServer: {
    static: { //托管静态资源文件
      directory: path.join(__dirname, "../public"),
    },
    client: { //在浏览器端打印编译进度
      progress: true,
    },
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    //  通过cross-env跨平台设置和使用nodejs环境变量
    new webpack.DefinePlugin({
      "process.env": env,
    }),
  ]

})