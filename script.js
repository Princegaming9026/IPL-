document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("videoContainer").style.display = "block";
        playMedia();
    }, 3000);
});

async function playMedia() {
    try {
        // Fetch M3U8 link from config.json
        const response = await fetch("config.json");
        const config = await response.json();
        const m3u8Link = config.m3u8;

        if (!m3u8Link) {
            console.error("M3U8 link is missing in config.json");
            return;
        }

        const video = document.getElementById("videoPlayer");

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(m3u8Link);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = m3u8Link;
            video.play();
        }
    } catch (error) {
        console.error("Error loading M3U8:", error);
    }
}
