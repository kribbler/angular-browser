(function(global, angular) {
    'use strict';  
    var app = angular.module("angularBrowser", ['ngMaterial']); 

    app.filter('orderObjectBy', function(){
        return function(input, attribute) {
            if (!angular.isObject(input)) return input;

            var array = [];
            for(var objectKey in input) {
                array.push(input[objectKey]);
            }

            array.sort(function(a, b){
                a = parseInt(a[attribute]);
                b = parseInt(b[attribute]);
                return a - b;
            });
            return array;
        }
    });
      
    app.service("RestService", ['$http', '$q', function($http, $q) {
      this.urlBase = './data/files.json';
      // Get the list of files
      this.get = function() {
        var deferred = $q.defer();
        $http({
          url: this.urlBase,
          method: "GET"
        }).then(function(data) {
          if (data) {
            deferred.resolve(data.data);
          }
          else {
            deferred.reject(data);
          }
        }, function(data) {
          deferred.reject(data);
        });
        return deferred.promise;
      };
    }]);

    app.controller('myCtrl', ['$scope', '$timeout', 'RestService', function($scope, $timeout, RestService) {
      $scope.fileStructure = [];
      $scope.currentFileStructure = [];
      $scope.errorMsg = false;
      $scope.sortOrder = 1;
      $scope.showFile = false;
      $scope.fileName = null;
      $scope.innerFolder = false;

      $scope.getFiles = function() {
        RestService.get().then(
          function(response) {
            $scope.fileStructure = response;
            $scope.currentFileStructure = $scope.fileStructure;
          },
          function(error) {
            $scope.errorMsg = error;
          }
        );
      }; 
      
      //code to sort array of objects
      var dynamicSort = function(property) {
        $scope.sortOrder = ($scope.sortOrder == 1) ? -1 : 1;

        return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * $scope.sortOrder;
        };
      };
      
      //change sorting by param
      $scope.orderBy = function(param) {
        $scope.currentFileStructure.sort(dynamicSort(param));
        $scope.showFile = false;
      };

      $scope.viewFile = function(name) {
        $scope.showFile = true;
        $scope.fileName = name;
      };

      //used to enter directory
      $scope.exploreFolder = function(name) {
        var found = false;
        angular.forEach($scope.fileStructure, function(file) {
          if (!found) {
            if (file.name == name) {
              $scope.currentFileStructure = file.files;
              $scope.innerFolder = true;
              found = true;
            }
          }
          
        });
        $scope.showFile = false;
      };
      
      //used to navigate outside directory
      $scope.goUp = function() {
        $scope.innerFolder = false;
        $scope.currentFileStructure = $scope.fileStructure;
        $scope.showFile = false;
      };

      $timeout(function() {
        $scope.getFiles();
      });

    }]);

})(window, angular);