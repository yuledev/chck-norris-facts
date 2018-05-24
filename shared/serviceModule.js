var serviceModule = angular.module('serviceModule', [])
    .service('ChuckService', function ($http) {

        this.getCategories = function () {
            return $http.get("https://api.icndb.com/categories?escape=javascript");
        }

        this.getJokes = function (category) {
            return $http.get("http://api.icndb.com/jokes?limitTo=[" + category + "]&escape=javascript");
        }

        this.getJoke = function (id) {
            return $http.get("http://api.icndb.com/jokes/" + id + "?escape=javascript");
        }

        this.getRandomJoke = function () {
            return $http.get("http://api.icndb.com/jokes/random?escape=javascript");
        }

    })