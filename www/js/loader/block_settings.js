/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_settings', ['jquery', 'underscore', './settings'], function (jQuery, _, settings) {
    var BlockSettings = function() {
        this.cache = {};
        this.get = function (key, callback) {
            if(this.cache[key] === undefined)
            {
                var src = settings.cdn + settings.ptbs + key + settings.etbs;
                var jqxhr = jQuery.getJSON(src);
                jqxhr.done(_.bind(function (data) {
                    this.cache[key] = data;
                    callback(this.cache[key])
                } ,this));
                jqxhr.fail(_.bind(function () {
                    this.cache[key] = {};
                    callback(this.cache[key])
                } ,this));
            }
            else {
                callback(this.cache[key])
            }
        };
    };
    return new BlockSettings();
});