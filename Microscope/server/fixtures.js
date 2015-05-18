if (Posts.find().count() === 0) {
	var now = new Date().getTime();
	var adminId = Meteor.users.insert({
		profile: { name: 'ADMIN' }
	});
	var admin = Meteor.users.findOne(adminId);
	var testId = Meteor.users.insert({
		profile: { name: 'user1' }
	});
	var test = Meteor.users.findOne(adminId);


	Posts.insert({
		title: 'Introducing Telescope',
		url: 'http://sachagreif.com/introducing-telescope/',
		userId: admin._id,
		flagged: false,
		author: admin.profile.name
	});

	var meteorPostId = Posts.insert({
		title: 'Meteor',
		url: 'http://meteor.com',
		userId: admin._id,
		flagged: false,
		author: admin.profile.name
	});

	Posts.insert({
		title: 'The Meteor Book',
		url: 'http://themeteorbook.com',
		userId: admin._id,
		flagged: false,
		author: admin.profile.name
	});

	Posts.insert({
		title: 'fuckShit',
		url: 'http://themeteorbook.com',
		userId: admin._id,
		flagged: true,
		author: admin.profile.name
	});

	Comments.insert({
		postId: meteorPostId,
		userId: test._id,
		author: test.profile.name,
		submitted: new Date(),
		body: 'Wow Good Site'
	});
}

if(Admin.find().count() === 0) {
	Admin.insert({
		postId: 2020
	});
}
