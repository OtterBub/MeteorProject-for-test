Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('postsFilter', Meteor.user());
	}
});

Router.map(function() {
	this.route('adminMenu', {
		path: '/'
	});	
	this.route('postsList', {
		path: '/postsList'
	});
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
	this.route('imageUpload', {
		path: '/imageUpload',
		waitOn: function() {
			return Meteor.subscribe('images');
		}
	});
	this.route('profile', {
		waitOn: function() {
			return Meteor.subscribe('images');
		}
	});
	this.route("webGL", {
		path: "/webGL"
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
