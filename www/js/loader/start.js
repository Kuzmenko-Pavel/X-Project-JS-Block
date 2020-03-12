/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    './jquery',
    './ytl'
], function (jQuery, YottosLib) {
    return function () {
        jQuery('ins.adsbyyottos').each(YottosLib._.bind(function (index, el) {
                var $el = jQuery(el);
                if ($el.data('adStatus') === undefined){
                    this.block_settings.get($el, YottosLib._.bind(this.block_render, this), index);
                }
            },this));
    };
});