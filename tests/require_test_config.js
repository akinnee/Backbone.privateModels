// Configure require
require.config({

  baseUrl: 'http://localhost:8090/',

  paths: {
    // vendor
    jquery: 'tests/vendor/jquery-1.11.0.min',
    underscore: 'tests/vendor/underscore-min',
    backbone: 'tests/vendor/backbone',
    // plugin
    backbonePrivateModels: 'backbone.privateModels',
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['underscore', 'jquery']
    }
  }

});