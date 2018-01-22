/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    './jquery',
    './ytl',
    './start',
    './block_render',
    './block_settings',
    './move_shake',
    './settings'
], function (jQuery,
             YottosLib,
             start,
             block_render,
             block_settings,
             move_shake,
             settings) {
    var Loader = function () {
        this.timeStamp = 0;
        this.sequence = settings.move_shake_sequence.slice();
        this.page_load = false;
        this.blocks = [];
        this.blocks.send = function (msg, block) {
            YottosLib._.each(this, function (element) {
                element.post(this.msg);
            }, {msg: msg});
        };
        this.blocks.logging = function (block) {
            YottosLib._.each(this, function (element) {
                element.logging();
            });
        };
    };
    Loader.prototype.block_settings = block_settings;
    Loader.prototype.block_render = block_render;
    Loader.prototype.start = start;
    Loader.prototype.move_shake = move_shake;
    Loader.prototype.mouse_move_handler = function (e) {
        this.move_shake(e);
        this.blocks.logging();
    };
    Loader.prototype.scroll_handler = function (e) {
        this.blocks.logging();
    };
    Loader.prototype.resize_handler = function (e) {
        this.blocks.logging();
    };
    Loader.prototype.load_handler = function (e) {
        console.log('load_handler');
        this.start();
        this.blocks.logging();
    };
    Loader.prototype.ready_handler = function (e) {
        console.log('ready_handler');
        this.start();
        var $window = jQuery(window);
        $window.scroll(YottosLib._.bind(this.scroll_handler, this));
        $window.resize(YottosLib._.bind(this.resize_handler, this));
        $window.mousemove(YottosLib._.bind(this.mouse_move_handler, this));
        this.blocks.logging();
    };
    return Loader;

});