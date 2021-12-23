//为css新属性添加-webkit,-ms,-o,-moz这些前缀，保证css兼容性

module.exports = {
  plugins: [require('autoprefixer')]  // 引用该插件即可了
}