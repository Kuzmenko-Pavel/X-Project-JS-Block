var fs = require('fs');
var mime = require('mime-types');
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ["www/loader/**/*.js"],
            options: {
                jshintrc: '.jshintrc',
                globals: {
                    jQuery: true
                }
            }
        },
        connect: {
            loader: {
                options: {
                    index: 'index.html',
                    port: 8080,
                    protocol: 'http',
                    base: ['www'],
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            var fileName = '.' + req.url;
                            var extension = fileName.split('.').pop();
                            if(extension === 'webp' || extension === 'png'){
                                if (!grunt.file.exists('./www/'+ fileName)){
                                    if (extension === 'webp'){
                                        fileName = '404/404.webp';
                                    }
                                    else if (extension === 'png'){
                                        fileName = '404/404.png';
                                    }
                                }
                                fs.readFile('./www/'+ fileName, function (err, content) {
                                    if (err) {
                                        res.writeHead(404, {'Content-type':'text/html'});
                                        return res.end("No such fileName");

                                    } else {
                                        //specify the content type in the response will be an image
                                        res.writeHead(200, {'Content-Type': mime.lookup('./www/'+ fileName)});
                                        return res.end(content);
                                    }
                                });
                            }
                            else{
                                return next();
                            }
                        });
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Credentials', true);
                            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                            res.setHeader('Allow', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                            return next();
                        });

                        return middlewares;
                    }
                }
            }
        },
        watch: {
            taskName: {
                options: {
                    livereload: {
                        port: 35729,
                    }
                },
                files: [
                    "www/js/loader/**/*.js",
                    "bower_components/**/*.js"
                ],
                tasks: ['jshint', 'requirejs']
            }
        },
        requirejs: {
            compileLoader: {
                options: {
                    mainConfigFile: 'www/js/loader/require_config.js',
                    baseUrl: 'www/js/loader/',
                    include: ['main', '../../../bower_components/almond/almond'],
                    //include: ['main', '../../../node_modules/requirejs/require'],
                    out: 'www/js/loader.js',
                    removeCombined: false,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    wrap: true,
                    optimize: 'uglify2',
                    //optimize: 'none',
                    uglify2: {
                        output: {
                            beautify: false,
                            quote_keys: true,
                            ascii_only: true
                        },
                        compress: {
                            unsafe: true,
                            comparisons: true,
                            cascade: true,
                            collapse_vars: true,
                            reduce_vars: true,
                            warnings: true,
                            loops: true,
                            properties: true,
                            screw_ie8 : false,
                            sequences: true,
                            dead_code: true,
                            conditionals: true,
                            booleans: true,
                            unused: true,
                            if_return: true,
                            join_vars: true,
                            drop_console: true,
                            passes: 3
                        },
                        warnings: true,
                        verbose: true,
                        mangle: {
                            screw_ie8 : false,
                            toplevel: true,
                            sort: true,
                            eval: true,
                            props: true


                        },
                        ie8: true
                    },
                    generateSourceMaps: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('server', ['requirejs', 'connect', 'default']);
};