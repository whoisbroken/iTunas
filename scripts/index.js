import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';


// vars
const playerBtn = document.querySelectorAll('.player-btn'),
      playerBlock = document.querySelectorAll('.player-block'),
      temp = document.querySelector('.temp');


const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
}

playerBtn.forEach((btn,i) => {
  btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  })
})

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();