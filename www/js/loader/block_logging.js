/**
 * Created by kuzmenko-pavel on 07.04.17.
 */
define('block_logging', ['./jquery', './ytl', './settings'], function (jQuery, YottosLib, settings) {
    var block_setting = 'block_setting';
    var logging = 'logging';
    return function () {

        if (this[block_setting][logging] === false) {
            this[block_setting][logging] = 'initial';
        }
        var v = block_setting['v'] || 'v1';
        if (this.pp.v2 === 'true'){
            v = 'v2';
        }

        // // TODO: Check and update
        // var i = new Image();
        // i.onload = YottosLib._.bind(function () {
        //     if (this.block_setting.logging !== 'complite') {
        //         this.logging();
        //     }
        // }, this);
        // i.src = settings.rg + '/bl.png?guid=' + this.client + '&request=' + this.block_setting.logging;

        var src = settings.rg + '/' + v + '/bl.js?guid=' + this.client + '&request=' + this[block_setting][logging];
        var jqxhr = jQuery.get(src);
        jqxhr.done(YottosLib._.bind(function () {
            if (this[block_setting][logging] !== 'complite') {
                this[logging]();
            }
        }, this));
        jqxhr.fail(YottosLib._.bind(function () {
                    var fail_jqxhr = jQuery.getScript(src);
                    fail_jqxhr.done(YottosLib._.bind(function () {
                        if (this[block_setting][logging] !== 'complite') {
                            this[logging]();
                        }
                    }, this));
                }, this));
    };
});