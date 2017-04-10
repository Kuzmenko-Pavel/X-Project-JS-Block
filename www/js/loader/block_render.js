/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('block_render', ['jquery', 'underscore', './settings', './iframe_form'], function (jQuery, _, settings, Iframe_form) {
    return function ($el, block_setting) {
        var dummy = new Iframe_form(settings.rg + '/block/', $el, block_setting);
        dummy.addParameter('type','test');
        dummy.addParameter('message','Works...');
        dummy.render();
        this.blocks.push(dummy);
    }
});
