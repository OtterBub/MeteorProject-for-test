Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('postsFilter'); }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:title', {
	name: 'postPage',
	data: function() { 
		return Posts.findOne({title:this.params.title}); }
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});