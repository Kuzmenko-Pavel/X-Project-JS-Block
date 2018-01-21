/**
 * Created by kuzmenko-pavel on 11.04.17.
 */
define('block_size_calculator', ['jquery', './underscore', './block_template'], function (jQuery, _, block_template) {
    return function ($el, block_setting) {
        var size = {w: null, h: null, p_w_h: null, p_w_w: null,
            w_h: null, w_w: null, s_h: null, s_w: null, w_p_t: null, w_p_l: null, w_p_t_c: null, w_p_l_c: null,
            p_l: null, p_t: null};
        var w_position = $el.offset();
        var $document = jQuery(document);
        var $parent = $el.parent();
        size.s_h = $document.height();
        size.s_w = $document.width();
        size.w_h = $el.height();
        size.w_w = $el.width();
        size.w_p_t = w_position.top;
        size.w_p_l = w_position.left;
        size.w_p_t_c = w_position.top + (size.w_h / 2);
        size.w_p_l_c = w_position.left + (size.w_w / 2);
        size.p_w_h = $parent.height();
        size.p_w_w = $parent.width();
        if (_.isNumber(block_setting.h)) {
            size.h = block_setting.h;
        }
        if (_.isNumber(block_setting.w)) {
            size.w = block_setting.w;
        }
        if (!_.isNull(size.w) && !_.isNull(size.h)) {
            return size;
        }
        if (_.isNull(size.h)) {
            if (size.w_h !== 0) {
                size.h = size.w_h;
            }
        }
        if (_.isNull(size.w)) {
            if (size.w_w !== 0) {
                size.w = size.w_w;
            }
        }

        if (_.isNull(size.w) || _.isNull(size.h)) {
            size = block_template(size);
        }

        if (_.isNull(size.h)) {

            if (size.p_w_h !== 0) {
                size.h = size.p_w_h;
            }

        }
        if (_.isNull(size.w)) {
            if (size.p_w_w !== 0) {
                size.w = size.p_w_w;
            }
        }
        return {w: size.w, h: size.h};
    };
});
