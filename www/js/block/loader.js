/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    'jquery',
    'underscore',
    './start',
    './detect_device',
    './check_image_format',
    './user_history/main',
    './settings'
], function (jQuery,
             _,
             start,
             detect_device,
             check_image_format,
             user_history,
             settings) {
    var Loader = function () {
        this.uh = user_history;
        this.image_format = 'png';
        this.image_cheker = check_image_format();
        this.device = detect_device();
        this.page_load = false;
        this.image_cheker.then(
            _.bind(function () {
                this.image_format = 'webp';
            }, this),
            _.bind(function () {
                this.image_format = 'png';
            }, this)
        );
        this.uh.load();
        this.uh.save();
    };
    Loader.prototype.start = start;
    Loader.prototype.mouse_move_handler = function (e) {
    };
    Loader.prototype.scroll_handler = function (e) {
    };
    Loader.prototype.resize_handler = function (e) {
    };
    Loader.prototype.load_handler = function (e) {
    };
    Loader.prototype.ready_handler = function (e) {
        //this.start();
        var html_obj = jQuery(window);
        html_obj.scroll(_.bind(this.scroll_handler, this));
        html_obj.resize(_.bind(this.resize_handler, this));
        html_obj.mousemove(_.bind(this.mouse_move_handler, this));
    };
    return Loader;

});