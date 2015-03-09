'use strict';

/**
 * @ngdoc function
 * @name scaffoldLionic.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of scaffoldLionic
 */
angular.module('scaffoldLionic')
  .controller('MainCtrl', function($scope) {
    $scope.tasks = [
      'view',
      'controller',
      'route',
      'directive',
      'filter',
      'service',
      'factory',
      'constant'
    ];
  });
