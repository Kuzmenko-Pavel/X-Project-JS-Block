module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ["www/block/**/*.js", "www/loader/**/*.js"],
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
                    port: 8000,
                    protocol: 'https',
                    key: grunt.file.read('./livereload.key').toString(),
                    cert: grunt.file.read('./livereload.crt').toString(),
                    base: ['www', 'www/loader', 'bower_components', 'node_modules'],
                    middleware: function (connect, options, middlewares) {
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
            },
            block: {
                options: {
                    port: 8001,
                    protocol: 'https',
                    key: grunt.file.read('./livereload.key').toString(),
                    cert: grunt.file.read('./livereload.crt').toString(),
                    base: ['www', 'www/block', 'bower_components', 'node_modules'],
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Credentials', true);
                            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                            res.setHeader('Allow', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                            var support = ['POST', 'PUT', 'DELETE'];
                            if (support.indexOf(req.method.toUpperCase()) !== -1) {
                                var endpoints = {
                                    "/block": "www/block/block.html",
                                    "/block.json": "www/block/json/block.json",
                                    "/campaign.json": "www/block/json/campaign.json",
                                    "/place.json": "www/block/json/place.json",
                                    "/retargeting.json": "www/block/json/retargeting.json",
                                    "/retargeting-account.json": "www/block/json/retargeting-account.json"
                                };
                                var match = false;
                                var fileToRead = "";

                                Object.keys(endpoints).forEach(function (url) {
                                    if (req.url.indexOf(url) === 0) {
                                        match = true;
                                        fileToRead = endpoints[url];
                                    }
                                });
                                if (match === false) {
                                    return next();
                                }
                                return res.end(grunt.file.read(fileToRead));
                            }

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
                        key: grunt.file.read('./livereload.key').toString(),
                        cert: grunt.file.read('./livereload.crt').toString()
                    }
                },
                files: [
                    "www/js/block/**/*.js",
                    "www/js/loader/**/*.js",
                    "www/**/*.html",
                    "www/**/*.css",
                    "bower_components/**/*.js"
                ],
                tasks: ['jshint', 'requirejs:compile', 'requirejs:compileLoader']
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'www/js/block/require_config.js',
                    baseUrl: 'www/js/block/',
                    include: ['main', '../../../node_modules/requirejs/require'],
                    out: 'www/js/block.js',
                    removeCombined: false,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    wrap: true,
                    optimize: 'none',
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: true,
                            dead_code: true,
                            conditionals: true,
                            booleans: true,
                            unused: true,
                            if_return: true,
                            join_vars: true,
                            drop_console: false
                        },
                        warnings: true,
                        mangle: {
                            toplevel: true,
                            sort: true,
                            eval: true,
                            props: true

                        }
                    },
                    generateSourceMaps: true
                }
            },
            compileLoader: {
                options: {
                    mainConfigFile: 'www/js/loader/require_config.js',
                    baseUrl: 'www/js/loader/',
                    include: ['main', '../../../node_modules/requirejs/require'],
                    out: 'www/js/loader.js',
                    removeCombined: false,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    wrap: true,
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: true,
                            dead_code: true,
                            conditionals: true,
                            booleans: true,
                            unused: true,
                            if_return: true,
                            join_vars: true,
                            drop_console: false
                        },
                        warnings: true,
                        mangle: {
                            toplevel: true,
                            sort: true,
                            eval: true,
                            props: true

                        }
                    },
                    generateSourceMaps: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('server', ['connect', 'default']);
};