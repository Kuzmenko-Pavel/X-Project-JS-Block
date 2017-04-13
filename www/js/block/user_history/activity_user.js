/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([], function () {
    var ActivityUser = function () {
    };

    ActivityUser.add = function (timeFirst, timeLast) {
        if (typeof this['timeFirst'] == 'undefined') {
            this['timeFirst'] = timeFirst;
        }
        this['timeLast'] = timeLast;
    };
    ActivityUser.load = function (guid, arg1) {
        this[guid] = arg1;
    };
    return ActivityUser;
});