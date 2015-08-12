Template.project.helpers({
  project: function(){
    var projectid = Session.get("projectId")
    return Projects.findOne({_id: projectid})
  }
})