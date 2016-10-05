angular.module('services', [])
  .factory('restFactory', function($http){


    return {
      getCollection: function(){
        return $http({
          method: 'GET',
          url: 'api/messages'
        })
      },
      getBody: function(_id){
        return $http({
          method: 'GET',
          url: 'api/messages/'+_id
        })
      },
      edit: function(message){
        return $http({
          method: 'PUT',
          url: 'api/messages',
          data: message
        })
      },
      delete: function(id){
        return $http({
          method: 'DELETE',
          url: 'api/messages',
          headers: {"Content-Type": "application/json;charset=utf-8"},
          data: {_id: id}
        })
      }
    }

  })
