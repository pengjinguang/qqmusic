(function($,root){
    var $scope = $(document.body);
    var control;
    var $palyList = $("<div class='play-list'>" +
    "<div class='play-header'>播放列表</div>" +
    "<ul class='list-wrapper'></ul>" +
    "<div class='close-btn'>关闭</div>" +
"</div>")

//渲染我们的播放列表dom
function renderList(songList){
    var html = '';
    for(var i = 0; i < songList.length; i ++){
        html += "<li><h3>" + songList[i].song+"-<span>" + songList[i].singer + "</span></h3></li>"
    }
    $palyList.find("ul").html(html);
    $scope.append($palyList);
    bindEvent();
}
function show(controlmanger){
    control = controlmanger;
    $palyList.addClass("show");
    singSong(control.index);
}
function bindEvent(){
    $palyList.on("click",".close-btn",function(){
        $palyList.removeClass("show");

    })
    $palyList.find("li").on("click",function(){
        var index = $(this).index();
        singSong(index);
        control.index=index;
        $scope.trigger("play:change",[index,true]);
        $scope.find(".play-btn").addClass("playing");
        setTimeout(function(){
            $palyList.removeClass("show")
        },200);
    })
}
function singSong(index){
    $palyList.find(".sign").removeClass("sign");
    $palyList.find("ul li").eq(index).addClass("sign");
}
root.playList = {
    renderList : renderList,
    show : show
}
})(window.Zepto,window.player || (window.player = {}))


