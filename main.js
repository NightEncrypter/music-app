const music = document.querySelector('audio');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const img = document.querySelector('img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let current_Time = document.getElementById('current_time');
let total_duration = document.getElementById('duration');
const progress_div = document.getElementById('progress_div');

const songs = [
	{
		name: 'manas 1',
		title: 'jumpshot',
		artist: 'DAWIN JUMPSHOT',
	},
	{
		name: 'manas 2',
		title: 'HALSEY GASOLINE',
		artist: 'HALSEY',
	},
	{
		name: 'manas 3',
		title: 'MILLIONS-WAYS',
		artist: 'HRVY',
	},
];

let isPlaying = false;

// PLAY
const playMusic = () => {
	// true hai mtlb gaane chal rha hai
	// GAANA CHALTE time pause
	isPlaying = true;
	music.play();
	play.classList.replace('fa-play', 'fa-pause');
	// ADDING EFFECT OF ROTATION
	img.classList.add('anime');
};

// PAUSE
const pauseMusic = () => {
	isPlaying = false;
	music.pause();
	play.classList.replace('fa-pause', 'fa-play');
	// for removing effect
	img.classList.remove('anime');
};

// play.addEventListener('click', () => {
// 	isPlaying = true;
// 	music.play();
// 	play.classList.replace('fa-play', 'fa-pause');
// 	img.classList.add('anime');
// });

play.addEventListener('click', () => {
	// if (isPlaying) {
	//     pauseMusic();
	// } else {
	//     playMusic();
	// }
	// ABHI MEREKO PLAY KARNA HAI MTLB FALSE
	isPlaying ? pauseMusic() : playMusic();
});

// CHANGING THE MUSIC DATA
const loadSong = (songs) => {
	title.textContent = songs.title;
	artist.textContent = songs.artist;
	music.src = 'music/' + songs.name + '.mp3';
	img.src = 'images/' + songs.name + '.jpg';
};

songsIndex = 0;

const nextSong = () => {
	songsIndex = (songsIndex + 1) % songs.length;
	// songIndex = 0;
	// console.log(songsIndex);
	loadSong(songs[songsIndex]);
	playMusic();
	// pauseMusic();
};
const prevSong = () => {
	songsIndex = (songsIndex - 1 + songs.length) % songs.length;
	// songIndex =0
	// console.log(songsIndex);
	loadSong(songs[songsIndex]);
	playMusic();
	// pauseMusic();
};

// PROGRESSS JD WORK

// %=marks obtained/total marks * 100

// the timeupdated event is fired when the time indiated by the

// currentTime attribute has been updated
music.addEventListener('timeupdate', (event) => {
	// console.log(event);

	// USE OBJECT DESTRUCTURING
	const { currentTime, duration } = event.srcElement;

	// value in sec
	// console.log(currentTime);
	// console.log(duration);

	// PROGRESS LINE CONVERSION IN %
	let progress_time = (currentTime / duration) * 100;

	// width accept only  % so time is converted into % with sign %
	progress.style.width = `${progress_time}%`;

	// console.log(progress_time);

	// MUSIC DURATION UPDATE
	// sec converted into [min:sec]

	// min
	let min_duration = Math.floor(duration / 60);
	// sec
	let sec_duration = Math.floor(duration % 60);
	// console.log(min_duration);
	// console.log(sec_duration);
	let tot_duration = `${min_duration}:${sec_duration}`;
	// JAB TAK DURATION NA MILE JAB TAK CHANGE NHI HOGI
	if (duration) {
		total_duration.textContent = `${tot_duration}`;
	}

	// CURRENT DURATION UPDATE
	// sec converted into [min:sec]

	// min
	let min_currentTime = Math.floor(currentTime / 60);
	// sec
	let sec_currentTime = Math.floor(currentTime % 60);
	// console.log(min_currentTime);
	// console.log(sec_currentTime);
	// JAB TAK currentTime NA MILE JAB TAK CHANGE NHI HOGI

	// fistly check in sec then formulaized
	if (sec_currentTime < 10) {
		sec_currentTime = `0${sec_currentTime}`;
	}

	let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
	current_Time.textContent = `${tot_currentTime}`;
});

// progress onclick functionality
progress_div.addEventListener('click', (event) => {
	// USE OBJECT DESTRUCTURING and below code both are same
	// const { currentTime, duration } = music;
	const { duration } = music;

	//width in % (offset-x / client-width)*100
	// sec me chahiye hume
	let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
	// const duration = music.duration;

	console.log(duration);
	console.log(move_progress);
	music.currentTime = move_progress;
});
// IF MUSIC END CALL NEXT SON FUNCTION CALL NEXT  PLAY
music.addEventListener('ended', nextSong);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
