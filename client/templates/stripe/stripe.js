Template.getStripeUserSecret.helpers({
	getSecret: function(){
		var code = window.location.search.split('code=')[1];
		console.log(code);
		Meteor.call("getStripeSecret",code,function(error,result){
			console.log(error);
		console.log(result);
		});
	}
	
});
