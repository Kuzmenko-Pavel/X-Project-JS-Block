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
    var prototype = 'prototype';
    var parser = function(url, params){
        YottosLib._.each(url.search.substr(1).split("&"), function (element) {
            var param = element.split("=");
            if (param.length === 2){
                if (param[0].indexOf('adsbyyottos_') !== -1){
                    params[param[0].split("_")[1]] = param[1];
                }
            }
        }, {params:params});
    };
    var proxy_params = function (){
        var params = {};
        var url = document.createElement('a');
        url.href = document.referrer;
        parser(url, params);
        url.href = location;
        parser(url, params);
        console.log(params);
        return params;
    };
    var Loader = function () {
        this.pp = proxy_params();
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
            YottosLib._.each(this, function (element) {
                console.log(data);
                if (element.time === data){
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
            YottosLib._.on_event('message', window, this.message_handler, this);

        }
    };
    Loader[prototype].block_settings = block_settings;
    Loader[prototype].block_render = block_render;
    Loader[prototype].start = start;
    Loader[prototype].move_shake = move_shake;
    Loader[prototype].mouse_move_handler = function (e) {
        this.move_shake(e);
        this.blocks.logging();
    };
    Loader[prototype].scroll_handler = function (e) {
        this.blocks.logging();
    };
    Loader[prototype].resize_handler = function (e) {
        this.blocks.logging();
    };
    Loader[prototype].message_handler = function (e) {
        console.log(e.data);
        if (e && e.data && e.origin === 'https://rg.yottos.com'){
            this.blocks.receive(e.data);
        }
    };
    Loader[prototype].load_handler = function (e) {
        this.start();
        this.blocks.logging();
        YottosLib._.on_event('scroll', window, this.scroll_handler, this);
        YottosLib._.on_event('resize', window, this.resize_handler, this);
        YottosLib._.on_event('mousemove', window, this.mouse_move_handler, this);
    };
    Loader[prototype].ready_handler = function (e) {
        this.start();
        this.blocks.logging();

    };
    return Loader;

});