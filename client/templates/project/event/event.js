Template.singleEvent.helpers({
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

Template.singleEvent.events({
  "change .event-completed input": function(e){
    var project = Projects.findOne()
    var projectId = project._id
    var events = Projects.findOne().events
    var currentEvent = events[0]
    Session.set("eventCompleted", event.target.checked)
    Projects.update({_id: projectId}, {$set:  {'events.0.completed': !currentEvent.completed}})
    
  },
  "blur .single-event-details li": function(e){
    var currentProject = Projects.findOne()._id
    var title = document.getElementById("single-event-title").innerHTML
    var location = document.getElementById("single-event-location").innerHTML
    var date = document.getElementById("single-event-date").innerHTML
    var  notes = document.getElementById("single-event-notes").innerHTML
    var eventAttributes = {
      title: title,
      location: location,
      date: date,
      notes: notes 
    }

    Projects.update({_id: currentProject}, {$set: 
    {}
    })
   
    console.log(this)
  }
})
// helpers required for all changes to events page being reflected in the database


