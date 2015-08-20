Template.timeline.helpers({
  timeline: function(){
    var projectid = Session.get("projectId")
    var project = Projects.findOne({_id: projectid});
    var project_events = project.events;
    var indexed_events = _.map(project_events, function(value, index){
      return {value: value, index: index, date: value.date}
    });
    return _.sortBy(indexed_events, 'date');
  },
  title: function(){
    return currentProject().name
  },
})

Template.timeline.events({
  "click #project-title": function() {
    Session.set("template", "Project");
    $(".cd-timeline-content").css("background", "");
    $(".cd-timeline-content").find( "h2, small" ).css({"color":""});
  }
})