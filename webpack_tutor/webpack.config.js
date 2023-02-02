var path = require('path');  
//是CommonJS模块导出语法，导出的是一个对象
//该对象的属性就是Webpack打包要使用的参数
module.exports = {
  entry: './a.js',//entry是Webpack构建的入口文件
  //output是打包后资源输出文件
  output: {
    path: path.resolve(__dirname, ''), //当前文件夹根目录的绝对路径。
    filename: 'bundle.js'
  },
  //打包模式，默认是'production'，
  //表示给生产环境打包的。现在我们设置成'none'，这样代码就不会压缩了
  mode: 'none'
};