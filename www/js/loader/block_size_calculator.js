/**
 * Created by kuzmenko-pavel on 11.04.17.
 */
define('block_size_calculator', ['jquery', './ytl', './block_template'], function (jQuery, YottosLib, block_template) {
    return function ($el, block_setting) {
        var isNull = YottosLib._.isNull;
        var isNumber = YottosLib._.isNumber;
        var size = {
            w: null,  //frame width
            h: null  //frame height
        };
        if (isNumber(block_setting.h)) {
            size.h = block_setting.h;
        }
        if (isNumber(block_setting.w)) {
            size.w = block_setting.w;
        }
        if (!isNull(size.w) && !isNull(size.h)) {
            return size;
        }

        size.m = YottosLib._.mediaSize();
        if(size.m){
            var mh, mw;
            if(YottosLib._.isStyleSize(block_setting[size.m+'h'])){
                mh = YottosLib._.getStyleSize(block_setting[size.m+'h']);
            }
            if(YottosLib._.isStyleSize(block_setting[size.m+'w'])){
                mw = YottosLib._.getStyleSize(block_setting[size.m+'w']);
            }
            if(mh !== undefined){
                $el.css('height', mh);
            }
            if(mw !== undefined){
                $el.css('width', mw);
            }
        }

        size.p_w_h = null; // parent ins height
        size.p_w_w = null; // parent ins width
        size.w_h = null;   // ins height
        size.w_w = null;   // ins width
        size.s_h = null;   // document height
        size.s_w = null;   // document width
        size.w_p_t = null; // ins position top
        size.w_p_l = null; // ins position left
        size.w_p_t_c = null; // ins position top center
        size.w_p_l_c = null; // ins position left  center
        size.d_h = null;   // device view port height
        size.d_w = null;   // device view port  width

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
        size.d_h = YottosLib._.viewPort()[1];
        size.d_w = YottosLib._.viewPort()[0];


        if (isNull(size.h)) {
            if (size.w_h !== 0) {
                size.h = size.w_h;
            }
        }
        if (isNull(size.w)) {
            if (size.w_w !== 0) {
                size.w = size.w_w;
            }
        }
        if (!isNull(size.w) && !isNull(size.h)) {
            return size;
        }

        if (isNull(size.w) || isNull(size.h)) {
            size = block_template(size);
        }

        if (isNull(size.h)) {

            if (size.p_w_h !== 0) {
                size.h = size.p_w_h;
            }
            else{
                size.h = '300';
            }

        }
        if (isNull(size.w)) {
            if (size.p_w_w !== 0) {
                size.w = size.p_w_w;
            }
            else{
                size.w = '100%';
            }
        }
        return {w: size.w, h: size.h};
    };
});
