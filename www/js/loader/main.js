/**
 * Created by user on 13.07.16.
 */
require(['./jquery', './ytl', './loader'], function (jQuery, YottosLib, Loader) {
    (window.adsbyyottos = window.adsbyyottos || new Loader()).start();
    if (!window.adsbyyottos.page_load){
        window.adsbyyottos.page_load = true;
        jQuery(document).one('ready', YottosLib._.bind(window.adsbyyottos.ready_handler, window.adsbyyottos));
        jQuery(window).one('load', YottosLib._.bind(window.adsbyyottos.load_handler, window.adsbyyottos));
    }
});