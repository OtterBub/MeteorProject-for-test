Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('postsFilter'); }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { 
		return Posts.findOne({title:this.params._id}); }
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});