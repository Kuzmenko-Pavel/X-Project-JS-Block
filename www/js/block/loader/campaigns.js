/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', './../settings'], function (jQuery, settings) {
    return function (obj) {
        return jQuery.ajax(settings.requiredData.campaign.url, {params:obj.params, param:settings.requiredData.campaign.param});
    };
});