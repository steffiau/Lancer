if (Meteor.isClient){
	var scopes = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/userinfo.email']
	Accounts.ui.config({'requestPermissions':{'google':scopes}});
}
