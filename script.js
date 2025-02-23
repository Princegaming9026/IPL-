function playMedia() {
    const video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(STREAM_URL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = STREAM_URL;
        video.play();
    }
}

// Hide loading and show video after 3 sec
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'block';
    playMedia();
}, 3000);
