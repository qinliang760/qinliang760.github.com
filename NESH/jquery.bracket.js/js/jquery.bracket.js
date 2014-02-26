/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay bracket
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
    var bracket = {
        defaults: {
            data:""
        }
    };
    function Bracket(obj, defaults) {
        var self = this,
            $obj = obj,
            teams=defaults.data.teams,
            results=defaults.data.results;

        $.extend(this, {
            setTeams: function() {
                var resultsL=results.length;
                for(var i=0,l=resultsL;i<l;i++){
                    
                }
                for(var i=0,l=teams.length;i<l;i++){
                    <div class="match">
                        <div class="teamContainer">
                            <div class="team">teamwrap</div>
                                <div class="label">teams[i][0]</div>
                                <div class="score">results[i][0]</div>
                            </div>
                            <div class="team">teamwrap</div>
                                <div class="label">teams[i][1]</div>
                                <div class="score">results[i][1]</div>
                            </div>
                            <div class="connector"></div>
                        </div>
                    </div>                    


                }      
            },
            getTeams:function(){

            },
            setPosition: function() {
 

            },
            
            init: function() {

            }
        })
        this.init();

    }

  $.fn.bracket = function(defaults) {
        defaults = $.extend({},
        bracket.defaults, defaults);
        return this.each(function() {
            el = new Bracket($(this), defaults);
        })

    }

})(jQuery);

