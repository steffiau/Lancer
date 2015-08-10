var projectId = "AdkNuqkxZehbGCh2b";

Template.singleMilestone.helpers({
  // find the project
  project: function(){
    return Projects.findOne({ _id : projectId })
  },

  // finds the events of the project (an array)
  milestones: function(){
    return Projects.findOne({ _id : projectId }).milestones
  },

   // targets a single event in the array
  singleMilestone: function(){
    return Projects.findOne({ _id : projectId }).milestones[0]
  },

  milestoneCompleted: function(){
    if(Session.get("milestoneCompleted")){
      return true
    }
  },

  requirementCompleted: function(){
    if(Session.get("milestoneCompleted")){
      return true
    }
  },

});