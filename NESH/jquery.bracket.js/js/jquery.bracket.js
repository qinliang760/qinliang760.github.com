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
            data:"",
            matchHeight:64
        }
    };
    function Bracket(obj, defaults) {
        var self = this,
            $obj = obj,
            teams=defaults.data.teams,
            results=defaults.data.results,
            teamsGroup=[],
            matchHeight=defaults.matchHeight;

        $.extend(this, {
            setTeams: function(num) {

                if(num==null){
                    var team=teams;
                    var results_point=results[0];
                    var h=matchHeight;
                }else{
                    var team=this.getTeams(num);
                    //
                    var results_point=results[num+1];
                    //num==0?num=num+1:"";
                    var h=matchHeight*(Math.pow(2, num+1));  
                }

                var max_height = this.getTeamsHeight();
                h>max_height?h=max_height:"";
                var teamsArr=[];
                var matchStyle='style="height:'+h+'px"';
                var topV=(h-matchHeight)/2;
                var topStyle='style="top:'+topV+'px"';


                var connectorH=(h/2)-12;
                if(h<max_height){
                    var connectorHei="height:"+connectorH+"px";
                }else{
                    var connectorHei="";
                }
                
                
                if(typeof team=="string"){
                var topV=(h-(matchHeight)/2)/2;//debugger;
                var topStyle='style="top:'+topV+'px"';

                    teamsArr.push('<div class="match matchLast" '+matchStyle+'>'+
                        '<div class="teamContainer" '+topStyle+'>'+
                            '<div class="team" data-team="'+team+'">'+
                                '<div class="label">'+team+'</div>'+
                                '<div class="score">&nbsp;</div>'+
                            '</div>'+                          
                        '</div>'+
                    '</div>');
                    return teamsArr.join(""); 
                }

                
                for(var i=0,l=team.length;i<l;i++){

                    if(i%2==0){
                        var connectorClass="_up";
                        var connectorStyle='style="top:23px;width:20px;right:-22px;border-bottom:none;'+connectorHei+'"';


                    }else{
                        var connectorClass="_down";
                        var connectorStyle='style="bottom:23px;width:20px;right:-22px;border-top:none;'+connectorHei+'"';

                    }


                    teamsArr.push('<div class="match" '+matchStyle+'>'+
                        '<div class="teamContainer" '+topStyle+'>'+
                            '<div class="team '+self.getWin(results_point[i][0],results_point[i][1])+'" data-team="'+team[i][0]+'">'+
                                '<div class="label">'+team[i][0]+'</div>'+
                                '<div class="score">'+results_point[i][0]+'</div>'+
                            '</div>'+
                            '<div class="team '+self.getWin(results_point[i][1],results_point[i][0])+'" data-team="'+team[i][1]+'">'+
                                '<div class="label">'+team[i][1]+'</div>'+
                                '<div class="score">'+results_point[i][1]+'</div>'+
                            '</div>'+
                            '<div class="connector connector'+connectorClass+'" '+connectorStyle+'><div class="connector"></div></div>'+
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
                }

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
                var rounds=this.getRoundsL();
                var teamInit=self.setTeams(null);
                var roundsArr=[];
                roundsArr.push(teamInit);
                for(var i=0,l=rounds;i<l;i++){
                    var team=self.setTeams(i);
                    roundsArr.push(team);
                }
                return roundsArr;

            },
            getRoundsL:function(){
                var rounds = Math.log(teams.length * 2) / Math.log(2);
                return rounds;
            },
            setBracket:function(){
                //var wrap=$('<div class="jQBracket"></div>').appendTo($obj);

                //var height = teams.length * 64;
                //var wEl=$('<div class="bracket"></div>').appendTo(wrap);
                //wEl.css("height",height);
                
                //var matches = teams.length;                
                var rounds=this.setRounds(),htmlArr=[];
                for (var i=0,l=rounds.length;i<l;i++){
                    htmlArr.push('<div class="round">'+rounds[i]+'</div>');
                }

                var height = this.getTeamsHeight();

                var html='<div class="jQBracket"><div style="height:'+height+'px" class="bracket">'+htmlArr.join("")+'</div></div>';
                $obj.html(html);
                
            },
            getTeamsHeight:function(){
                var height = teams.length * matchHeight;
                return height;
            },
            getWin:function(a,b){
                if(a>b){
                    return "win";
                }else{
                    return "lose";
                }
            },
            setMouseover:function(){
                var team=$(".team",$obj);
                team.hover(function(){
                    var t=$(this),
                        name=t.data("team");

                    team.removeClass("highlight");    
                    $(".team[data-team='"+name+"']",$obj).addClass("highlight");    
                },function(){
                    var t=$(this),
                        name=t.data("team");

                    $(".team[data-team='"+name+"']",$obj).removeClass("highlight");    
                })
            },
            init: function() {
                this.setBracket();
                this.setMouseover();

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

