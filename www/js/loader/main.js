/**
 * Created by user on 13.07.16.
 */
//requirejs(['./require_config'], function (config) {
    require(['./loader'], function (Loader) {
        (adsbyyottos = window.adsbyyottos || new Loader()).start();
    });
//});