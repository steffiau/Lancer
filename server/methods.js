Meteor.methods({
	sendEmail: function (to, from, subject, html) {
		//check([to, from, subject], [String]);

		// Let other method calls from the same client start running,
		//     // without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			from: "lighthouselabs_june22_cohort@outlook.com",
			subject: subject,
			html: html
		});
	},
	insertMessage: function(message){
		Messages.insert(message);
	},	
	getStripeSecret: function(auth_code){
		var res = Meteor.http.call("POST","https://connect.stripe.com/oauth/token",{params:{client_secret:process.env["STRIPE_SECRET_KEY"],
			code: auth_code,
			grant_type:"authorization_code",
			client_id: process.env["STRIPE_CLIENT_ID"]}});
		if (res.statusCode === 200){
			return res;
		}	
	},
	findProjectIdFromInvoice: function(invoice_num){
		//Meteor.call("findProjectIdFromInvoice","20150909-xYfH",function(err,data){console.log(data)});
		var projects = Projects.find().fetch(); // array of projects
		var project_ids = _.map(projects,function(project){return project._id;});
		var project_ids_4 = _.map(project_ids,function(a) {return a.substring(a.length - 4,a.length);});
		var project_id_obj = _.object(project_ids_4,project_ids); // looks like {hbqY: 'HEBfo22YKy3Z6hbqY'}
		var project_id4 = invoice_num.split('-')[1];
		var project_id = project_id_obj[project_id4];
		return project_id;
	},
	findInvoiceIndexFromInvoiceId: function(project_id, invoice_num){
		//Meteor.call("findInvoiceIndexFromInvoiceId","oHXFcyefyeJzfxYfH","20150919-xYfH", function(err,data){console.log(data)});
		var invoice_date = invoice_num.split('-')[0];
		var project = Projects.findOne({"_id":project_id}); //  Project Found here
		var eventIndex = _.find(project.events,function(event){return event.invoice_no == invoice_num});
		return (project.events.indexOf(eventIndex));
	}

});

