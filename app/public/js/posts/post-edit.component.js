(function() {
  'use strict'

  angular.module('app')
    .component('postEdit', {
      templateUrl: '/js/posts/post-edit.template.html',
      controller: controller
    })

  controller.$inject = ['$stateParams', '$state', 'postService']
  function controller($stateParams, $state, postService) {
    const vm = this

    vm.$onInit = onInit
    vm.updatePost = updatePost

    function onInit () {
      postService.getSinglePost($stateParams.id)
        .then(post => vm.post = post)
    }

    function updatePost() {
      postService.updatePost($stateParams.id, vm.post)
        .then(res => $state.go('list-posts'))
    }
  }
}())