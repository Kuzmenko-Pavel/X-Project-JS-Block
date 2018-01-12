/**
 * Created by kuzmenko-pavel on 07.04.17.
 */
define('block_logging', ['underscore', 'jquery', './settings'], function (_, jQuery, settings) {
    return function () {

        if (this.block_setting.logging === false) {
            this.block_setting.logging = 'initial';
        }
        var src = settings.rg + '/bl.js?guid=' + this.client + '&request=' + this.block_setting.logging;
        var jqxhr = jQuery.get(src);
        jqxhr.done(_.bind(function () {
            if (this.block_setting.logging !== 'complite') {
                this.logging();
            }
        }, this));
        jqxhr.fail(_.bind(function () {
                    var fail_jqxhr = jQuery.getScript(src);
                    fail_jqxhr.done(_.bind(function () {
                        if (this.block_setting.logging !== 'complite') {
                            this.logging();
                        }
                    }, this));
                }, this));
    };
});