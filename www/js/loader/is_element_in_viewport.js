/**
 * Created by kuzmenko-pavel on 10.04.17.
 */
define('is_element_in_viewport', ['jquery'], function (jQuery) {
    return function (el, scrollCounter) {
        var w = window;
        var d = w.document;
        var offset = 'offset';
        var Top = 'Top';
        var Left = 'Left';
        var documentElement = 'documentElement';
        var Width = 'Width';
        var Height = 'Height';
        var client = 'client';
        var inner = 'inner';
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var top = el[offset+Top];
        var left = el[offset+Left];
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        var pageYOffset;
        var pageXOffset;
        var YOffset = 0;
        var XOffset = 0;
        var innerWidth;
        var innerHeight;
        if (typeof w[inner+Width] !== 'undefined') {
            innerWidth = w[inner+Width];
            innerHeight = w[inner+Height];
        }
        else if (typeof d[documentElement] !== 'undefined' && typeof d[documentElement][client+Width] !== 'undefined' && d[documentElement][client+Width] !== 0) {
            innerWidth = d[documentElement][client+Width];
            innerHeight = d[documentElement][client+Height];
        }
        else {
            innerWidth = d.getElementsByTagName('body')[0][client+Width];
            innerHeight = d.getElementsByTagName('body')[0][client+Height];
        }
        if (typeof w.pageYOffset !== 'undefined') {
            pageYOffset = w.pageYOffset;
            pageXOffset = w.pageXOffset;
        }
        else {
            pageYOffset = d[documentElement]['scroll'+Top];
            pageXOffset = d[documentElement]['scroll'+Left];
        }
        while (el.offsetParent) {
            el = el.offsetParent;
            top += el[offset+Top];
            left += el[offset+Left];
        }
        if (scrollCounter > 1) {
            YOffset = (pageYOffset / scrollCounter);
            XOffset = (pageXOffset / scrollCounter);
        }
        return (
            top < ( pageYOffset + innerHeight + YOffset ) &&
            left < ( pageXOffset + innerWidth + XOffset ) &&
            ( top + height ) > pageYOffset &&
            ( left + width ) > pageXOffset
        );
    };
});