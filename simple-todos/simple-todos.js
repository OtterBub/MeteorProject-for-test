
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  
  Template.body.helpers({
    tasks: function() {
      if(Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function() {
      return Session.get("hideCompleted");
    },
    incompleteCount: function() {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });
  
  Template.hello.events({
    "click button": function ( event ) {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  
  Template.body.events({
    "submit .new-task": function( event ) {
      var text = event.target.text.value;
      
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      
      event.target.text.value = "";
      
      return false;
    },
    "change .hide-completed input": function( event ) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
  
  Template.task.events({
    "click .toggle-checked": function() {
      Tasks.update( this._id, {$set: {checked: ! this.checked} } );
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
