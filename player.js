function getM3U8Link() {
    return "https://jcevents.jiocinema.com/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1740378932~acl=%2F*~id=aaf549ec51984c86b32dd7de3e1334c7~data=hdntl~hmac=6029ae6ff841ccbb41d820a46f0a255ad02a678707e7c6ad9a63bd546d3ee24d/JC_Sports18_1HD-audio_108038_eng=108000-video=2297600.m3u8";
}

function playMedia() {
    const m3u8Link = getM3U8Link();
    const video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8Link);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Link;
        video.play();
    }
}

// Hide loading and show video after 3 sec
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'block';
    playMedia();
}, 3000);
