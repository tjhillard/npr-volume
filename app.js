// -----------------------------
// npr-volume
// @_tjhillard
// December 2016
// -----------------------------

var controls = document.createElement('input');
controls.type = 'range';
controls.max = 100;
controls.min = 0;
controls.step = 1;
controls.value = 80;

var savedVolume = null;

chrome.storage.sync.get('nprVolume', function(val) {
    if (val.nprVolume) {
        savedVolume = val.nprVolume;
    }
});

var checkForIsPlaying = setInterval(function() {
    var player = document.querySelector('.player-basic.is-playing');
    if (player) {
        clearInterval(checkForIsPlaying);

        player.appendChild(controls);

        if (savedVolume) {
            controls.value = savedVolume;
            document.querySelector('audio').volume = savedVolume;
        } else {
            document.querySelector('audio').volume = 80;
        }

        controls.addEventListener('input', function(e) {
            var volume = e.target.value / 100;
            document.querySelector('audio').volume = volume;
            chrome.storage.sync.set({'nprVolume': volume});
        });
    }
}, 200);
