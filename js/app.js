(function(ng, diff, async){
  'use strict';

  ng.module('bookdiff', ['ngFileReader'])
  
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
          , book1 = $scope.books.length > 0 ? $scope.books[0].content : ''
          , book2 = $scope.books.length > 1 ? $scope.books[1].content : '';
      
      log.push({ msg: '= Results =', color: 'black' });
      
      var diffArray = diff.diffWords(book1, book2);

      console.log('Differences: ', diffArray.length);
      
      async.each(diffArray,
        function(chunk, cb){ //Iterator
          var c = chunk.added ? 'green' :
                  chunk.removed ? 'red' : 'grey';
          log.push({ msg: chunk.value, color: c });
          cb();
        }, function(err){ //Final
          if(err) {
            console.log('Something went wrong');
          } else {
            $scope.disableCompareButton = false;
            console.log('Done!');
          }
      });
    };
    
    $scope.loadFile = function(e, file, index){
      var ext = file.name.split('.').pop(),
          tcontent = ext.indexOf('htm') === 0 
                        ? ng.element(e.target.result).filter(':not(style,title,script)').text() // Heads Up! I'm NOT using jQlite
                        : e.target.result;    
      $scope.books[index] = { name: file.name, content: tcontent };      
      console.log("[", index, "] Input readed ", file.name);
      
    };

  }]);
})(
  window.angular,
  window.JsDiff,
  window.async
);
