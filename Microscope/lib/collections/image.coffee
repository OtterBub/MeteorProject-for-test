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

@MainPage = new Meteor.Collection('mainPage');

Vector = new SimpleSchema
	X:
		type: Number
	
	Y:
		type: Number 

Schemas.MainPage = new SimpleSchema
	images:
		type: Array
	
	'images.$':
		type: Object
	
	'images.$.title':
		type: String
		max: 60
	
	'images.$.pos':
		type: Object
	
	'images.$.pos.x':
		type: Number
	'images.$.pos.y':
		type: Number
	
	'images.$.scale':
		type: Object
	'images.$.scale.x':
		type: Number
	'images.$.scale.y':
		type: Number
	
	'images.$.picture':
		type: String
		autoform:
			afFieldInput:
				type: 'fileUpload'
				collection: 'Images'
		label: 'Choose file'

MainPage.attachSchema(Schemas.MainPage)

MainPage.allow
	insert: (userId, doc) ->
		true