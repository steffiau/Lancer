Template.tomTemplate.helpers({
	projects: function(){return Projects.find();}
});

Template.project.helpers({
	events: function(){
		return this.events;
	}
});
