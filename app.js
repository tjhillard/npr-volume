// -----------------------------
// npr-volume
// @_tjhillard
// December 2016
// -----------------------------

var controls = document.createElement('input');
controls.type = 'range';
controls.max = 100;
controls.min = 0;
controls.step = 5;
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
        var audioElement = document.querySelector('audio');
        player.appendChild(controls);

        if (savedVolume) {
            controls.value = savedVolume * 100;
            audioElement.volume = savedVolume;
        } else {
            audioElement.volume = 0.8;
        }

        controls.addEventListener('change', function(e) {
            var volume = e.target.value / 100;
            audioElement.volume = volume;
            chrome.storage.sync.set({'nprVolume': volume});
        });
    }
}, 200);
