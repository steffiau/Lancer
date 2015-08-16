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
});

