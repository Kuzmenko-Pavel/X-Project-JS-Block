/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('iframe_form',
    ['./jquery', './ytl', './block_active_view', './block_size_calculator', './post_array'],
    function (jQuery, YottosLib, block_active_view, block_size_calculator, PostArray) {
        return function (url, $el, block_setting, index, client, pp) {
            var sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation';
            var object = this;
            var iframe = 'iframe';
            var attr = 'attr';
            var form = 'form';
            var addParameter = 'addParameter';
            var root = 'root';
            var block_settin = 'block_setting';
            var ind = 'index';
            var logging = 'logging';
            var complite = 'complite';
            var initial = 'initial';
            var canAccessIFrame = 'canAccessIFrame';
            var mediaQ = YottosLib._.mediaSize();
            var lc = YottosLib._.getLotsCount(block_setting[mediaQ+'l']);
            var vw = YottosLib._.viewPort()[0];
            var vh = YottosLib._.viewPort()[1];
            object.loaded = false;
            object.client = client;
            object[ind] = index;
            object.loading_count = 0;
            object.size = block_size_calculator($el, block_setting);
            object[block_settin] = block_setting;
            object.pp = pp;
            YottosLib._.extend(object[block_settin],
                {
                    visible: false,
                    logging: false,
                    scrollCounter: 0
                }
            );
            object.block_active_view = block_active_view;
            object.parent_el = $el;
            object[root] = jQuery("<div/>");
            object[root].css({border: 0, margin:0, padding:0, display:"block"});
            if (object[root][0].attachShadow){
                try {
                    object.parent_el.append(object[root]);
                    object[root] = jQuery(object[root][0].attachShadow({mode: "closed"}));
                }
                catch (err) {
                    object[root] = object.parent_el;
                }
            }
            else if (object[root][0].createShadowRoot){
                object.parent_el.append(object[root]);
                try {
                    object[root] = jQuery(object[root][0].createShadowRoot());
                }
                catch (err){
                    object[root] = object.parent_el;
                }
            }
            else {
                object[root] = object.parent_el;
            }
            // object[root] =  object.parent_el;
            object.time = new Date().getTime();
            object.name = 'y_iframe_'+object.time+'_' + object[ind];
            object.post_exists = YottosLib.post_exists();
            object.form = jQuery("<form/>", {
                action: url,
                method: 'post',
                name: 'y_' + form + object.time,
                id: 'y_' + form + object.time,
                target: 'y_'+ iframe + object.time,
                style: 'display:none; width:0px; height:0px; border:0px; margin:0 0 0 0;'
            });
            object[iframe] = jQuery('<iframe name="y_'+ iframe + object.time +'">');
            object[iframe][attr]("id", 'y_' + iframe + object.time);
            object[iframe][attr]("name", 'y_' + iframe + object.time);
            object[iframe][attr]("frameborder", 0);
            object[iframe][attr]("marginHeight", '0px');
            object[iframe][attr]("marginWidth", '0px');
            object[iframe].css({border: 0, width: object.size.w, height:object.size.h, margin:"0 auto", display:"block"});
            object[iframe][attr]("scrolling", 'no');
            object[iframe][attr]("allowtransparency", true);
            object[iframe][attr]("width", object.size.w);
            object[iframe][attr]("height", object.size.h);
            object[iframe].data('time', object.time);
            object[iframe].attr("sandbox", sandbox);

            object[addParameter] = function (parameter, value) {
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
                this[addParameter](ind,this[ind]);
                this[addParameter]('rand', this.time);
                this[addParameter]('post', this.post_exists);
                this[addParameter]('scr', this.client);
                this[addParameter]('mod', this[block_settin].m);
                this[addParameter]('h', this.size.h);
                this[addParameter]('w', this.size.w);
                this[addParameter]('m', mediaQ);
                this[addParameter]('vw', vw);
                this[addParameter]('vh', vh);
                if(lc){
                    this[addParameter]('lc', lc);
                }
                this[root].append(this[iframe], this[form]);
                this[iframe].load(YottosLib._.bind(function (e) {
                    if(this.loaded || this[canAccessIFrame]()){
                        this.re_render();
                    }
                    else {
                        this[form].remove();
                        this.logging();
                        this.loaded = true;
                    }
                }, this));
                this[form].submit();
                this.post.init();
            };

            object[canAccessIFrame] = function(){
                var html = null;
                try {
                    var doc = this[iframe][0].contentDocument || this[iframe][0].contentWindow.document;
                    html = doc.body.innerHTML;
                } catch(err){
                }
                return(html !== null);
            };
            object.re_render = function () {
                this.loaded = false;
                if (this.loading_count < 5){
                    this[root].append(this[form]);
                    this[form].submit();
                    this.post.init();
                }
            };
            object[logging] = function () {
                if (this[block_settin][logging] !== complite){
                    this.block_active_view();
                    if (this[block_settin][logging] === false) {
                        if (this[canAccessIFrame]() === false){
                            this[block_settin][logging] = initial;
                            this.post.push('block_initial');
                        }
                    }
                    else if (this[block_settin][logging] === initial && this[block_settin].visible === true) {
                        if (this[canAccessIFrame]() === false) {
                            this[block_settin][logging] = complite;
                            this.post.push('block_complite');
                        }
                    }
                }

            };
        };
    });