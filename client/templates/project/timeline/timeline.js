Template.timeline.helpers({
  timeline: function(){
    var project = Projects.findOne();
    var client_events = _.union(project.events, project.milestones, project.invoices);
    console.log(client_events)
    return _.sortBy(client_events, 'date');
  }
})