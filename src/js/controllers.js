angular.module('controllers', ['services'])
  .controller('chatCtrl', function ($scope, restFactory) {

    $scope.messages = [];
    $scope.newMessage = {};

    restFactory.getCollection().then(function(data){
      $scope.messages = data.data
    });



    $scope.get = function(message){
      if(message.body){
        return;
      }
      restFactory.getBody(message._id).then(function(data){
          _.merge(message, {body: data.data.body});
      })
    };

    $scope.push = function(){
      $scope.messages.push(Object.create($scope.newMessage));
      $scope.newMessage = {};
    };

    $scope.pull = function(message){
      restFactory.delete(message._id).then(function(data){
        _.pull($scope.messages, message)
      });
    };


    $scope.update = function(message){
      restFactory.edit(_.pick(message, ['_id', 'body', 'header']))
        .then(function(data){
        message.edit.header = false;
        message.edit.body = false;
      })
    }



  });