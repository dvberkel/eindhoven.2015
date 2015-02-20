/*global document, AudioContext, XMLHttpRequest, Reveal, AudioData, Player*/
;(function(Reveal){
    'use strict';

	var powerStarData = new AudioData();
	(function loadPowerStar() {
		var context = new AudioContext();
		var request = new XMLHttpRequest();
		request.open('GET', 'audio/power_star.mp3', true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			context.decodeAudioData(request.response, function(buffer) {
				powerStarData.setBuffer(buffer);
			}, function(error){
				throw error;
			});
		};
		request.send();
	})();

	var onceOn = function(keyCode, action){
		var alreadyHandled = false;
        return function(keyEvent) {
			switch(keyEvent.keyCode) {
			case keyCode:
				if (!alreadyHandled) {
					alreadyHandled = true;
                    action();
				}
				break;
			default:
				break; /* do nothing */
			}
		};
	};


    var actions = {
        'questions': function(){
            var player = new Player(powerStarData);
            document.body.addEventListener('keydown', onceOn(65, function(){
                player.start();
            }));
        }
    };

    function registerAction(id, action) {
        Reveal.addEventListener(id, function(event){
            if (!seenEvents[event]){
                seenEvents[event] = true;
                action(event);
            }
        });
    }

    var seenEvents = { /* to keep track of triggered events */ };
    for (var id in actions) { registerAction(id, actions[id]); }
})(Reveal);
