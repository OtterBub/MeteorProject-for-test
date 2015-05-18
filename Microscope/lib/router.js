Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('postsFilter', Meteor.user());
	}
});

Router.map(function() {
	this.route('postsList', {path: '/'});
	this.route('postPage', {
		path: '/posts/:title/',
		data: function(){ return Posts.findOne({title: this.params.title}); },
		waitOn: function() { return Meteor.subscribe('comments', this.params.title); }
	});
	this.route('postEdit', {
		path: '/posts/:title/edit',
		data: function(){ return Posts.findOne({title: this.params.title}); }
	});
	this.route('postSubmit', {
		path: '/submit'
	});
	this.route('loginAdmin', {
		path: '/loginAdmin',
		waitOn: function() { return Meteor.subscribe('admin') }
	});
});

var requireLogin = function() {
	if( ! Meteor.user() ) {
		if( Meteor.loggingIn() ) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
