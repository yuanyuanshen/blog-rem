## 移动端 Web 页面适配方案

移动端 Web 页面，即常说的 H5 页面、手机页面、webview 页面等。

机设备屏幕尺寸不一，做移动端的 Web 页面，需要考虑在安卓/IOS 的各种尺寸设备上的兼容，这里总结的是针对移动端设备的页面，设计与前端实现怎样做能更好地适配不同屏幕宽度的移动设备。

**适配的目标**

> 在不同尺寸的手机设备上，页面“相对性的达到合理的展示（自适应）”或者“保持统一效果的等比缩放（看起来差不多）”。

---

<!-- markdown-to-slides index.md -o index.html -s slide.css -->

## I. 概念的理解

要搞懂移动端的适配问题，就要先搞明白像素和视口。

### 像素

在移动端给一个元素设置 width:200px 时发生了什么？这里的 px 到底是多长呢？像素是网页布局的基础，但是我们一直在用直觉使用它。

iphone6 有 750 的物理像素，但是屏幕宽度像素是 375px？？？

**1.设备像素 device pixel**

设备像素是物理概念，指的是设备中使用的物理像素，任何设备屏幕的物理像素的数量都是固定不变的。
比如 iphone6 的分辨率 1334 x 750px ，750px 指的是设备物理像素

**2.逻辑像素 css pixel**

css 像素是 web 编程的概念，指的是 css 样式中使用的逻辑像素
css px 是一个相对单位 相对的是设备像素

---

我们网页 css 和小程序用的是逻辑像素

**eg：**
iphone6 使用的是 retina 视网膜屏幕

2px x 2px 的设备像素代表 1px z 1px 的 css 像素

所以设备像素 1334 x 750 css 逻辑像素是 667 x 375

那么，我们现在再来说说一个元素 width:200px 以后会怎么样。这个元素跨越了 200 个 CSS 元素，200 个 CSS 元素相当于多少个设备像素取决于两个条件：

- 页面是否缩放

- 屏幕是否为高密度

这两方面后面再解释，先梳理一下手机硬件之间的关系，注意这里使用的都是物理像素。

以 iPhone5 为例，我们已知的是：

**1.分辨率** 1136pt x 640pt

指屏幕上垂直有 1136 个物理像素，水平有 640 个物理像素

---

**2.屏幕尺寸** 4 英寸

注意英寸是长度单位，不是面积单位。4 英寸指的是屏幕对角线的长度。

**3.屏幕像素密度** 326ppi

屏幕像素密度（Pibel Per Inch）简称 ppi ，单位是 dpi（dot per inch）。这里指屏幕水平或垂直每英寸有 326 个物理像素。原则上来说，ppi 越高越好，因为图像会更加细腻清晰。

ppi 是可以通过 分辨率 和 屏幕尺寸 计算得到的：

<img src="./ppi.png"/>

