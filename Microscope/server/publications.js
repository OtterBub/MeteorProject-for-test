Meteor.publish('postsFilter', function(user) {
	if(user) {
		if( Meteor.users.findOne({_id:user._id}).admin ) {
			return Posts.find({flagged: false}, {sort:{submitted:1}});
		}
	}
	return Posts.find({flagged: true}, {sort:{submitted:1}});	
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
