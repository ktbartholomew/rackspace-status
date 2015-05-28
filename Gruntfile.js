var request = require('request');

module.exports = function (grunt) {
    if(typeof process.env.SP_API_KEY === 'undefined') {
        console.warn('[WARNING]: Environment variable SP_API_KEY is not set. Connect will be unable to proxy API requests to StatusPage.');
    }

    grunt.initConfig({
        browserify: {
            dev: {
                files: {
                    'src/js/main.build.js': ['src/js/main.js']
                },
                options: {
                    transform: ['browserify-compile-templates']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['connect:dev', 'watch:dev', 'watch:html', 'watch:sass'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 3000,
                    hostname: '*',
                    keepalive: true,
                    base: 'public',
                    livereload: true,
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            if(! req.url.match(/^\/api/)) {
                                return next();
                            }

                            var apiEndpoint = req.url.match(/^\/api/).input;

                            request
                            .get({
                                url: 'https://gk201j90pkjt.statuspage.io' + apiEndpoint,
                                headers: {
                                    'Authorization': 'OAuth ' + process.env.SP_API_KEY
                                }
                            })
                            .pipe(res);

                            // next();
                        });

                        return middlewares;
                    }
                }
            }
        },
        processhtml: {
            options: {
                includeBase: '.'
            },
            dev: {
                files: {
                    'public/index.html': ['src/html/index.html']
                }
            },
            build: {
                files: {
                    'build/custom-header.html': ['src/html/custom-header.html'],
                    'build/custom-footer.html': ['src/html/custom-footer.html']
                }
            }
        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'public/custom.css': 'src/scss/custom.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'build/custom.css': 'src/scss/custom.scss'
                }
            }
        },
        uglify: {
          build: {
            files: {
              'src/js/main.min.js': ['src/js/main.build.js']
            }
          }
        },
        watch: {
            dev: {
              files: ['public/**/*'],
              options: {
                livereload: true
              }
            },
            html: {
                files: ['src/html/**/*', 'src/js/**/*', '!src/js/main.build.js', '!src/js/main.min.js'],
                tasks: ['browserify:dev', 'processhtml:dev']
            },
            sass: {
                files: ['src/scss/**/*'],
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-sass');


    grunt.registerTask('default', ['processhtml:dev', 'sass:dev', 'concurrent:dev']);
    grunt.registerTask('build', ['browserify:dev', 'uglify:build', 'processhtml:build', 'sass:build']);
}
