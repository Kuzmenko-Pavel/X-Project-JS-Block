/**
 * Created by user on 13.07.16.
 */
require(['./jquery', './loader'], function (jQuery, Loader) {
    console.log('Loader()).start()', performance.now());
    (window.adsbyyottos = window.adsbyyottos || new Loader()).start();
    if (!window.adsbyyottos.page_load){
        window.adsbyyottos.page_load = true;
        jQuery(document).one('ready', jQuery.proxy(window.adsbyyottos.ready_handler, window.adsbyyottos));
        jQuery(window).one('load', jQuery.proxy(window.adsbyyottos.load_handler, window.adsbyyottos));
    }
});