ImagePosts = new Mongo.Collection('imagePosts');

Schemas = {};

Schemas.ImagePosts = new SimpleSchema({
  title: { type: String, max: 60 },
  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
        }
      },
      label: 'Choose file'
    }
});

ImagePosts.attachSchema( Schemas.ImagePosts );
