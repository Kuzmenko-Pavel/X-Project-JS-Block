/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    './jquery'
], function (jQuery) {
    return function () {
        jQuery('ins.adsbyyottos:not([data-ad-status])').each(jQuery.proxy(function (index, value) {
                var $el = jQuery(value);
                $el.attr('data-ad-index', index);
                console.log('this.block_settings.get', performance.now());
                this.block_settings.get($el, jQuery.proxy(this.block_render, this));
            },this));
    };
});