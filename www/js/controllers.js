angular.module('starter.controllers', [])

/*
 * Noticias oficiales
 */
.controller('OfficialCtrl', function($scope) {
  //pass
})

/*
 * Detalle de una noticia oficial
 */
.controller('OfficialDetailCtrl', function($scope, $stateParams, Chats) {
  //pass
})

/*
 * Noticias de estudiantes
 */
.controller('StudentsCtrl', function($scope, StudentService, $http, $state, $ionicModal, $cordovaImagePicker, $cordovaCamera) {
  $scope.news = [];
  $scope.draft = {};
  $scope.formErrors = false;
  clearForm();

  //Treemos las noticias del servidor
  StudentService.fetch().then(function(data){
    $scope.news = data.data.articles;
    console.log($scope.news);
  });

  //Cuando el usuario elige una noticia, la guardamos en el servicio
  //y se cambia de vista
  $scope.goToDetail = function(news) {
    StudentService.setCurrentNews(news);
    $state.go('tab.students-detail');
  };

  //Modal que muestra el formulario de agregar una nueva noticia
  $ionicModal.fromTemplateUrl('templates/news-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Guardar una imagen seleccionada por el usuario y la
  //codifica en base64
  $scope.getImageSave = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.draft.urlToImage = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      console.log('Error: ' + JSON.stringify(error));    // In case of error
    });
  };

  //Tomar una foto con la camara y guardarla en base64
  $scope.takePicture = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.draft.urlToImage = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  //Agrega la nueva noticia
  $scope.add = function() {
    if($scope.draft.title == "" || $scope.draft.description == "") {
      $scope.formErrors = true;
      return;
    } else {
      $scope.formErrors = false;
    }
    if($scope.draft.author == ""){
      $scope.draft.author = 'Anonimo';
    }

    $scope.draft.publishedAt = (new Date()).toDateString();
    $scope.news.unshift($scope.draft);
    $scope.closeModal();
    clearForm();
  }

  function clearForm() {
    $scope.draft = {
      title: '',
      description: '',
      author: '',
    };
    $scope.formErrors = false;
  }
})

/*
 * Detalle de una noticia de estudiante
 */
.controller('StudentsDetailCtrl', function($scope, StudentService) {
  //Se carga la noticia del servicio.
  $scope.news = StudentService.getCurrentNews();
})

/*
 * Alarmas
 */
.controller('AlarmCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
