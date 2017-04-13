/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([], function () {
    var ExcludeOffers = function (invert, counter) {
        this.invert = Boolean(invert || false);
        this.counter = Boolean(counter || false);
        // var initialValues = new Object({});
        // initialValues.add = ExcludeOffers.prototype.add;
        //initialValues.load = ExcludeOffers.load;
        // initialValues.getString = ExcludeOffers.getString;
        // initialValues.get = ExcludeOffers.get;
        // initialValues.invert = function () {
        //     return invert_;
        // };
        // initialValues.counter = function () {
        //     return counter_;
        // };
        // return (initialValues);
    };
    ExcludeOffers.prototype.add = function (guid, countViews) {
        countViews = (countViews || 1);
        if (typeof(this[guid]) == 'number') {
            if (this.invert()) {
                this[guid] = ++this[guid];
            }
            else {
                if (this[guid] > 0) {
                    this[guid] = --this[guid];
                }
                else {
                    this[guid] = 0;
                }
            }
        }
        else {
            if (this.invert()) {
                this[guid] = countViews;
            }
            else {
                this[guid] = countViews - 1;
            }
        }
    };

    ExcludeOffers.prototype.load = function (guid, countViews) {
        this[guid] = countViews;
    };

    ExcludeOffers.getString = function () {
        var keys = [];
        if (this.counter()) {
            for (var key in this) {
                var value = this[key];
                if (this.invert()) {
                    if (value > 0) {
                        keys.push(key + "~" + value);
                    }
                }
                else {
                    if (value <= 0) {
                        keys.push(key + "~" + value);
                    }
                }
            }
        }
        else {
            for (var key in this) {
                var value = this[key];
                if (this.invert()) {
                    if (value > 0) {
                        keys.push(key);
                    }
                }
                else {
                    if (value <= 0) {
                        keys.push(key);
                    }
                }
            }
        }
        return keys.join(";");
    };

    ExcludeOffers.prototype.get = function () {
        var keys = [];
        if (this.counter()) {
            for (var key in this) {
                var value = this[key];
                if (this.invert()) {
                    if (value > 0) {
                        keys.push([key, value]);
                    }
                }
                else {
                    if (value <= 0) {
                        keys.push([key, value]);
                    }
                }
            }
        }
        else {
            for (var key in this) {
                var value = this[key];
                if (this.invert()) {
                    if (value > 0) {
                        keys.push(key);
                    }
                }
                else {
                    if (value <= 0) {
                        keys.push(key);
                    }
                }
            }
        }
        return keys;
    };

    return ExcludeOffers;
});