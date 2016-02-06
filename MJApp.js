ItemList = new Mongo.Collection('blogs');
if (Meteor.isClient) {
  Template.body.helpers({
  	blogs:function(){
      	return ItemList.find();
      }
      
  });  

  Template.registerHelper('formatDate', function(createdAt) {
  return moment(createdAt).format('MM-DD-YYYY');
});
}

if (Meteor.isServer) {
  
}