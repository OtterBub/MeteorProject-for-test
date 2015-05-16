Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, doc){ return ownsDocument(userId, doc) },
  remove: function(userId, doc){ return ownsDocument(userId, doc) }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

Meteor.methods({
  postInsert:function(postAttributes){
     check(Meteor.userId(), String);
     check(postAttributes, {
       title: String,
       url: String,
       flagged: Boolean
     });

     var errors = validatePost(postAttributes);
     if( errors.title || errors.url ) {
       throw new Meteor.Error('invalid-post', 'You must set a Title and URL for your post');
     }

     var postWithSameLink = Posts.findOne({$or: [ {title:postAttributes.title}, {url:postAttributes.url}]} );
     if( postWithSameLink ) {
       return {
         postExists: true,
         title: postAttributes.title,
         url: postAttributes.url
       };
     }
     var user = Meteor.user();
     var post = _.extend(postAttributes, {
       userId: user._id,
       author: user.username,
       submitted: new Date()
     });
     var postId = Posts.insert(post);
     return {
       title: post.title
     };
  }
});

validatePost = function(post) {
  var errors = {};
  if (!post.title) {
    errors.title = "Please fill in a headline";
  }
  if (!post.url) {
    errors.url = "Please fill in a URL";
  }
  return errors;
}
