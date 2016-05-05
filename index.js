/**
 * Created by yaoka on 2016/5/4.
 */
//mode change
var mode = document.getElementsByName("mode");
var mode_num = 1;
var operatorMode = document.getElementById("operatorMode");
var simpleMode = document.getElementById("simpleMode");

//hidden audio
var my_audio = document.getElementById("my_audio");

//change the speed
var beatNum = document.getElementById("beatNum");
var addBeatNum = document.getElementById("addBeatNum");
var subBeatNum = document.getElementById("subBeatNum");
var nowBeatNum = document.getElementById("nowBeatNum");

//change the sound type
var preSoundType = document.getElementById("preSoundType");
var nextSoundType = document.getElementById("nextSoundType");
var soundType = document.getElementById("soundType");
var totalSoundType = 3;
var soundTypes = ["woman","D#1","F#2"];
var nowSoundType = 1;

//start at first
var first = function () {
    soundType.innerHTML = soundTypes[0];
}
first();

//the start button
var the_switch = document.getElementById("switch");
var reStart = function () {
    the_switch.click();
    the_switch.click();
}

//change the tempo
var tempo = document.getElementsByName("tempo");
var now_tempo = 4;

var interval;
var my_colors = ["#D1EEEE","#FFEC8B","#ADFF2F","#CDB5CD"];
var count_num = 0;

for(var i=0;i<2;i++){
    mode[i].addEventListener("click",function () {
        //change setting mode to simple mode
        if(this.value==1&&mode_num==2){
            simpleMode.style.display = "none";
            operatorMode.style.display = "flex";
            mode_num = 1;
        }
        //change simple mode to setting mode
        else if(this.value==2&&mode_num==1){
            operatorMode.style.display = "none";
            simpleMode.style.display = "flex";
            mode_num = 2;
            //auto start switch
            if(!the_switch.checked){
                the_switch.click();
            }
        }
    })
}

//change beet to speed
var countSpeed = function (beatNum) {
    return 60000/beatNum;
}

//change beet number
addBeatNum.addEventListener("click",function () {
    if(beatNum.value<240){
        beatNum.value++;
        nowBeatNum.innerHTML = beatNum.value;
        reStart();
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
    reStart();
})


//change sound type
var toPreSoundType = function () {
    if(nowSoundType>1){
        nowSoundType -= 1;
        soundType.innerHTML = soundTypes[nowSoundType-1];
        count_num = 0;
        reStart();
    }
}
preSoundType.addEventListener("click",toPreSoundType);
var toNextSoundType = function () {
    if(nowSoundType<totalSoundType){
        nowSoundType += 1;
        soundType.innerHTML = soundTypes[nowSoundType-1];
        count_num = 0;
        reStart();
    }
}
nextSoundType.addEventListener("click",toNextSoundType);


var changeColor = function () {
    if(now_tempo!=1){
        simpleMode.style.backgroundColor = my_colors[count_num % now_tempo];
    }else{
        simpleMode.style.backgroundColor = "white";
        setTimeout(function(){
            simpleMode.style.backgroundColor = my_colors[count_num % now_tempo];
        },100)

    }
}
//when the sound type is not "woman"
var playAudio = function () {
    count_num++;
    if(nowSoundType!=1){
        if((count_num % now_tempo) == 1){
            //the first beat is loud or heavy
            my_audio.volume = 0.9;
        }else{
            my_audio.volume = 0.3;
        }
        my_audio.src = "audio/" + nowSoundType + ".mp3";
        my_audio.play();
        if(mode_num==2){
            changeColor();
        }
    }else{
        reStart();
    }
}
var peopleSound = function () {
    if(nowSoundType==1) {
        my_audio.src = "audio/1/" + (count_num % now_tempo + 1) + ".mp3";
        my_audio.play();
        if(mode_num==2){
            changeColor();
        }
        count_num++;
    }else{
        reStart();
    }
}

the_switch.addEventListener("click",function () {
    if(the_switch.checked){
        if(nowSoundType!=1){
            interval = setInterval(playAudio, countSpeed(beatNum.value));
        }else{
            interval = setInterval(peopleSound,countSpeed(beatNum.value));
        }
    }else{
        clearInterval(interval);
    }
})

for(var i=0;i<4;i++){
    tempo[i].addEventListener("click",function () {
        now_tempo = this.value;
        count_num = 0;
    })
}