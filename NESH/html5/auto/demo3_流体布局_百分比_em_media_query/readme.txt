RWD设计十个基本技巧
http://www.w3cplus.com/css3/10-basic-tips-about-responsive-design.html


图片断点替换地址
<img src="image.jpg" data-src-600px="image-600px.jpg" data-src-800px="image-800px.jpg" alt="">

@media (min-device-width:600px) {
  img[data-src-600px] {
    content: attr(data-src-600px, url);
  }
}

@media (min-device-width:800px) {
  img[data-src-800px] {
    content: attr(data-src-800px, url);
  }
}


各个屏幕
1、Smartphones (portrait and landscape)

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
	/* Styles */
}

2、Smartphones (landscape)

@media only screen and (min-width : 321px) {
	/* Styles */
}

3、Smartphones (portrait)

@media only screen and (max-width : 320px) {
	/* Styles */
}

4、iPads (portrait and landscape)

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
	/* Styles */
}

5、iPads (landscape)

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
	/* Styles */
}

6、iPads (portrait)

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
	/* Styles */
}

7、iPhone 4

@media only screen and (-webkit-min-device-pixel-ratio : 1.5),only screen and (min-device-pixel-ratio : 1.5) {
	/* Styles */
}

8、640px显屏

@media screen and (max-width : 640px) {
	/* CSS Styles */
}

9、800px显屏

@media screen and (max-width : 800px) {
	/* CSS Styles */
}

10、1024显屏

@media screen and (max-width : 1024px) {
	/* CSS Styles */
}

11、Desktops and laptops

@media only screen and (min-width : 1224px) {
	/* Styles */
}

12、Large screens

@media only screen and (min-width : 1824px) {
	/* Styles */
}



1、iPhone4竖板

	@media
	only screen and (-webkit-min-device-pixel-ratio : 1.5) and (orientation:portrait),
	only screen and (min-device-pixel-ratio : 1.5)  and (orientation:portrait){
		/*你的样式写在这里*/	
	}
	

2、iPhone横板

		@media
		only screen and (-webkit-min-device-pixel-ratio : 1.5) and (orientation:landscape),
		only screen and (min-device-pixel-ratio : 1.5)  and (orientation:landscape){
			/*你的样式写在这里*/
		}
	

3、iPad竖板

	@media screen and (max-device-width: 768px) and (orientation: portrait) {
		/*你的样式写在这里*/
  }
	

4、iPad横板

	@media screen and (max-device-width: 1024px) and (orientation: landscape) {
		/*你样式写在这里*/
  }
	



(only) only screen针对彩色屏幕设备
screen针对所有设备(有些设备不一定是屏幕，也许是打字机，盲人阅读器)