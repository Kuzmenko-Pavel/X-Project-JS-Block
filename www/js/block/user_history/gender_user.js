/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(function () {
    var GenderUser = function () {};

    GenderUser.add = function (val) {
        if (typeof this['gender'] == 'undefined') {
            this['gender'] = val;
            var hit_log = new Array(0, 0, 0);
            hit_log[val] += 1;
            this['hit_log'] = hit_log;
        }
        else {
            if (Object.prototype.toString.call(this['hit_log']) === '[object Array]') {
                var hit_log = this['hit_log'];
                hit_log[val] += 1;
                hit_log[0] = 1;
                this['hit_log'] = hit_log;
                this['gender'] = hit_log.indexOf(Math.max.apply(Math, hit_log));
            }
        }
    };
    GenderUser.get = function () {
        var res = '';
        if (typeof this['gender'] != 'undefined') {
            res = this['gender'];
        }
        return res;
    };
    GenderUser.load = function (guid, arg1) {
        this[guid] = arg1;
    };

    return GenderUser;
});