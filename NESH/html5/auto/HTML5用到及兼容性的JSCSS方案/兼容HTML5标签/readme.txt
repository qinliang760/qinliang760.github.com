完美解决IE(IE6/IE7/IE8)不兼容HTML5标签的方法

引用html5.js  HTML5标签默认是内联元素，需要把html5标签设置成块状display:block

<!--[if lt IE 9]>
    	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
  