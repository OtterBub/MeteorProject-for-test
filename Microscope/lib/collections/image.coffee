@Images = new FS.Collection("images",
	stores: [new FS.Store.GridFS("images",{})] 
)

Images.allow
	insert: (userId, doc) ->
		true
	download: (userId) ->
		true
	update: (userId) ->
		true
		
Schemas = {}

@ImagePosts = new Meteor.Collection('imagePosts');

Schemas.ImagePosts = new SimpleSchema
	title:
		type: String
		max: 60
	
	picture:
		type: String
		autoform:
			afFieldInput:
				type: 'fileUpload'
				collection: 'Images'
		label: 'Choose file'

ImagePosts.attachSchema(Schemas.ImagePosts)