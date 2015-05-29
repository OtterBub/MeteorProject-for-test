Coupons = new Mongo.Collection("coupons");
Coupons.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
