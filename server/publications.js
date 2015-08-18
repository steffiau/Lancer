//  Meteor.publish definitions
Meteor.publish('projects', function() {
	var id = this.userId;
  // return Projects.find({});
  return Projects.find({ $or: [{owner_id:id}, {collabId:id}] });
});

Meteor.publish('clients', function() {
	var id = this.userId;
  // return Clients.find({});
	return Clients.find({ $or: [{owner_id:id}, {collabId:id}] });
});

Meteor.publish('projectFiles', function() {
  var id = this.userId;
  return projectFiles.find()
});

Meteor.publish('allUsers', function() {
  return Meteor.users.find();
});

Meteor.publish('messages', function(){
  var id =  this.userId 
  return Messages.find({},{$or: [{collaborators: id},{userId: id}]})
});



