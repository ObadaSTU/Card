function cardGet($scope, $http, toastr, $location) {
    var config = {headers:  {
        'Authorization': 'Basic TmljayBDZXJtaW5hcmE6cGFzc3dvcmQ=',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
     };

     console.log (localStorage.getItem('user'))

     console.log (localStorage.getItem('type'))
    var refesh = function () {
      $http.get('/user/Kartica' ,config).then(function (response) {
        $scope.myWelcome = response.data
        console.log(id)
      })
    }

    var refreshFeedback = function(){
        $http.get('/admin/feedbak' , config).then(function (response){
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
                refesh();
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
  
    //refesh()
  
    $scope.addNewCard = function () {
      console.log('Card added')
      console.log($scope.card)
      $http.post('/user/Kartica', $scope.card, config).then(function (response) {
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
      $http.delete('/user/deleteCard/' + id, config).then(function (response) {
        console.log('removed')
        toastr.error("Card removed")
        refesh()
      })
    }

    $scope.edit = function (id) {
      console.log('select card')
      console.log(id)
      $http.get('/user/Kartica/' + id, config).then(function (response) {
        console.log('selected')
        $scope.card = response.data
      })
    }
  
    $scope.update = function () {
      console.log('update card')
      console.log($scope.card._id)
      $http.put('/user/Kartica/' + $scope.card._id, $scope.card, config).then(function (response) {
        console.log('update')
        $scope.card.Name = ''
        $scope.card.Description = ''
        $scope.card.Image = ''
        $scope.card.BarCode = ''
        toastr.success("Card updated successfully")
        refesh()
      })
    }

    var users = function(){
        $http.get('/users').then(function(response) {
            $scope.users = response.data - 1 
        })
    }

    var cards = function() {
        $http.get('/cards').then(function(response){
            $scope.cards = response.data
        })
    }

    if(localStorage.getItem('type') == "user"){
        console.log('juhu')
          refesh()
      }else if(localStorage.getItem('type') == 'admin'){
          console.log("hujuu")
          refreshFeedback()
      }


      $scope.sendFeedback = function(){
          console.log('Feedback sent');
          console.log($scope.feedback);
          $http.post('/feedback', $scope.feedback).then(function (response){
              console.log(response)
              $scope.feedback.text = "";
              toastr.success("Thanks!!!")
          })
      }
}