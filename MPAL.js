
if (document.getElementsByName('mpal')[0].attributes.action.value == 'allow') {
	var audioPort1 = new Audio();
	audioPort1.id = 'audioPort1';
	audioPort1.autoplay = true;
	document.body.appendChild(audioPort1);
	var MPAL = {
		targetSetup: '',
		setExeArea: function(target) {
			this.targetSetup = target;
		},
		artists: [],
		interval: '',
		starInterval: '',
		currentArtistDisplay: 0,
		currentArtist: 0,
		currentSong: 0,
		started: false,
		currentSongName: '',
		currentArtistDisplayName: '',
		updateDisplay: function(change) {
			var artist = MPAL.artists[MPAL.currentArtistDisplay];
			var artistSimplify = '';
			if (change == 'artist') {
				for (let i = 0; i < artist.length; i++) {
					if (artist[i] == ' ') {
						
					} else {
						artistSimplify += artist[i];
					}
				}
				for (let i2 = 0; i2 < JSP('.artist').length; i2++) {
					JSP('.artist')[i2].style.display = 'none';
				}
				JSP('#' + artistSimplify).style.display = 'block';
				JSP('#artistNameDisplay').innerHTML = artist;
			}
		},
		setup: function() {
			var musicList = this.targetSetup;
			for (let i = 0; i < tracks.artists.length(); i++) {
				var artist = tracks.artists[Object.keys(tracks.artists)[i]];
				var artistName = Object.keys(tracks.artists)[i];
				var artistElement = JSPlugs.newElement('div');
				artistElement.attributes.artistName = artistName;
				MPAL.artists[MPAL.artists.length] = artistName;
				artistElement.newClass('artist');
				var artistSimplify = '';
				for (let i3 = 0; i3 < artistName.length; i3++) {
					if (artistName[i3] == ' ') {
						
					} else {
						artistSimplify += artistName[i3];
					}
				}
				artistElement.id = artistSimplify;
				musicList.appendChild(artistElement);
				for (let i2 = 0; i2 < artist.length(); i2++) {
					var track = artist[Object.keys(artist)[i2]];
					var trackNumber = i2;
					var trackName = Object.keys(artist)[i2];
					var trackElement = JSPlugs.newElement('div');
					var trackNameElement = JSPlugs.newElement('div');
					trackNameElement.attributes.trackNumber = trackNumber;
					trackNameElement.onclick = function() {
						// Create a Play on click function
						MPAL.currentArtist = MPAL.currentArtistDisplay;
						JSP('#audioPort1').src = this.attributes.src;
						MPAL.playing = true;
						JSP('.playpausePicture').src = 'buttonPictures/pause.png';
						if (this.started == false) {
							this.started = true;
						}
						MPAL.currentSong = this.attributes.trackNumber;
					}
					JSP('#nextArtist').onclick = function() {
						if (MPAL.currentArtistDisplay == MPAL.artists.length) {
							MPAL.currentArtistDisplay = 0;
						} else {
							MPAL.currentArtistDisplay++;
						}
						MPAL.updateDisplay('artist');
					}
					JSP('#previousArtist').onclick = function() {
						if (MPAL.currentArtistDisplay == 0) {
							MPAL.currentArtistDisplay = MPAL.artists.length;
						} else {
							MPAL.currentArtistDisplay--;
						}
						MPAL.updateDisplay('artist');
					}
					trackNameElement.innerHTML = trackName;
					trackNameElement.newClass('trackName');
					trackNameElement.attributes.src = tracks.mainSource + artistName + '/' + track.source;
					trackElement.newClass('trackElement');
					artistElement.appendChild(trackElement);
					trackElement.appendChild(trackNameElement);
				}
			}
			if (location.protocol == 'file:') { // Check If Page Is Local File
				var disabledText = JSPlugs.newElement('p');
				disabledText.style.color = 'red';
				disabledText.innerHTML = 'Disabled - Reason: Local File Has No Permission, Must Be Online';
				JSP('#visualizerSelectionNote').appendChild(disabledText);
				//JSP('#visualizerSelection').disabled = true;
			}
			JSP('#artistNameDisplay').innerHTML = Object.keys(tracks.artists)[0];
			JSP('.artist')[0].style.display = 'block'; // Show Display Of First Artist Page
			JSP('#playpause').onclick = function() {MPAL.playPause();};
			JSP('#audioPort1').onloadedmetadata = function() { // Execute When File Is Loaded
				JSP('#progress').attributes.length = this.duration;
				
				MPAL.interval = setInterval( function() {
					JSP('#progress').style.width = (Number(JSP('#audioPort1').currentTime) / Number(JSP('#audioPort1').duration) * 100) + '%';
					var currentTime = Math.floor(JSP('#audioPort1').currentTime);
					var duration = Math.floor(JSP('#audioPort1').duration);
					/* ------------------------------------ */
					// Convert To Readable Time
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
					/* ------------------------------------ */
					duration = audio.minute2 + ':' + audio.second2;
					currentTime = audio.minute + ':' + audio.second;
					JSP('#progressText').innerHTML = currentTime + ' / ' + duration;
					if (JSP('#audioPort1').ended == true) { // Check If File Duration Is Reached
						var mainSource = tracks.mainSource; // Get The Main Source And Simplify It
						var artistName = Object.keys(tracks.artists)[MPAL.currentArtist];
						var artistLength = Object.keys(tracks.artists[artistName]).length - 1;
						if (MPAL.currentSong == artistLength) {
							MPAL.currentSong = 0;
						} else {
							MPAL.currentSong += 1;
						}
						console.log(MPAL.currentSong + ':' + artistLength);
						var newSongName = tracks.artists[artistName];
						newSongName = Object.keys(newSongName)[MPAL.currentSong];
						var newSongSource = tracks.artists[artistName];
						newSongSource = newSongSource[newSongName].source;
						newSongSource = mainSource + artistName + '/' + newSongSource;
						JSP('#audioPort1').src = newSongSource;
					}
				});
			}
		},
		playPause: function() {
			if (this.playing == true) {
				JSP('#audioPort1').pause();
				JSP('.playpausePicture').src = 'buttonPictures/play.png';
				this.playing = false;
			} else {
				this.playing = true;
				JSP('.playpausePicture').src = 'buttonPictures/pause.png';
				if (this.started == false) {
					MPAL.currentSong = 0;
					var artist = MPAL.currentArtistDisplay;
					var trackNum = 0;
					var trackArtist = Object.keys(tracks.artists)[artist];
					var trackName = Object.keys(tracks.artists[trackArtist])[trackNum];
					var track = tracks.artists[trackArtist];
					track = track[trackName].source;
					MPAL.currentArtist = MPAL.currentArtistDisplay;
					JSP('#audioPort1').src = tracks.mainSource + trackArtist + '/' + track;
					this.started = true;
				}
				JSP('#audioPort1').play();
			}
		},
		customSettings: {
			mainColor: 'orange',
		},
		frequencyArray: [],
		freqSave: {},
		frequencyReceiver: function(type) { // Receive Frequencies And Create A Visualizer
			if (this.startedF == false) {
				this.freqSave.audio = JSP('#audioPort1');
				this.freqSave.context = new AudioContext();
				this.freqSave.canvas = JSP('#canvasBackground');
				this.freqSave.analyser = this.freqSave.context.createAnalyser();
				this.freqSave.ctx = this.freqSave.canvas.getContext('2d');
				this.freqSave.source = this.freqSave.context.createMediaElementSource(this.freqSave.audio);
				this.freqSave.source.connect(this.freqSave.analyser);
				this.freqSave.fbc_array = new Uint8Array(this.freqSave.analyser.frequencyBinCount);
				this.freqSave.analyser.getByteFrequencyData(this.freqSave.fbc_array);
				this.startedF = true;
			}
			switch(type) {
				case 'frequencyBars':
					this.freqSave.ctx.clearRect(0, 0, this.freqSave.canvas.width, this.freqSave.canvas.height);
					this.freqSave.ctx.fillStyle = this.customSettings.mainColor;
					bars = 100;
					for (let i = 0; i < bars; i++) {
						bar_x = i * 3;
						bar_width = 2;
						bar_height = -(this.freqSave.fbc_array[i] / 2);
						this.freqSave.ctx.fillRect(bar_x, this.freqSave.canvas.height, bar_width, bar_height);
					}
				break;
				case 'stars': // Get 3 In Array 0
					var freq = this.freqSave.fbc_array[4];
					console.error('This is not made yet - stars\nLine 224');
				break;
			}
		},
		startedF: false,
		visualizer: function(mode, type) {
			if (type == 'noVisual') {
				mode = 'off';
			}
			if (mode == 'on') {
				clearInterval(this.visualizerInterval);
				JSP('#canvasBackground').style.display = 'block';
				this.visualizerInterval = setInterval( function() {
					MPAL.frequencyReceiver(type);
				});
				if (type == 'stars') {
					this.starInterval = setInterval( function() {
						
					}, 15);
				}
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
