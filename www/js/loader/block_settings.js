/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_settings', ['jquery', 'underscore', './settings'], function (jQuery, _, settings) {
    var BlockSettings = function () {
        this.cache = {};
        this.get = function ($el, callback) {
            var client = $el.attr('data-ad-client');
            $el.attr('data-ad-status', 'init');
            if (this.cache[client] === undefined) {
                var src = settings.cdn + settings.ptbs + client + settings.etbs;
                var jqxhr = jQuery.getJSON(src);
                jqxhr.done(_.bind(function (data) {
                    this.cache[client] = data;
                    callback($el, this.cache[client]);
                }, this));
                jqxhr.fail(_.bind(function (jqXHR, textStatus, errorThrown) {
                    this.cache[client] = {h: 'auto', w: 'auto', m: '1'};
                    if (settings.IE) {
                        var Fsrc = settings.cdn + settings.ptbs + client + '.js';
                        var Fjqxhr = jQuery.getScript(Fsrc);
                        Fjqxhr.always(_.bind(function () {
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