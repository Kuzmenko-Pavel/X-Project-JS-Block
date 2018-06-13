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
        this.blocks.send = function (msg) {
            YottosLib._.each(this, function (element) {
                element.post.push(this.msg);
            }, {msg: msg});
        };
        this.blocks.receive = function (data) {
            data = JSON.parse(data);
            YottosLib._.each(this, function (element) {
                if (element.time === data.key){
                    element.receive(data);
                }
            }, {data: data});
        };
        this.blocks.logging = function (block) {
            YottosLib._.each(this, function (element) {
                element.logging();
            });
        };
        if (!this.page_load){
            this.page_load = true;
            YottosLib._.on_load(window, this.ready_handler, this);
            YottosLib._.on_event('load', window, this.load_handler, this, true);

        }
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
        this.start();
        this.blocks.logging();
        YottosLib._.on_event('scroll', window, this.scroll_handler, this);
        YottosLib._.on_event('resize', window, this.resize_handler, this);
        YottosLib._.on_event('mousemove', window, this.mouse_move_handler, this);
        YottosLib._.on_event('message', window, function(e) {
            if (e && e.data){
                this.blocks.receive(e.data);
            }
        }, this);
    };
    Loader.prototype.ready_handler = function (e) {
        this.start();
        this.blocks.logging();

    };
    return Loader;

});