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
            matchHeight:64,
            showRound:1//显示的对阵数
        }
    };
    function Bracket(obj, defaults) {
        var self = this,
            $obj = obj,
            teams=defaults.data.teams,
            results=defaults.data.results,
            teamsGroup=[],  //记录每组对阵的team
            matchHeight=defaults.matchHeight,
            showRound=defaults.showRound;

    

        $.extend(this, {
            getGroup:function(){
/*                if(showRound){
                    var team=teamsGroup[num+showRound];
                    var results_point=results.slice(num+showRound);
                    num=num+showRound;
                }else{

                }*/
/*                var team= teamsGroup[0];//debugger;
                var results_point=results.slice(1);
                var rounds = Math.log(team.length * 2) / Math.log(2);

                //var rounds=this.getRoundsL();
                //var teamInit=self.setTeams(null);
                var roundsArr=[];
                //roundsArr.push(teamInit);          

                for(var i=0,l=rounds;i<l;i++){
                    var team=self.setTeams(i);
                    roundsArr.push(team);
                }

                var roundsA=roundsArr,htmlArr=[];
                for (var i=0,l=roundsA.length;i<=l;i++){
                    htmlArr.push('<div class="round">'+roundsA[i]+'</div>');
                }

                var height = this.getTeamsHeight();

                var html='<div class="jQBracket"><div style="height:'+height+'px" class="bracket">'+htmlArr.join("")+'</div></div>';
                $obj.html(html); */                               
                //return rounds;                               
            },
            setTeams: function(num) {

                    if(num==null){
                        var team=teams;
                        var results_point=results[0];
                        var h=matchHeight;

                        
                    }else{

                        var team=teamsGroup[num];
                        //
                        var results_point=results[num+1];                            
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


                    if(typeof results_point[i][2]!=="undefined"){
                        var video='<span class="bracketVideo">'+results_point[i][2]+'</span>';
                    }else{
                        var video="";
                    }


                    teamsArr.push('<div class="match" '+matchStyle+'>'+
                        '<div class="teamContainer" '+topStyle+'>'+
                            '<div class="team '+self.getWin(results_point[i][0],results_point[i][1])+'" data-team="'+team[i][0]+'">'+
                                '<div class="label">'+team[i][0]+'</div>'+
                                '<div class="score">'+results_point[i][0]+'</div>'+
                            '</div>'+
                            video+
                            '<div class="team '+self.getWin(results_point[i][1],results_point[i][0])+'" data-team="'+team[i][1]+'">'+
                                '<div class="label">'+team[i][1]+'</div>'+
                                '<div class="score">'+results_point[i][1]+'</div>'+
                            '</div>'+
                            '<div class="connector connector'+connectorClass+'" '+connectorStyle+'><div class="connector"></div></div>'+
                        '</div>'+
                    '</div>');                    


                }

                return teamsArr.join("");

            },
            getTeams:function(num){
                var results_point=results[num];   //第二轮比赛结果
                var team_point=[];//比赛记分，根据0，1决定晋级对
                var teams_win=[];
                for(var i=0,l=results_point.length;i<l;i++){
                    if(results_point[i][0]>results_point[i][1]){
                        team_point.push(0);
                    }else{
                       team_point.push(1); 
                    }
                }

                if(num==0){
                    var teamG=teams;
                }else{
                    var teamG=teamsGroup[num-1];
                }

                if(team_point.length==1){
                    teamsGroup[num]=teamG[0][team_point[0]];
                    return teamG[0][team_point[0]];

                }

                var team_even=[],teams_odd=[];
                for (var j=0,jl=team_point.length;j<jl;j++){
                    if(j%2==0){
                        team_even.push(teamG[j][team_point[j]]);
                    }else{
                        teams_odd.push(teamG[j][team_point[j]]);
                    }
                }

/*                if(!teams_odd.length){
                    teamsGroup[num]=team_even;
                    //return teams_win;
                }*/
                for (var m=0,ml=team_even.length;m<ml;m++){
                    teams_win[m]=[team_even[m],teams_odd[m]];
                }

                teamsGroup[num]=teams_win;
                return teams_win;


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
            teamsGroup:function(){
                var rounds=this.getRoundsL();
                for(var i=0,l=rounds;i<l;i++){
                    self.getTeams(i);
                    //roundsArr.push(team);
                }
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
                this.teamsGroup();
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

