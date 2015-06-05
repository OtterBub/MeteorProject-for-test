Schemas = {}

@TutorialPage = new Meteor.Collection('tutorialPage');

Vector = new SimpleSchema
	X:
		type: Number
	
	Y:
		type: Number 

Schemas.TutorialPage = new SimpleSchema
	images:
		type: Array
	
	'images.$':
		type: Object
	
	'images.$.title':
		type: String
		max: 60
	
	'images.$.picture':
		type: String
		autoform:
			afFieldInput:
				type: 'fileUpload'
				collection: 'Images'
		label: 'Choose file'

TutorialPage.attachSchema(Schemas.TutorialPage)

TutorialPage.allow
	insert: (userId, doc) ->
		true