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
            setTeams: function(num) {

                var wrap=$('<div class="jQBracket"></div>').appendTo($obj);

                var height = teams.length * 64;
                var wEl=$('<div class="bracket"></div>').appendTo(wrap);
                wEl.css("height",height);
/*                var rounds = Math.log(teams.length * 2) / Math.log(2);
                var matches = teams.length;*/


                var results_point=results[0];
                var teamsArr=[];
                for(var i=0,l=teams.length;i<l;i++){
                    teamsArr.push('<div class="match">'+
                        '<div class="teamContainer">'+
                            '<div class="team">teamwrap</div>'+
                                '<div class="label">'+teams[i][0]+'</div>'+
                                '<div class="score">'+results_point[i][0]+'</div>'+
                            '</div>'+
                            '<div class="team">teamwrap</div>'+
                                '<div class="label">'+teams[i][1]+'</div>'+
                                '<div class="score">'+results_point[i][1]+'</div>'+
                            '</div>'+
                            '<div class="connector"></div>'+
                        '</div>'+
                    '</div>');                    


                }
                return '<div class="round">'+
                //this.getWinnerTeams();
            },
            getWinnerTeams:function(num){
                var results_point=results[0];   //第二轮比赛结果
                var teams2=[];
                for(var i=0,l=results_point.length;i<l;i++){
                    if(results_point[i][0]>results_point[i][1]){
                        teams2.push(0);
                    }else{
                       teams2.push(1); 
                    }
                }


                var teams2_2_j=[],teams2_2_o=[];
                for (var j=0,jl=teams2.length;j<jl;j++){
                    if(j%2==0){
                        teams2_2_o.push(teams[j][teams2[j]]);
                    }else{
                        teams2_2_j.push(teams[j][teams2[j]]);
                    }
                }

                var teams2_2=[];
                for (var m=0,ml=teams2_2_j.length;m<ml;m++){
                    teams2_2[m]=[teams2_2_j[m],teams2_2_o[m]];
                }



            },
            setPosition: function() {
 

            },
            
            init: function() {
                //this.setTeams();
                this.setTeams(1);
                this.setTeams(2);
                this.setTeams(3);
                this.setTeams(4);
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

