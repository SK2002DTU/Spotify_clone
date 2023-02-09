console.log("Welcome to Spotify");

//Initialize the Variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Bas Tujhse Pyaar Ho - Armaan Malik", filePath: "songs/1.mp3", coverPath: "covers/4.webp"},
    {songName: "Bijli - Govinda Naam Mera", filePath: "songs/2.mp3", coverPath: "covers/2.webp"},
    {songName: "Dil Jisse Zinda Hain - Jubin Nautiyal", filePath: "songs/3.mp3", coverPath: "covers/3.webp"},
    {songName: "Haaniya Ve - Thank God", filePath: "songs/4.mp3", coverPath: "covers/4.webp"},
    {songName: "Pehli Baarish Mein - Sumit Bhalla", filePath: "songs/5.mp3", coverPath: "covers/5.webp"},
    {songName: "Pyaar Hona Na Tha - Jubin Nautiyal", filePath: "songs/6.mp3", coverPath: "covers/6.webp"},
    {songName: "Tere Pyaar Mein - Tu Jhoothi Main Makkar", filePath: "songs/7.mp3", coverPath: "covers/7.webp"},
    {songName: "Tu Saamne Aaye - Jubin Nautiyal", filePath: "songs/8.mp3", coverPath: "covers/2.webp"},
    {songName: "Bas Tujhse Pyaar Ho - Armaan Malik", filePath: "songs/9.mp3", coverPath: "covers/5.webp"},
    {songName: "Bijli - Govinda Naam Mera", filePath: "songs/10.mp3", coverPath: "covers/2.webp"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// Handle play/pause Click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Update Seekbar 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
}) 

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})