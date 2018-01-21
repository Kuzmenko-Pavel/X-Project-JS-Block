define(['./underscore', './test', './Base64'], function (_, test, b) {
    var UserHistory = function () {
        this.uh_name = 'adsbyyottos';
        this.uh = {};
        this.load();
    };
    UserHistory.prototype.add = function (key, value) {
        this.load();
        var h = value['h'];
        var w =  value['w'];
        var m =  value['m'];
        if (h && w && m){
            this.uh[key] = {h: h, w: w, m: m};
            this.save();
        }
    };
    UserHistory.prototype.get = function (key) {
        this.load();
        return this.uh[key];
    };
    UserHistory.prototype.clear = function () {
        if (test()) {
            localStorage.clear();
            this.load();
            this.save();
            return true;
        }
        return false;
    };
    UserHistory.prototype.load = function () {
        if (test()) {
            try {
                this.uh = JSON.parse(b.decode(localStorage.getItem(this.uh_name)));
            } catch (e) {
                this.uh = {};
            }
            if (_.isNull(this.uh)){
                this.uh = {};
            }
            return true;
        }
        return false;
    };
    UserHistory.prototype.save = function () {
        if (test()) {
            localStorage.setItem(this.uh_name, b.encode(JSON.stringify(this.uh)));
            return true;
        }
        return false;
    };
    return new UserHistory();
});