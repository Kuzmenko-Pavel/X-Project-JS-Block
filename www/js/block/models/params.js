/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['json'], function (JSON) {
    var Params = function () {
    };
    Params.prototype.generateRequestData = function (req_type) {
        console.log(req_type);
        return JSON.stringify({a: 1});
    };
    return Params;
});