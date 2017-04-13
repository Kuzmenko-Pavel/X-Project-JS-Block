/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define([
    'jquery',
    'underscore'
], function (jQuery, _) {
    return function () {
        console.log(this.device, this.image_format);
        console.log(jQuery('body'));
    };
});