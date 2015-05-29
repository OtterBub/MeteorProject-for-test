ownsDocument = function(userId, doc) {
  if( Meteor.user );
  return ( doc && doc.userId === userId );
}
