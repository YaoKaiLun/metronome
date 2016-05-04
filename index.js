/**
 * Created by yaoka on 2016/5/4.
 */
var my_audio = document.getElementById("my_audio");
var beatNum = document.getElementById("beatNum");

var addBeatNum = document.getElementById("addBeatNum");
var subBeatNum = document.getElementById("subBeatNum");
var nowBeatNum = document.getElementById("nowBeatNum");

var preSoundType = document.getElementById("preSoundType");
var nextSoundType = document.getElementById("nextSoundType");
var soundType = document.getElementById("soundType");

var start = document.getElementById("start");
var stop = document.getElementById("stop");


var interval;
var nowSoundType = 1;
var totalSoundType = 4;

var countSpeed = function (beatNum) {
    return 60000/beatNum;
}

addBeatNum.addEventListener("click",function () {
    if(beatNum.value<240){
        beatNum.value++;
        nowBeatNum.innerHTML = beatNum.value;
        stop.click();
        start.click();
    }
})
subBeatNum.addEventListener("click",function () {
    if(beatNum.value>30){
        beatNum.value -= 1;
        nowBeatNum.innerHTML = beatNum.value;
    }
})
beatNum.addEventListener("change",function () {
    nowBeatNum.innerHTML = beatNum.value;
    stop.click();
    start.click();
})

var toPreSoundType = function () {
    if(nowSoundType>1){
        nowSoundType -= 1;
        soundType.innerHTML = nowSoundType;
    }
}
preSoundType.addEventListener("click",toPreSoundType);

var toNextSoundType = function () {
    if(nowSoundType<totalSoundType){
        nowSoundType += 1;
        soundType.innerHTML = nowSoundType;
    }
}
nextSoundType.addEventListener("click",toNextSoundType);

var count = 0;
var playAudio = function () {
    if(nowSoundType!=4){
        my_audio.src = "audio/" + nowSoundType + ".mp3";
        my_audio.play();
    }else{
        stop.click();
        start.click();
    }
}
var peopleSound = function () {
    if(nowSoundType==4) {
        my_audio.src = "audio/4/" + (count % 4 + 1) + ".mp3";
        my_audio.play();
        count += 1;
    }else{
        stop.click();
        start.click();
    }
}



start.addEventListener("click",function () {
    if(nowSoundType!=4){
        interval = setInterval(playAudio, countSpeed(beatNum.value));
    }else{
        interval = setInterval(peopleSound,countSpeed(beatNum.value))
    }
})

stop.addEventListener("click",function () {
    clearInterval(interval);
})

