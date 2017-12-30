
if (document.getElementsByName('mpal')[0].attributes.action.value == 'allow') {
	var MPAL = {
		targetSetup: '',
		setExeArea: function(target) {
			this.targetSetup = target;
		},
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
						JSP('#audioPort1').src = this.attributes.src;
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
			} else {
				this.playing = true;
				JSP('#audioPort1').play();
			}
		},
	}
} else {
	console.error('Music Player AniLive IS NOT FOR USE, please DELETE THIS SCRIPT IMMEDIATLY! \nMPAL.js');
}