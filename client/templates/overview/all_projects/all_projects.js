Template.allProjects.helpers({
  projects: function(){return Projects.find();},
  count: function(){return Projects.find().count();}
});