/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('iframe_form',
    ['./jquery', './ytl', './block_logging', './block_active_view', './block_size_calculator', './post_array'],
    function (jQuery, YottosLib, block_logging, block_active_view, block_size_calculator, PostArray) {
        return function (url, $el, block_setting, client) {
            var sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox';
            var object = this;
            object.loaded = false;
            object.loading_count = 0;
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
            object.root = object.parent_el;
            if (object.root[0].attachShadow){
                try {
                    object.root = jQuery(object.root[0].attachShadow({mode: "closed"}));
                }
                catch (err) {
                    object.root = jQuery(object.root[0].createShadowRoot({mode: "closed"}));
                }
            }
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
            object.post = new PostArray(object);
            object.receive = function (data) {
                if (data.key === this.time){
                    this.post.remove(data.id);
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
                this.root.append(this.iframe, this.form);
                this.iframe.load(YottosLib._.bind(function () {
                    if(this.loaded){
                        this.loaded = false;
                        if (this.loading_count < 5){
                            this.re_render();
                        }
                    }
                    else {
                        this.form.remove();
                        this.iframe.css({visibility: 'visible'});
                        if (this.loading_count++ < 1){
                            this.logging();
                        }
                        this.loaded = true;
                    }

                }, this));
                this.form.submit();
            };

            object.re_render = function () {
                this.root.append(this.form);
                this.form.submit();
            };
            object.logging = function () {
                this.block_active_view();
                if (this.block_setting.logging === false) {
                    // this.post.push('initial ' + this.time);
                    this.block_logging();
                }
                else if (this.block_setting.logging === 'initial' && this.block_setting.visible === true) {
                    this.block_setting.logging = 'complite';
                    // this.post.push('complite ' + this.time);
                    this.block_logging();
                }

            };
        };
    });