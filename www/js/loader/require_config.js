/**
 * Created by user on 05.07.16.
 */
require.config({
        paths: {
            'jquery': './jquery',
            'underscore': './../../../bower_components/underscore/underscore'
        },
        shim: {
            underscore: {
              exports: '_'
            }
        }
});