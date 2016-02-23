var request = require('request');
var cheerio = require('cheerio');

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
                        // proxy API requests with auth
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
                        });

                        middlewares.unshift(function (req, res, next) {
                          if(req.url.match(/^\/api/)) {
                              return next();
                          }

                          if(req.url.match(/custom\.css/)) {
                            return next();
                          }

                          request.get({
                            url: 'http://www.rackspacestatus.com' + (req.url || '/'),
                            headers: {
                                'Authorization': 'OAuth ' + process.env.SP_API_KEY
                            }
                          }, function (error, response, body) {

                              response.body = response.body.replace(/www\.rackspacestatus\.com/g,'localhost:3000');
                              var $ = cheerio.load(response.body);

                              if($('.custom-header-container')) {
                                // remove the static custom stylesheet
                                $('link[href*="custom_css_externals"]').remove();

                                // add the local stylesheet
                                $('head').append('<link rel="stylesheet" href="/custom.css" />');

                                // add the local custom header
                                $('.custom-header-container').html(
                                  grunt.file.read('public/custom-header.html')
                                );


                              }

                              if($('.custom-footer-container')) {
                                // add the local custom footer
                                $('.custom-footer-container').html(
                                  grunt.file.read('public/custom-footer.html')
                                );
                              }

                              res.write($.html());
                              res.end();
                          });
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
                    'public/custom-header.html': ['src/html/custom-header.html'],
                    'public/custom-footer.html': ['src/html/custom-footer.html']
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
};
