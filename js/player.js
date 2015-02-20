/*global window, AudioContext, ns */
;(function($, AudioContext, Observable){
    'use strict';

	var AudioData = $.AudioData = function(){
		Observable.call(this);
		this.isLoaded = false;
		this.buffer = null;
	};
	AudioData.prototype = Object.create(Observable.prototype);
	AudioData.prototype.constructor = AudioData;
	AudioData.prototype.setBuffer = function(buffer){
		this.isLoaded = true;
		this.buffer = buffer;
		this.signal('loaded');
	};


    var Player = $.Player = function(audioData){
		this.audioData = audioData;
		if (this.audioData.isLoaded) {
			this.createSource();
		} else {
			this.audioData.on('loaded', this.createSource.bind(this));
		}
	};
	Player.prototype.createSource = function(){
		var context = new AudioContext();
		this.source = context.createBufferSource();
		this.source.loop = false;
		this.source.buffer = this.audioData.buffer;
		this.source.connect(context.destination);
	};
	Player.prototype.start = function(){
		this.source.start(0);
	};
	Player.prototype.stop = function(){
		this.source.stop();
	};

})(window, AudioContext, ns.Observable);
