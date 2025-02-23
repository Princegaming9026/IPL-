document.addEventListener("DOMContentLoaded", function () {
    // Loading Animation Hide After 3 Sec
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        playMedia();
    }, 3000);
});

async function playMedia() {
    try {
        // Fetching M3U8 Link from config.json
        const response = await fetch("config.json");
        const config = await response.json();
        const m3u8Link = config.m3u8;

        if (!m3u8Link) {
            console.error("M3U8 link is missing in config.json");
            return;
        }

        // JWPlayer Setup
        const playerInstance = jwplayer("jwplayerDiv").setup({
            file: m3u8Link,
            type: "hls",
            autostart: true,
            preload: "auto",
            repeat: true,
            mute: false,
            stretching: "exactfit",
            width: "100%",
            height: "100vh",
            cast: {},
            setPip: true,
            skin: {
                name: "Denver",
