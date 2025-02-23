// Hide loading screen after 3 seconds and show Join Channel Button
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('joinChannel').style.display = 'block';
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("player");
    const source = video.getElementsByTagName("source")[0].src;
    const options = {};

    if (Hls.isSupported()) {
        const hls = new Hls({ maxMaxBufferLength: 100 });
        hls.loadSource(source);
        hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
            const qualities = hls.levels.map(level => level.height);
            options.quality = {
                default: qualities[0],
                options: qualities,
                forced: true,
                onChange: quality => {
                    hls.levels.forEach((level, index) => {
                        if (level.height === quality) {
                            hls.currentLevel = index;
                        }
                    });
                }
            };
            new Plyr(video, options);
        });
        hls.attachMedia(video);
        window.hls = hls;
    } else {
        new Plyr(video, options);
    }
});
