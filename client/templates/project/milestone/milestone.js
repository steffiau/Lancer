var projectId = "AdkNuqkxZehbGCh2b";

Template.singleMilestone.helpers({
   // targets a single event in the array
  singleMilestone: function(){
    return Projects.findOne({ _id : projectId }).milestones[0]
  },
  requirementCompleted: function(){
    if(Session.get("milestoneCompleted")){
      return true
    }
  },
  milestoneCompleted: function(){
    if(Session.get("milestoneCompleted")){
      return true
    }
  },  
});

Template.singleMilestone.events({
  ""
});