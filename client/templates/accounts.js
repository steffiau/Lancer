Template.loggedIn.events({
	"click #logout": function(e){
		e.preventDefault();
		Meteor.logout();
	}
});

Template.logIn.events({
	"click #login-button": function(e){
		e.preventDefault();
		var email = $('#login-email').val(),
		password = $('#login-password').val();
		Meteor.loginWithPassword(email, password, function(err){
			if(err){
				alert(err);

			}
		});
		}
});
