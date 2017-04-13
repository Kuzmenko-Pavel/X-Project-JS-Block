/**
 * Created by kuzmenko-pavel on 11.04.17.
 */
define('block_template', ['underscore', './settings'], function (_, settings) {
    return function (size) {
        var between = function (x, min, max) {
            return x >= min && x <= max;
        };

        if (between(size.w_p_l_c, (size.s_w / 2) - 250, (size.s_w / 2) + 250)) {
            size.p_l = 'c';
        }
        else if (between(size.w_p_l_c, 0, (size.s_w / 2) - 250)) {
            size.p_l = 'l';
        }
        else if (between(size.w_p_l_c, (size.s_w / 2) + 250, size.s_w)) {
            size.p_l = 'r';

        }
        if (between(size.w_p_t_c, 350, size.s_h - 500)) {
            size.p_t = 'c';
        }
        else if (between(size.w_p_t_c, 0, 350)) {
            size.p_t = 't';
        }
        else if (between(size.w_p_t_c, size.s_h - 500, size.s_h)) {
            size.p_t = 'b';

        }

        var find_blocks_by_width = function (w) {
            var h = [];
            var steps = [1, 3, 5, 7, 10, 15, 20, 25, 30, 35, 40, 50, 75, 100, 125];
            var vertical = false;
            if (size.p_l === 'l' || size.p_l === 'r') {
                vertical = between(w, settings.block_width_range[0], settings.block_width_range[1]);
            }
            if (vertical) {
                _.some(steps, function (s) {
                    h = _.filter(settings.b_s.b_v_w, function (el) {
                        return between(el[1], w - s, w + s);
                    });
                    if (_.size(h) === 0) {
                        return false;
                    }
                    return true;
                });
                if (_.size(h) === 0) {
                    if (w <= 200) {
                        h = [settings.b_s.b_v_w[0]];
                    }
                    else {
                        h = [settings.b_s.b_v_w[settings.b_s.b_v_w.length - 1]];
                    }
                }
                console.groupEnd();

            }
            else {
                if (size.p_l === 'c' && size.p_t === 'c') {
                        h = _.filter(settings.b_s.b_c_w, function (el) {
                            return between(el[1], w - 10, w + 10);
                        });
                    if (_.size(h) === 0) {
                        _.some(steps, function (s) {
                            h = _.filter(settings.b_s.b_h_w, function (el) {
                                return between(el[1], w - s, w + s);
                            });
                            if (_.size(h) === 0) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        });
                        if (_.size(h) === 0) {
                            if (w <= 600) {
                                h = [settings.b_s.b_h_w[0]];
                            }
                            else {
                                h = [settings.b_s.b_h_w[settings.b_s.b_h_w.length - 1]];
                            }
                        }
                    }

                }
                else {
                    _.some(steps, function (s) {
                        h = _.filter(settings.b_s.b_h_w, function (el) {
                            return between(el[1], w - s, w + s);
                        });
                        if (_.size(h) === 0) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    });
                    if (_.size(h) === 0) {
                        if (w <= 600) {
                            h = [settings.b_s.b_h_w[0]];
                        }
                        else {
                            h = [settings.b_s.b_h_w[settings.b_s.b_h_w.length - 1]];
                        }
                    }
                }
            }
            return [h[0][0], w];

        };
        var find_blocks_by_height = function (h) {
            var vertical = between(h, settings.block_width_range[0], settings.block_width_range[1]);
        };
        var block;
        if (_.isNull(size.h) && !_.isNull(size.w)) {
            block = find_blocks_by_width(size.w);
        }
        else if (_.isNull(size.w) && !_.isNull(size.h)) {
            block = find_blocks_by_height(size.h);
        }
        if (_.isArray(block)) {
            size.h = block[0];
            size.w = block[1];
        }
        return size;
    };
});