[这个网站](https://www.sven.de/dpi/)列出了很多设备的分辨率和屏幕尺寸，并且计算了 ppi。

---

### 视口

桌面浏览器中，浏览器窗口就是约束你的 CSS 布局视口（又称初始包含块）。它使所有 CSS 百分比宽度推算的根源，它的作用是 CSS 布局限制了一个最大宽度，视口的宽度和浏览器窗口宽度一致。

但是在移动端，情况就很复杂了。

#### 布局视口 layout viewport

在手机上，视口与移动端浏览器屏幕宽度不再相关联，是完全独立的，这个浏览器厂商定的视口被称为布局视口。

布局视口我们是看不见的，只知道网页的最大宽度是 980px ，并且被缩放在了屏幕内。

可以这样设置布局视口的宽度：

```html
<meta name="viewport" content="width=640" />
```

**媒体查询与布局视口**

```css
@media (min-width: 700px) {
  ...;
}
```

---

document.documentElement.clientWidth/Height 返回布局视口的尺寸

#### 视觉视口 visual viewport

有了 layout viewport，我们还需要一个视口用来承载它，这个视口可以简单的认为是手持设备物理屏幕的可视区域，
视觉视口是用户正在看到的网页的区域，大小是屏幕中 CSS 像素的数量。
window.innerWidth/Height 返回视觉视口的尺寸

很明显，visual viewport 的尺寸不会是一个固定的值，甚至每款设备都可能不同。大致列几种常见设备的 visual viewport 尺寸：

- iPhone4~iPhone5S: 320\*480px
- iPhone6~iPhone6S: 375\*627px
- iPhone6 Plus~iPhone6S Plus: 414\*736px

以 iPhone4S 为例，会在其 320px② 的 visual viewport 上，创建一个宽 980px 的 layout viewport，于是用户可以在 visual viewport 中拖动或者缩放网页，来获得良好的浏览效果；布局视口用来配合 CSS 渲染布局，当我们定义一个容器的宽度为 100%时，这个容器的实际宽度是 980px 而不是 320px，通过这种方式大部分网页就能以缩放的形式正常显示在手机屏幕上了。

#### 理想视口（完美视口） ideal viewport

布局视口明显对用户是不友好的，完全忽略了手机本身的尺寸。所以苹果引入了理想视口的概念，它是对设备来说最理想的布局视口尺寸。理想视口中的网页用户最理想的宽度，用户进入页面的时候不需要缩放。

```html
<meta name="viewport" content="width=device-width" />
```

> 定义理想视口是浏览器的事情，并不能简单地认为是开发者定义的，开发者只能使用。

screen.width/height 返回理想视口的尺寸，有严重的兼容性问题---可能返回两种值：

- 理想视口的尺寸（下载浏览器）
- 屏幕的设备像素尺寸（内置浏览器）

Screen size tests 和 Understanding viewport 可以测试你的设备的 screen.width 值，同一设备的不同浏览器返回的值可能是不一样的。这一情况主要发生在默认浏览器和下载浏览器（如 UC、Chrome）之间。

关于 3 个视口，[PPK](https://www.quirksmode.org/)已经做了非常棒的阐释，你也可以在 StackOverflow 上找到一些对此描述的相互补充，例如：[1](https://stackoverflow.com/questions/6333927/difference-between-visual-viewport-and-layout-viewport), [2](https://stackoverflow.com/questions/7344886/visual-viewport-vs-layout-viewport-on-mobile-devices)，有兴趣的童鞋也可以看看

---

### 缩放

缩放是在放大或缩小 CSS 像素，比如一个宽度为 200px 的元素无论放大，还是 200 个 CSS 像素。但是因为这些像素被放大了，所以 CSS 像素也就跨越了更多的设备像素。缩小则相反。

### 缩放与视口

**缩放会影响视觉视口的尺寸**

页面被用户放大，视觉视口内 CSS 像素数量减少；被用户缩小，视觉视口内 CSS 像素数量增多就行了。这个道理应该是不难想的。

**用户缩放不会影响布局视口**

在下载浏览器中，可以这么算（理想视口与视觉视口的比）：

```html
zoom level = screen.width / window.innerWidth
```

**禁止缩放**

```html
<meta name="viewport" content="user-scalable=no" />
```

**设置缩放**

```html
<meta name="viewport" content="initial-scale=2" />
```

使用 initial-scale 有一个副作用：同时也会将布局视口的尺寸设置为缩放后的尺寸。所以 initial-scale=1 与 width=device-width 的效果是一样的。

---

### 完美视口

解决各种浏览器兼容问题的理想视口设置

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

### 设备像素比

屏幕是否为高密度也会影响设备像素和 CSS 像素的关系。

在缩放程度为 100%（这个条件很重要，在后面会说到）时，他们的比例叫做设备像素比(device pixel ratio)：

```html
dpr = 设备像素 / CSS 像素
```

可以通过 JS 得到： window.devicePixelRatio

设备像素比也和视口有关：

```html
dpr = 屏幕横向设备像素 / 理想视口的宽
```

---

### viewport 特性

| Name          | Value                  | description                                           |
| ------------- | ---------------------- | ----------------------------------------------------- |
| width         | 正整数或 device-width  | 定义视口的宽度，单位为像素                            |
| height        | 正整数或 device-height | 定义视口的高度，单位为像素                            |
| initial-scale | [0.0-10.0]             | 定义初始缩放值                                        |
| minimum-scale | [0.0-10.0]             | 定义缩小最小比例，它必须小于或等于 maximum-scale 设置 |
| maximum-scale | [0.0-10.0]             | 定义放大最大比例，它必须大于或等于 minimum-scale 设置 |
| user-scalable | yes/no                 | 定义是否允许用户手动缩放页面，默认值 yes              |

#### width

width 被用来定义 layout viewport 的宽度，如果不指定该属性（或者移除 viewport meta 标签），则 layout viewport 宽度为厂商默认值。

#### initial-scale

如果想页面默认以某个比例放大或者缩小然后呈现给用户，那么可以通过定义 initial-scale 来完成。

```html
<meta name="viewport" content="initial-scale=2" />
```

那么用户将会看到 2 倍大小的页面内容。

#### maximum-scale

在移动端，你可能会考虑用户浏览不便，然后给予用户放大页面的权利，但同时又希望是在一定范围内的放大，这时就可以使用 maximum-scale 来进行约束。

```html
<meta name="viewport" content="initial-scale=1,maximum-scale=5" />
```

假设页面的默认缩放值 initial-scale 是 1，那么用户最终能够将页面放大到这个初始页面大小的 5 倍。

#### minimum-scale

类似 maximum-scale 的描述，不过 minimum-scale 是用来指定页面缩小比例的。

通常情况下，为了有更好地体验，不会定义该属性的值比 1 更小，因为那样页面将变得难以阅读。

#### user-scalable

如果你不想页面被放大或者缩小，通过定义 user-scalable 来约束用户是否可以通过手势对页面进行缩放即可。

```html
<meta name="viewport" content="user-scalable=no" />
```

---

### 微信小程序 rpx

iphone6 有 750 的物理像素，但是屏幕宽度像素是 375px

**设备像素 device pixel**

设备像素是物理概念，指的是设备中使用的物理像素
比如 iphone6 的分辨率 1334X750px 750px 指的是设备物理像素

**逻辑像素 css pixel**

css 像素是 web 编程的概念，指的是 css 样式中使用的逻辑像素
css px 是一个相对单位 相对的是设备像素

_我们网页 css 和小程序用的是逻辑像素_

iphone6 使用的是 retina 视网膜屏幕

2px x 2px 的设备像素代表 1px z 1px 的 css 像素

所以设备像素 1334 x 750 css 逻辑像素是 667 x 375

---

### Sass 和 SCSS 区别

Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名

语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

```scss
$font-stack: Helvetica, sans-serif  //定义变量
$primary-color: #333 //定义变量

body
  font: 100% $font-stack
  color: $primary-color
```

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

---

## II. SASS 的使用

### 安装方法

```javascript

npm install sass -g

```

**使用方法**

```javascript

sass test.scss [test.css]

```

[sass 在线转换](https://www.sassmeister.com/)

---

### sass [编译风格](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style)的选项

SASS 提供四个编译风格的选项：

- **nested：嵌套缩进的 css 代码，它是默认值。**

- expanded：没有缩进的、扩展的 css 代码。

- compact：简洁格式的 css 代码。

- compressed：压缩后的 css 代码。

生产环境当中，一般使用最后一个选项。

```javascript

sass --style compressed test.sass test.css

```

你也可以让 SASS 监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。

```javascript

sass --watch input.scss:output.css // watch a file
sass --watch app/sass:public/stylesheets // watch a directory

```

---

### 基本用法

**1.数据类型**

Sass 和 JavaScript 语言类似，也具有自己的数据类型，在 Sass 中包含以下几种数据类型：

- 数字: 如，1、 2、 13、 10px；
- 字符串：有引号字符串或无引号字符串，如，"foo"、 'bar'、 baz；
- 颜色：如，blue、 #04a3f9、 rgba(255,0,0,0.5)；
- 布尔型：如，true、 false；
- 空值：如，null；
- 值列表：用空格或者逗号分开，如，1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif。

_<h4>字符串</h4>_

- 有引号字符串 (quoted strings)，如 "Lucida Grande" 、'http://sass-lang.com'；
- 无引号字符串 (unquoted strings)，如 sans-serifbold。

使用 #{ }插值语句 (interpolation) 时，有引号字符串将被编译为无引号字符串，这样方便了在混合指令 (mixin) 中引用选择器名。

---

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: 'Hi, Firefox users!';
  }
}
```

```scss
body.firefox .header:before {
  content: 'Hi, Firefox users!';
}
```

---

**2.变量**

SASS 允许使用变量，所有变量以\$开头。

```scss
$blue: #1875e7;
div {
  color: $blue;
}
```

如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。

```scss
$side: left;
.rounded {
  border-#{$side}-radius: 5px;
}
```

_<h4>普通变量和默认变量</h4>_

sass 的默认变量一般是用来设置默认值，然后根据需求来覆盖的，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可。

默认变量的价值在进行组件化开发的时候会非常有用。

---

```scss
$fontSize: 14px;
$fontSize: 12px !default;
body {
  font-size: $fontSize;
}
/*普通变量与默认变量*/
body {
  font-size: 14px;
}
```

_<h4>局部变量和全局变量</h4>_

从 3.4 版本开始，Sass 已经可以正确处理作用域的概念

```scss
$color: orange !default; //定义全局变量(在选择器、函数、混合宏...的外面定义的变量为全局变量)
.block {
  color: $color; //调用全局变量
}
em {
  $color: red; //定义局部变量
  a {
    color: $color; //调用局部变量
  }
}
span {
  color: $color; //调用全局变量
}
```

---

```scss
.block {
  color: orange;
}

em a {
  color: red;
}

span {
  color: orange;
}
```

_<h4>全局变量的影子</h4>_

当在局部范围（选择器内、函数内、混合宏内...）声明一个已经存在于全局范围内的变量时，局部变量就成为了全局变量的影子。基本上，局部变量只会在局部范围内覆盖全局变量。

同上一个例子

_<h4>什么时候声明变量？</h4>_

1. 该值至少重复出现了两次；
2. 该值至少可能会被更新一次；
3. 该值所有的表现都与变量有关（非巧合）。

基本上，没有理由声明一个永远不需要更新或者只在单一地方使用变量。

---

### 基本用法

**3.计算功能**

_<h5>加减乘除都不允许不同单位进行运算</h5>_

```scss
body {
  margin: (14px/2);
  top: 50px + 100px;
}
```

_<h4>加法 + 减法</h4>_

携带不同类型的单位时，在 Sass 中计算会报错

```scss
.box {
  width: 20px + 1em;
}

$full-width: 960px;

.content {
  width: $full-width - 1em;
}
// Incompatible units: 'em' and ‘px'.”
```

---

_<h4>乘法</h4>_

能够支持多种单位（比如 em ,px , %）

乘法运算时，两个值单位相同时，只需要为一个数值提供单位即可

```scss
.box {
  width: 10px * 2;
  // width: 10px * 2px 错误;
}
```

_<h4>除法</h4>_

在 Sass 中做除法运算时，直接使用“/”符号做为除号时，将不会生效，编译时既得不到我们需要的效果，也不会报错。

这样的结果对于大家来说没有任何意义。要修正这个问题，只需要给运算的外面添加一个小括号()

'/' 符号被当作除法运算符时有以下几种情况：

- 如果数值或它的任意部分是存储在一个变量中或是函数的返回值。
- 如果数值被圆括号包围。
- 如果数值是另一个数学表达式的一部分。

---

```scss
p {
  font: 10px/8px; // 纯 CSS，不是除法运算
  height: (16px/8px);
  $width: 1000px;
  width: $width/2; // 使用了变量，是除法运算
  width: round(1.5) / 2; // 使用了函数，是除法运算
  height: (500px/2); // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
}
```

```scss
p {
  font: 10px/8px;
  height: 2;
  width: 500px;
  width: 1;
  height: 250px;
  margin-left: 9px;
}
```

<h5>除法运算时，如果两个值带有相同的单位值时，除法运算之后会得到一个不带单位的数值。</h5>

_<h4>颜色运算</h4>_

所有算数运算都支持颜色值，并且是分段运算的。也就是说，红、绿和蓝各颜色分段单独进行运算。

---

```scss
p {
  color: #010203 + #040506; // 01+04 02+05 03+06
  // 考虑颜色函数 未来版本不支持
}
```

_<h4>字符运算</h4>_

在 Sass 中可以通过加法符号“+”来对字符串进行连接。可以连接变量和和字符

```scss
$content: 'Hello' + '' + 'Sass!';
.box:before {
  content: ' #{$content} ';
}

div {
  cursor: 'e' + -resize;
  position: re + 'lative';
}
```

```scss
.box:before {
  content: ' HelloSass! ';
}

div {
  cursor: 'e-resize';
  position: relative;
}
```

---

### 基本用法

**4.嵌套**

```scss
div {
  hi {
    color: red;
  }
}
```

sass 的嵌套分为 3 种：选择器嵌套、属性嵌套、伪类嵌套

_<h4>选择器嵌套</h4>_

& 有 2 种用法：1.替换空格 2.选择父类

---

```scss
nav {
  a {
    color: red;
    .b {
      & .c {
        font-size: 12px;
      }
      &:hover {
        color: green;
      }
    }
    head & {
      color: green;
    }
  }
}
```

```scss
nav a {
  color: red;
}
nav a .b .c {
  font-size: 12px;
}
nav a .b:hover {
  color: green;
}
head nav a {
  color: green;
}
```

---

_<h4>属性嵌套</h4>_

CSS 有一些属性前缀相同，只是后缀不一样，比如：border-top/border-right，与这个类似的还有 margin、padding、font 等属性。

```scss
.box {
  font: {
    size: 12px;
    weight: bold;
  }
}
```

```scss
.box {
  font-size: 12px;
  font-weight: bold;
}
```

_<h4>伪类嵌套</h4>_

```scss
.box {
  &:before {
    content: '伪元素嵌套';
  }
}
```

选择器嵌套最大的问题是将使最终的代码难以阅读，我们应该尽可能避免选择器嵌套。

---

### 基本用法

**5.注释**

SASS 共有两种注释风格。

标准的 CSS 注释 /_ comment _/ ，会保留到编译后的文件。

单行注释 // comment，只保留在 SASS 源文件中，编译后被省略。

在/\*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

---

### css 代码的重用

**1.继承**

SASS 允许一个选择器，继承另一个选择器。比如，现有 class1：

```scss
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}
```

要继承 .btn，就要使用@extend 命令：

```scss
.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-default {
  background-color: orange;
  color: #fff;
  @extend .btn;
}
```

---

编译出来的 CSS 会将选择器合并在一起，形成组合选择器：

```scss
.btn,
.btn-primary,
.btn-default {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-default {
  background-color: orange;
  color: #fff;
}
```

---

### css 代码的重用

**2.Mixin(混合宏)**

需要重复使用大段的样式时，使用变量就无法达到我们目目的，这时候可以使用@mixin，定义一个代码块。

```scss
@mixin left {
  float: left;
  margin-left: 10px;
}
```

使用@include 命令，调用这个 mixin。

```scss
div {
  @include left;
}
```

使用的时候，根据需要加入参数：

```scss
div {
  @include left(20px);
}
```

---

下面是一个 mixin 的实例，用来生成浏览器前缀。

```scss
// 在属性中取值需要使用 #{}
@mixin rounded($vert, $horz, $radius: 10px) {
  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}

#navbar li {
  @include rounded(top, left);
}

