Template.projectView.onCreated( function() {
  console.log("hey!")
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
