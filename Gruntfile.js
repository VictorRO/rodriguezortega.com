module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        cwd: 'src',
        src: ['**', '!sass/*.scss', '!js/*.coffee'],
        dest: 'build',
        expand: true
      }
    },
    clean: {
      build: {
        src: ['build']
      },
      stylesheets: {
        src: [ 'build/**/*.css', '!build/style/<%= pkg.name %>.css' ]
      },
      scripts: {
        src: [ 'build/**/*.js', '!build/js/<%= pkg.name %>.js', '!build/bower_components/*.js' ]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['sass/*.scss'],
          dest: 'build/style',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: ['**/*.css'],
        dest: 'build'
      }
    },
    cssmin: {
      build: {
        files: {
          'build/style/<%= pkg.name %>.css': ['build/**/*.css']
        }
      }
    },
    coffee: {
      build: {
        expand: true,
        cwd: 'src',
        src: ['js/*.coffee'],
        dest: 'build',
        ext: '.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/*.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      stylesheets: {
        files: 'src/**/*.scss',
        tasks: ['stylesheets']
      },
      scripts: {
        files: 'src/**/*.coffee',
        tasks: ['scripts']
      },
      copy: {
        files: ['src/**', '!src/**/*.sass', '!src/**/*.coffee'],
        tasks: ['copy']
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build',
          hostname: '*'
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Define the tasks
  grunt.registerTask(
    'stylesheets',
    'Compiles stylesheets.',
    ['sass', 'autoprefixer', 'cssmin', 'clean:stylesheets']
  );

  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files',
    ['coffee', 'uglify', 'clean:scripts']
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory',
    ['clean:build', 'copy', 'stylesheets', 'scripts']
  );

  // Default task(s).
  grunt.registerTask('default', ['build', 'connect', 'watch']);

};
