module.exports = function (grunt) {
    grunt.initConfig({
        concurrent: {
            dev: ['connect:dev', 'watch:sass']
        },
        connect: {
            dev: {
                options: {
                    port: 3000,
                    hostname: '*',
                    keepalive: true,
                    base: 'public'
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
            sass: {
                files: ['src/scss/**.*.scss'],
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