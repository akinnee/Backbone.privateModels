module.exports = function(grunt) {

  grunt.config.set('connect', {
    dev: {
      options: {
        base: ['.'],
        port: 8090,
        hostname: '*',
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};