/*
 * rotate: A jQuery cssHooks adding a cross browser 'rotate' property to $.fn.css() and $.fn.animate()
 *
 * Copyright (c) 2010 Louis-Rémi Babé
 * Licensed under the MIT license.
 * 
 * This saved you an hour of work? 
 * Send me music http://www.amazon.fr/wishlist/HNTU0468LQON
 *
 */
(function($) {
  
var div = document.createElement('div'),
  divStyle = div.style,
  support = $.support;

support.transform = 
  divStyle.MozTransform === ''? 'MozTransform' :
  (divStyle.MsTransform === ''? 'MsTransform' :
  (divStyle.WebkitTransform === ''? 'WebkitTransform' : 
  (divStyle.OTransform === ''? 'OTransform' :
  false)));
support.matrixFilter = !support.transform && divStyle.filter === '';
div = null;

$.cssNumber.rotate = true;
$.cssHooks.rotate = {
  set: function( elem, value ) {
    var _support = support,
      supportTransform = _support.transform,
      cos, sin,
      centerOrigin;
    
    if (typeof value === 'string') {
      value = toRadian(value);
    }
    
    $.data( elem, 'transform', {
      rotate: value
    });
    
    if (supportTransform) {
      elem.style[supportTransform] = 'rotate('+ value +'rad)';
      
    } else if (_support.matrixFilter) {
      cos = Math.cos(value);
      sin = Math.sin(value);
      elem.style.filter = [
        "progid:DXImageTransform.Microsoft.Matrix(",
          "M11="+cos+",",
          "M12="+(-sin)+",",
          "M21="+sin+",",
          "M22="+cos+",",
          "SizingMethod='auto expand'",
        ")"
      ].join('');

      var matrix=[[cos,-sin],[sin,cos]];
      var d=elem;
            d.orig = {
                height:d.offsetHeight,
                width:d.offsetWidth,
                marginTop:parseInt(elem.style["marginTop"]) || 0,
                marginLeft:parseInt(elem.style["marginLeft"]) || 0
            };      


      setXy(0.5, 0, matrix, d);
      // From pbakaus's Transformie http://github.com/pbakaus/transformie
/*      if(centerOrigin = $.rotate.centerOrigin) {
        elem.style[centerOrigin == 'margin' ? 'marginLeft' : 'left'] = -(elem.offsetWidth/2) + (elem.clientWidth/2) + "px";
        elem.style[centerOrigin == 'margin' ? 'marginTop' : 'top'] = -(elem.offsetHeight/2) + (elem.clientHeight/2) + "px";
      }*/
    }
  },
  get: function( elem, computed ) {
    var transform = $.data( elem, 'transform' );
    return transform && transform.rotate? transform.rotate : 0;
  }
};
$.fx.step.rotate = function( fx ) {
  $.cssHooks.rotate.set( fx.elem, fx.now+fx.unit );
};

function radToDeg( rad ) {
  return rad * 180 / Math.PI;
}
function toRadian(value) {
  if(value.indexOf("deg") != -1) {
    return parseInt(value,10) * (Math.PI * 2 / 360);
  } else if (value.indexOf("grad") != -1) {
    return parseInt(value,10) * (Math.PI/200);
  }
  return parseFloat(value);
}

/*multiple*/
    function multiple(m1, m2) {

        var m = [];

        function set(x, y, v) {
            if (!m[x]) {
                m[x] = [];
            }
            m[x][y] = v;
        }

        var r1 = m1.length,
            r2 = m2.length,
            c2 = m2[0].length;

        for (var i = 0; i < r1; i++) {

            for (var k = 0; k < c2; k++) {
                var sum = 0;
                for (var j = 0; j < r2; j++) {
                    sum += m1[i][j] * m2[j][k];
                }

                set(i, k, sum);
            }
        }

        return m;

    }
/*multiple*/

/*setXy*/
    function setXy(px, py, m, d) {
        var orig = d.orig;
        var centerX = orig.width / 2,
            centerY = orig.height / 2;

        var originX = px * orig.width,
            originY = py * orig.height;

        var diffX = centerX - originX,
            diffY = centerY - originY;

        var transformed = multiple(m, [
            [diffX],
            [diffY]
        ]),
            transformedX = transformed[0][0] + originX,
            transformedY = transformed[1][0] + originY;

        var diff = [transformedX - d.offsetWidth / 2, transformedY - d.offsetHeight / 2];

/*        DOM.css(d, {
            marginTop:orig.marginTop + diff[1],
            marginLeft:orig.marginTop + diff[0]
        });*/

        $(d).css({marginTop:orig.marginTop + diff[1],marginLeft:orig.marginTop + diff[0]})
    }

/*setXy*/



$.rotate = {
  centerOrigin: 'margin',
  radToDeg: radToDeg

};
  
})(jQuery);