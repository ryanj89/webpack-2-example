(function() {
  'use strict'

  angular.module('app')
    .service('commentService', commentService)

    commentService.$inject = ['$http']
    function commentService($http) {
      this.createComment = createComment

      function createComment(post) {
        return $http.post(`/api/posts/${post.id}/comments`, post.newComment)
          .then(res => res.data)
      }
    }
}())