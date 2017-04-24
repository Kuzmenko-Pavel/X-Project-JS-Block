/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', 'underscore'], function (jQuery, _) {
    return function () {
        var deferred = jQuery.Deferred();
        deferred.resolve({"sd": 1});
        return deferred.promise();
    };
});