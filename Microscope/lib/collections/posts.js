Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, doc){ return ownsDocument(userId, doc) },
  remove: function(userId, doc){ return ownsDocument(userId, doc) }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0 );
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
       submiitted: new Date()
     });
     var postId = Posts.insert(post);
     return {
       title: post.title
     };
  }
});
