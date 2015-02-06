module.exports = function(grunt) {
  grunt.initConfig({
    // Dev tasks
    concurrent: {
      dev: ["nodemon", "watch"],
      options: {
        logConcurrentOutput: true
      }
    },

    sass: {
      dev: {
        options: {
          sourcemap: true,
          update: true
        },
        files: [{
          expand: true,
          cwd: 'client/scss/',
          src: ['*.scss'],
          dest: 'client/css',
          ext: '.<%= pkg.version %>.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'client/scss/',
          src: ['*.scss'],
          dest: 'pkg/client/css',
          ext: '.css'
        }]
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: {
            "NODE_ENV": 'dev'
          },
          watch: ['app.js', 'server'],
          delay: 300,

          callback: function (nodemon) {
            // Log nodemon actions
            nodemon.on('log', function (event) {console.log(event.colour);});

            // Open the application in a new browser window and is optional
            //            nodemon.on('config:update', function () {setTimeout(function() {require('open')('http://localhost:3090', 'Google Chrome Canary');}, 1000);});

            // Update .rebooted to fire Live-Reload
            nodemon.on('restart', function () {setTimeout(function() {
              //                          console.log('COUCOU2');
              require('fs').writeFileSync('.rebooted', 'rebooted');
            }, 1000);});
          }
        }
      }
    },

    watch: {
      scss: {
        files: ['client/scss/**/*.scss'],
        tasks: ['sass:dev']
      },
      livereload: {
        files: ['client/js/**/*.js', 'client/css/*.css'],
        options: {
          livereload: true
        }
      }
    },

    // Build tasks
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      css: ["client/css/*"],
      pkg: ["pkg/"],
    },

    bump: {
      options: {
        commit: false,
        createTag: false,
        push: false
      }
    },

    copy: {
      main: {
        files: [
          {src: [
            '.bowerrc',
            'app.js',
            'bower.json',
            'config/**',
            'controllers/**',
            'helpers/**',
            'package.json',
            'public/**',
            'sh/**',
            'views/**'
          ], dest: 'pkg/'}
        ]
      },
      dev: {
        files: [
          {expand: true, cwd: 'client/', src: [
            'js/**/*'
          ], dest: 'pkg/client/'}
        ]
      }
    },

    imagemin: {
      quick: {
        files: [{
          expand: true,
          cwd: 'client/',
          src: ['img/*.{png,jpg,gif}'],
          dest: 'pkg/client/'
        }]
      },
      full: {
        files: [{
          expand: true,
          cwd: 'client/',
          src: ['img/**/*.{png,jpg,gif}'],
          dest: 'pkg/client/'
        }]
      },
      pub: {
        files: [{
          expand: true,
          cwd: 'client/img-pub',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'pkg/client/img'
        }]
      }
    },

    //    requirejs: {
    //      compile: {
    //        options: {
    //          name: "app",
    //          baseUrl: "client/js/",
    //          mainConfigFile: "client/js/config.js",
    //          out: "pkg/client/js/<%= pkg.name %>.<%= pkg.version %>.min.js",
    //          findNestedDependencies: true,
    //          preserveLicenseComments: false,
    //          optimize: "uglify",
    //          uglify: {
    //            no_mangle: true
    //          }
    //        }
    //      }
    //    },

    'sftp-deploy': {
      prod: {
        auth: {
          host: 'leka.cloudapp.net',
          port: 22,
          authKey: 'prod'
        },
        src: 'pkg',
        dest: '/home/leka.io-prod/leka.io',
        server_sep: '/'
      }
    }
  });

  // Dev tasks
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ["clean:css", "sass:dev", 'concurrent']);

  // Build tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sftp-deploy');

  grunt.registerTask('dev', ['clean:pkg', 'sass:prod', 'copy', 'imagemin:full', 'sftp-deploy:dev', 'bump']);
  grunt.registerTask('pre', ['clean:pkg', 'sass:prod', 'copy:main', 'imagemin:quick', 'sftp-deploy:pre', 'bump']);
  grunt.registerTask('prefull', ['clean:pkg', 'sass:prod', 'copy:main', 'imagemin:full', 'sftp-deploy:pre', 'bump']);
  grunt.registerTask('prod', ['clean:pkg', 'sass:prod', 'copy:main', 'imagemin:full', 'sftp-deploy:prod', 'bump']);
  grunt.registerTask('pub', ['clean:pkg', 'sass:prod', 'copy:main', 'imagemin:full', 'imagemin:pub', 'sftp-deploy:pub', 'bump']);
};
