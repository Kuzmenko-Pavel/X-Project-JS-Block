/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_render', [
    './jquery',
    './ytl',
    './settings',
    './iframe_form'
], function (
    jQuery,
    YottosLib,
    settings,
    Iframe_form
) {
    return function ($el, block_setting, client, index) {
        var auto = false;
        var v = block_setting['v'] || 'v2';
        if (this.pp.v2 === 'true'){
            v = 'v2';
        }
        var url = settings.rg + '/' + v + settings.rgb + '?mod=' + block_setting.m;
        if (block_setting['w'] === 'auto' || block_setting['h'] === 'auto') {
            auto = true;
        }
        if (auto) {
            url = url + '&auto=true';
        }
        var dummy = new Iframe_form(url, $el, block_setting, index, client, this.pp);
        if (auto) {
            dummy.addParameter('auto', 'true');
        }
        YottosLib._.each(this.pp, function (element, index) {
            dummy.addParameter(index, element);
        }, {dummy: dummy});

        dummy.render();
        this.blocks.push(dummy);
    };
});
