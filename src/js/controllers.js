angular.module('controllers', ['services'])
  .controller('chatCtrl', function ($scope, restFactory) {

    $scope.messages = [];
    $scope.newMessage = {};

    restFactory.getCollection().then(function (data) {
      $scope.messages = data.data;
      setInterval(function () {

        if (_.find($scope.messages, {edit: {header: true}})) {
          return;
        }
        restFactory.getCollection().then(function (data) {
          if (!_.chain($scope.messages).differenceWith(data.data, function (x, y) {
              return x._id == y._id && x.header == y.header;
            }).isEmpty().value()) {
            $scope.messages = data.data;
          }
        });
      }, 1000);
    });


    $scope.get = function (message) {
      restFactory.getBody(message._id).then(function (data) {
        _.merge(message, {body: data.data.body});
      })
    };

    $scope.push = function () {
      restFactory.add($scope.newMessage)
        .then(function () {
          $scope.messages.push(Object.create($scope.newMessage));
          $scope.newMessage = {};

        })

    };

    $scope.pull = function (message) {
      restFactory.delete(message._id).then(function (data) {
        _.pull($scope.messages, message)
      });
    };


    $scope.update = function (message) {
      restFactory.edit(_.pick(message, ['_id', 'body', 'header']))
        .then(function (data) {
          message.edit.header = false;
          message.edit.body = false;
        })
    }


  });