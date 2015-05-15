Template.postSubmit.events({
  "submit form": function(e){
     e.preventDefault();

     var post = {
       url: $(e.target).find('[name=url]').val(),
       title: $(e.target).find('[name=title]').val(),
       flagged: false
     };

     Meteor.call("postInsert", post, function(error, result){
       if(error){
         console.log("error", error);
         return throwError(error.reason);
       }
       if(result.postExists){
         throwError('This url: ' + result.url + ' or title: ' + result.title +' has already been posted');
       } else {
         console.log('result.title: ' + result.title);
         Router.go('/');
       }
     });
  }
});
