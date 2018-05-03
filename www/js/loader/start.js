/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    './jquery',
    './ytl'
], function (jQuery, YottosLib) {
    return function () {
        jQuery('ins.adsbyyottos:not([data-ad-status])').each(YottosLib._.bind(function (index, el) {
                var $el = jQuery(el);
                this.block_settings.get($el, YottosLib._.bind(this.block_render, this), index);
            },this));
    };
});