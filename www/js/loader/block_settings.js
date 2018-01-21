/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_settings', ['./jquery', './settings'], function (jQuery, settings) {
    var BlockSettings = function () {
        this.cache = {};
        this.get = function ($el, callback) {
            var client = $el.attr('data-ad-client');
            console.log('$el.attr(data-ad-client)', performance.now());
            $el.attr('data-ad-status', 'init');
            console.log("$el.attr('data-ad-status', 'init');", performance.now());
            if (this.cache[client] === undefined) {
                console.log("this.cache[client] === undefined", performance.now());
                var src = settings.cdn + settings.ptbs + client + settings.etbs;
                var jqxhr = jQuery.getJSON(src);
                console.log("jQuery.getJSON(src);", performance.now());
                jqxhr.done(jQuery.proxy(function (data) {
                    this.cache[client] = data;
                    console.log("jqxhr.done", performance.now());
                    callback($el, this.cache[client]);
                }, this));
                jqxhr.fail(jQuery.proxy(function (jqXHR, textStatus, errorThrown) {
                    this.cache[client] = {h: 'auto', w: 'auto', m: '1'};
                    if (settings.IE) {
                        var Fsrc = settings.cdn + settings.ptbs + client + '.js';
                        var Fjqxhr = jQuery.getScript(Fsrc);
                        Fjqxhr.always(jQuery.proxy(function () {
                            callback($el, this.cache[client]);
                        }, this));
                    }
                    else {
                        callback($el, this.cache[client]);
                    }
                }, this));
            }
            else {
                callback($el, this.cache[client]);
            }
        };
    };
    return new BlockSettings();
});