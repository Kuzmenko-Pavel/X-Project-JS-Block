/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_settings', ['./jquery', './ytl', './settings', './storage'], function (jQuery, YottosLib, settings, storage) {
    var BlockSettings = function () {
        this.cache = {};
        this.storage = storage;
        this.get = function ($el, callback, index) {
            var client = $el.data('adClient');
            var mw = $el.data('adMobsWidth') || null;
            var mh = $el.data('adMobsHeight') || null;
            var ml = $el.data('adMobsLots') || null;
            var tw = $el.data('adTabsWidth') || null;
            var th = $el.data('adTabsHeight') || null;
            var tl = $el.data('adTabsLots') || null;
            var dw = $el.data('adDescWidth') || null;
            var dh = $el.data('adDescHeight') || null;
            var dl = $el.data('adDescLots') || null;
            var storage_data = this.storage.get(client);
            var src = settings.cdn + settings.ptbs + client + settings.etbs;
            var Fsrc = settings.cdn + settings.ptbs + client + '.js';
            if (storage_data !== undefined){
                this.cache[client] = storage_data;
                this.cache[client].client = client;
                this.cache[client].mw = mw;
                this.cache[client].mh = mh;
                this.cache[client].ml = ml;
                this.cache[client].tw = tw;
                this.cache[client].th = th;
                this.cache[client].tl = tl;
                this.cache[client].dw = dw;
                this.cache[client].dh = dh;
                this.cache[client].dl = dl;
            }
            if (this.cache[client] === undefined) {
                this.xhr($el, client, index, src, Fsrc, callback, mw, mh, ml, tw, th, tl, dw, dh, dl);
            }
            else {
                callback($el, this.cache[client], client, index);
                this.xhr($el, client, index, src, Fsrc, function(){}, mw, mh, ml, tw, th, tl, dw, dh, dl);
            }
            $el.data('adStatus', 'init');
        };
        this.xhr = function ($el, client, index, src, Fsrc, callback_fun, mw, mh, ml, tw, th, tl, dw, dh, dl) {
            var jqxhr = jQuery.getJSON(src);
            jqxhr.done(YottosLib._.bind(function (data) {
                this.cache[client] = data;
                this.cache[client].client = client;
                this.cache[client].mw = mw;
                this.cache[client].mh = mh;
                this.cache[client].ml = ml;
                this.cache[client].tw = tw;
                this.cache[client].th = th;
                this.cache[client].tl = tl;
                this.cache[client].dw = dw;
                this.cache[client].dh = dh;
                this.cache[client].dl = dl;
                callback_fun($el, this.cache[client], client, index);
                this.storage.add(client, this.cache[client]);
            }, this));
            jqxhr.fail(YottosLib._.bind(function () {
                this.cache[client] = {
                    h: 'auto',
                    w: 'auto',
                    m: '1',
                    v:'v2',
                    client: client,
                    mw: mw,
                    mh: mh,
                    ml: ml,
                    tw: tw,
                    th: th,
                    tl: tl,
                    dw: dw,
                    dh: dh,
                    dl: dl
                };
                if (settings.IE) {
                    var Fjqxhr = jQuery.getScript(Fsrc);
                    Fjqxhr.always(YottosLib._.bind(function () {
                        callback_fun($el, this.cache[client], client, index);
                        this.storage.add(client, this.cache[client]);
                    }, this));
                }
                else {
                    callback_fun($el, this.cache[client], client, index);
                }
            }, this));
        };
    };
    return new BlockSettings();
});