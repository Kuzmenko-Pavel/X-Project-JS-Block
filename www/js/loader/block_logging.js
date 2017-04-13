/**
 * Created by kuzmenko-pavel on 07.04.17.
 */
define('block_logging', ['jquery', './settings'], function (jQuery, settings) {
    return function () {

        if (this.block_setting.logging === false) {
            this.block_setting.logging = 'initial';
        }
        var jqxhr = jQuery.get(settings.rg + 'bl.js?guid=' + this.client + '&request=' + this.block_setting.logging);
        jqxhr.done(_.bind(function (data) {
            if (this.block_setting.logging !== 'complite') {
                this.logging();
            }
        }, this));
    };
});