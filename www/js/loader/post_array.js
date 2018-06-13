/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('post_array', ['./ytl'], function (YottosLib) {
    var post_array = function(obj) {
        this.stack = [];
        this.obj = obj;
        this.callHandler = function() {
            // if(typeof this.mutationHandler === 'function') {
            //     YottosLib._.each(this.stack, this.mutationHandler, this.context);
            // }
        };
        this.post_message = function (msg) {
            var target = this.obj.iframe[0];
            if (target.contentWindow && target.contentWindow.postMessage) {
                target.contentWindow.postMessage(msg, '*');
            }
        };
        this.push = function(obj) {
            this.stack.push(obj);
            this.callHandler();
        };
        this.pop = function() {
            this.callHandler();
            return this.stack.pop();
        };
        this.remove = function (index) {
            this.stack.splice(index, 1);
        };
    };
    return post_array;
});