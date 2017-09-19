/**
 * Created by kuzmenko-pavel on 10.04.17.
 */
define('is_element_in_viewport', ['jquery'], function (jQuery) {
    return function (el, scrollCounter) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        var pageYOffset;
        var pageXOffset;
        var YOffset = 0;
        var XOffset = 0;
        var innerWidth;
        var innerHeight;
        if (typeof window.innerWidth !== 'undefined') {
            innerWidth = window.innerWidth;
            innerHeight = window.innerHeight;
        }
        else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
            innerWidth = document.documentElement.clientWidth;
            innerHeight = document.documentElement.clientHeight;
        }
        else {
            innerWidth = document.getElementsByTagName('body')[0].clientWidth;
            innerHeight = document.getElementsByTagName('body')[0].clientHeight;
        }
        if (typeof window.pageYOffset !== 'undefined') {
            pageYOffset = window.pageYOffset;
            pageXOffset = window.pageXOffset;
        }
        else {
            pageYOffset = document.documentElement.scrollTop;
            pageXOffset = document.documentElement.scrollLeft;
        }
        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
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