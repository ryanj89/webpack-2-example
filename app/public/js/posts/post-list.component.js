(function() {
  'use strict'

  angular.module('app')
    .component('postList', {
      templateUrl: '/js/posts/post-list.template.html',
      controller: controller
    })

  controller.$inject = ['postService', 'commentService']
  function controller(postService, commentService) {
    const vm = this

    vm.$onInit = onInit
    vm.togglePostForm = togglePostForm
    vm.createPost = createPost
    vm.createComment = createComment
    vm.voteUp = voteUp
    vm.voteDown = voteDown

    function onInit () {
      vm.sortType = '-vote_count'
      vm.sortName = 'Votes'
      postService.getAllPosts()
        .then(posts => vm.posts = posts)
    }

    function togglePostForm () {
      vm.addPost = !vm.addPost
    }

    function createPost (post) {
      postService.createPost(post)
        .then(newPost => vm.posts.push(newPost))
      togglePostForm() 
      delete vm.post
    }

    function createComment (post) {
      commentService.createComment(post)
        .then(newComment => {
          post.comments.push(newComment)
          delete post.newComment
        })
    }

    function voteUp (post) {
      postService.voteUp(post)
        .then(updatedCount => post.vote_count = updatedCount)
    }

    function voteDown (post) {
      if (post.vote_count === 0) return
      postService.voteDown(post)
        .then(updatedCount => post.vote_count = updatedCount)
    }
  }
}())