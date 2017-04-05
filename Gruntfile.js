module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs_obfuscate: {
            options: {
                dir: 'www/js/loader/',
                salt: 'salt',
                root: 'com',
                length: 6,
                quotes: 'any',
                output: false
            }
          },
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
                    base: ['www', 'bower_components', 'node_modules']
                }
            },
            block: {
                options: {
                    index: 'block.html',
                    port: 8001,
                    protocol: 'http2',
                    base: ['www', 'bower_components', 'node_modules']
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
                    wrap: true,
                    optimize: 'uglify2',
                    //generateSourceMaps: true
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
                            drop_console: true
                        },
                        warnings: true,
                        mangle: {
                            toplevel: true,
                            sort: true,
                            eval: true,
                            props: true,
                            except: ["define", "require"]

                        }
                    },
                    generateSourceMaps: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-requirejs-obfuscate');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('server', ['connect', 'default']);
};