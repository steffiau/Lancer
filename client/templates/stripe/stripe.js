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

Template.stripePayment.events({
"click #stripe_checkout": function(e){
	alert('a');
	var handler = StripeCheckout.configure({
		key: currentUser().profile.stripe.stripe_publishable_key,
		image: 'https://lh6.ggpht.com/Gg2BA4RXi96iE6Zi_hJdloQAZxO6lC6Drpdr7ouKAdCbEcE_Px-1o4r8bg8ku_xzyF4y=h900',
		token: function(token) {
		//	Use the token to create the charge with a server-side script.
				// You can access the token ID with `token.id`
		}
	});
	var invoice = currentProject().events[Number(Session.get("event_index"))];
	var charge = _.reduce(invoice.items,function(memo,b){return memo + (b.price * b.qty)},0)*112;
	console.log("Charge" + charge);
	console.log(invoice);
	handler.open({
		name: currentClient().name,
		description: invoice.items[0].service,
		currency: "cad",
		amount: charge
	});
	e.preventDefault();
}

});

