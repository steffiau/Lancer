Template.project.helpers({
  project: function(){
    return Projects.findOne({ _id : Session.get("projectId") });
  },

  collabUser: function(){
    var project = Projects.findOne({ _id : Session.get("projectId") });
    return Meteor.users.find( { _id: { $in: project.collabId }} );
  }
});

Template.project.events({
  "blur .single-event-details li": function(e){
    var obj = {};
    obj["description"] = $("#project-desc").text();

    Projects.update({_id: Session.get("projectId")},{$set: obj })
  },
  "submit #add-project-user": function(e){
    e.preventDefault();
    var userEmail = e.currentTarget[0].value;
    var newUserId = Meteor.users.findOne({"profile.email":userEmail})._id;
    Projects.update({_id: Session.get("projectId")}, {$addToSet: {"collabId":newUserId}});
  }
});