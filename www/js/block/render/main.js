/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', 'underscore', './link'],
    function (jQuery, _, link) {
    return function (app) {
        var render_obj = new Object({app:app});
        render_obj.render = function (a) {
            console.log('ca r', a, this);
        };
        render_obj.link = link;
        return render_obj;
    };
    });