首先安装nodejs >= 0.10,current version: 0.10.26

默认已安装npm current version ：1.4.3

设置nodejs和npm安装的环境变量：

nodejs设置为node.exe目录，npm一般设置为C:\Users\JAY\AppData\Roaming\npm

Yeoman

Yeoman 是由三个工具的组成：YO、GRUNT、BOWER

YO：Yeoman核心工具，项目工程依赖目录和文件生成工具，项目生产环境和编译环境生成工具。

GRUNT：前端构建工具，jQuery就是使用这个工具打包的。

BOWER：Web 开发的包管理器，概念上类似 npm，npm 专注于 NodeJs 模块，而 bower 专注于 CSS、JavaScript、图像等前端相关内容的管理。

YO：

安装yo
npm install -g yo 默认相应的把yo grunt bower都安装好了，它将自动安装Grunt和Bower。

yo -v 1.2.1

grunt -version grunt-cli 0.1.13

bower -v 1.3.9

GRUNT:

配置package.json文件，Gruntfile.js文件


安装grunt插件 npm install

    "grunt": "~0.4.5",	//grunt版本
    "grunt-usemin": "~2.0.1",	//合并html文件中带有合并标记的JS和CSS
    "grunt-contrib-concat": "~0.3.0",	//把多个JS或CSS合并为一个
    "grunt-contrib-uglify": "~0.4.0",	//压缩JS
    "grunt-contrib-cssmin": "~0.9.0",	//压缩CSS
    "grunt-contrib-htmlmin": "*",	//html压缩
    "grunt-contrib-watch": "*",		//当文件修改时响应
    "grunt-contrib-imagemin": "*",	//图片压缩
    "grunt-contrib-jshint": "*",	//JS语法检测
    "grunt-contrib-connect": "*"	//开启一个服务器

    current version:

    "grunt": "~0.4.5",
    "grunt-usemin": "~2.0.1",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-uglify": "~0.4.0",
    "grunt-contrib-cssmin": "~0.9.0",
    "grunt-contrib-htmlmin": "~0.3.0",
    "grunt-contrib-watch": "~0.6.1",
    "grunt-contrib-imagemin": "~0.8.0",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-connect": "~0.8.0"    

假设当前安装目录为：JV/JVJ，安装完后会生成node_modules目录，将用YO生成的generator-jvj生成器放置于该目录下。

可以安装 generator-generator用于自定义生成器 npm install -g generator-generator && yo generator

generator-jvj目录下一定要配置一份package.json文件

依赖组件
    "chalk": "~0.4.0",
    "compare-version": "~0.1.0",
    "multiline": "^0.3.4",
    "pkg-name": "~0.1.0",
    "yeoman-generator": "~0.16.0"


BOWER:

bower支持的各种命令。

    cache:bower缓存管理
    help:显示Bower命令的帮助信息
    home:通过浏览器打开一个包的github发布页
    info:查看包的信息
    init:创建bower.json文件
    install:安装包到项目
    link:在本地bower库建立一个项目链接
    list:列出项目已安装的包
    lookup:根据包名查询包的URL
    prune:删除项目无关的包
    register:注册一个包
    search:搜索包
    update:更新项目的包
    uninstall:删除项目的包
