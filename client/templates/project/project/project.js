Template.project.helpers({
  project: function(){
    return Projects.findOne({ _id : Session.get("projectId") })
  },

  collabUser: function(){
    var project = Projects.findOne({ _id : Session.get("projectId") });
    return Meteor.users.find( { _id: { $in: project.collab_id }} );
  }
});

Template.project.events({
  "submit #add-project-user": function(e){
    e.preventDefault();
    var userEmail = e.currentTarget[0].value;
    var newUserId = Meteor.users.findOne({"services.google.email":userEmail})._id;
    Projects.update({_id: Session.get("projectId")}, {$addToSet: {"collab_id":newUserId}});
  }
});