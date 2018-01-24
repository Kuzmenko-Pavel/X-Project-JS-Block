/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_render', ['./jquery', './ytl', './settings', './iframe_form'], function (jQuery, YottosLib, settings, Iframe_form) {
    return function ($el, block_setting, client, index) {
        var auto = false;
        var url = settings.rg + settings.rgb + '?mod=' + block_setting.m;
        if (block_setting['w'] === 'auto' || block_setting['h'] === 'auto'){
            auto = true;
        }
        if (auto){
            url = url + '&auto=true';
        }
        var dummy = new Iframe_form(url, $el, block_setting, client);
        dummy.addParameter('scr', client);
        dummy.addParameter('mod', block_setting.m);
        dummy.addParameter('index', index);
        if (auto){
            dummy.addParameter('auto', 'true');
        }
        YottosLib._.each(location.search.substr(1).split("&"), function (element) {
            var param = element.split("=");
            if (param.length === 2){
                if (param[0].indexOf('adsbyyottos_') !== -1){
                    this.dummy.addParameter(param[0].split("_")[1], param[1]);
                }
            }
        },{dummy:dummy});
        dummy.render();
        this.blocks.push(dummy);
    };
});
