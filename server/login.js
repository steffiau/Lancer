Accounts.onCreateUser(function(options,user){
	console.log('$$$$$$$$$$ USER $$$$$$$$$$$$$$$$$$');
	console.log(user);
	console.log('$$$$$$$$$$ OPTION $$$$$$$$$$$$$$$$$$');
	console.log(options);
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
