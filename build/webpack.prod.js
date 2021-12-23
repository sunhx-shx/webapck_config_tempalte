const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const env = require("../config/prod.env");
const webpack =require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");    //配置gzip压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');     //优化和压缩css代码
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   ///将bundle内容展示为一个便捷的、交互式、可缩放的树状图形式。方便我们更直观了解代码的分离

module.exports = merge(common, {
  mode: "production",
  devtool: false,    //  css的sourceMap的默认值等于devtool的值，设置为false防止production下生成css-sourceMap
  module:{
    rules:[
      
    ],
    
  },

  optimization: {
    splitChunks: {
      //在cacheGroups外层的属性设定适用于所有缓存组，不过每个缓存组内部可以重设这些属性
      // chunks: "async", //将从module中分割什么类型的chunk，三选一： "initial"：入口代码块 | "all"：全部 | "async"：按需加载的代码块
      // minSize: 30000, //大小超过30kb的模块才会被提取
      // maxSize: 0, //只是提示，可以被违反，会尽量将chunk分的比maxSize小，当设为0代表能分则分，分不了不会强制
      // minChunks: 1, //某个模块至少被多少代码块引用，才会被提取成新的chunk
      // maxAsyncRequests: 5, //分割后，按需加载的代码块最多允许的并行请求数，在webpack5里默认值变为6
      // maxInitialRequests: 3, //分割后，入口代码块最多允许的并行请求数，在webpack5里默认值变为4
      // automaticNameDelimiter: "~", //代码块命名分割符
      // name: true, //每个缓存组打包得到的代码块的名称
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/, //匹配node_modules中的模块      用[\\/] 来表示路径分隔符的原因，是为了同时适配window与Linux系统
      //     priority: -10, //优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
      //   },
      //   default: {
      //     minChunks: 2, //覆盖外层的全局属性
      //     priority: -20,
      //     reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
      //   },
      // },
      chunks: "all",
      name: "vendor",
      cacheGroups: {
        lodash: {
          name: "lodash.vendor",
          chunks: "async",
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: 40,
        },
      }
    }
  },


  plugins:[
    new BundleAnalyzerPlugin(
      {
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      }
    ),
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new CompressionPlugin(),
    new CssMinimizerPlugin(),
  ]

})
