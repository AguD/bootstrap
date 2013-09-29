module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        tqs_static: '/home/agu/Desktop/tqs/tqs/TQSweb/static',
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: '<%= jqueryCheck %>',
                stripBanners: false
            },
            bootstrap: {
                src: [
                    'js/transition.js',
                    'js/alert.js',
                    'js/button.js',
                    'js/carousel.js',
                    'js/collapse.js',
                    'js/dropdown.js',
                    'js/modal.js',
                    'js/tooltip.js',
                    'js/popover.js',
                    'js/scrollspy.js',
                    'js/tab.js',
                    'js/affix.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min'
            },
            bootstrap: {
                src: ['<%= concat.bootstrap.dest %>'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },

        recess: {
            options: {
                compile: true,
            },
            bootstrap: {
                src: ['less/bootstrap.less'],
                dest: '<%= tqs_static %>/css/<%= pkg.name %>.css'
            },
            min: {
                options: {
                    compress: true
                },
                src: ['less/bootstrap.less'],
                dest: '<%= tqs_static %>/css/<%= pkg.name %>.min.css'
            }
        },
        watch: {
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            recess: {
                files: 'less/*.less',
                tasks: ['recess']
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['recess']);
};


