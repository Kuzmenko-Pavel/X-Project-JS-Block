/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    './jquery',
    './ytl'
], function (jQuery,YottosLib) {
    return function () {
        jQuery('ins.adsbyyottos:not([data-ad-status])').each(YottosLib._.bind(function (index, value) {
                var $el = jQuery(value);
                $el.attr('data-ad-index', index);
                this.block_settings.get($el, YottosLib._.bind(this.block_render, this));
            },this));
        if (!this.page_load){
            this.page_load = true;
            var $window = jQuery(window);
            var $document = jQuery(document);
            $document.ready(YottosLib._.bind(this.ready_handler,this));
            $window.one('load', YottosLib._.bind(this.load_handler, this));
        }
    };
});