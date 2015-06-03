Template.layout.helpers({
	pageTitle: function() {	return Session.get('pageTitle'); }
});

Template.layout.onRendered = function() {
}

/*
Tracker.autorun(function() {
  alert(Session.get('message'));
});
*/
