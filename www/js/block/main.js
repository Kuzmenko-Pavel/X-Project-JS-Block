/**
 * Created by user on 13.07.16.
 */
requirejs(['./require_config'], function (config) {
    require(['jquery'], function ($) {
        console.log('block');
    });
});