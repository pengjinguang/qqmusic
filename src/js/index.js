var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
// console.log(window);
var controlmanager;
// var index = 0;
var songList;
var audio = new root.audioManager();

function bindClick() {

    $scope.on("play:change", function (event, index, flag) {
        audio.getAudio(songList[index].audio);
        if (audio.status == "play" || flag) {
            audio.play();
            root.pro.start();
        }
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
    })
    $scope.on("click", ".prev-btn", function () {
        // if (index === 0) {
        //     index = songList.length - 1;
        // } else {
        //     index--;
        // }
        var index = controlmanager.prev();
        // root.render(songList[index]);
        $scope.trigger("play:change", index);
        if(audio.status == 'play'){
            root.pro.start(0);
        }else{
            root.pro.update(0);
        }
    })
    $scope.on("click", ".next-btn", function () {
        // if (index === songList.length - 1) {
        //     index = 0;
        // } else {
        //     index++;
        // }
        var index = controlmanager.next();
        // root.render(songList[index]);
        $scope.trigger("play:change", index);
        if(audio.status == 'play'){
            root.pro.start(0);
        }else{
            root.pro.update(0);
        }
        
    })
    $scope.on("click", ".play-btn", function () {
        if (audio.status == "play") {
            audio.pause();
            root.pro.stop();
        } else {
            audio.play();
            root.pro.start();
        }
        $(this).toggleClass("playing");
    })
    $scope.on("click", ".list-btn", function () {
        root.playList.show(controlmanager);
    })
}

function bindTouch() {
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.slider-pointer').on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        console.log(e);
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            root.pro.update(per);
        }
        
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            var duration = songList[controlmanager.index].duration;
            var curTime = per * duration;
            audio.playTo(curTime);
            $('.play-btn').addClass('playing');
            audio.status='play';
            root.pro.start(per);
        }
    })
}

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            // root.render(data[0]);
            root.playList.renderList(data);
            songList = data;
            bindClick();
            bindTouch();
            controlmanager = new root.controlManager(data.length);
            console.log(data);
            $scope.trigger("play:change", 0);
        },
        error: function () {
            console.log('error');
        }
    })
}
getData("../mock/data.json");



