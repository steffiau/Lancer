// Project's ID and milestones index/ events index is hard coded for now.

var projectId = "AtdfZy8FxJBKGpp9J";

Template.singleMilestone.helpers({
  // targets a single event in the array
  singleMilestone: function () {
    var events = Projects.findOne({ _id : projectId }).events;
    var milestones = events.filter(function( obj ) {
      return obj.type == "milestone";
    });
    return milestones[0]
  },
  requirementCompleted: function () {
    if(Session.get("milestoneCompleted")){
      return true
    }
  },
  milestoneCompleted: function () {
    if(Session.get("milestoneCompleted")){
      return true
    }
  },  
});

Template.singleMilestone.events({
  "submit #new-comment": function (event) {
    event.preventDefault();

    var newText = event.currentTarget[0].value;
    var username = Meteor.user().profile.name;
    // Get value from form element
    var newComment = {
      text: newText,
      user_name: username
    }

    Projects.update({ _id : projectId }, {
      $addToSet: { "events.3.comments" : newComment }
    });

    event.currentTarget[0].value = "";
  },
});