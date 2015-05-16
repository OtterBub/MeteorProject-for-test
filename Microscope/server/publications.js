Meteor.publish('postsFilter', function() {
	return Posts.find({flagged: false});
});

Meteor.publish('comments', function(postTitle) {
	check(postTitle, String);
	return Comments.find({postId: Posts.findOne({title: postTitle})._id});
});

Meteor.publish('commentsAll', function() {
	return Comments.find({});
});

Meteor.publish('postsAdmin', function() {
	return Posts.find({});
});
