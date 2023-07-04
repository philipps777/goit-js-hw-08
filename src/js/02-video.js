import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LS = 'videoplayer-current-time'

const saveCurrentTimeToLocalStorage = function (time) {
  const data = JSON.stringify(time);
  localStorage.setItem(LS, data); 
  
}

const loadCurrentTimeFromLocalStorage = function () {
    const data = localStorage.getItem(LS);    
    return JSON.parse(data);
 
};

const updateCurrentTimeThrottled = throttle(saveCurrentTimeToLocalStorage, 1000);


const onPlay = function(event) {
  const currentTime = event.seconds;
  saveCurrentTimeToLocalStorage(currentTime);
};

player.on('timeupdate', onPlay);

const savedTime = JSON.parse(localStorage.getItem(LS));

if (savedTime) {
  player.setCurrentTime(savedTime).catch(function(error) {
    switch (error.name) {
      case 'RangeError':
        
        break;
      default:
        break;
    }
  });
}


player.play();
