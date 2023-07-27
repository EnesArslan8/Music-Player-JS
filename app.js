const container =document.querySelector(".container");
const image=document.querySelector("#music-img");
const audio=document.querySelector("#audio");

const title=document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer");
const prev=document.querySelector(".controls #prev");
const play=document.querySelector(".controls #play");
const next=document.querySelector(".controls #next");
const currentTime=document.querySelector("#current-time");
const duration=document.querySelector("#duration");
const progresBar=document.querySelector("#progress-bar");
const volume=document.querySelector("#volume");
const volumeBar=document.querySelector("#volume-bar");
const ul=document.querySelector("ul");



const player=new MusicPlayer(musicList);



window.addEventListener("load",()=>{
    let music=player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(music){
    title.innerText=music.getName();
    singer.innerText=music.singer;
    image.src="img/"+music.img;
    audio.src="mp3/"+music.file;
}

play.addEventListener("click",()=>{
    const isMusicPlay=container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click",()=>{
    prevMusic();
    isPlayingNow();
})

next.addEventListener("click",()=>{
    nextMusic();
    isPlayingNow();
})
function  pauseMusic(){
    container.classList.remove("playing");
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
    audio.pause();   
}

function playMusic(){
    container.classList.add("playing");
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    audio.play();
}

function prevMusic(){
    player.prev();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
}
function nextMusic(){
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
}
const calculateTime=(totalSecond)=>{
    const min=Math.floor(totalSecond/60);
    const sec=Math.floor(totalSecond%60);
    const guncellenenSaniye=sec<10?`0${sec}`:`${sec}`;
    const sonuc=`${min}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=calculateTime(audio.duration);
    progresBar.max=Math.floor(audio.duration);
})

audio.addEventListener("timeupdate",()=>{
    progresBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(progresBar.value);
})

progresBar.addEventListener("input",()=>{
    currentTime.textContent=calculateTime(progresBar.value);
    audio.currentTime=progresBar.value;
})

window.addEventListener("keydown",(event)=>{
    if(event.keyCode==32 || event.keyCode==13){
        const isMusicPlay=container.classList.contains("playing");
        isMusicPlay ? pauseMusic() : playMusic();
    }
})

volume.addEventListener("click",()=>{
    const isVolumeHigh=volume.classList.contains("active");
    isVolumeHigh ? mute() : addVolume();
})

volumeBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    audio.volume=value/100;
    if(value==0){
        volume.classList.remove("active");
        volume.classList.add("fa-volume-xmark"); 
    }else{
        volume.classList.add("active");
        volume.classList.remove("fa-volume-xmark");
    }
});

const mute=()=>{
    audio.muted=true;
    volumeBar.value=0;
    volume.classList.remove("active");
    volume.classList.add("fa-volume-xmark");  
     
}
const addVolume=()=>{
    audio.muted=false;
    volume.classList.add("active");
    volume.classList.remove("fa-volume-xmark");
    volumeBar.value=100;
}

window.addEventListener("keydown",(e)=>{
    if(e.keyCode==77){
        const isVolumeHigh=volume.classList.contains("active");
        isVolumeHigh ? mute() : addVolume();
    }
})

const displayMusicList=(list)=>{
    for(let i=0;i<list.length;i++){
        let liTag=`
        <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center ">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
        `;
        ul.insertAdjacentHTML("beforeend",liTag);

        let liAudioDuration=ul.querySelector(`#music-${i}`);
        let liAudioTag=ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText=calculateTime(liAudioTag.duration)
        })   
    }
}

const selectedMusic=(li)=>{
    player.index=li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}
const isPlayingNow=()=>{
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("li-playing")){
            li.classList.remove("li-playing");
        }
        if(li.getAttribute("li-index")==player.index){
            li.classList.add("li-playing");
        }
    }
}

audio.addEventListener("ended",()=>{
    nextMusic();
    isPlayingNow();
})