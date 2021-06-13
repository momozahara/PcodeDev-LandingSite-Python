const bgm = new Audio('/static/media/bgm/おもちゃのダンス.mp3');
    bgm.volume = 0.2;
    bgm.loop = true;

const Logo = $('#Logo');

function PlayBGM() {
    Logo.removeClass('pointer');
    Logo.unbind('click');
    Logo.tooltip('hide');
    Logo.tooltip({
        container: '#Logo',
        placement: 'right',
        title: 'Playing おもちゃのダンス',
        trigger: 'manual'
    });
    setTimeout(function() {
        Logo.tooltip('show');
        bgm.play();
    }, 1000);
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
