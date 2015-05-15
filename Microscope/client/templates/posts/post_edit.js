Template.postEdit.events({
  "submit form": function(e){
     e.preventDefault();

     var currentPostId = this._id;
     var postProperties = {
       url: $(e.target).find('[name=url]').val(),
       title: $(e.target).find('[name=title]').val()
     }

     console.log(postProperties.url + ' ' + postProperties.title);

     Posts.update(currentPostId, {$set: postProperties}, function(error) {
       if(error) {
         throwError(error.reason);
       } else {
         Router.go('postPage', {title:postProperties.title});
       }
     });
  },

  "click .delete": function(e) {
    e.preventDefault();

    if(confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
