Meteor.publish('postsFilter', function() {
	return Posts.find({flagged: false});
});