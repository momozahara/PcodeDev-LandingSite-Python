var img = $("img.sh");
var popimg = $("img.pop")[0];
var pop = $("pop")[0];
var popbg = $(".popbg")[0];

popbg.addEventListener("click", function() {
    $("pop").css({
        display: "none"
    });
});

img.each(function() {
    this.addEventListener("click", function(e) {
        popimg.src = e.currentTarget.src;
        $("pop").css({
            display: "block"
        });
    });
});
