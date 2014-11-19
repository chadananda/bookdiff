(function(ng, diff){
  'use strict';

  ng.module('bookdiff', ['ngFileReader'])
  
  //.constant('jsdiff', diff )

  .controller('MainCtrl', ['$scope', '$q', function($scope, $q){
    $scope.log = [];
    $scope.books = [];
    $scope.disableCompareButton = false;
    
    $scope.resetApp = function () {
      $scope.log = [];
      $scope.books = [];
    };
    
    $scope.compareFiles = function (){
      $scope.disableCompareButton = true;
      
      var log = $scope.log
          , book1 = $scope.books.length > 0 ? $scope.books[0] : ''
          , book2 = $scope.books.length > 1 ? $scope.books[1] : '';
      
      log.push({ msg: 'Starting to compare', color: 'black' });
      
      var diffArray = diff.diffWords(book1, book2);
      
      diffArray.forEach(function(chunk, index){
        var c = chunk.added ? 'green' :
                chunk.removed ? 'red' : 'grey';
        log.push({ msg: chunk.value, color: c });
      });
    };
    
    $scope.loadFile = function(e, file, index){
      $scope.books[index] = e.target.result;
      console.log("[", index, "] Input readed");
      console.log("content: ", e.target.result );
    };

  }]);
})(
  window.angular,
  window.JsDiff
);
