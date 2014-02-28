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
            results=defaults.data.results,
            teamsGroup=[];

        $.extend(this, {
            setTeams: function(num) {

                //var wrap=$('<div class="jQBracket"></div>').appendTo($obj);

                //var height = teams.length * 64;
                //var wEl=$('<div class="bracket"></div>').appendTo(wrap);
                //wEl.css("height",height);
                
                //var matches = teams.length;


                
                if(num==null){
                    var team=teams;
                    var results_point=results[0];
                }else{
                    var team=this.getTeams(num);
                    var results_point=results[num];  
                }//debugger;

                
                var teamsArr=[];
                if(typeof team=="string"){
                    teamsArr.push('<div class="match">'+
                        '<div class="teamContainer">'+
                            '<div class="team">'+
                                '<div class="label">'+team+'</div>'+
                            '</div>'+
                            '<div class="connector"></div>'+
                        '</div>'+
                    '</div>');
                    return teamsArr.join(""); 
                }

                
                for(var i=0,l=team.length;i<l;i++){
                    teamsArr.push('<div class="match">'+
                        '<div class="teamContainer">'+
                            '<div class="team">'+
                                '<div class="label">'+team[i][0]+'</div>'+
                                '<div class="score">'+results_point[i][0]+'</div>'+
                            '</div>'+
                            '<div class="team">'+
                                '<div class="label">'+team[i][1]+'</div>'+
                                '<div class="score">'+results_point[i][1]+'</div>'+
                            '</div>'+
                            '<div class="connector"></div>'+
                        '</div>'+
                    '</div>');                    


                }
                return teamsArr.join("");
                //this.getWinnerTeams();
            },
            getTeams:function(num){
                var results_point=results[num];   //第二轮比赛结果
                var teams2=[];
                var teams2_2=[];
                for(var i=0,l=results_point.length;i<l;i++){
                    if(results_point[i][0]>results_point[i][1]){
                        teams2.push(0);
                    }else{
                       teams2.push(1); 
                    }
                }debugger;

                if(num==0){
                    var teamG=teams;
                }else{
                    var teamG=teamsGroup[num-1];
                }

                if(teams2.length==1){
                    //teams2_2[0]=teamG[0][teams2[0]];
                    return teamG[0][teams2[0]];
                }

                var teams2_2_j=[],teams2_2_o=[];
                for (var j=0,jl=teams2.length;j<jl;j++){
                    if(j%2==0){
                        teams2_2_o.push(teamG[j][teams2[j]]);
                    }else{
                        teams2_2_j.push(teamG[j][teams2[j]]);
                    }
                }

                if(!teams2_2_j.length){
                    teamsGroup[num]=teams2_2_o;
                    return teams2_2;
                }
                //var teams2_2=[];
                for (var m=0,ml=teams2_2_o.length;m<ml;m++){
                    teams2_2[m]=[teams2_2_o[m],teams2_2_j[m]];
                }

                teamsGroup[num]=teams2_2;
                return teams2_2;


            },
            setRounds: function() {
                var rounds = Math.log(teams.length * 2) / Math.log(2);
                var teamInit=self.setTeams(null);
                var roundsArr=[];
                roundsArr.push(teamInit);
                for(var i=0,l=rounds;i<l;i++){
                    var team=self.setTeams(i);
                    roundsArr.push(team);
                }debugger;
                

            },
            
            init: function() {
                this.setRounds();

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

