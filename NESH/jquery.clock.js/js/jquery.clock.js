var clkCls = "clock";
var clkUnitCls = "unit";
var clkTopCls = "top";
var clkBtmCls = "btm";

function transform(obj,tran) {
	try{
		obj.style.WebkitTransform = tran;
		obj.style.MozTransform = tran;
		obj.style.msTransform = tran;
		obj.style.OTransform = tran;
		obj.style.transform = tran;
	}catch (e){
	}
}
		

var ClkUnit = function(val, minVal, maxVal){
	this.update = function() {
		this.updateTxt(); 
		if(this.val>this.maxVal) { this.setVal(this.minVal); this.period(); }
		if(this.val<this.minVal) { this.setVal(this.maxVal); this.period(); }
	}
	this.incVal = function() { this.val++; this.update(); }
	this.decVal = function() { this.val--; this.update(); }
	this.updateTxt = function() { if(this.val>9) this.text = this.val; else this.text = "0"+this.val; }
	this.setVal = function(v) { this.val = v; this.updateTxt(); } 
	
	this.pane = document.createElement("div");
	this.pane.className = clkUnitCls;
	this.setVal(val);
	this.minVal = minVal;
	this.maxVal = maxVal;
	this.topbak = document.createElement("div");this.topbak.txt = document.createElement("span");this.topbak.className = clkTopCls;
	this.topfnt = document.createElement("div");this.topfnt.txt = document.createElement("span");this.topfnt.className = clkTopCls;
	this.btmbak = document.createElement("div");this.btmbak.txt = document.createElement("span");this.btmbak.className = clkBtmCls;
	this.btmfnt = document.createElement("div");this.btmfnt.txt = document.createElement("span");this.btmfnt.className = clkBtmCls;
	this.pane.appendChild(this.topbak); this.topbak.appendChild(this.topbak.txt);
	this.pane.appendChild(this.topfnt); this.topfnt.appendChild(this.topfnt.txt);
	this.pane.appendChild(this.btmbak); this.btmbak.appendChild(this.btmbak.txt);
	this.pane.appendChild(this.btmfnt); this.btmfnt.appendChild(this.btmfnt.txt);
	this.mtx = false;
	
	this.animateReset = function(){
		transform(this.btmfnt,"");
		transform(this.btmbak,"");
		
		this.btmfnt.txt.innerHTML=this.text;
		this.topbak.txt.innerHTML=this.text;
		this.topfnt.txt.innerHTML=this.text;
		this.btmbak.txt.innerHTML=this.text;
		
		transform(this.topfnt,"");
		transform(this.topbak,"");
	}
	
	this.period = null;
	
	this.turnDown = function(){
		var u = this;
		if(this.mtx) return; //this.mtx = true;
		this.incVal();
		var topDeg = 0;var btmDeg = 90;
		
		this.topbak.txt.innerHTML=this.text;
		
		transform(u.topfnt,"rotateX(0deg)");
		
		var timer1 = setInterval(function(){
						transform(u.topfnt,"rotateX("+topDeg+"deg)"); topDeg-=10;
						if(topDeg<=-90){
							transform(u.topfnt,"rotateX(0deg)");
							u.topfnt.txt.innerHTML=u.text;
							transform(u.btmfnt,"rotateX(90deg)");
							u.btmfnt.txt.innerHTML=u.text;
							var timer2 = setInterval(function(){
											if(btmDeg<=0) { clearInterval(timer2);u.animateReset(); u.mtx=false; }
											transform(u.btmfnt,"rotateX("+btmDeg+"deg)"); btmDeg-=10;},30);
							clearInterval(timer1);
						}},30);
	}
	
	this.animateReset();
}

var Clock = function(prt){
	this.pane = document.createElement("div");
	this.pane.className = clkCls;
	var d = new Date();
	this.hour = new ClkUnit(d.getHours(), 0, 23);
	this.munite = new ClkUnit(d.getMinutes(), 0, 59);
	this.second = new ClkUnit(d.getSeconds(), 0, 59);
	this.pane.appendChild(this.hour.pane);
	this.pane.appendChild(this.munite.pane);
	this.pane.appendChild(this.second.pane);
	prt.appendChild(this.pane);
	var clock = this;
	this.second.period = function() { clock.munite.turnDown(); }
	this.munite.period = function() { clock.hour.turnDown(); }
	this.timer = null;
	
	this.start = function(){ this.timer = setInterval(function(){clock.second.turnDown();},1000); }
	this.pause = function(){ clearInterval(this.timer); }
	
	this.start();
}