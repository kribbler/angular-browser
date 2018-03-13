

describe('RestService factory', function() {
    var RestService;

    beforeEach(angular.mock.module('angularBrowser'));
    beforeEach(function() {
        angular.module('ngMaterial',[]);
        module('angularBrowser');
    });

    beforeEach(inject(function(_RestService_) {
        RestService = _RestService_;
    }));

    it('should exist', function() {
        expect(RestService).toBeDefined();
    });
});

describe('myCtrl', function() { 
    'use strict';
    var scope, controller, timeout, q, RestService, mockRestService,
     testFile, testFiles, testErrorMessage, testResponseSuccess, testResponseFailure;
    beforeEach(module('angularBrowser'));

    beforeEach(inject(function($rootScope, $controller, $timeout, $q, _RestService_) {
        // Test data
        testFile = {"type":"pdf","name":"Employee Handbook","added":"2017-01-06"}; 
        testFiles = [testFile];
        
        // Services
        RestService = _RestService_;
        timeout = $timeout;
        q = $q;
        // Controller setup
        scope = $rootScope.$new();
        controller = $controller('myCtrl', {
            $scope: scope,
            RestService: RestService
        });
    }));

    describe('initialization', function() {
        it('initializes with proper $scope variables and methods', function() {
            scope.$apply();
            expect(scope.fileStructure).toEqual([]);
            expect(scope.errorMsg).toEqual(false);
            expect(scope.sortOrder).toEqual(1);
        });
        
        it('initializes by getting the list of items', function() {
            spyOn(scope, 'getFiles');
            timeout.flush();
            expect(scope.getFiles).toHaveBeenCalled();
        });
    });

    describe('getFiles()', function() {
        
        it('successfully gets the list of files from the service', function() {
            spyOn(RestService, 'get').and.callFake(function() {
                var deferred = q.defer();
                deferred.resolve(testResponseSuccess);
                return deferred.promise;
            });
            scope.$apply(function() {
                scope.getFiles();
            });
            expect(RestService.get).toHaveBeenCalled();
        });

        
        it('fails to get the list of files and returns an error message', function() {
            spyOn(RestService, 'get').and.callFake(function() {
                var deferred = q.defer();
                deferred.reject(testResponseFailure);
                return deferred.promise;
            });
            scope.$apply(function() {
                scope.getFiles();
            });
            expect(RestService.get).toHaveBeenCalled();
            expect(scope.fileStructure.length).toBe(0);
        });
        
    });
});