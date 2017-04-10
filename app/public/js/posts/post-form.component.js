(function() {
  'use strict'

  angular.module('app')
    .component('postForm', {
      bindings: {
        post: '<',
        button: '@',
        onSubmit: '&'
      },
      templateUrl: '/js/posts/post-form.template.html',
      controller: postFormController
    })

    function postFormController() {
      const vm = this

      vm.submit = submit

      function submit() {
        vm.onSubmit({ post: vm.post })
      }
    }
}())