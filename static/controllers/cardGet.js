function cardGet($scope, $http) {
    var refesh = function () {
      $http.get('/Kartica').then(function (response) {
        $scope.myWelcome = response.data
      })
    }
  
    refesh()
  
    $scope.addNewCard = function () {
      console.log('Card added')
      console.log($scope.card)
      $http.post('/Kartica', $scope.card).then(function (response) {
        console.log(response)
        $scope.card.Name = ''
        $scope.card.Description = ''
        $scope.card.Image = ''
        $scope.card.BarCode = ''
        refesh()
      })
    }

    $scope.show = function () {
        $scope.visible = false;
        $scope.visible = $scope.visible = true;
    }
    $scope.hide = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
    }
}