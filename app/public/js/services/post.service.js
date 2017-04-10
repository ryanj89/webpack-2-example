(function() {
  'use strict'

  angular.module('app')
    .service('postService', postService)

    postService.$inject = ['$http']
    function postService($http) {
      this.getAllPosts = getAllPosts
      this.getSinglePost = getSinglePost
      this.createPost = createPost
      this.updatePost = updatePost
      this.voteUp = voteUp
      this.voteDown =voteDown

      function getAllPosts() {
        return $http.get('/api/posts').then(res => res.data)
      }

      function getSinglePost(id) {
        return $http.get(`/api/posts/${id}`).then(res => res.data)
      }

      function createPost(post) {
        return $http.post('/api/posts', post)
          .then(res => {
            res.data.comments = []
            return res.data
          })
      }

      function updatePost(id, post) {
        return $http.patch(`/api/posts/${id}`, post).then(res => res.data)
      }

      function voteUp(post) {
        return $http.post(`/api/posts/${post.id}/votes`)
          .then(res => res.data.vote_count)
      }

      function voteDown(post) {
        return $http.delete(`/api/posts/${post.id}/votes`)
          .then(res => res.data.vote_count)
      }
    }
}())