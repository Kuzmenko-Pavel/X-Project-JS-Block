/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('post_array', ['./ytl'], function (YottosLib) {
    var post_array = function(obj) {
        this.stack = [];
        this.obj = obj;
        this.test = undefined;
        this.callHandler = function() {
            if (this.test){
                while(this.stack.length){
                    this.post_message(this.stack.shift());
                }
            }
        };
        this.post_message = function (msg, origin) {
            if (msg){
                origin = origin || '*';
                var target = this.obj.iframe[0];
                if (target.contentWindow && target.contentWindow.postMessage) {
                    window.t = target;
                    target.contentWindow.postMessage(this.obj.name + ':' + msg, origin);
                }
            }
        };
        this.push = function(obj) {
            if (this.obj.post_exists){
                this.stack.push(obj);
                this.callHandler();
            }
        };
        this.ping = function (origin) {
            if (this.test === undefined){
                this.pong(origin);
            }
            else if (this.test === false){
                this.test = true;
                this.callHandler();
            }
        };
        this.pong = function (origin) {
            this.test = false;
            this.post_message('ping', origin);
        };
        this.init = function () {
            this.post_message('ping');
            this.test = undefined;
        };

    };
    return post_array;
});