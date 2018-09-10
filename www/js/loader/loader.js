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
        params['origin'] = url.protocol.concat("//").concat(url.hostname);
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
        this.blocks.receive = function (data, origin) {
            var name = data.split(":")[0];
            var action = data.split(":")[1];
            YottosLib._.each(this, function (element) {
                if (element.name === name){
                    if (element.post[action]){
                        element.post[action](origin);
                    }
                }
            }, {name: name, action:action, origin:origin});
        };
        this.blocks.logging = function () {
            YottosLib._.each(this, function (element) {
                element.logging();
            });
        };
        if (!this.page_load){
            this.page_load = true;
            YottosLib._.on_load(window, this.ready_handler, this);
            YottosLib._.on_event('load', window, this.load_handler, this, true);
            YottosLib._.on_event('message', window, this.message_handler, this);
            YottosLib._.on_event('scroll', window, this.scroll_handler, this);
            YottosLib._.on_event('resize', window, this.resize_handler, this);

        }
        var preconnect = "preconnect", anonymous = 'anonymous', head = document.head, prefetch = "dns-prefetch", d = document, rg_pre = d.createElement("link"), rel='rel', crossorigin='crossorigin', href='href';
        rg_pre[rel] = preconnect;
        rg_pre[crossorigin] = anonymous;
        rg_pre[href] = "https://rg.yottos.com/";
        head.appendChild(rg_pre);
        var rg_dns = d.createElement("link");
        rg_dns[rel] = prefetch;
        rg_dns[crossorigin] = anonymous;
        rg_dns[href] = "https://rg.yottos.com/";
        head.appendChild(rg_dns);
        var cdn_pre = d.createElement("link");
        cdn_pre[rel] =  preconnect;
        cdn_pre[crossorigin] = anonymous;
        cdn_pre[href] = "https://cdn.yottos.com/";
        head.appendChild(cdn_pre);
        var cdn_dns = d.createElement("link");
        cdn_dns[rel] = prefetch;
        cdn_dns[crossorigin] = anonymous;
        cdn_dns[href] = "https://cdn.yottos.com/";
        head.appendChild(cdn_dns);
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
        if (e && e.data && e.origin === 'https://rg.yottos.com'){
            if (typeof e.data === 'string'){
                this.blocks.receive(e.data, e.origin);
            }
        }
    };
    Loader[prototype].load_handler = function (e) {
        this.start();
        this.blocks.logging();
        YottosLib._.on_event('mousemove', window, this.mouse_move_handler, this);
    };
    Loader[prototype].ready_handler = function (e) {
        this.start();
        this.blocks.logging();

    };
    return Loader;

});