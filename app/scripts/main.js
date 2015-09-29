var Router = Backbone.Router.extend({
  routes: {
    '': 'index', //the default action
    // 'about': 'showAbout',
    ':name/repos': 'showRepos',
    ':name': 'showProfile',
  },

  // showAbout: function() {
  //   this.showPage('about');
  // },

  index: function () {
    this.navigate('pizzounit', {trigger: true});
  },

  showProfile: function(name) {
    Promise.all([
      this.showPage('profile'),
      $.get('https://api.github.com/users/' + name)
    ]).then(function(data) {
      // TODO: Could be better with a Backbone view and template
      var profile = data[1];
      $('.content h1').text(profile.name + '\'s Profile');
      $('.content h2').text(profile.login);
      $('.content img').attr('src', profile.avatar_url);
      $('.content .vcard-details .location').text(profile.location);
      //add code for inputting other profiles here
    });
  },

  showRepos: function(name, foo) {
    console.log('foo')
    Promise.all([
      this.showPage('repos'),
      $.get('https://api.github.com/users/' + name + '/repos'), //user info
    ]).then(function(data) {
      _.each(data[1], function (repo) {
        $('.content ul').append('<li>' + repo.name + '</li>');
      })
    });
  },

  showPage: function(pageName) {
    console.log("showing page: ", pageName);
    document.title = "Github - " + pageName.toUpperCase();

    $('span .btn').removeClass('active');
    $('span .btn.' + pageName).addClass('active');

    return $.get(pageName + '.html').then(function(data) {
      $('.content').html(data);
    });
  },

  initialize: function() {
    Backbone.history.start();
  }


});

$(function() {  // for search functionality
  var router = new Router();

  $('#searchForm').submit(function(event) {
    var userName = $('#userSearch').val();
    router.navigate("#" + userName, { trigger: true });
    return false;
  });
})
