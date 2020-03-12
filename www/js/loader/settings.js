/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('settings', ['./ytl'], function (YottosLib) {
    var detectIE = function () {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        return false;
    };
    var detectHeadless = function () {
        var agent = window.navigator.userAgent;
        var appVersion = window.navigator.appVersion;
        var webdriver = window.navigator.webdriver ? true : false;
        return /headless/i.test(agent) || /headless/i.test(appVersion) || webdriver;
    };
    return {
        rg: 'https://rg.yottos.com',
        // rg: 'http://0.0.0.0:8000',
        rgb: '/pub',
        cdn: 'https://cdn.yottos.com',
        // cdn: 'http://localhost:8080',
        ptbs: '/block/',
        etbs: '.json',
        IE: detectIE(),
        headless: detectHeadless(),
        move_shake_sequence: [7, 4, 6, 10, 4, 3, 2, 7, 10, 5, 3, 5, 4, 10, 3, 4, 3, 2],
        b_s: {
            //высота блока горизонтального в зависимости от его ширины (высота, ширина)
            b_h_w: [
                [600, 100],
                [700, 120],
                [400, 150],
                [150, 180],
                [600, 160],
                [60, 230],
                [120, 240],
                [100, 250],
                [150, 290],
                [250, 300],
                [250, 320], //!
                [280, 335],
                [250, 400],
                [60, 440],
                [90, 460],
                [150, 500],
                [130, 550],
                [220, 580], //!
                [200, 600],
                [200, 630], //!
                [90, 640],
                [250, 650],
                [220, 650],
                [90, 728],
                [90, 730],
                [250, 735],
                [190, 760],
                [250, 800],
                [150, 900],
                [250, 980],
                [250, 980],
                [250, 1024],
                [250, 1200],
                [250, 1400],
                [90, 1800]
            ],
            //высота блока вертикальных в зависимости от его ширины (высота, ширина)
            b_v_w: [
                [600, 120],
                [400, 150],
                [600, 160],
                [600, 200],
                [600, 240],
                [550, 280],
                [600, 300]
            ],
            b_c_w: [
                [200, 200],
                [250, 250],
                [300, 300],
                [350, 350],
                [400, 400],
                [430, 735]
            ]
        },
        //границы ширины для вертикального блока
        block_width_range: [100, 300]
    };
});