/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([], function () {
    var CostUser = function () {
    };

    CostUser.add = function (val) {
        if (typeof this['cost'] == 'undefined') {
            this['cost'] = val;
            var hit_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            hit_log[val] += 1;
            this['hit_log'] = hit_log;
        }
        else {
            if (Object.prototype.toString.call(this['hit_log']) === '[object Array]') {
                var hit_log = this['hit_log'];
                hit_log[val] += 1;
                hit_log[0] = 1;
                this['hit_log'] = hit_log;
                this['cost'] = hit_log.indexOf(Math.max.apply(Math, hit_log));
            }
        }
    };
    CostUser.get = function () {
        var res = '';
        if (typeof this['cost'] != 'undefined') {
            res = this['cost'];
        }
        return res;
    };
    CostUser.load = function (guid, arg1) {
        this[guid] = arg1;
    };
    return CostUser;
});