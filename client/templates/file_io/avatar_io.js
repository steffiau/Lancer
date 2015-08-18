

Template.uploadAvatar.helpers({
  // attachments: function(){
  //   var project = Projects.findOne({_id: Session.get("projectId")});
  //   return project.events[Session.get("event_index")].attachments;
  // },
 //  uploads: function(){
 //   return projectFiles.find();
 // },
 downloadURL: function(){
   return "https://s3-us-west-2.amazonaws.com/lancerlhl/projectFiles/"
 }
});

// template helpers for the upload form
Template.uploadAvatar.events({
  "submit form": function(e){
    e.preventDefault();
    var file = $("#avatar").get(0).files[0];
    var fileObj = projectFiles.insert(file);
    var avatarPath =  "https://s3-us-west-2.amazonaws.com/lancerlhl/projectFiles/" + fileObj._id + "-" + file.name;
    
    var userProfile = currentUser().profile;
    var newProfile = _.extend(currentUser().profile, {picture: avatarPath});
    Meteor.users.update({_id:currentUser()._id},{$set: {profile: newProfile}});
  }
});
