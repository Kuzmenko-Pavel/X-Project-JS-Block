/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([], function () {
    var CostAccount = function () {};
    CostAccount.add = function (guid, val) {
        if (typeof this[guid] == 'undefined') {
            var hit_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            hit_log[val] += 1;
            this[guid] = [val, hit_log]
        }
        else {
            var hit_log = this[guid][1];
            hit_log[val] += 1;
            hit_log[0] = 1;
            this[guid] = [hit_log.indexOf(Math.max.apply(Math, hit_log)), hit_log];
        }
    };
    CostAccount.get = function () {
        res = [];
        for (var key in this) {
            if (typeof this[key][0] != 'undefined') {
                var value = this[key][0];
                res.push([key + "~" + value]);
            }
        }
        return res.join(";");
    };
    CostAccount.load = function (guid, arg1) {
        if (Object.prototype.toString.call(arg1) === '[object Array]') {
            this[guid] = [arg1[0], arg1[1]];
        }
    };

    return CostAccount;
});