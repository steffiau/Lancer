Template.timeline.helpers({
  timeline: function(){
    var project = Projects.findOne();
    var events = project.events
    return _.sortBy(events, 'date');
  }
})