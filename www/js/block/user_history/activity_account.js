/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([], function () {
    var ActivityAccount = function () {
    };
    ActivityAccount.add = function (guid, timeFirst, timeLast) {
        if (typeof this[guid] == 'undefined') {
            this[guid] = [timeFirst, timeLast];
        }
        else {
            this[guid][1] = timeLast;
        }
    };
    ActivityAccount.load = function (guid, arg1) {
        if (Object.prototype.toString.call(arg1) === '[object Array]') {
            this[guid] = [arg1[0], arg1[1]];
        }
    };
    return ActivityAccount;
});