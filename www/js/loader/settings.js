/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
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
    var settings = {
        rg: 'https://rg.yottos.com',
        //rg: 'http://10.0.0.110:8080',
        rgb: '/v1/pub',
        cdn: 'https://cdn.yottos.com',
        ptbs: '/block/',
        etbs: '.json',
        IE: detectIE(),
        move_shake_sequence: [7, 4, 6, 10, 4, 3, 2, 7, 10, 5, 3, 5, 4, 10, 3, 4, 3, 2],
        b_s: {
            b_h_w: [
                [600, 100],
                [700, 120],
                [400, 150],
                [600, 160],
                [120, 240],
                [100, 250],
                [150, 290],
                [250, 300],
                [100, 320],
                [280, 335],
                [250, 400],
                [55, 440],
                [90, 460],
                [60, 470],
                [90, 500],
                [130, 550],
                [200, 600],
                [170, 630],
                [90, 640],
                [250, 650],
                [220, 650],
                [250, 700],
                [90, 730],
                [250, 735],
                [190, 760],
                [250, 800],
                [150, 900],
                [200, 980],
                [200, 980],
                [230, 1024],
                [90, 1800]
            ],
            b_v_w: [
                [600, 100],
                [700, 120],
                [400, 150],
                [600, 160],
                [600, 200],
                [600, 240],
                [550, 280],
                [600, 300],
                [500, 350]
            ],
            b_c_w: [
                [200, 200],
                [250, 250],
                [300, 300],
                [350, 350],
                [400, 400]
            ],
            b_h_h: [
                [120, 240],
                [100, 250],
                [150, 290],
                [250, 300],
                [100, 320],
                [280, 335],
                [250, 400],
                [55, 440],
                [90, 460],
                [60, 470],
                [90, 500],
                [130, 550],
                [200, 600],
                [170, 630],
                [300, 600],
                [90, 640],
                [250, 650],
                [220, 650],
                [250, 700],
                [90, 730],
                [250, 735],
                [190, 760],
                [250, 800],
                [150, 900],
                [200, 980],
                [200, 980],
                [230, 1024],
                [90, 1800]
            ],
            b_v_h: [
                [600, 100],
                [700, 120],
                [400, 150],
                [600, 160],
                [600, 200],
                [600, 240],
                [550, 280],
                [600, 300],
                [500, 350]
            ]
        },
        block_width_range: [100, 350],
        block_width_height: [0, 0]
    };
    return settings;
});