// 读取文件
const fs = require('fs')
// souceMap处理文件
const SourceMapConsumer = require('source-map').SourceMapConsumer
// 启动构建进程（已构建则不需要）
const exec = require('child_process').exec

const lineno = process.argv[2] || 0   // 第一个参数为行数
const columnno = process.argv[3] || 0 // 第二个参数为列数
const fileName = process.argv[4] || '' // 第三个参数为错误文件（错误文件名就好）
 
// 构建有map的线上代码
// node build onlineMap为构建命令
exec('node build onlineMap', async function () {
 // 读取错误文件的map文件
 const consumer = await new SourceMapConsumer(fs.readFileSync(`./map/${fileName}.js.map`, 'utf8'))

  // 输出map的错误信息
  const logger = consumer.originalPositionFor({ line: Number(lineno), column: Number(columnno) })
  console.log("logger", logger)
})