#footer {
  @include rounded(top, left, 5px);
}
```

mixin 的强大之处，在于可以指定参数和缺省值。

```scss
@mixin left($value: 10px) {
  float: left;
  margin-right: $value;
}
```

---

混合宏除了能传一个参数之外，还可以传多个参数

```scss
@mixin center($width, $height) {
  width: $width;
  height: $height;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -($height) / 2;
  margin-left: -($width) / 2;
}
.box-center {
  @include center(500px, 300px);
}
```

```scss
.box-center {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -250px;
}
```

---

有一个特别的参数“…”。当混合宏传的参数过多之时，可以使用参数来替代，如：

```scss
@mixin box-shadow($shadows...) {
  @if length($shadows) >= 1 {
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
  } @else {
    $shadows: 0 0 2px rgba(#000, 0.25);
    -webkit-box-shadow: $shadow;
    box-shadow: $shadow;
  }
}
.box {
  @include box-shadow(0 0 1px rgba(#000, 0.5), 0 0 2px rgba(#000, 0.2));
}

.box1 {
  @include box-shadow();
}
```

```scss
.box {
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.2);
}

.box1 {
  -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
}
```

---

_<h4>混合宏的不足</h4>_

混合宏在实际编码中给我们带来很多方便之处，特别是对于复用重复代码块。但其最大的不足之处是会生成冗余的代码块。比如在不同的地方调用一个相同的混合宏时。

```scss
@mixin border-radius {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
.box {
  @include border-radius;
  margin-bottom: 5px;
}
.btn {
  @include border-radius;
}
```

```scss
.box {
  -webkit-border-radius: 3px;
  border-radius: 3px;
  margin-bottom: 5px;
}
.btn {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
```

并不能智能的将相同的样式代码块合并在一起。这也是 Sass 的混合宏最不足之处。

---

### css 代码的重用

**3.占位符%placeholder**

他可以取代以前 CSS 中的基类造成的代码冗余的情形。因为 %placeholder 声明的代码，如果不被 @extend 调用的话，不会产生任何代码。

```scss
%mt5 {
  // 没有被@extent调用就不会被编译到css中
  margin-top: 5px;
}
%pt5 {
  padding-top: 5px;
}

.btn {
  @extend %mt5;
  @extend %pt5;
}
```

通过 @extend 调用的占位符，编译出来的代码会将相同的代码合并在一起。

---

_<h4>混合宏 VS 继承 VS 占位符</h4>_

<img src="./sass_reuse.jpg" />

---

### css 代码的重用

**[3.函数](https://sass-lang.com/documentation/Sass/Script/Functions.html)**

自备了一系列的函数功能。其主要包括：

- 字符串函数
- 数字函数
- 列表函数
- 颜色函数
- Introspection 函数
- 三元函数等

_<h4>字符串函数</h4>_

unquote(\$string) : Removes quotes from a string.

quote(\$string) : Adds quotes to a string.

to-lower-case(\$string) : Converts a string to lower case.

---

_<h4>数字函数</h4>_

round(\$number) : Rounds a number to the nearest whole number.

ceil(\$number) : Rounds a number up to the next whole number.

floor(\$number) : Rounds a number down to the previous whole number.

_<h4>列表函数</h4>_

join($list1, $list2, [$separator, $bracketed]) : Joins together two lists into one.

append($list1, $val, [$separator]) : Appends a single value onto the end of a list.

_<h4>Map 函数</h4>_

map-keys(\$map) : Returns a list of all keys in a map.

map-values(\$map) : Returns a list of all values in a map.

map-has-key($map, $key) : Returns whether a map has a value associated with a given key.

_<h4>颜色函数</h4>_

---

```scss
.test {
  text: to-upper-case(aaaaa);
  text: to-lower-case(aA-aAAA-aaa);
}

.footer {
  width: round(12.3px);
}

.footer1 {
  width: index(1px solid red, red);
}

$social-colors: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee
);
.btn-dribble {
  color: map-get($social-colors, facebook);
}
```

---

**4.插入文件**

@import 命令，用来插入外部文件。

```scss
@import 'path/filename.scss';
```

如果插入的是.css 文件，则等同于 css 的 import 命令。

```scss
@import 'foo.css';
```

---

### sass 高级用法

**1.条件语句**

```scss
@if lightness($color) >30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

---

**2.循环语句**

_<h4>for 循环</h4>_

**@for** $i **from** start **through** end || **@for** $i **from** start **to** end

区别是关键字 through 表示包括 end 这个数，而 to 则不包括 end 这个数。

```scss
@for $i from 1 to 3 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
@for $i from 1 through 3 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

---

```scss
.border-1 {
  border: 1px solid blue;
}

.border-2 {
  border: 2px solid blue;
}

.border-1 {
  border: 1px solid blue;
}

.border-2 {
  border: 2px solid blue;
}

.border-3 {
  border: 3px solid blue;
}
```

---

@for 应用在网格系统生成各个格子 class 的代码：

```scss
//SCSS
$grid-prefix: span !default;
$grid-width: 60px !default;
$grid-gutter: 20px !default;

%grid {
  float: left;
  margin-left: $grid-gutter / 2;
  margin-right: $grid-gutter / 2;
}
@for $i from 1 through 12 {
  .#{$grid-prefix}#{$i} {
    width: $grid-width * $i + $grid-gutter * ($i - 1);
    @extend %grid;
  }
}
```

---

_<h4>while 循环</h4>_

```scss
$i: 6;
@while $i>0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

```scss
.item-6 {
  width: 12em;
}

.item-4 {
  width: 8em;
}

.item-2 {
  width: 4em;
}
```

---

_<h4>each 循环</h4>_

@each 循环就是去遍历一个列表，然后从列表中取出对应的值。

```scss
$list: adam john wynn mason kuroir; //$list 就是一个列表

@mixin author-images {
  @each $author in $list {
    .photo-#{$author} {
      background: url('/images/avatars/#{$author}.png') no-repeat;
    }
  }
}

.author-bio {
  @include author-images;
}
```

---

### sass 高级用法

**3.自定义函数**

SASS 允许用户编写自己的函数。

```scss
@function double($n) {
  @return $n * 2;
}

#sidebar {
  width: double(5px);
}
```

---

## II. SASS @规则

_<h4>@media</h4>_

Sass 中的 @media 指令和 CSS 的使用规则一样的简单，但它有另外一个功能，可以嵌套在 CSS 规则中。有点类似 JS 的冒泡功能一样，如果在样式中使用 @media 指令，它将冒泡到外面。来看一个简单示例：

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

```scss
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

---

_<h4>@at-root</h4>_

@at-root 从字面上解释就是跳出根元素。

```scss
.a {
  color: red;

  .b {
    color: orange;

    .c {
      color: yellow;

      @at-root .d {
        color: green;
      }
    }
  }
}
```

```scss
.a {
  color: red;
}
.a .b {
  color: orange;
}
.a .b .c {
  color: yellow;
}
.d {
  color: green;
}
```

---

_<h4>@debug</h4>_

@debug 在 Sass 中是用来调试的，@debug 指令之后，在命令终端会输出你设置的提示 DEBUG:

_<h4>@warn</h4>_

```scss
@mixin error($x) {
  @if $x < 10 {
    width: $x * 10px;
  } @else if $x == 10 {
    width: $x;
  } @else {
    @warn "你需要将#{$x}值设置在10以内的数";
  }
}

.test {
  @include error(15);
}
```

---

_<h4>@error</h4>_

```scss
@mixin error($x) {
  @if $x < 10 {
    width: $x * 10px;
  } @else if $x == 10 {
    width: $x;
  } @else {
    @error "你需要将#{$x}值设置在10以内的数";
  }
}

.test {
  @include error(15);
}
```

---

## III. vue 中引入 sass

- 安装相关依赖包

```js
npm install --save-dev sass-loader
//sass-loader依赖于node-sass
npm install --save-dev node-sass
```

- 在 build 文件夹下的 webpack.base.conf.js 的 rules 里面添加配置

```json
{
  "test": /\.sass$/,
  "loaders": ["style", "css", "sass"]
}
```

- 在\*.vue 中修改 style 标签

```scss
<style lang="scss">
```

---

## VI. 总结

1. [移动端 Web 页面适配方案](https://segmentfault.com/a/1190000008767416)
2. [移动端适配方案(上)](https://segmentfault.com/a/1190000004336869)
3. [移动前端开发之 viewport 的深入理解](http://www.cnblogs.com/2050/p/3877280.html)
4. [深入了解 viewport 和 px](https://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201509/376281.shtml)
5. [MobileWeb 适配总结](http://html-js.com/article/MobileWeb)
6. [移动端适配方案(下)](https://segmentfault.com/a/1190000004358316)
7. [移动端 H5 页面高清多屏适配方案](http://mobile.51cto.com/web-484304.htm)
8. [移动前端第一弹：viewport 详解](https://www.cnblogs.com/miragele/p/5449218.html)

<center>-- End --</center>
