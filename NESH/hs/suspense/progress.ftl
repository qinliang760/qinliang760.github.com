<#include "../common/template.ftl" />
<@png_fix>h1,#joiner img,.joinBtn,.hammer,.logo_bz,.light</@>
<@css src="/css/suspense/common.css" />
<@css src="/css/suspense/suspense.css" />
<@css src="/css/suspense/animate.css" />

<@template 
		title="暴雪,神秘游戏" 
		keywords="暴雪,神秘游戏"
		description="暴雪,神秘游戏"
	>
	<#assign coorps = [
		{"title":"网易游戏频道","src":"http://nos.netease.com/hearthstone/1//images/suspense/logo/163game.jpg","href":"http://s.163.com/","class":"ad1"}
	]/>
	<#escape x as x?html>


 <div id="wraper">
 	<div id="header">
 		<h1><a href="#"></a></h1>
 		<ul class="share clearFix">
			<li class="ne"><a href="#"></a></li>
			<li class="sina"><a href="#"></a></li>
			<li class="qq"><a href="#"></a></li>
			<li class="qzone"><a href="#"></a></li>
 		</ul>
 	</div>
<!-- 	container -->
 	<div id="container">
 		<div id="joiner">
 			<img src="/images/suspense/t1.png" alt="目前已有" title="目前已有"/>

 			<strong>${total}</strong>
 			<img src="/images/suspense/t2.png" alt="人参与了施工" title="人参与了施工"/>
 			<p class="tip"><img src="/images/suspense/t3.png" alt="到达20万即刻揭晓" title="到达20万即刻揭晓"/></p>
 		</div>
 		

 		<div id="progress">
 			
 			<div class="outbar">
	 			<div class="progressbar">
	 				<div id="runer"><img width="100" src="/images/suspense/panda.gif" alt="" /></div>
	 				<span class="light"></span>
	 				<span class="percentage" rel="${progress}"></span>
	 			</div>
 			</div>
 		</div>

		
		<div id="join">
			<a class="joinBtn" href="#"></a>
			<span class="hammer"></span>
			<img class="fire" src="/images/suspense/fire.png"/><img class="fire" src="/images/suspense/fire.png"/><img class="fire" src="/images/suspense/fire.png"/>
		</div> 		
 	</div>

	<div id="footer">
		<div class="cprt clearFix">
		<a target="_blank" href="http://blizzard.com/" class="logo_bz"></a>
		<a target="_blank" href="http://www.163.com/" class="logo_ne"></a>
			<div class="info">
				<p>&copy;2012 暴雪娱乐股份有限公司版权所有 <span class="t1">由上海网之易网络科技发展有限公司运营<a target="_blank" href="http://www.battlenet.com.cn/legal-cn/infringementnotice">著作权侵权</a></span></p>
				<p>文网进字[2012]003号&nbsp;<a target="_blank" href="http://www.battlenet.com.cn/static/local-common//images/suspense/legal/cn/license.png">沪网文[2011]0682-074号</a>&nbsp;<a target="_blank" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=dlzTMrPD6zqmX21YC6cyhJpNCrmVht21LFnZGxg0F5THxyyj01z3!807291226">增值电信业务经营许可证编号：沪B2－20080012</a></p>
				<p><a target="_blank" href="http://www.battlenet.com.cn/zh/legal-cn/">法律文件</a>&nbsp;<a target="_blank" href="mailto:wlyxjb@gmail.com"> 文化部网络游戏举报与联系邮箱：wlyxjb@gmail.com</a>&nbsp; <a target="_blank" href="http://www.battlenet.com.cn/sc2/legal/internet-rules">《互联网文化管理暂行规定》</a></p>
			</div>
		
		</div>
		<p class="tips">积极健康的游戏心态是健康游戏的开端，本游戏故事情节设置紧凑，请您合理控制游戏时间，避免沉溺游戏影响生活，注意自我保护，防范网络陷阱。
		<br>健康游戏忠告：抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</p>
		
	</div>
 </div>







<@custom_script src="/js/jquery.path.js"/>
<@custom_script src="/js/suspense.js"/>

	<@script>
		$(document).ready(function() { 
			Suspense.init();




})		
	</@>
<!--[if IE]>
<link rel="stylesheet" href="/css/suspense/ie.css" />
<script src="/js/jquery-1.7.2.min.js"></script>
<script src="/js/ie/cssQuery-p.js" type="text/javascript"></script>
<script src="/js/ie/EventHelpers.js" type="text/javascript"></script>
<script src="/js/ie/cssSandpaper.js" type="text/javascript"></script>
<script src="/js/ie/sylvester.js" type="text/javascript"></script>
<script>
	$(function(){

	})
</script>
<![endif]-->	
	</#escape>
</@>
