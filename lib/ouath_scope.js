if (Meteor.isServer){
	ServiceConfiguration.configurations.remove({
		service: "google"
	});
	ServiceConfiguration.configurations.insert({
		service: "google",
		clientId: "296499903788-ju6mgtlhem2rsdjqn5p9t5a2m4espp1a.apps.googleusercontent.com",
		loginStyle: "popup",
		secret: process.env.GOOGLE_OAUTH_SECRET
	});
}

if (Meteor.isClient){
	var scopes = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/userinfo.email']
	Accounts.ui.config({'requestPermissions':{'google':scopes}});
}
