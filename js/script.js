/* ENTER */
const overlay = document.getElementById('enter-overlay');
const site = document.getElementById('site');
const ambientAu = document.getElementById('ambient-audio');
overlay.addEventListener('click', () => {

    overlay.classList.add('hidden');
    site.classList.add('visible');

    audio.currentTime = 0;
    audio.play().then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    }).catch(() => { });
});

/* a litol parallax */
const bg = document.getElementById('parallax-bg');
window.addEventListener('scroll', () => {
    bg.style.transform = `translateY(${window.scrollY * 0.06}px)`;
}, { passive: true });

/* mah mp3 player */
const audio = new Audio('media/piano.mp3');
const playBtn = document.getElementById('play-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.getElementById('progress-thumb');
const progressTrack = document.getElementById('progress-track');
const playerTime = document.getElementById('player-time');
const volumeSlider = document.getElementById('volume-slider');
audio.volume = 0.5;
const fmt = s => isNaN(s) ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
playBtn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); iconPlay.style.display = 'none'; iconPause.style.display = 'block'; }
    else { audio.pause(); iconPlay.style.display = 'block'; iconPause.style.display = 'none'; }
});
audio.addEventListener('timeupdate', () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressFill.style.width = progressThumb.style.left = `${pct}%`;
    playerTime.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
});
audio.addEventListener('ended', () => { iconPlay.style.display = 'block'; iconPause.style.display = 'none'; });
progressTrack.addEventListener('click', e => {
    const r = progressTrack.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
});
volumeSlider.addEventListener('input', () => { audio.volume = parseFloat(volumeSlider.value); });