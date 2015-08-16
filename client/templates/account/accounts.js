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
	},
	"click #login-with-google": function(e){
		e.preventDefault();
		if (Accounts.loginServicesConfigured()){
			Meteor.loginWithGoogle({});
		};
	}
});

Template.signUp.events({
	"click #signup-button": function(e){
		e.preventDefault();
		if ($('#signup-password1').val() != $('#signup-password2').val()){
			// Two password doesn't match
			alert("Password don't match, try again");
			$("#signup-password1").val("");
			$("#signup-password2").val("");
			return false
		} else {
			Accounts.createUser({
				email: $("#signup-email").val(),
				password: $("#signup-password1").val()},function(error){
					if(error){ alert("Error: " + error);}else{Session.set("signup",false)}		
				});
		}
	}
});

Template.notLoggedIn.helpers({
	signup: function(){
		if (Session.get("signup") == true){
		return true;
		} else{
		return false;
		}
	}

});
