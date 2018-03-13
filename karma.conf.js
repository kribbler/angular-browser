// Karma configuration
// Generated on Mon Mar 12 2018 19:06:52 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/angular-animate/angular-animate.min.js',
      './node_modules/angular-aria/angular-aria.min.js',
      './node_modules/angular-messages/angular-messages.min.js',
      './node_modules/angular-material/angular-material.min.js',
      './app/app.js',
      './app/app.spec.js',
    ],
    
    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  });
}
