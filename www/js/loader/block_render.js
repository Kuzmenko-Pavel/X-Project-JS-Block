/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_render', ['jquery', 'underscore', './settings', './iframe_form'], function (jQuery, _, settings, Iframe_form) {
    return function ($el, block_setting) {
        var client = $el.attr('data-ad-client');
        var auto = false;
        var url = settings.rg + settings.rgb + '?scr=' + client + '&mod=' + block_setting.m;
        if (block_setting['w'] === 'auto' || block_setting['h'] === 'auto'){
            auto = true;
        }
        if (auto){
            url = url + '&auto=true';
        }
        var dummy = new Iframe_form(url, $el, block_setting, client);
        dummy.addParameter('scr', client);
        dummy.addParameter('mod', block_setting.m);
        if (auto){
            dummy.addParameter('auto', 'true');
        }
        dummy.render();
        this.blocks.push(dummy);
    };
});
