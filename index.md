
- [SASS](http://sass.bootcss.com/) 《SASS 官网（中文）》
- [SASS](http://sass-lang.com/) 《SASS 官网（英文）》

<br/><br/>

<img src="http://sass.bootcss.com/assets/img/logo.png" height="200"/>

**SASS是什么**

>Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

Sass 是成熟、稳定、强大的 CSS 扩展语言。

**SASS的特点**

兼容 CSS 语法、功能丰富、成熟

---

<!-- markdown-to-slides index.md -o index.html -s slide.css -->

## I. SASS简介

基于 Node.js 平台，快速、开放、极简的 Web 开发框架

简单来说，封装了node中http核心模块，专注于业务逻辑的开发。

安装方法

```javascript

npm install express --save

```
---

### koa

>Koa - next generation web framework for node.js

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。(project:koa-1.js)

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

```

<img src="http://img0.ph.126.net/77JLQd6aN4xQGRW2awLthA==/1933170140149311132.png" />

---

### Hello XXX (node)

```javascript

var http = require('http')

http.createServer(function (req, res) {
  // 主页
  if (req.url == "/") {
    res.end("Holle hemo!");
  }

  // About页
  else if (req.url == "/about") {
    res.end("Hello about!");
  }

}).listen('3009', 'localhost', function () {
  console.log('listen 3009 ....')
})

```
project:demo-1.js   Hello XXX 测试结果：

<img src="http://img2.ph.126.net/oE0IH7qACaZ8IN7xmJyclg==/6608197923843520949.png" height="200" width="600" />

---

### Hello XXX (express)

```javascript

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello home ...')
})

app.get('/about', function (req, res) {
  res.send('hello about ...')
})

app.listen(3000, function () {
  console.log('express app is runing .....')
})

```
project:demo-2.js   Hello XXX 测试结果：

<img src="http://img1.ph.126.net/py2gHZzmQ0S_EcqeRgqgKQ==/6632748918979936684.png" height="200" width="600" />

---

### express 路由

Routing refers to how an application’s endpoints (URIs) respond to client requests. 

 -请求方法

 -请求路径

 -请求处理函数

**公开静态资源**

```javascript

// 访问路径 http://127.0.0.1:3000/a.js
app.use(express.static('./public/'))

// 访问路径 http://127.0.0.1:3000/public/a.js
app.use('/public/',express.static('./public/'))

```

---

### require 方法的加载规则

-[深入浅出 node.js](http://www.infoq.com/cn/articles/nodejs-module-mechanism/)

**node 中存在的模块主要有：**

1. 核心模块 path fs http ...
2. 自己定义的模块 （路径形式的模块）
3. 第三方模块 art-template express（使用npm安装的模块）

```javascript

// 加载核心模块
const path = require('path');

// 加载自定义模块
const foo = require('./fooo.js')

// 加载第三方模块 node_modules
const express = require('express')

```
---

**node 中require加载规则：**
1. 优先缓存加载

2. 判断模块标识

  2.1 是否是核心模块 http 、fs 加载 缓存 export

  2.2 是否是文件模块 ./foo.js 加载 缓存 export

  2.3 是否是第三方模块 （第三方模块需要 npm install 安装）

      - node_modules/art-template/
      - node_modules/art-template/package.json
      - node_modules/art-template/package.json 中找main 作为文件加载入口
      - index.js 备选项
      - 进入上一级目录找 node_modules
      - 按照此规则依次向上查找，直到磁盘根目录找不到 报错 Can not find moudle XXX

---

node 中require加载规则：

<img src="http://img1.ph.126.net/rbUZEFX4o6NnLcfrgNXomA==/1910933616989134372.jpg" height="540" width="300" />
<img src="http://img2.ph.126.net/h8Kc7evXazduSR-lOYWnEw==/6597311659217060144.jpg" height="540" width="400" style="margin-left:60px"/>

---

### nodemon 

[nodemon](https://nodemon.io/)《nodemon使用方法》

> nodemon reload, automatically

nodemon用来监视node.js应用程序中的任何更改并自动重启服务,非常适合用在开发环境中

```javascript

// 全局安装nodemon
npm install -g nodemon

nodemon app.js

```

---

### 中间件 body-parser  

**express中没有内置的获取表单请求体的API，所以需要第三方包解析HTTP请求体**

This module provides the following parsers:

1. JSON body parser
2. Raw body parser
3. Text body parser
4. URL-encoded form body parser

使用方法：

```javascript

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

