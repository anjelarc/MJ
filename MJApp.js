ItemList = new Mongo.Collection('blogs');

if (Meteor.isClient) {

	Template.home.helpers({
	  	blogs:function(){
	      	return ItemList.find();
	      }
      
	}); 	
	 

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});

	Template.userPage.helpers({
	  	blogs:function(){	  		
	  		var currentuser = Meteor.user().username;
	      	return ItemList.find({user:currentuser}).fetch();
	      }
      
	});  

	Template.userPage.events({
	    'click .createButton': function () {
	      $('.createButton').hide();
	      $('.saveButton').show();
	      $('.newForm').show();	      	      
	    }
  	});

  	Template.userPage.events({
	    'click .saveButton': function() {
	      $('.createButton').show();
	      $('.saveButton').hide();
	      $('#saveButtonBottom').click();
	      $('.newForm').hide();    
	    }
  	});	

  	Template.userPage.events({
	    'click #saveButtonBottom': function(event) {
	     	var title=$('#title').val();
	     	var description=$('#newDescription').val();
	     	var currentuser = Meteor.user().username;
	     	 ItemList.insert({
	     	 	title: title,
	     	 	description: description,
	     	 	createdAt: new Date(),
	     	 	user:currentuser
	     	 });	     	
	     	return false;
	    }
  	});

	Template.task.events({
	    'click .delete': function(event) {
	     	ItemList.remove(this._id);
	    }
  	});


	Template.registerHelper('formatDate', function(createdAt) {
  		return moment(createdAt).format('MM-DD-YYYY');
	});
}

if (Meteor.isServer) {
  
}