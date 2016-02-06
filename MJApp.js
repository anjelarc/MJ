ItemList = new Mongo.Collection('blogs');

if (Meteor.isClient) {
	Template.home.helpers({
	  	blogs:function(){
	      	return ItemList.find();
	      }
      
	});  

	Template.login.events({
	    'submit form': function(){
	    	//todo
	    }
	});

	Template.registerHelper('formatDate', function(createdAt) {
  		return moment(createdAt).format('MM-DD-YYYY');
	});
}

if (Meteor.isServer) {
  
}