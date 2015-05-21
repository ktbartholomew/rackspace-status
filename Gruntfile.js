var request = require('request');

module.exports = function (grunt) {
    if(typeof process.env.SP_API_KEY === 'undefined') {
        console.warn('[WARNING]: Environment variable SP_API_KEY is not set. Connect will be unable to proxy API requests to StatusPage.');
    }

    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['connect:dev', 'watch:html', 'watch:sass'],
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
        watch: {
            html: {
                files: ['src/html/**/*', 'src/js/**/*'],
                tasks: ['processhtml:dev']
            },
            sass: {
                files: ['src/scss/**/*'],
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['processhtml:dev', 'sass:dev', 'concurrent:dev']);
    grunt.registerTask('build', ['processhtml:build', 'sass:build']);
}