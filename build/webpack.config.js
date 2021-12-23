// webpack.config.js

const { CleanWebpackPlugin } = require("clean-webpack-plugin");  //每次打包后清理 dist目录中的上一次打包的残留文件
const HtmlWebpackPlugin = require('html-webpack-plugin');    //动态生成html模板便于在其中引入相关打包后的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");   //将css文件单独打包到一个文件中
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// const webpack =require("webpack");

const path = require('path');
const chalk = require("chalk");

module.exports = {
  // mode:'development', // 开发模式
  entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
  entry: path.resolve(__dirname,'../src/index.js'),    // react入口文件

  output: {
      filename: '[name].[contenthash:8].js',      // 打包后的文件名称    contenthash根据资源内容创建出唯一 hash，也就是说文件内容不变，hash 就不变。便于资源缓存
      path: path.resolve(__dirname,'../dist'),  // 打包后的目录
      // clean: true, //每次构建清除dist包
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".vue"], //省略文件后缀
    alias: { //配置别名
      "@": path.resolve(__dirname, "../src"),
    },
  },

  //防止将某些 import 的包(package)打包到 bundle 中
  externals: {
    jquery: 'jQuery',
  },

  //loader —— 用来将不同类型的文件处理成JS模块导入到webpack中进行打包，让浏览器能够以最快的速度加载和解析
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader'] // 从右向左解析原则     这里加上 style-loader 会导致报错，直接使用 MiniCssExtractPlugin.loader 可满足所需功能
      },
      {
        test:/\.less$/,
        use:['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],   // 从右向左解析原则
      },
      //  webpack5新增的assets module用来处理代替loader的配置方法
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'static/[name][hash:8][ext]'
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/, //加载图片资源
        loader: "url-loader",
        type: 'javascript/auto',//打包过程中跳过webpack使用内置assets module打包处理当前类型文件的操作，防止asset重复
        options: {
          esModule: false, //loader默认使用es module模块规范引入的图片，而html中,vue模板中默认采用的是commonjs规范处理图片，所以此处需要设置为false,不然会报错
          limit: 1024 * 8,
          name: "static/img/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//加载视频资源
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, //加载字体资源
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:8].[ext]",
        },
      },
      // 将HTML导出为字符串，处理HTML中引入的静态资源,否则这些资源需要通过类似这种  <img src="require('assets/logo.png').default"/>，使用require的方式引入
      {
        test: /\.(html)$/,
        loader: 'html-loader',
        options: {
          sources: true,
          minimize: true,
          // esModule: false
        }
      },
      //  配置Babel处理es6、es7等新版JS语法以及jsx语法
      {
        test: /(\.jsx|\.js)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ]
  },

  //plugin —— 扩展webpack的功能，强化其打包文件的能力
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    //   用于打包过程中生成html模板，便于在html文件中引入打包过程中生成bundle文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/index.html'),
      filename: 'index.html'
    }),
    //  复制指定文件/文件夹到打包后的指定文件/文件夹，默认复制到（即 to 的默认值为）当前打包后的 output 配置的 path 路径
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/favicon.ico"},
      ],
    }),
     // 进度条
     new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    new CleanWebpackPlugin(),
    // new webpack.ProvidePlugin(
    //   {
    //     $: 'jquery',
    //     jQuery: 'jquery'
    //   }
    // )
  ]
}
