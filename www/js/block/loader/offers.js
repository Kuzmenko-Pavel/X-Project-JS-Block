/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', './../settings'], function (jQuery, settings) {
    return function () {
        var result = jQuery.map(settings.requiredData.offers, function(dataItem) {
            // if (!dataItem.always)
            // {
            //     if ((!params[dataItem.param] || (params[dataItem.param] || '').length === 0) || dataItem.isDisable) {
            //         return {};
            //     }
            // }

            var deferred = jQuery.Deferred();

            jQuery.ajax(dataItem.url).done(function(data) {
                deferred.resolve(data);
            }).fail(function() {
                deferred.resolve({});
            });

            return deferred.promise();
        });
        return  jQuery.when.apply(jQuery, result);
    };
});