var Router=Backbone.Router.extend({routes:{"":"index",":name/repos":"showRepos",":name":"showProfile"},index:function(){this.navigate("pizzounit",{trigger:!0})},showProfile:function(t){Promise.all([this.showPage("profile"),$.get("https://api.github.com/users/"+t)]).then(function(t){var e=t[1];$(".content h1").text(e.name+"'s Profile"),$(".content h2").text(e.login),$(".content img").attr("src",e.avatar_url),$(".content .vcard-details .location").text(e.location)})},showRepos:function(t,e){console.log("foo"),Promise.all([this.showPage("repos"),$.get("https://api.github.com/users/"+t+"/repos")]).then(function(t){_.each(t[1],function(t){$(".content ul").append("<li>"+t.name+"</li>")})})},showPage:function(t){return console.log("showing page: ",t),document.title="Github - "+t.toUpperCase(),$("span .btn").removeClass("active"),$("span .btn."+t).addClass("active"),$.get(t+".html").then(function(t){$(".content").html(t)})},initialize:function(){Backbone.history.start()}});$(function(){var t=new Router;$("#searchForm").submit(function(e){var n=$("#userSearch").val();return t.navigate("#"+n,{trigger:!0}),!1})});