```
---

```javascript
router.post('/students/new', function (req, res) {
  console.log(req.body)
  Student.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

```
post 提交方式测试：

<img src="http://img1.ph.126.net/82CmNmtkr5WCSGocf-7a_Q==/759138012289304338.png" width="350"  />
<img src="http://img1.ph.126.net/wSMCvySXI6jDnIyWpsvkvg==/1669428086971567957.png"  width="350" style="margin-left:40px"/>

---

### package-lock.json

npm 5以前没有 package-lock.json 文件

1. 安装包时不需要加 --save参数 会自动保存依赖信息
2. 在安装包时，会自动更新package-lock.json文件
3. package-lock.json文件保存node_molules中所有包信息（记录版本号和下载地址等信息）

---

### path 路径操作模块

```javascript

path.join(__dirname, '../node_modules')

path.basename(path[, ext])

```

<img src="http://img2.ph.126.net/MgfYCwnWSkO7q2EID4It3w==/6599300675751393002.png" />

---

### node 中的其他成员

在每个模块中，除了require、export 等模块相关的API之外，还有两个特殊的成员
  
- __dirname 可以用来获取当前文件模块所属目录的绝对路径 **动态获取**
- __filename 可以用来获取当前文件的绝对路径 **动态获取**

**1. 在文件操作路径中，相对路径设计的是相对于执行node命令所在路径**
**2. 模块中的路径标识就是相对于当前文件模块，不受执行node命令所处路径影响**

```javascript
const fs = require('fs')
const path = require('path')

// 文件操作中的相对路径
fs.readFile('c:/a/b/a.txt', 'utf-8', function (err, data) {
  if (err) throw err
  console.log(data)
})

// 文件操作中的相对路径转化为动态获取的绝对路径
fs.readFile(path.join(__dirname,'./a.txt'), 'utf-8', function (err, data) {
})

// 模块中的路径标识
require('./b')

```
---

## II. Express 中间件

**中间件（middleware）** 在 Node.js 中被广泛使用，它泛指一种特定的设计模式、一系列的处理单元、过滤器和处理程序，以函数的形式存在，连接在一起，形成一个异步队列，来完成对任何数据的预处理和后处理。

常规的中间件模式

<img src="https://upload-images.jianshu.io/upload_images/5236403-89a09dec2d661faa.jpg?imageMogr2/auto-orient/" />

---

### express 中间件

[express 中间件](http://www.expressjs.com.cn/guide/writing-middleware.html)

**Middleware functions are functions** that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. 

中间件的本质就是请求处理方法，把用户从请求到响应的整个过程分发到多个中间件中去处理，提高代码灵活性，动态可扩展

<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542863886302&di=8c2650a2389ce7e21e5afcf63739266a&imgtype=0&src=http%3A%2F%2Fresupload.xueda.com%2Fupload%2F55ee1c9f-971f-4e88-a708-666a1459c388%2FkX159dhLPTXl.gif" />

---

### 中间件的使用

```js
var express = require('express')
var app = express()
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
  console.log('After LOGGED')
}
var myLogger2 = function (req, res, next) {
  console.log('LOGGED2')
  next();
  console.log('After LOGGED2')
}
app.use(myLogger)
app.use(myLogger2)
app.listen(3000, function () {
  console.log('express app is runing .....')
})
```
project:demo-3.js  运行结果如下：
<img src="http://img0.ph.126.net/RJXU-zBFcnMXnpD_lV9q2Q==/6597876808193903130.png" />

---

### 实现中间件机制

```js
function express() {

  var taskArrray = []
  var app = function (req, res) {

    var i = 0
    function next() {
      var task = taskArrray[i++]
      if (!task) {
        return;
      }
      task(req, res, next);
    }
    next();
  }
  // 将中间件存入数组中
  app.use = function (task) {
    taskArrray.push(task)
  }

  return app;
}

```
project:demo-4.js 

---

### 实现中间件机制测试结果

```js
var http = require('http')
var app = express();
http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
  console.log('After LOGGED')
}
var myLogger2 = function (req, res, next) {
  console.log('LOGGED2')
  next();
  console.log('After LOGGED2')
}
app.use(myLogger)
app.use(myLogger2)
```
<img src="http://img0.ph.126.net/RJXU-zBFcnMXnpD_lV9q2Q==/6597876808193903130.png" />

---

### express 中间件分类

应用层级别中间件

- 不关心请求路径和请求方法的中间件，任何请求都会执行
- 关心请求路径的中间件

路由级别中间件

- 不关心请求路径和请求方法的中间件，任何请求都会执行
- 严格匹配请求方法和请求路径的中间件

错误处理中间件 

- 404页面 全局错误页面

内置中间件

- express.static

第三方中间件

- body-parser
- cookie-session

---

### 使用express 中间件

project:demo-5.js

```js
// 不关心请求路径和请求方法的中间件
app.use(function (req, res, next) {
  console.log('all request must execute!!')
  next()
})

app.use(function (req, res, next) {
  console.log('all request must execute 1 !!')
})

// 以/XXX 开头的路径的中间件
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// 严格匹配请求方法和请求路径的中间件
app.get('/aa/bb', function (req, res, next) {
  console.log('/aa/bb')
  next()
})

```

---

### 使用express 中间件

```js
// 内置中间件
app.use('/public/', express.static('./public/'))

// 所有都匹配不到时 404 （放在最后）
app.use('/', router)
app.use(function (req, res, next) {
  res.send('This is 404 !!!!!')
})

// 配置全局错误统一处理中间件
app.get('/aa/bb', function (req, res, next) {
  fs.readFile('c:/a/b/index.js', 'utf-8', function (err) {
    if (err) return next(err)
  })
})

