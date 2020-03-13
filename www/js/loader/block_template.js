/**
 * Created by kuzmenko-pavel on 11.04.17.
 */
define('block_template', ['./ytl', './settings'], function (YottosLib, settings) {
    return function (size) {
        var botom_multiple = 1;
        size.p_l = null;
        size.p_t = null;
        if(size.d_h > 500 && size.s_h > size.d_h * 2){
            botom_multiple = size.s_h / size.d_h;
        }
        if (YottosLib._.between(size.w_p_l_c, (size.s_w / 2) - 250, (size.s_w / 2) + 250)) {
            //center
            size.p_l = 'c';
        }
        else if (YottosLib._.between(size.w_p_l_c, 0, (size.s_w / 2) - 250)) {
            //left
            size.p_l = 'l';
        }
        else if (YottosLib._.between(size.w_p_l_c, (size.s_w / 2) + 250, size.s_w)) {
            //right
            size.p_l = 'r';

        }
        if (YottosLib._.between(size.w_p_t_c, 350, size.s_h - (500 * botom_multiple))) {
            //center
            size.p_t = 'c';
        }
        else if (YottosLib._.between(size.w_p_t_c, 0, 350)) {
            //top
            size.p_t = 't';
        }
        else if (YottosLib._.between(size.w_p_t_c, size.s_h - (500 * botom_multiple), size.s_h)) {
            //bottom
            size.p_t = 'b';

        }
        var find_blocks = function (w) {
            var h = [];
            var steps = [1, 3, 5, 7, 10, 15, 20, 25, 30, 35, 40, 50, 75, 100, 125];
            var vertical = false;
            if (size.p_l === 'l' || size.p_l === 'r') {
                vertical = YottosLib._.between(w, settings.block_width_range[0], settings.block_width_range[1]);
            }
            if (vertical) {
                YottosLib._.some(steps, function (s) {
                    h = YottosLib._.filter(settings.b_s.b_v_w, function (el) {
                        return YottosLib._.between(el[1], w - s, w + s);
                    });
                    return (YottosLib._.size(h) !== 0);
                });
                console.log(h);
                if (YottosLib._.size(h) === 0) {
                    if (w <= 200) {
                        h = [settings.b_s.b_v_w[0]];
                    }
                    else {
                        h = [settings.b_s.b_v_w[settings.b_s.b_v_w.length - 1]];
                    }
                }
            }
            else {
                if (size.p_l === 'c' && size.p_t === 'c') {
                    if (size.m === 'm'){
                        if(w < 400){
                            h = [[w*3.5,w]];
                        }
                        else {
                            h = [[w,w]];
                        }
                    }
                    else if (size.m === 't'){
                        h = [[w/2.5,w]];
                    }
                    else{
                        YottosLib._.some(steps, function (s) {
                            h = YottosLib._.filter(settings.b_s.b_h_w, function (el) {
                                return YottosLib._.between(el[1], w - s, w + s);
                            });
                            return (YottosLib._.size(h) !== 0);
                        });
                        if (YottosLib._.size(h) === 0) {
                            if (w <= 600) {
                                h = [settings.b_s.b_h_w[0]];
                            }
                            else {
                                h = [settings.b_s.b_h_w[settings.b_s.b_h_w.length - 1]];
                            }
                        }
                    }
                }
                else if (size.p_l === 'c' && size.p_t === 'b'){
                    if (size.m === 'm'){
                        if(w < 450){
                            h = [[w*4.5,w]];
                        }
                        else {
                            h = [[w*2.5,w]];
                        }
                    }
                    else if (size.m === 't'){
                        h = [[w,w]];
                    }
                    else{
                        YottosLib._.some(steps, function (s) {
                            h = YottosLib._.filter(settings.b_s.b_h_w, function (el) {
                                return YottosLib._.between(el[1], w - s, w + s);
                            });
                            return (YottosLib._.size(h) !== 0);
                        });
                        if (YottosLib._.size(h) === 0) {
                            if (w <= 600) {
                                h = [settings.b_s.b_h_w[0]];
                            }
                            else {
                                h = [settings.b_s.b_h_w[settings.b_s.b_h_w.length - 1]];
                            }
                        }
                    }
                }
                else if (size.p_l === 'c' && size.p_t === 't'){
                    if (size.m === 'm'){
                        if(w < 450){
                            h = [[w*4.5,w]];
                        }
                        else {
                            h = [[w*2.5,w]];
                        }
                    }
                    else if (size.m === 't'){
                        h = [[w,w]];
                    }
                }
                if (YottosLib._.size(h) === 0) {
                    YottosLib._.some(steps, function (s) {
                        h = YottosLib._.filter(settings.b_s.b_h_w, function (el) {
                            return YottosLib._.between(el[1], w - s, w + s);
                        });
                        return (YottosLib._.size(h) !== 0);
                    });
                    if (YottosLib._.size(h) === 0) {
                        if (w <= 600) {
                            h = [settings.b_s.b_h_w[0]];
                        }
                        else {
                            h = [settings.b_s.b_h_w[settings.b_s.b_h_w.length - 1]];
                        }
                    }
                }
            }
            if (h[0]){
                return [h[0][0], w];
            }
            return [w, w];

        };
        var block = find_blocks(size.w);
        if (YottosLib._.isArray(block)) {
            size.h = block[0];
            size.w = block[1];
        }
        return size;
    };
});