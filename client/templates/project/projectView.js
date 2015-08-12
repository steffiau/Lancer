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
