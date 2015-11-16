#前端架构

>软件架构（software architecture）是一系列相关的抽象模式，用于指导大型软件系统各个方面的设计。

传统软件架构描述的对象是直接构成系统的抽象组件，侧重于系统的抽象、拆分、组织方式等。所以如果从传统软件架构定义出发，前端架构可能就是指前端项目的系统设计了。在进行系统设计之前，由于前端开发语言缺乏一定的工程能力，所以web前端架构师相比传统软件架构师还应该能提供以下开发基础的支持：

- **开发规范：**开发规范设计非常重要，设计良好的开发规范应该以实用性为前提，可以提升开发效率，降低维护成本。常见的规范主要是针对模块化开发定义的，想象一下，下面的规范示意图是不是能对开发和维护有极大的帮助：

- **开发模型：**主要是模块化开发。前端由于编程语言的问题，没有原生的模块化支持，所以架构师在做架构设计之前，要先提供模块开发体系。模块化开发体系设计挺复杂的，完整的模块化体系要统一js、css和模板的模块化处理，此外，js、css模板中的资源（图片等）引用也是要考虑的问题。此外，模块化框架肩负着资源的加载控制，要面对性能优化，所以，好的架构师给出的模块化方案应该是能把性能优化做到框架中，性能是一个工程问题！

- **构建工具：**还是由于前端开发语言的问题，前端还需要构建工具配合，才能完成开发规范、开发模型的落地实现。这部分也许有人认为是非必须的，但是我可以给出完整论证证明标准前端项目必须经过构建，这里就不展开了。总之，前端架构师在给出规范、模型之后，还要给出配套的工具来保证它们的实现。

web前端架构师至少要提供以上3项之后才能开展正式的架构设计，我觉得这部分是衡量一个架构师设计能力的重要指标之一。基础搞定了，架构设计的开展才能顺利。没有标准的模块化支持，架构设计很难做。

此外，由于web前端的产品模式与传统软件有很大差异，所以我觉得真正的前端架构师还应该能考虑以下问题：

- **项目部署：**前端项目部署应该由前端架构师来决定，这里涉及到网络性能优化和开发规范对接的问题，所以前端架构师要理解工程部署的过程，并把开发和部署打通，否则开发受限于部署，架构设计会遇到阻碍。

- **组件化与组件生态：**由于前端面向的是界面设计，所以在模块化之上还有组件化开发模型需要架构师提供。此外，项目中一些可复用的模块或组件应该有一定的复用渠道，这部分我称之为生态。架构师应该提供这样的渠道来解决多个团队或项目之间的代码复用问题。

- **前端统计：**前端统计包括性能统计、访问统计、用户行为统计、错误统计、安全监控等，虽然有些统计属于产品指标，但在大数据时代，前端研发的方向应该有一定的数据做指导，前端架构师必须关心统计数据，并能提供统计方案、统计平台是一种衡量指标。

- **前端安全：**这部分也应该有架构师负责的部分。主要是在开发、统计的过程中对前端安全做保障，比如xss修复、页面脚本注入监控等

- **系统测试：**很多人总是尝试用API测试方法论中的单元测试来测试前端项目，其实是片面的。前端测试属于GUI测试范畴，前端项目中使用的框架、类库一般由外部提供，已经由API测试做了质量保证，而项目中的测试应该主要集中在GUI测试上，这部分目前没有好的解决方案做支撑，所以也没有什么好的衡量办法。

以上就是我觉得衡量前端架构师的基本要求，现在已经不在是“写一个jquery就是架构师”的时代了，前端本应该是一个系统化、工程化的理论体系，涉及到很多方面，前端工程师的工程化意识应该加强。

#目前业界前端解决方案

[论前端开发体系](https://github.com/fouber/blog/issues/2)

>对于前端集成解决方案的实践，可以总结出这些设计步骤：

- 设计开发概念，定义开发资源的分类（模块化/非模块化）
- 设计开发目录，降低开发、维护成本（开发规范）
- 根据运维和业务要求，设计部署规范（部署规范）
- 设计工具，完成开发目录和部署目录的转换（开发-部署转换）
- 设计模块化框架，兼顾性能优化（开发框架）
- 扩展工具，支持开发框架的构建需求（框架构建需求）
- 流程整合（开发、测试、联调、上线等流程接入）


>我们可以看看业界已有团队提出的各种解决方案，无不以这种思路来设计和发展的：

- [seajs](http://seajs.org/)开发体系，支付宝团队前端开发体系，以 spm 为构建和包管理工具
- [fis-plus](https://github.com/fex-team/fis-plus)，百度绝大多数前端团队使用的开发体系，以fis为构建工具内核，以lights为包管理工具
- [edp](https://github.com/ecomfe/edp)，百度ecomfe前端开发体系，以 edp 为构建和包管理工具
- [modjs](http://madscript.com/modjs/)，腾讯AlloyTeam团队出品的开发体系
- [yeoman](http://yeoman.io/)，google出品的解决方案，以grunt为构建工具，bower为包管理工具



#百度点滴

[百度前端站点](http://fex.baidu.com/)

架构：FIS前端集成解决方案

[http://fis.baidu.com](http://fis.baidu.com)

FIS是专为解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题的工具框架。

#腾讯点滴

[腾讯前端站点](http://www.alloyteam.com/)

[Laro](https://github.com/AlloyTeam/laro/)

a game engine based on html5 canvas 

[JX](http://alloyteam.github.io)

JX - 腾讯 Web 前端开发框架
Javascript eXtension tools Don't Repeat Yourself!

[CSS3 UI 库](http://css3lib.alloyteam.com/)

#阿里点滴

[淘宝前端站点](http://ued.taobao.org)


#前端业界方案点滴收集

[browserify](http://browserify.org/)

Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

[gulp](http://gulpjs.com/)

Automate and enhance your workflow

[grunt](http://gruntjs.com/)

The JavaScript Task Runner


#其它声音：

RequireJS（按需加载，移动端上可以不打包，善用304缓存，腾讯搞出一个更牛叉的增量更新加载器MT，也可以试试）+Backbone（组织代码与路由管理）+Zepto（轻量DOM操作） + fastclick.js（点击穿透与延迟处理）+Hammer.js（各种触屏事件）+iScroll5.js（滚动条处理）+Animate.css（CSS3动画）+Enquire.js（处理响应式布局）。

#工具

enquirejs

Awesome Media Queries in JavaScript

http://wicky.nillia.ms/enquire.js/

Hammerjs

各种触屏事件

http://hammerjs.github.io/

滚屏

在pc端诞生了 fullPage.js和onepage-scroll这样的库

zepto.fullpage：专注于移动端的 fullPage.js

https://github.com/yanhaijing/zepto.fullpage/blob/master/doc/api.md


#JV前端实际情况

angularjs 暂时不需要使用

JS按需加载，有必要

