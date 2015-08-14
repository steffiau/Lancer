//  Meteor.publish definitions
Meteor.publish('projects', function() {
	var id = this.userId;
  // return Projects.find({});
  return Projects.find({ $or: [{owner_id:id}, {collab_id:id}] });
});
Meteor.publish('clients', function() {
	var id = this.userId;
  // return Clients.find({});
	return Clients.find({ $or: [{owner_id:id}, {collab_id:id}] });
});

Meteor.publish('projectFiles', function() {
  var id = this.userId;
  return projectFiles.find()
});




