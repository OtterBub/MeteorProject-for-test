Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert:function(postAttributes){
     check(Meteor.userId(), String);
     check(postAttributes, {
       title: String,
       url: String,
       flagged: Boolean
     })

     if(Meteor.isServer){
       postAttributes.title += "(Server)";
     } else if(Meteor.isClient){
       postAttributes.title += "(Client)";
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
       submiitted: new Date()
     });
     var postId = Posts.insert(post);
     return {
       title: post.title
     };
  }
});

/*
Posts.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});
*/
