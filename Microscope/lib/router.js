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

Router.route( '/submit', { name: 'postSubmit' } );

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
