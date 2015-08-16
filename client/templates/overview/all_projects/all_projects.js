Template.allProjects.helpers({
  projects: function(){
    return Projects.find({project_finished:false});
  },
  count: function(){
    return Projects.find({project_finished:false}).count();
  },
});

Template.allProjects.events({
  "click .overview-project": function(e) {
    var projectId = e.currentTarget.parentElement.dataset.project_id
    Router.go("/project/" + projectId)
  }
});

Template.projectListing.helpers({
  timeline: function(){
    var events = this.events
    return _.sortBy(events, 'date');
  },
  comPercent: function(){
    var totalEvents = this.events;
    var comEvents = totalEvents.filter(function( event ) {
      return event.completed == true;
    });

    return Math.floor((comEvents.length / totalEvents.length) * 100);
  }
});

Template.projectLatestDetails.helpers({
  currentTask: function(){
    active_events = _.map(this.events, function(event){
      if (event.completed == false) {
        return event;
      }
    });
    return _.sortBy(_.compact(active_events), 'date')[0]
  },
  date: function (){
    active_events = _.map(this.events, function(event){
      if (event.completed == false) {
        return event;
      }
    });
    var current_task = _.sortBy(_.compact(active_events), 'date')[0]
    return moment(current_task.date).format("dddd, MMMM Do")
  }
})











