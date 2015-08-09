Template.newEvent.helpers({
  // find all projects
  projects: function(){
    return Projects.find()
  },

  // finds the events of a project (an array)
  events: function(){
    return Projects.findOne().events
  },

   // targets a single event in the array
  singleEvent: function(){
    var events = Projects.findOne().events
    return events[0]
  },

  eventCompleted: function(){
    if(Session.get("eventCompleted")){
      return true
    }
  },



});

Template.newEvent.events({
  "change .event-completed input": function(e){
    Session.set("eventCompleted", event.target.checked)
  }
})