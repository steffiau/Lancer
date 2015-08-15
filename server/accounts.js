Accounts.onCreateUser(function(options,user){
	if (!user.profile) { user.profile = {} ;};
	if (options['email']) {
		user.profile['email'] = options['email'];
		return user;
	}
	if (user.services.google.email) {
		user.profile['email'] = user.services.google.email;
		user.profile['name'] = user.services.google.name;
		user.profile['picture'] = user.services.google.picture;

	}
	return user;
});

