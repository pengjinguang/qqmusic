var controlmanager,songList,$=window.Zepto,root=window.player,$scope=$(document.body),audio=new root.audioManager;function bindClick(){$scope.on("play:change",function(o,t,n){audio.getAudio(songList[t].audio),("play"==audio.status||n)&&(audio.play(),root.pro.start()),root.pro.renderAllTime(songList[t].duration),root.render(songList[t])}),$scope.on("click",".prev-btn",function(){var o=controlmanager.prev();$scope.trigger("play:change",o),"play"==audio.status?root.pro.start(0):root.pro.update(0)}),$scope.on("click",".next-btn",function(){var o=controlmanager.next();$scope.trigger("play:change",o),"play"==audio.status?root.pro.start(0):root.pro.update(0)}),$scope.on("click",".play-btn",function(){"play"==audio.status?(audio.pause(),root.pro.stop()):(audio.play(),root.pro.start()),$(this).toggleClass("playing")}),$scope.on("click",".list-btn",function(){root.playList.show(controlmanager)})}function bindTouch(){var a=$(".pro-bottom").offset().left,r=$(".pro-bottom").offset().width;$(".slider-pointer").on("touchstart",function(){root.pro.stop()}).on("touchmove",function(o){void 0;var t=(o.changedTouches[0].clientX-a)/r;0<=t&&t<=1&&root.pro.update(t)}).on("touchend",function(o){var t=(o.changedTouches[0].clientX-a)/r;if(0<=t&&t<=1){var n=t*songList[controlmanager.index].duration;audio.playTo(n),$(".play-btn").addClass("playing"),audio.status="play",root.pro.start(t)}})}function getData(o){$.ajax({type:"GET",url:o,success:function(o){root.playList.renderList(o),songList=o,bindClick(),bindTouch(),controlmanager=new root.controlManager(o.length),void 0,$scope.trigger("play:change",0)},error:function(){void 0}})}getData("../mock/data.json");