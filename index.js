/**
 * Created by yaoka on 2016/5/4.
 */
var mode = document.getElementsByName("mode");
var mode_num = 1;
var operatorMode = document.getElementById("operatorMode");
var simpleMode = document.getElementById("simpleMode");

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

var tempo = document.getElementsByName("tempo");
var now_tempo = 4;

var interval;
var nowSoundType = 1;
var totalSoundType = 4;
var my_colors = ["#ffffff","#aaaaaa","#555555","#000000"];

for(var i=0;i<2;i++){
    mode[i].addEventListener("click",function () {
        if(this.value==1&&mode_num==2){
            simpleMode.style.display = "none";
            operatorMode.style.display = "flex";
            mode_num = 1;
        }else if(this.value==2&&mode_num==1){
            operatorMode.style.display = "none";
            simpleMode.style.display = "flex";
            mode_num = 2;
        }
    })
}

var countSpeed = function (beatNum) {
    return 60000/beatNum;
}

//change beet number / speed
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


//change sound type
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

var count_num = 0;
var count_peopleSound_num = 0;

var playAudio = function () {
    count_num++;
    if(nowSoundType!=4){
        if((count_num % now_tempo) == 1){
            my_audio.volume = 0.9;
        }else{
            my_audio.volume = 0.4;
        }
        my_audio.src = "audio/" + nowSoundType + ".mp3";
        my_audio.play();
        if(mode_num==2){
            simpleMode.style.backgroundColor = my_colors[count_num % now_tempo];
        }
    }else{
        stop.click();
        start.click();
    }
}
var peopleSound = function () {
    count_num++;
    if(nowSoundType==4) {
        my_audio.src = "audio/4/" + (count_peopleSound_num % now_tempo + 1) + ".mp3";
        my_audio.play();
        count_peopleSound_num += 1;
        if(mode_num==2){
            simpleMode.style.backgroundColor = my_colors[count_num % now_tempo];
        }
    }else{
        stop.click();
        start.click();
    }
}

start.addEventListener("click",function () {
    if(nowSoundType!=4){
        interval = setInterval(playAudio, countSpeed(beatNum.value));
    }else{
        interval = setInterval(peopleSound,countSpeed(beatNum.value));
    }
})

stop.addEventListener("click",function () {
    clearInterval(interval);
})

for(var i=0;i<4;i++){
    tempo[i].addEventListener("click",function () {
        now_tempo = this.value;
    })
}