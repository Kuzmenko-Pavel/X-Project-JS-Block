/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_settings', ['./jquery', './ytl', './settings', './storage'], function (jQuery, YottosLib, settings, storage) {
    var BlockSettings = function () {
        this.cache = {};
        this.storage = storage;
        this.get = function ($el, callback) {
            var client = $el.attr('data-ad-client');
            var storage_data = this.storage.get(client);
            var src = settings.cdn + settings.ptbs + client + settings.etbs;
            var Fsrc = settings.cdn + settings.ptbs + client + '.js';
            $el.attr('data-ad-status', 'init');
            if (storage_data !== undefined){
                this.cache[client] = storage_data;
            }
            if (this.cache[client] === undefined) {
                this.xhr($el, client, src, Fsrc, callback);
            }
            else {
                callback($el, this.cache[client]);
                this.xhr($el, client, src, Fsrc, function(){});
            }
        };
        this.xhr = function ($el, client, src, Fsrc, callback_fun) {
            var jqxhr = jQuery.getJSON(src);
            jqxhr.done(YottosLib._.bind(function (data) {
                callback_fun($el, data);
                this.storage.add(client, data);
                this.cache[client] = data;
            }, this));
            jqxhr.fail(YottosLib._.bind(function () {
                this.cache[client] = {h: 'auto', w: 'auto', m: '1'};
                if (settings.IE) {
                    var Fjqxhr = jQuery.getScript(Fsrc);
                    Fjqxhr.always(YottosLib._.bind(function () {
                        callback_fun($el, this.cache[client]);
                        this.storage.add(client, this.cache[client]);
                    }, this));
                }
                else {
                    callback_fun($el, this.cache[client]);
                }
            }, this));
        };
    };
    return new BlockSettings();
});