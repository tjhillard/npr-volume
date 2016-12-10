// -----------------------------
// npr-volume
// @_tjhillard
// December 2016
//-----------------------------

var controls = document.createElement('input');
controls.type = 'range';
controls.max = 1;
controls.min = 0;
controls.step = 0.1;

var savedVolume = null;

chrome.storage.sync.get('nprVolume', function(val) {
    savedVolume = val;
});

var checkForIsPlaying = setInterval(function() {
    var player = document.querySelector('.player-basic.is-playing');
    if (player) {
        clearInterval(checkForIsPlaying);

        player.appendChild(controls);

        if (savedVolume) {
            controls.value = savedVolume.nprVolume;
            document.querySelector('audio').volume = savedVolume.nprVolume;
        }

        controls.addEventListener('input', function(e) {
            var volume = e.target.value;
            document.querySelector('audio').volume = volume;

            chrome.storage.sync.set({'nprVolume': volume});
        });
    }
}, 200);
