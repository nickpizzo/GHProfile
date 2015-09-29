(function() {

window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {}
};

App.Router = Backbone.Router.extend({
  routes: {
    '':'index',  //"the default action"
    ':name/repos/': 'showRepos',
    ':name': 'profile',
  },

  index: function () {
    this.navigate('pizzounit', {trigger: true});
  },

  profile: function(name) {
    $.ajax('sidebar.html').then(function (data) {
      $('.sidebar').html(data);
      // get ajax
      $.get('https://api.github.com/users/' + name).then(function (data) {
        console.log(data)
        $('.profilepic').attr('src', data.avatar_url);
        $('h2').text(data.name);
        $('h4').text(data.login);
        $('.location').text(data.location);
        $('.joined').text(data.created_at);
      })
    })

  },

  showRepos: function(name) {
    $.ajax('repo.html').then(function (page) {
      $('.maindisplay').html(page)
      // get ajax
      $.get('https://api.github.com/users/' + name + '/repos').then(function (data) {
        console.log(data)
        _.each(data[1], function (repo) {
        $('.repolist ul').append('<li>' + repo.name + '</li>');
      })
    })
  })
  },




});

new App.Router;
Backbone.history.start();

})();