app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    err_msg: err.message
  })
})

// 第三方级别中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```
---

## III. Express Generator

通过应用生成器工具 express-generator 可以快速创建一个应用的骨架。

```js
npm install express-generator -g
express myapp --view=pug
cd myapp
npm install
npm run start
```

project:myapp 访问http://localhost:3000/ 

<img src="http://img2.ph.126.net/Hdg8CXBpOvwG52ZdpMsIEA==/3906028251914327954.png" />

---

### 目录结构与代码

1.查看myapp目录结构

2.结合中间件分析代码

project: myapp

<img src="http://img1.ph.126.net/KyJ0a3B5-ffQ0Zwwz01IdA==/6608267193075868969.png" height="580px" style="margin-left:400px;margin-top:-160px"/>

---

### 相关中间件

**morgan**
>HTTP request logger middleware for node.js

**pug**
>Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers. For bug reports, feature requests and questions, open an issue. For discussion join the chat room.

```html
h1 Pug - node template engine
<h1>Pug - node template engine</h1>

```

```js
// compile
var fn = pug.compile('string of pug', options);
var html = fn(locals);
 
// render
var html = pug.render('string of pug', merge(options, locals));
```

---

## IV. express 在vue项目中模拟接口

结合ccs-operation-web中 模拟接口 ./api/server.js

<img src="http://img1.ph.126.net/WcCZiUNffqFb30aEx8pjJA==/6597292967519440276.png" />

project:app.js

---

<img src="http://img2.ph.126.net/ODW9rXWQplDwWdDVP0j9zg==/6632632370747397731.png" />
<img src="http://img1.ph.126.net/BPnIoG4SXbCfleZuOFqm2g==/295830200623422751.png" />

---

### 运行express服务器

```js
"scripts": {
    "server": "nodemon api/server.js",
    "dev": "webpack-dev-server --inline --progress --open --config build/webpack.dev.conf.js",
    // 影响ccs-operation-web/config/proxyConfig.js http://localhost:3002/api/listContracts?pin=X&all=X
    "devlocal": "shell-exec --colored-output \"npm run dev --local\" \"npm run server\"",
  }

```

**shell-executor**

>A small nodejs module to execute shell commands in parallel

```js
npm i -g shell-executor
// --colored-output  Use colored output in logs
shell-exec --colored-output 'npm run lint' 'npm run test' 'npm run watch'

```

---

### ccs-operation-web ./api/server.js

```js
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const walk = require('klaw-sync');

const {
	origin_proxy_url,
	local_proxy_port,
	local_proxy_url
} = require('../config/proxyConfig');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let _existRoutes = [];

```

---

```js

app.use( (req, res, next)=>{ 
	const {url, body, method} = req;
	if (!~_existRoutes.indexOf(req.path)) {	
		const rurl = origin_proxy_url.replace(/\/$/, '') + url;
		let r = method === 'POST'
			? request.post({url: rurl, form: body}, (err, httpRes, reqBody)=>{
				console.log(err, reqBody, body)
			})
			: request(rurl);
		console.log(`本地未定义的请求，跳转到 ${method} ${rurl}`);
		req.pipe(r).pipe(res);
		return;
	}
	next();
});

//遍历本目录下的 *.api.js
walk(path.resolve('./'))
    .filter(p=>/\.api\.js$/.test(p.path))
    .map(p=>p.path)
    .forEach(part=>require(part)(app));

//记录注册过的路由
_existRoutes = app._router.stack.filter(s=>s.route).map(s=>s.route.path);

app.listen(local_proxy_port, ()=>{
	console.log(`\n\n local server running at ${local_proxy_url} \n\n`);
});

```
---

### klaw-sync

>klaw-sync is a Node.js recursive and fast file system walker

```js
// 用法
const klawSync = require('klaw-sync')
const paths = klawSync('/some/dir')
// paths = [{path: '/some/dir/dir1', stats: {}}, {path: '/some/dir/file1', stats: {}}]

```

<img src="http://img1.ph.126.net/O9u0y_p_bozsoAXriKSPNQ==/1813261800070591348.png" />

---

### request

>Request - Simplified HTTP client

```js
// 用法
npm install request

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
});

req.pipe(request('http://mysite.com/doodle.png')).pipe(resp)

```

<img src="http://img1.ph.126.net/B5PvG3HL_10m5apiaz5EpA==/2114158550174263057.png" />

---

## VI. 总结

express 基于 Node.js 平台，快速、开放、极简的 Web 开发框架

简单来说，封装了node中http核心模块，专注于业务逻辑的开发。

express 核心内容 ： 理解、使用中间件

[express 源码学习 路由](https://segmentfault.com/a/1190000013953688)
[express 中间件原理](https://www.jianshu.com/p/797a4e38fe77)

---

## 彩蛋

<img src="http://img2.ph.126.net/jfrREeUSq5f6Ca0PW9Qxlg==/1873215970110266009.png" />
<img src="http://img1.ph.126.net/x9chnH2wC_N_IpljI8dKuA==/6597600830775339664.png" />






