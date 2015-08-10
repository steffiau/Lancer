Template.tomTemplate.helpers({
	projects: function(){
    return Projects.find();
  }
});

Template.project.helpers({
	invoice: function(){
		return this.invoices;
	},
  client: function(){
    return Clients.findOne({"_id": this.client_id});
  }
});

Template.invoice1.helpers({
  name: function(){
    console.log(this)
  }
})

Template.timeline.helpers({
  client_event: function(){
    var project = Projects.findOne();
    return client_events = _.union(project.events, project.milestones, project.invoices);
  }
})
