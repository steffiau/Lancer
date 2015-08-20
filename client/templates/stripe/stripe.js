Template.getStripeUserSecret.helpers({
	getSecret: function(){
		var code = window.location.search.split('code=')[1];
		Meteor.call("getStripeSecret",code,function(error,result){
			if (!error){
				var stripe = _.pick(JSON.parse(result.content),"access_token","refresh_token","stripe_publishable_key","stripe_user_id");
				Meteor.users.update({"_id":currentUser()._id},{$set: {"profile.stripe": stripe }});
				Session.set("onPage","userSetting")
				Router.go('/');
				} else {
				alert("Failed");
				};
		});
	}
});

Template.stripePayment.events({
"click #stripe_checkout": function(e){
	var charge = _.reduce(this.event.items,function(memo,b){return memo + (b.price * b.qty)},0)*112;
	var stripe_user_id = this.user.profile.stripe.stripe_user_id;
	var project_id = this.project._id;
	var event_index = this.event_index;
	var handler = StripeCheckout.configure({
		//key: this.user.profile.stripe.stripe_publishable_key,
		key:"pk_test_YO89ZBgifqKKnqV7Ny4rEZeq",
		image: 'https://lh6.ggpht.com/Gg2BA4RXi96iE6Zi_hJdloQAZxO6lC6Drpdr7ouKAdCbEcE_Px-1o4r8bg8ku_xzyF4y=h900',
		token: function(token) {
				Meteor.call("stripeCharge",token,stripe_user_id,charge,function(error,charge){
				if (error){
			toastr.warning("Paymnet fails",error);} else {toastr.success("Payment success");
			//Charge succeed		
			project = Projects.findOne({"_id": project_id});
			project.events[event_index].completed = true;
			project.events[event_index].completedAt = moment().toISOString();
			Projects.update({"_id": project_id},project);
			document.location.reload();
			}});
		}
	});
	handler.open({
		name: this.client.name,
		description: this.event.items[0].service,
		currency: "cad",
		amount: charge
	});
	e.preventDefault();
}

});

