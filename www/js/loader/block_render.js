/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_render', ['jquery', 'underscore', './settings', './iframe_form'], function (jQuery, _, settings, Iframe_form) {
    return function ($el, block_setting) {
        var client = $el.attr('data-ad-client');
        //var dummy = new Iframe_form(settings.rg + '/block?scr=' + client + '&mod=' + block_setting.mod, $el, block_setting);
        var dummy = new Iframe_form(settings.rg + '/block', $el, block_setting, client);
        dummy.addParameter('scr', client);
        dummy.addParameter('mod', block_setting.mod);
        dummy.render();
        this.blocks.push(dummy);
    };
});
