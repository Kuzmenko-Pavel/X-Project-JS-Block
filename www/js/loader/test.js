/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./json3'], function (JSON) {
    return function () {
        var result = false;
        var storageTest = function (test) {
            JSON.parse("{}");
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
        };
        var test = function () {
            try {
                storageTest('test');
                return true;
            } catch (e) {
                return false;
            }
        };
        result = test();
        return result;
    };
});