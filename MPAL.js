
if (document.getElementsByName('mpal')[0].attributes.action.value == 'allow') {
	var MPAL = {
		targetSetup: '',
		setExeArea: function(target) {
			this.targetSetup = target;
		},
		artists: [],
		interval: '',
		currentArtist: 1,
		currentSong: 1,
		currentSongName: '',
		currentArtistName: '',
		setup: function() {
			var musicList = this.targetSetup;
			for (let i = 0; i < tracks.artists.length(); i++) {
				var artist = tracks.artists[Object.keys(tracks.artists)[i]];
				var artistName = Object.keys(tracks.artists)[i];
				var artistElement = JSPlugs.newElement('div');
				artistElement.attributes.artistName = artistName;
				artistElement.newClass('artist');
				musicList.appendChild(artistElement);
				for (let i2 = 0; i2 < artist.length(); i2++) {
					var track = artist[Object.keys(artist)[i2]];
					var trackName = Object.keys(artist)[i2];
					var trackElement = JSPlugs.newElement('div');
					var trackNameElement = JSPlugs.newElement('div');
					trackNameElement.onclick = function() {
						// Create a Play on click function
						//JSP('#audioPort2').volume = 0;
						JSP('#audioPort1').src = this.attributes.src;
						JSP('#audioPort2').src = this.attributes.src;
						MPAL.playing = true;
						JSP('#playpause').src = 'pause.png';
					}
					trackNameElement.innerHTML = trackName;
					trackNameElement.newClass('trackName');
					trackNameElement.attributes.src = tracks.mainSource + artistName + '/' + track.source;
					trackElement.newClass('trackElement');
					artistElement.appendChild(trackElement);
					trackElement.appendChild(trackNameElement);
				}
			}
			JSP('#artistNameDisplay').innerHTML = Object.keys(tracks.artists)[0];
			JSP('.artist')[0].style.display = 'block';
			JSP('#playpause').onclick = function() {MPAL.playPause();};
			JSP('#audioPort1').onloadedmetadata = function() {
				JSP('#progress').attributes.length = this.duration;
				MPAL.interval = setInterval( function() {
					JSP('#progress').style.width = (Number(JSP('#audioPort1').currentTime) / Number(JSP('#audioPort1').duration) * 100) + '%';
					var currentTime = Math.floor(JSP('#audioPort1').currentTime);
					var duration = Math.floor(JSP('#audioPort1').duration);
					var audio = {
						initialSeconds: currentTime,
						initialSeconds2: duration,
						minute: 0,
						second: 0,
						minute2: 0,
						second2: 0,
					}
					while (audio.initialSeconds >= 60) {
						audio.initialSeconds -= 60;
						audio.minute += 1;
					}
					if (audio.initialSeconds < 60) {
						audio.second = audio.initialSeconds;
					}
					while (audio.initialSeconds2 >= 60) {
						audio.initialSeconds2 -= 60;
						audio.minute2 += 1;
					}
					if (audio.initialSeconds2 < 60) {
						audio.second2 = audio.initialSeconds2;
					}
					if (audio.second < 10) {
						audio.second = '0' + audio.second;
					}
					if (audio.second2 < 10) {
						audio.second2 = '0' + audio.second2;
					}
					duration = audio.minute2 + ':' + audio.second2;
					currentTime = audio.minute + ':' + audio.second;
					JSP('#progressText').innerHTML = currentTime + ' / ' + duration;
				});
			}
		},
		playPause: function() {
			if (this.playing == true) {
				this.playing = false;
				JSP('#audioPort1').pause();
				JSP('#audioPort2').pause();
			} else {
				this.playing = true;
				JSP('#audioPort1').play();
				JSP('#audioPort2').play();
			}
		},
		frequencyArray: [],
		freqSave: {},
		frequencyReceiver: function() {
			if (this.startedF == false) {
				this.freqSave.audio = JSP('#audioPort2');
				this.freqSave.context = new AudioContext();
				this.freqSave.canvas = JSP('#canvasBackground');
				this.freqSave.analyser = this.freqSave.context.createAnalyser();
				this.freqSave.ctx = this.freqSave.canvas.getContext('2d');
				this.freqSave.source = this.freqSave.context.createMediaElementSource(this.freqSave.audio);
				this.freqSave.source.connect(this.freqSave.analyser);
				this.startedF = true;
			} else {
				this.freqSave.fbc_array = new Uint8Array(this.freqSave.analyser.frequencyBinCount);
				this.freqSave.analyser.getByteFrequencyData(this.freqSave.fbc_array);
				this.freqSave.ctx.clearRect(0, 0, this.freqSave.canvas.width, this.freqSave.canvas.height);
				this.freqSave.ctx.fillStyle = '#00CCFF';
				bars = 100;
				for (let i = 0; i < bars; i++) {
					bar_x = i * 3;
					bar_width = 2;
					bar_height = -(this.freqSave.fbc_array[i] / 2);
					this.freqSave.ctx.fillRect(bar_x, this.freqSave.canvas.height, bar_width, bar_height);
				}
			}
		},
		startedF: false,
		visualizer: function(mode, func) {
			if (mode == 'on') {
				JSP('#canvasBackground').style.display = 'block';
				window.requestAnimationFrame(this.frequencyReceiver);
			} else if (mode == 'off') {
				JSP('#canvasBackground').style.display = 'none';
				clearInterval(this.visualizerInterval);
			}
		},
	}
} else {
	console.error('Music Player AniLive IS NOT FOR USE, please DELETE THIS SCRIPT IMMEDIATLY! \nMPAL.js');
}

/*	Visusalizer Reference

		var audio = new Audio();
		audio.src = 'https://darkheart527.github.io/darkheartprod/beats/Flames.mp3';
		audio.autoplay = true;
		audio.controls = true;
		var context, analyser, canvas, ctx, source;
		function init() {
			document.body.appendChild(audio);
			context = new AudioContext();
			analyser = context.createAnalyser();
			canvas = document.getElementById('analyser');
			ctx = canvas.getContext('2d');
			source = context.createMediaElementSource(audio);
			source.connect(analyser);
			analyser.connect(context.destination);
			frameLooper(context);
		}
		
		function frameLooper(context) {
			window.requestAnimationFrame(frameLooper);
			fbc_array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(fbc_array);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#00CCFF';
			bars = 100;
			for (let i = 0; i < bars; i++) {
				bar_x = i * 3;
				bar_width = 2;
				bar_height = -(fbc_array[i] / 2);
				ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
			}
		}
		init();
*/
