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
    var project = Projects.findOne()
    var projectId = project._id
    var events = Projects.findOne().events
    var currentEvent = events[0]
    Session.set("eventCompleted", event.target.checked)
    Projects.update({_id: projectId}, {$set:  {'events.0.completed': !currentEvent.completed}})
    
  },
  "blur .single-event-details li": function(e){
    
    Projects.update({_id: this._id}, {$set: 
      {
      'events.0.title': "blaaah",
      'events.0.location': this.location
    }
  })
    console.log(this.title)
    console.log(this.location)
    

  }
})
// helpers required for all changes to events page being reflected in the database


