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
	    },

	    'click .saveButton': function() {
	      $('.createButton').show();
	      $('.saveButton').hide();
	      $('#saveButtonBottom').click();
	      $('.newForm').hide();    
	    },

	    'click #saveButtonBottom': function() {
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
	    'click .update': function() {
	    	var id = this._id;
	    	toggleButtonDiv(id);	    	
	      },
	    
	    'click .updatevalue': function() {
	    	var id = this._id;
	    	var title = this.title;
	    	var description= $('#desc_' + id).val().trim();
	    	var currentuser = Meteor.user().username;
	     	ItemList.update(this._id,{$set:{
	     		title: title,
	     	 	description: description,
	     	 	createdAt: new Date(),
	     	 	user:currentuser
	     	}});

	     	toggleButtonDiv(id);

	     	return false;
	    },

	    'click .delete': function() {
	     	ItemList.remove(this._id);
	    }
  	});
  	
  	Template.task.helpers({
  		itemid:function(){
	  		return this._id._str;
	  	}
  	});

	Template.registerHelper('formatDate', function(createdAt) {
  		return moment(createdAt).format('MM-DD-YYYY');
	});
}

toggleButtonDiv = function(id)
{
	console.log('test');
	$('#description_' + id).toggle();
	$('#descriptionUpdate_' + id).toggle();
	$('#buttonDiv_' + id).toggle();
	$('#saveupdate_' + id).toggle();
};