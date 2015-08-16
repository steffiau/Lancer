if (Meteor.isServer){
	var secret = process.env["GOOGLE_OAUTH_SECRET"];
	var scopes = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/userinfo.email']
	debugger;
	ServiceConfiguration.configurations.remove({
		service: "google"
	});
	ServiceConfiguration.configurations.insert({
		service: "google",
		clientId: "296499903788-ju6mgtlhem2rsdjqn5p9t5a2m4espp1a.apps.googleusercontent.com",
		loginStyle: "redirect",
		forceApprovalPrompt: 'true',
		secret: secret,
		requestPermissions: scopes
});
}

