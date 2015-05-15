Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});

/*
Meteor.startup(function(){
  console.log('There are ' + Posts.find().count() + ' posts' );
});
*/
