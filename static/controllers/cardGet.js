function cardGet($scope, $http, toastr, $location) {
    var refesh = function () {
      $http.get('/Kartica').then(function (response) {
        $scope.myWelcome = response.data
      })
    }

    $scope.check_login = function(){
      if(localStorage.getItem('user')){
          return true;
      }
      return false;
  }

  $scope.check_admin = function(){
      if(localStorage.getItem('type') == "admin"){
          return true;
      }
      return false;
  }

  $scope.login = function(credentials){
      $http.post('/login', credentials).then(function(response){
          if(typeof response.data.token != 'undefined'){
              localStorage.setItem('user',response.data.token)
              localStorage.setItem('type', response.data.type)
              toastr.success('You are successfully logged in!', 'Login Success!');
              if(localStorage.getItem('type') == "user" ){
                $location.url('/card');
            } else if(localStorage.getItem('type') == "admin"){
                $location.url('/admin');
            }
      }
          else if(response.data.user == false){
              toastr.error('Login Error');
          }
      }),function(response){
          console.log(error);
      }
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
        toastr.success('You added a new card.')
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

    $scope.deleteCard = function (id) {
      console.log('delete card')
      console.log(id)
      $http.delete('/deleteCard/' + id).then(function (response) {
        console.log('removed')
        toastr.error("Card removed")
        refesh()
      })
    }

    $scope.edit = function (id) {
      console.log('select card')
      console.log(id)
      $http.get('/Kartica/' + id).then(function (response) {
        console.log('selected')
        $scope.card = response.data
      })
    }
  
    $scope.update = function () {
      console.log('update card')
      console.log($scope.card._id)
      $http.put('Kartica/' + $scope.card._id, $scope.card).then(function (response) {
        console.log('update')
        $scope.card.Name = ''
        $scope.card.Description = ''
        $scope.card.Image = ''
        $scope.card.BarCode = ''
        toastr.success("Card updated successfully")
        refesh()
      })
    }


}