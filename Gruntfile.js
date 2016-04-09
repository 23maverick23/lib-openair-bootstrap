module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> (v<%= pkg.version %>) - Copyright NetSuite, Inc. 2016. Last updated: <%= grunt.template.today("dd-mmm-yyyy") %> */\n'
            },
            build: {
                src: 'LibOpenAirBootstrap.js',
                dest: 'LibOpenAirBootstrap.min.js'
            }
        },
        
        jshint: {
            all: ['Gruntfile.js', 'LibOpenAirBootstrap.js', 'tests/test.js'],
            options: {
                force: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                reporter: require('jshint-stylish')
            },
        },

        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }]
                },
                files: {
                    'images/alert.png': 'images/alert.png',  // 'destination': 'source'
                }
            }
        }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "imagemin" task.
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify']);
    grunt.registerTask('build', ['jshint', 'uglify', 'imagemin']);
    grunt.registerTask('test', ['jshint']);

};