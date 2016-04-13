module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.main %> (v<%= pkg.version %>) <%= pkg.copyright %> (license: <%= pkg.license %>) <%= grunt.template.today("dd-mmm-yyyy") %> */\n'
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
                    'images/label.png': 'images/label.png',
                    'images/progress.png': 'images/progress.png',
                    'images/badge.png': 'images/badge.png',
                    'images/well.png': 'images/well.png'
                }
            }
        },

        jsdoc : {
            dist : {
                src: ['LibOpenAirBootstrap.js', 'README.md', 'package.json'],
                options: {
                    destination: 'docs'
                }
            }
        },

        jsdoc2md: {
            oneOutputFile: {
                src: ['LibOpenAirBootstrap.js', 'README.md', 'package.json'],
                dest: 'docs/README.md'
            }
        }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "imagemin" task.
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Load the plugin that provides the "jsdoc" task.
    grunt.loadNpmTasks('grunt-jsdoc');

    // Load the plugin that provides the "jsdoc2md" task.
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

    // Default task(s).
    grunt.registerTask('travis', ['jshint']);
    grunt.registerTask('default', ['jshint', 'uglify']);
    grunt.registerTask('build', ['jshint', 'uglify', 'imagemin', 'jsdoc', 'jsdoc2md']);

};