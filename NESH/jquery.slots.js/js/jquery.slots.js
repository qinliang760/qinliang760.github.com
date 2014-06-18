/**
 * @fileoverview 
 * @author jay
 * @module slot
 **/
(function($){
	$.ns("JV");
    var EMPTY = '';
    //var $ = Node.all;
    /**
     * 
     * @class Slot
     * @constructor
     * @extends Base

	    参数1：老虎机的ID
	    参数2：每个单元的高度
	    参数3：每个单元的个数
	    参数4：其他配置项，速度等

     */
     JV.Slot=function(Jnode, itemHeight, itemSize, cfg){
        var self = this;

		this.items = $(Jnode).find('.slot-item');
		this.itemHeight = itemHeight;
		this.itemSize = itemSize;
		this.cfg = cfg;

		this.initializer();

    }
	
	JV.Slot.prototype = {
		// 速度
        _speed : 20,
        // 每次移动像素
        _movePx : 0,
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
		initializer: function() {
            var self = this;
            //设置速度
            self._setMovePx();
            //排列
            self._specifySort();
            // 滚动延时
            self._setSpeed();
        },
        /**
         * 设置滚动延时
         */
        _setSpeed : function(){
            var self = this;
            if(self.cfg && self.cfg.speed){
                self._speed = self.cfg.speed;
            }else{
                self._speed = 30;
            }
        },
        /**
         * 设置速度
         */
        _setMovePx : function(){
            var self = this;
            self._movePx = self.itemHeight / 4;
        },
        //游戏状态
        _gamgeStatus : false,
        /**
         * 启动
         * @param  {Function} callback 回调
         */
        start : function(callback){
            var self = this;
            if(self._gamgeStatus){return;}
            self._gamgeStatus = true;
            //清空停止位置
            self._stopPos = [];
            self._setStartTime();
            //启动顺序
            var itemLength = self.itemSize.length,
                startIndex = self.randomNub(self.getArrData(0,itemLength),itemLength);

            for(var i=0;i<itemLength;i++){
                (function(i){
                    setTimeout(function(){
                        var key = startIndex[i];
                        self._scroll($(self.items[key]),key);
                    },i*200);
                })(i);
                self._scrollStatus[i] = true;
            }
            //删除上一次的回调
            delete self._callback;
        },
        /**
         * 设置启动时间
         */
        _setStartTime : function(i){
            var self = this;
            var speed = self._speed;
            var movePx = this._movePx;
            self._speed = speed * 2;
            self._movePx = self.itemHeight / 10;
            setTimeout(function(){
                self._speed = speed * 1.2;
                self._movePx = self.itemHeight / 6;
            },600);
            setTimeout(function(){
                self._speed = speed;
                self._movePx = movePx;
            },1000);
        },
        /**
         * 停止
         * @param  {array}    winArr   要显示的标记
         * @param  {Function} callback 回调
         */
        stop : function(winArr,callback){
            var self = this;
            if(!self._gamgeStatus){return;}            
            self._callback = callback;
            //设置停止延时
            self._setStopTime(function(){
                //设置停止位置
                self._setStopPos(winArr);
                self._gamgeStatus = false;                
            });
        },
        /**
         * 设置停止延时
         * @param {Function} callback
         */
        _setStopTime : function(callback){
            var self = this;
            var speed = self._speed;
            var movePx = this._movePx;

            self._tmpSpeed = speed;
            self._tmpMovePx = movePx;

            self._speed = speed * 1.1;
            self._movePx = self.itemHeight / 6;
            setTimeout(function(){
                self._speed = speed * 1.2;
                self._movePx = self.itemHeight / 10;
            },600);
            setTimeout(function(){
                callback();                
            },1000);
        },
        _scrollStatus : [],
        /**
         * 更新滚动昨天
         * @param  {[int]} i [description]
         */
        _updateScrollStatus : function(i){//debugger;
            var self = this;
            self._scrollStatus[i] = false;
            if(self._scrollStatus.join('').indexOf('true') == -1){
                if(self._callback){
                    self._speed = self._tmpSpeed;
                    self._movePx = self._tmpMovePx;
                    delete self._tmpSpeed;
                    delete self._tmpMovePx;
                    self._callback();
                }
            }
        },
        // 每一项当前的位置
        _pos : [],
        //停止位置
        _stopPos : [],
        _setStopPos : function(winArr){
            var self = this;
        	if(!winArr.length){
        		var itemLength = self.itemSize.length;
        		winArr=self.randomNub(self.getArrData(0,self.itemSize[0]),itemLength);
        	}            
            for(var i=0,len=self.items.length;i<len;i++){
                if(winArr[i] > self.itemSize[i]-1){
                    self._stopPos[i] = 0;
                }else{
                    self._stopPos[i] = winArr[i];
                }
            }
        },
        /**
         * 滚动到的N的
         * @param  {dom} Jnode
         * @param  {int} n
         */
        _scroll : function(Jnode, n, i){
            var self = this;
            var value = parseInt(self._pos[n] - self._movePx),
                itemSize = self.itemSize[n],
                itemHeight = self.itemHeight;
            
            if(-value > itemSize * itemHeight){
                value = itemSize * itemHeight + value;
            }
            //Jnode.css('background-position-y',value);
            Jnode.css('background-position',"0 "+value+"px");
            if(Math.abs(self._stopPos[n] * itemHeight + value) < itemHeight/10){
                value = -self._stopPos[n] * itemHeight;
                //Jnode.css('background-position-y',value);
                Jnode.css('background-position',"0 "+value+"px");
                self._pos[n] = value;
                self._updateScrollStatus(n);
                return;
            }
            
            
            setTimeout(function(){
                self._pos[n] = value;
                self._scroll(Jnode, n);
            },self._speed);
        },
        /**
         * 按指定的顺序排序，取出需要默认显示的三个数字
         */
        _specifySort : function(){
            var self = this,
                len = self.itemSize.length,
                itemHeight = self.itemHeight,
                items = self.items;

            //判断有没有设置默认显示，如果没有，随机显示
            var defaultSort = self.cfg.defaultSort;
            if(!defaultSort || defaultSort.length < len){
                defaultSort = [];
                for(var i = 0; i < len; i++){
                    defaultSort[i] = self.randomNub(self.getArrData(0,self.itemSize[i]), 1);
                }
            }else{
                //判断有没有默认显示大于设定的itemSize
                for(var i = 0; i < len; i++){
                    if(defaultSort[i] > self.itemSize[i]){
                        defaultSort[i] = self.itemSize[i]
                    }
                }
            }

            for(var i = 0; i < len; i++){
                var value = -defaultSort[i] * itemHeight;
                //$(items[i]).css('background-position-y',-defaultSort[i] * itemHeight);
                $(items[i]).css('background-position',"0 "+(-defaultSort[i] * itemHeight)+"px");
                self._pos[i] = value;
            }
        },
         /**
         * 创建i到n的数组
         * @param  {[int]} s 开始
         * @param  {[int]} n 结束
         * @return {[array]}
         */
        getArrData : function(s,n){
            var result = [];
            for(var i = s; i < n; i++){
                result.push(i);
            }
            return result;
        },
         /**
         * 从数组中随机数
         * @param  {[array]} list  数组数据
         * @param  {[int]} count   获取个数
         * @return {[array]}       返回随机数组如count等于1，直接返回int
         */
        randomNub : function(list, count){
            var res = [];
            for (i=0;i<count;i++){
                var index=Math.floor(Math.random()*list.length); //随机取一个位置
                res.push(list[index]);
                list.splice(index,1);
            }
            return res;
        }
	};

    //return Slot;

 })(jQuery);


