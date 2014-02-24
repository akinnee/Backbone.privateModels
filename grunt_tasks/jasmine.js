module.exports = function(grunt) {

  grunt.config.set('jasmine', {

    /**
     * Actually run the tests
     */
    run: {
      src: [
        'modelStore.js',
        'getModel.js',
        'getCollection.js'
      ],
      options: {
        specs: 'tests/**/*_spec.js',
        host: 'http://localhost:8090',
        keepRunner: true,
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: 'tests/require_test_config.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

};