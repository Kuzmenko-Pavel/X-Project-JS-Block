/**
 * Created by kuzmenko-pavel on 07.04.17.
 */
define('block_logging', ['jquery', './settings'], function (jQuery, settings) {
    return function () {
        this.post(this.block_setting.logging);
        var jqxhr = jQuery.get();
        jqxhr.done(_.bind(function (data) {
            if (this.block_setting.logging === false)
            {
                this.block_setting.logging='initial';
                this.logging();
            }
        }, this));
    };
});