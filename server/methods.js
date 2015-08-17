Meteor.methods({
	sendEmail: function (to, from, subject, html) {
		//check([to, from, subject], [String]);

		// Let other method calls from the same client start running,
		//     // without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			html: html
		});
	},
<<<<<<< HEAD
	insertMessage: function(message){
		Messages.insert(message);
	},	
=======
	getStripeSecret: function(auth_code){
		var res = Meteor.http.call("POST","https://connect.stripe.com/oauth/token",{params:{client_secret:process.env["STRIPE_SECRET_KEY"],
			code: auth_code,
			grant_type:"authorization_code",
			client_id: process.env["STRIPE_CLIENT_ID"]}});
		if (res.statusCode === 200){
			return res;
		}
		
	}
>>>>>>> stripe_integration
});

