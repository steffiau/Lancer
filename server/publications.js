//  Meteor.publish definitions
Meteor.publish('projects', function() {
	var id = this.userId;
	return Projects.find({owner_id:id});
});
Meteor.publish('clients', function() {
	var id = this.userId;
	return Clients.find({owner_id:id});
});



