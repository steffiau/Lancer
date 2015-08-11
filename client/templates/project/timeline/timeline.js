Template.timeline.helpers({
  timeline: function(){
    var projectid = Session.get("projectId")
    var project = Projects.findOne();
    var project_events = project.events;
    var indexed_events = _.map(project_events, function(value, index){
      return {value: value, index: index, date: value.date}
    });
    return _.sortBy(indexed_events, 'date');
  }
})