/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    'jquery',
    'underscore'
], function (jQuery, _) {
    return function () {
        var self = this;
        jQuery('ins.adsbyyottos:not([data-ad-status])').each(jQuery.proxy(function () {
                var $el = jQuery(this);
                self.block_settings.get($el, _.bind(self.block_render, self));
            }
        ), this);
    };
});