/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./ytl'], function (YottosLib) {
    return function () {
        var storageTest = function (test) {
            YottosLib.JSON.parse("{}");
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
        var result = test();
        return result;
    };
});