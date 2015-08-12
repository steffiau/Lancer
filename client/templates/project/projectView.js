Template.projectView.onCreated( function() {
  Session.set('template', 'Project');
});

Template.projectView.helpers({
  projects: function(){
    return Projects.find();
  },
  template: function(){
    return Session.get("template")
  }
});

Template.projectView.events({
  'click #archiveProject': function(){
  Projects.update({'_id':Session.get('projectId')
        },{$set:{ project_finished: true }
          , $set:{
          project_finishedAt: moment().toISOString()}});
  }
});
