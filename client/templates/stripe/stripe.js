Template.getStripeUserSecret.helpers({
	getSecret: function(){
		var code = window.location.search.split('code=')[1];
		console.log(code);
		Meteor.call("getStripeSecret",code,function(error,result){
			if (!error){
				var stripe = _.pick(JSON.parse(result.content),"access_token","refresh_token","stripe_publishable_key","stripe_user_id");
				Meteor.users.update({"_id":currentUser()._id},{$set: {"profile.stripe": stripe }});
				} else {
				alert("Failed");
				};
		});
	}
	
});
