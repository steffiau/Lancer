//    This is the order Meteor loads code:
//    lib/                      # common code like collections and utilities
//    lib/methods.js            # Meteor.methods definitions
//    lib/constants.js          # constants used in the rest of the code
//    
//    client/compatibility      # legacy libraries that expect to be global
//   *client/lib/               # code for the client to be loaded first
//    client/lib/helpers.js     # useful helpers for your client code
//    client/body.html          # content that goes in the <body> of your HTML
//    client/head.html          # content for <head> of your HTML: <meta> tags, etc
//    client/style.css          # some CSS code
//    client/<feature>.html     # HTML templates related to a certain feature
//    client/<feature>.js       # JavaScript code related to a certain feature
//    
//    server/lib/permissions.js # sensitive permissions code used by your server
//    server/publications.js    # Meteor.publish definitions
//    
//    public/favicon.ico        # app icon
//    
//    settings.json             # configuration data to be passed to meteor --settings
//    mobile-config.js          # define icons and metadata for Android/iOS

currentUser = function(){
	return(Meteor.user());
};
currentUserId = function(){
	return(Meteor.userId());
};
findClient = function(project){
	// Given Project object, return the project's client object
	clientId = project.client_id;
	return Clients.findOne({'_id':clientId});
};

currentProject = function(){
	return Projects.findOne({"_id": Session.get('projectId')});
};

clientName = function(clientId){
	return Clients.findOne({'_id':clientId}).name;
}


