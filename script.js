var app = angular.module('chuckApp', ['ngRoute', 'serviceModule'])

app.config(function ($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        })
        .when('/joke/:id', {
            templateUrl: 'joke.html',
            controller: 'JokeCtrl'
        })
        .otherwise({
            redirectTo: '/list'
        });
})

app.controller('HomeCtrl', function ($scope, $location, ChuckService) {
    ChuckService.getCategories().then(function (data) {
        $scope.categories = data.data.value;
    });

    $scope.selectCategory = function (el) {
        ChuckService.getJokes(el.item).then(function (data) {
            console.log(data.data);
            $scope.jokes = data.data.value;
        });
    }

    $scope.getRandomJoke = function (el) {
        ChuckService.getRandomJoke().then(function (data) {
            console.log(data.data.value.id);
            $location.path('/joke/' + data.data.value.id);

        });
    }

})

app.controller('JokeCtrl', function ($scope, $routeParams, $location, ChuckService) {
    var id = $routeParams.id;
    ChuckService.getJoke(id).then(function (data) {
        $scope.joke = data.data.value;
    });

    $scope.goBack = function () {
        $location.path('/');
    }
});