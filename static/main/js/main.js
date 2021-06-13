const bgm = new Audio('/static/media/bgm/おもちゃのダンス.mp3');
    bgm.volume = 0.2;
    bgm.loop = true;

const Logo = $('#Logo');

function PlayBGM() {
    bgm.play();
    Logo.removeClass('pointer');
    Logo.unbind('click');
    $(".tooltip-inner").text("TEXT");
    //Logo.tooltip('hide');
};

function LogoTooltip() {
    Logo.tooltip({
        container: '#Logo',
        placement: 'right',
        title: 'Run()',
        trigger: 'manual'
    });
    setTimeout(function() {
        Logo.tooltip('show');
        Logo.addClass('pointer');
        Logo.click(PlayBGM);
    }, 1000);
};

$(document).ready(function() {
    LogoTooltip();
});
