/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    'jquery',
    'underscore'
], function (jQuery, _) {
    return function () {
        jQuery('ins.adsbyyottos:not([data-ad-status])').each(_.bind(function (index, value) {
                var $el = jQuery(value);
                $el.attr('data-ad-index', index);
                this.block_settings.get($el, _.bind(this.block_render, this));
            },this));
    };
});