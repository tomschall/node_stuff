var app = angular.module("app", []);

app.controller("PostsController", function($scope, $http) {
    
    $scope.title = "Hallo";
    
    $http.get("/posts.json").then(function(res){
        var posts = res.data;
        $scope.posts = posts;
    });
    
});
    