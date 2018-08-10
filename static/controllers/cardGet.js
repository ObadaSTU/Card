function cardGet($scope, $http) {
    httpGet();
    function httpGet(){$http.get("/Kartica")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
    }
};