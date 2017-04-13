/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('iframe_form',
    ['jquery', 'underscore', './block_logging', './block_active_view', './block_size_calculator'],
    function (jQuery, _, block_logging, block_active_view, block_size_calculator) {
        return function (url, $el, block_setting, client) {
            var object = this;
            object.client = client;
            object.size = block_size_calculator($el, block_setting);
            object.block_setting = block_setting;
            _.extend(object.block_setting,
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
                name: 'form' + object.time,
                id: 'form' + object.time,
                target: 'iframe' + object.time,
                style: 'display:none; width:0px; height:0px; border:0px'
            });

            object.iframe = jQuery('<iframe>', {
                id: 'iframe' + object.time,
                name: 'iframe' + object.time,
                frameborder: 0,
                marginHeight: '0px',
                marginWidth: '0px',
                style: 'border:0px; width:'+ object.size.w +'; height:'+ object.size.h +';',
                scrolling: 'no',
                allowtransparency: true
            });
            object.iframe.attr("width", object.size.w);
            object.iframe.attr("height", object.size.h);
            object.iframe.data('time', object.time);

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
                this.iframe.load(_.bind(function () {
                    jQuery(this.form).remove();
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
                    this.post("position " + this.size.p_l + " " + this.size.p_t);
                }

            };
        };
    });