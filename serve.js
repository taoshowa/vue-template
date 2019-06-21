var express = require('express')
var app = express()

// 测试gzip, 如果你想关闭gzip, 把vue.config.js的productionGzip设为false
var compression = require('compression')
app.use(compression())

app.use(express.static('dist'))
app.listen(3000, function () {
  console.log('server is runing on http://localhost:3000')
})
