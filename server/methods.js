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
	getStripeSecret: function(code){

		jQuery.ajax({
			type: "POST",
			url:"https://connect.stripe.com/oauth/token",
			data: {client_secret: process.env["STRIPE_SECRET_KEY"],
				code: code,
				grant_type: code},
			dataType: "json",
			success: function(data){
				console.log('--------------------------');
				console.log(data);
			}
		});
	}
});

