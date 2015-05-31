Template.postsList.helpers({
    posts: ->
      Posts.find()
})

#/*
#Meteor.startup(function(){
#  console.log('There are ' + Posts.find().count() + ' posts' );
#});