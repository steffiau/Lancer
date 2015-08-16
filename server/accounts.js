Accounts.onCreateUser(function(options,user){
	if (!user.profile) { user.profile = {} ;};
	if (options['email']) {
		// This is normal user 
		user.profile['email'] = options['email'];
		user.profile['login_count'] = 0;
		return user;
	}
	if (user.services.google.email) {
		user.profile['email'] = user.services.google.email;
		user.profile['name'] = user.services.google.name;
		user.profile['picture'] = user.services.google.picture;
		user.profile['login_count'] = 0;
	}
	return user;
});

Accounts.onLogin(function(user){
	Meteor.users.update({'_id': user.user._id},{$inc:{"profile.login_count" : 1}});
	console.log(user.user.profile['login_count']);

});
