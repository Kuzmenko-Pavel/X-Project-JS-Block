/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('iframe_form',
    ['./jquery', './ytl', './block_logging', './block_active_view', './block_size_calculator'],
    function (jQuery, YottosLib, block_logging, block_active_view, block_size_calculator) {
        return function (url, $el, block_setting, client) {
            var sandbox = 'allow-scripts allow-same-origin allow-popups';
            var object = this;
            object.client = client;
            object.size = block_size_calculator($el, block_setting);
            object.block_setting = block_setting;
            YottosLib._.extend(object.block_setting,
                {
                    visible: false,
                    logging: false,
                    scrollCounter: 0
                }
            );
            object.block_logging = block_logging;
            object.block_active_view = block_active_view;
            object.parent_el = $el;
            object.time = new Date().getTime();

            object.form = jQuery("<form/>", {
                action: url,
                method: 'post',
                name: 'y_form' + object.time,
                id: 'y_form' + object.time,
                target: 'y_iframe' + object.time,
                style: 'display:none; width:0px; height:0px; border:0px; margin:0 0 0 0;'
            });

            object.iframe = jQuery('<iframe name="y_iframe'+ object.time +'">');
            object.iframe.attr("id", 'y_iframe' + object.time);
            object.iframe.attr("name", 'y_iframe' + object.time);
            object.iframe.attr("frameborder", 0);
            object.iframe.attr("marginHeight", '0px');
            object.iframe.attr("marginWidth", '0px');
            object.iframe.css({border: 0, width: object.size.w, height:object.size.h, visibility: 'hidden'});
            object.iframe.attr("scrolling", 'no');
            object.iframe.attr("allowtransparency", true);
            object.iframe.attr("width", object.size.w);
            object.iframe.attr("height", object.size.h);
            object.iframe.data('time', object.time);
            object.iframe.attr("sandbox", sandbox);

            object.addParameter = function (parameter, value) {
                jQuery("<input type='hidden' />")
                    .attr("name", parameter)
                    .attr("value", value)
                    .appendTo(object.form);
            };
            object.post = function (msg) {
                var target = jQuery(this.iframe);
                if (typeof jQuery === "function" && target instanceof jQuery) {
                    target = target[0];
                }
                if (target.contentWindow.postMessage) {
                    target.contentWindow.postMessage(msg, '*');
                }

            };
            object.render = function () {
                this.parent_el.css({
                        "overflow": "hidden",
                        "text-align": "center",
                        "visibility": "visible",
                        "background-color": "transparent"
                    });
                this.iframe.css({
                        "margin":"0 auto",
                        "display":"block"
                    });
                this.parent_el.append(this.iframe);
                this.parent_el.append(this.form);
                this.form.submit();
                this.iframe.load(YottosLib._.bind(function () {
                    jQuery(this.form).remove();
                    this.iframe.css({visibility: 'visible'});
                    this.logging();
                }, this));
            };
            object.logging = function () {
                this.block_active_view();
                if (this.block_setting.logging === false) {
                    this.block_logging();
                }
                else if (this.block_setting.logging === 'initial' && this.block_setting.visible === true) {
                    this.block_setting.logging = 'complite';
                    this.block_logging();
                }

            };
        };
    });