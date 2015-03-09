'use strict';

/**
 * @ngdoc overview
 * @name scaffoldLionic
 * @description
 * # scaffoldLionic
 *
 * nav module of the application.
 */
angular
  .module('scaffoldLionic', [
    'ionic'
  ])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('nav', {
        url: '/nav',
        abstract: true,
        templateUrl: 'templates/nav.html'
      })
      .state('nav.main', {
        url: '/main',
        views: {
          'nav-main': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      }); //inject:state

    $urlRouterProvider.otherwise('/nav/main');
  });
