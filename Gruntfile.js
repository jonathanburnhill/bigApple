module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cwebp: {
      dynamic: {
        options: {
          q: 75
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/img_webp/'
        }]
      }
    },
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
            name: 'thumbnail',
            width: 300,
            quality: 75

          },
        {
          name: 'thumbnail',
          width: 600,
          suffix: '_retina',
          quality: 90
        }
      ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'img/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['cwebp:dynamic']);
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
