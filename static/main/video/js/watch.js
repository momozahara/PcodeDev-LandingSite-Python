$(document).ready(function () {
    $('<iframe />', {
        id: "PP",
        src: "https://www.youtube.com/embed/" + vid,
        title: "YouTube video player",
        frameborder: 0,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: true
    }).appendTo('#embed');
    $.getJSON("https://api.pcode.dev/get/ytb/v/data/" + vid, function (data) {
        desc_uploader.attr("href", "https://www.youtube.com/channel/" + data.items.channelId);
        desc_uploader.text(data.items.channelTitle);
        $(document).prop("title", document.title.replace(vid, data.items.title));
    });
});