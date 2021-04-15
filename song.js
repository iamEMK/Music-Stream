const music = document.querySelector('audio');
const title = document.getElementById('title');
const movies = document.getElementById('movie');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress')
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('total-duration');


// Musics
 const songs = [
     {
        name: 'Aalaporan Tamizhan',
        movie: 'Mersal'
     },
     {
        name: 'Vaathi Coming',
        movie: 'Master'
    },
     {
         name: 'Aale Saachuputta Kannala',
         movie: 'Vil Ambu'
     },
     {
        name: 'Enjoy Enjaami',
        movie: 'Dhee ft.Arivu'
    },
    {
        name: 'Adiyae Pulla',
        movie: 'Hovoc Brothers studio'
    },
    {
        name: 'Bang Bang Bang',
        movie: 'Anjaan'
    },
    {
        name: 'Blood Bath',
        movie: 'Asuran'
    },
    {
        name: 'Ennodu Nee Irundhal',
        movie: 'I'
    },
    {
        name: 'Kulirudha Pulla',
        movie: 'Oththa Seruppu'
    },
    {
        name: 'Madura Palapalakkuthu',
        movie: 'Devarattam'
    },
    {
        name: 'Mei Nigara',
        movie: '24'
    },
    {
        name: 'Po Urave',
        movie: 'Kaatrin Mozhi'
    },
    {
        name: 'Polakatum Para Para',
        movie: 'Master'
    },
    {
        name: 'Vaathi Raid',
        movie: 'Master'
    }
]

// Checking playing or Not 
let isPlaying = false;

// Play & Pause

function Play(){
    isPlaying=true;
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}
function Pause(){
    isPlaying=false;
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

//Play
playBtn.addEventListener('click',()=> isPlaying ? Pause(): Play());

// update 

function loadSong(song){
    title.textContent = song.name;
    movies.textContent=`-${song.movie}`;
    music.src = `/songs/${song.name}.mp3`;
}
//current song
let songIndex = 0;

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex=songs.length - 1;
    }
    loadSong(songs[songIndex]);
    Play();
}
function nextSong(){
    songIndex++;
    console.log(songIndex);
    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    console.log(songIndex);
    Play();
}
//Load songs
loadSong(songs[songIndex]);

// update progress bar

function updateProgressBar(e){

    if(isPlaying){
        const { duration, currentTime} = e.srcElement;
        const progressPercentage = (currentTime/duration) * 100;
       // update song playing percentage
        progress.style.width = `${progressPercentage}%`;
        // update duration and current time
        const durationMinutes = Math.floor(duration / 60);
              const durationSeconds = Math.floor(duration % 60);
            if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent = `0${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds=`0${currentSeconds}`;
        }
        currentTimeEl.textContent=`0${currentMinutes}:${currentSeconds}`;
        progressBar.setAttribute(currentTimeEl);
        }
 
}
function  progressChangeCurrentTimeline(e){
    const totalWidth = this.clientWidth;
    console.log(totalWidth);
    const clickX = e.offsetX;
    const { duration } = music;
    console.log(clickX / totalWidth);
    console.log((clickX / totalWidth)* duration);
    music.currentTime = (clickX / totalWidth)* duration;

}

// Event Listners for next and previous songs
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', progressChangeCurrentTimeline);
music.addEventListener('ended', nextSong);

