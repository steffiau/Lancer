userSettingSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		optional: false
	},
	picture:{
		type: String,
		optional: false
	},
	email:{
		type: String,
		optional: false,
		regEx: SimpleSchema.RegEx.Email,
	},
	companyName:{
		type: String,
		optional: false
	},
	phone:{
		type:String,
		optional:true
	}

});

Template.userSetting.helpers({
	userProfile: function(){
	return currentUser().profile
	},
	stripeClientId: function(){
	return Meteor.settings.public["StripeClientId"];
	}
});

AutoForm.addHooks('userSetting',{
	onSubmit:function(doc){
	this.event.preventDefault();
	_.extend(doc,{login_count:currentUser().profile.login_count});
	_.extend(doc,{stripe:currentUser().profile.stripe});
	_.extend(doc,{infoComplete:true});
	Meteor.users.update({_id:currentUser()._id},{$set: {profile: doc}},{},function(error,num_doc){ if(error){toastr.error(error)}else{Session.set("onPage","active-projects");toastr.success("User setting updated successfully!")}});
	}		
});

//Template.userSetting.events({
//"click #stripeConnect": function(event){
//event.preventDefault();
//}		
//});
