import { addZero } from './supScript.js'

export const musicPlayerInit = () => {

  //vars
  const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimeTotal = document.querySelector('.audio-time__total');

  const playlist = ['hello', 'flow', 'speed']

  let trackIndex = 0;

  //loading sound
  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];

    audioHeader.textContent = track.toUpperCase();
    audioImg.src = `./audio/${track}.jpg`;
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }

  }

  const prevTrack = () => {
    if (trackIndex !== 0) {
        trackIndex--;
    } else {
        trackIndex = playlist.length - 1;
    }
    loadTrack();
  }

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
        trackIndex = 0;
    } else {
        trackIndex++;
    }
    loadTrack();
  }

  //event listeners:
  //manipulation of an audio buttons
  audioNavigation.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if(audioPlayer.paused) {
        audioPlayer.play();
        loadTrack();
      } else {
        audioPlayer.pause();
      }
    }
    
    if (target.classList.contains('audio-button__prev')) {
        prevTrack();
    }
    
    if (target.classList.contains('audio-button__next')) {
        nextTrack();
    }
  });

  //autoplay if ended sounds
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  })

  //count/display time bar 
  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    let minutePassed = Math.floor(currentTime / 60) || '0';
    let secondsPassed = Math.floor(currentTime % 60) || '0';

    let minuteTotal = Math.floor(duration / 60) || '0';
    let secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
    audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
  })

  //scroll time bar
  audioProgress.addEventListener('click', event => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  })

}