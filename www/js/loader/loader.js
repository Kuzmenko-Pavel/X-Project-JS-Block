/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    'jquery',
    './settings',
    './block_settings',
    './start'
], function (
    jQuery,
    settings,
    block_settings,
    start
) {
    var Loader = function () {
        this.settings = settings;
        this.blocks = block_settings;
        this.start = start;
    };
    return Loader;

});