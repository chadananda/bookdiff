(function(ng, diff){
  'use strict';

  ng.module('bookdiff', [])

  //.constant( 'diff'  )

  .controller('MainCtrl', ['$scope', '$q', function($scope, $q){
    $scope.log = [];
    
    $scope.resetApp = function () {
      $scope.log = [];
    };
    
    $scope.compareFiles = function (){
      $scope.log.push('Compare!');
    };

  }]);
})(
  window.angular,
  window.diff
);
